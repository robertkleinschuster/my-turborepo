import {create} from "zustand";
import {persist} from 'zustand/middleware'

export interface History {
    items: readonly HistoryItem[],
    previous: HistoryItem | null,
    updateBreadcrumbs: (sequence: number, root: number) => void,
    prepare: (type: HistoryItem['type'], id: string, title: string, params?: HistoryItem['params']) => HistoryItem,
    push: (item: HistoryItem) => void,
    update: (item: HistoryItem) => void,
    hideInRecents: (id: string) => void,
    clear: () => void,
}

interface BaseHistoryItem {
    id: string,
    root: number,
    sequence: number,
    type: 'trip' | 'station' | 'trip_search' | 'station_search' | 'history' | 'journeys' | 'settings',
    title: string,
    added: string,
    recents: boolean | undefined,
    recents_overview: boolean | undefined,
    breadcrumbs: boolean | undefined,
    previous: HistoryItem | null
    next: HistoryItem | null
    children?: HistoryItem[]
    params: Record<string, string | string[] | null> | undefined
    info?: Record<string, string | string[] | null> | undefined
}

export interface TripHistoryItem extends BaseHistoryItem {
    type: 'trip',
    info: {
        line: string | null,
        product: string | null,
        direction: string | null,
        destination: string | null,
        provenance: string | null,
        origin: string | null,
    }
}

export interface TripSearchHistoryItem extends BaseHistoryItem {
    type: 'trip_search',
    params: {
        query: string | null,
        when: string | null,
        products: string[] | null
    }
}

export interface StationHistoryItem extends BaseHistoryItem {
    type: 'station',
    params: {
        mode: 'arrivals' | 'departures'
        when: string | null,
        products: string[] | null
    }
}

export type HistoryItem = BaseHistoryItem | TripHistoryItem | StationHistoryItem | TripSearchHistoryItem

function prepareItem(state: History, type: HistoryItem['type'], id: string, title: string, params: HistoryItem['params'] = {}): HistoryItem {
    const sequence = (state.previous?.sequence ?? 0) + 1
    const root = state.previous?.root ?? 0

    return {
        id,
        type,
        title,
        params,
        sequence,
        root: type === 'trip' || type === 'station' ? root : sequence,
        added: (new Date).toISOString(),
        recents: type === 'trip' || type === 'station',
        recents_overview: type === 'station_search' || type === 'trip_search',
        breadcrumbs: true,
        previous: null,
        next: null,
    }
}

export function filterRecents(items: readonly HistoryItem[]): readonly HistoryItem[] {
    const recents = new Map<string, HistoryItem>();
    for (let i = items.length - 1; i >= 0; i--) {
        if ((items[i].recents ?? true) && !recents.has(items[i].id)) {
            recents.set(items[i].id, items[i])
        }
    }
    return Array.from(recents.values());
}

export function filterParents(items: readonly HistoryItem[], root: number | null = null): readonly HistoryItem[] {
    const parents: HistoryItem[] = []

    for (let i = items.length - 1; i > 0; i--) {
        if (items[i].recents_overview && items.at(i + 1) && (root === null || items[i].root === root)) {
            const children: HistoryItem[] = []
            for (let j = i + 1; items[j].root === items[i].root; j++) {
                if (items[j].breadcrumbs) {
                    children.push(items[j])
                }
            }
            if (children.length) {
                parents.push({
                    ...items[i],
                    children
                })
            }
        }
    }

    return parents
}

export function filterBreadcrumbs(items: readonly  HistoryItem[], sequence: number, root: number): readonly HistoryItem[] {
    const breadcrumbs: HistoryItem[] = []
    for (const item of Array.from(items)) {
        if (item.breadcrumbs && item.root === root && item.sequence <= sequence && item.sequence >= root) {
            breadcrumbs.push(item)
        }
    }

    for (let i = 0; i < breadcrumbs.length; i++) {
        if (breadcrumbs.at(i - 1)) {
            breadcrumbs[i] = {
                ...breadcrumbs[i],
                previous: {...breadcrumbs[i - 1]}
            }
        }
        if (breadcrumbs.at(i + 1)) {
            breadcrumbs[i] = {
                ...breadcrumbs[i],
                next: {...breadcrumbs[i + 1]}
            }
        }
    }

    return breadcrumbs;
}


export const useHistory = create(
    persist<History>(
        (set, get) => ({
            items: [],
            previous: null,
            prepare: (type: HistoryItem['type'], id: string, title: string, params: HistoryItem['params'] = {}) => {
                return prepareItem(get(), type, id, title, params)
            },
            push: (item: HistoryItem) => {
                const limit = 250
                set(state => {
                    const sanitizedItem = {
                        ...item,
                        next: null,
                        previous: null
                    }
                    const items = [...state.items.slice(state.items.length > limit ? state.items.length - limit : 0), sanitizedItem]
                    return {items, previous: sanitizedItem}
                })
            },
            update: (item: HistoryItem) => {
                set((state) => {
                    const items = Array.from(state.items)
                    for (let i = items.length - 1; i > 0; i--) {
                        if (item.sequence === items[i].sequence) {
                            items[i] = {
                                ...item,
                                next: null,
                                previous: null
                            };
                        }
                    }
                    return {
                        items
                    }
                })
            },
            updateBreadcrumbs: (sequence: number, root: number): void => {
                const items = Array.from(get().items)
                let changed = false;
                for (let i = items.length - 1; i > 0; i--) {
                    const item = items[i]
                    if (!item.breadcrumbs && item.root === root && sequence === item.sequence) {
                        items[i] = {
                            ...item,
                            breadcrumbs: true,
                        }
                        changed = true
                    }

                    if (item.breadcrumbs && item.root === root && item.sequence > sequence) {
                        items[i] = {
                            ...item,
                            breadcrumbs: false,
                        }
                        changed = true
                    }
                }

                if (changed) {
                    set(() => ({items}))
                }
            },
            hideInRecents: (id: string) => {
                set(state => {
                    const items = state.items.map(item => ({
                        ...item,
                        recents: (item.recents ?? true) && item.id !== id,
                        recents_overview: (item.recents_overview ?? true) && item.id !== id
                    }))
                    return {items}
                })
            },
            clear: () => {
                set(() => ({
                    items: [],
                    previous: null,
                }), true)
            }
        }),
        {
            name: 'history',
        },
    )
)


