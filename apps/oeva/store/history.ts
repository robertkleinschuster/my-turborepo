import {create} from "zustand";
import {persist} from 'zustand/middleware'

export interface History {
    items: readonly HistoryItem[],
    previous: HistoryItem | null,
    filterRecents: () => readonly HistoryItem[],
    filterBreadcrumbs: (sequence: number, root: number) => readonly HistoryItem[],
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
    previous: HistoryItem | null
    next: HistoryItem | null
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
        previous: null,
        next: null,
    }
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
                const items = Array.from(get().items)
                for (let i = items.length - 1; i > 0; i--) {
                    if (item.sequence === items[i].sequence) {
                        items[i] = {
                            ...item,
                            next: null,
                            previous: null
                        };
                    }
                }
                set(() => ({items}))
            },
            filterRecents: (): readonly HistoryItem[] => {
                const items = Array.from(get().items)
                const recents = new Map<string, HistoryItem>;
                for (let i = items.length - 1; i >= 0; i--) {
                    if ((items[i].recents ?? true) && !recents.has(items[i].id)) {
                        recents.set(items[i].id, items[i])
                    }
                }
                return Array.from(recents.values());
            },
            filterBreadcrumbs: (sequence: number, root: number) => {
                const breadcrumbs: HistoryItem[] = []
                const items = Array.from(get().items)
                for (let i = items.length - 1; i > 0; i--) {
                    const item = items[i]
                    if (item.root === root && item.sequence <= sequence && item.sequence >= root) {
                        breadcrumbs.push(item)
                    } else if (item.root === sequence && sequence === item.sequence) {
                        items[i] = {
                            ...item,
                            root
                        }
                        breadcrumbs.push(items[i])
                    } else {
                        items[i] = {
                            ...item,
                            root: item.sequence,
                            previous: null,
                        }
                    }
                }

                set(() => ({items}))

                for (let i = breadcrumbs.length - 1; i >= 0; i--) {
                    if (breadcrumbs.at(i + 1)) {
                        breadcrumbs[i] = {
                            ...breadcrumbs[i],
                            previous: {...breadcrumbs[i + 1]}
                        }
                    }
                    if (breadcrumbs.at(i - 1)) {
                        breadcrumbs[i] = {
                            ...breadcrumbs[i],
                            next: {...breadcrumbs[i - 1]}
                        }
                    }
                }

                return breadcrumbs.reverse();
            },
            hideInRecents: (id: string) => {
                set(state => {
                    const items = state.items.map(item => ({
                        ...item,
                        recents: (item.recents ?? true) && item.id !== id
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


