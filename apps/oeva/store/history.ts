import {create} from "zustand";
import {persist} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    parent: HistoryItem | null,
    recents: readonly HistoryItem[],
    filterBreadcrumbs: (sequence: number, root: number) => readonly HistoryItem[],
    push: (type: HistoryItem['type'], id: string, when: string | null, title: string) => HistoryItem | null,
    update: (item: HistoryItem) => void,
    hideInRecents: (id: string) => void,
    clear: () => void,
}

export interface HistoryItem {
    id: string,
    root?: number | null,
    sequence: number,
    type: 'trip' | 'station' | 'trip_search' | 'station_search',
    title: string,
    added: string,
    when: string | null,
    recents: boolean | undefined,
    parent: HistoryItem | null
    next: HistoryItem | null
}

function updateRecents(items: readonly HistoryItem[]): readonly HistoryItem[] {
    const recents = new Map<string, HistoryItem>;
    for (let i = items.length - 1; i >= 0; i--) {
        if ((items[i].recents ?? true) && !recents.has(items[i].id)) {
            recents.set(items[i].id, items[i])
        }
    }
    return Array.from(recents.values());
}

export const useHistory = create(
    persist<History>(
        (set, get) => ({
            items: [],
            recents: [],
            parent: null,
            push: (type: HistoryItem['type'], id: string, when: string | null, title: string) => {
                set(state => {
                    const item = {
                        id,
                        type,
                        when,
                        title,
                        root: type === 'trip_search' || type === 'station_search' ? state.items.length : state.parent?.root ?? state.items.length ,
                        sequence: state.items.length,
                        added: (new Date).toISOString(),
                        recents: true,
                        parent: null,
                        next: null,
                    }
                    const items = [...state.items, item];
                    return {
                        items,
                        parent: item,
                        recents: updateRecents(items)
                    }
                })
                const items = get().items
                if (items.length) {
                    return items[items.length - 1]
                }
                return null;
            },
            update: (item: HistoryItem) => {
                const items = Array.from(get().items)
                for (let i = items.length - 1; i > 0; i--) {
                    if (item.sequence === items[i].sequence) {
                        items[i] = item;
                    }
                }
                set(() => ({
                    items,
                    recents: updateRecents(items)
                }))
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
                            parent: null,
                        }
                    }
                }
                set(() => ({items}))

                for (let i = breadcrumbs.length - 1; i >= 0; i--) {
                    if (breadcrumbs.at(i + 1)) {
                        breadcrumbs[i] = {
                            ...breadcrumbs[i],
                            parent: {...breadcrumbs[i + 1]}
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
                    return {
                        items,
                        recents: updateRecents(items)
                    }
                })
            },
            clear: () => {
                set(() => ({
                    items: [],
                    recents: [],
                    breadcrumbs: []
                }))
            }
        }),
        {
            name: 'history',
        },
    )
)


