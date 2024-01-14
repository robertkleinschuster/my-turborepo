import {create} from "zustand";
import {persist} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    parent: HistoryItem | null,
    recents: readonly HistoryItem[],
    filterBreadcrumbs: (sequence: number, root: number|null) => readonly HistoryItem[],
    push: (type: HistoryItem['type'], id: string, when: string | null, title: string, parent?: HistoryItem | null | string) => HistoryItem | null,
    hideInRecents: (id: string) => void,
    clear: () => void,
}

export interface HistoryItem {
    id: string,
    root?: number | null,
    sequence: number,
    type: 'trip' | 'station',
    title: string,
    added: string,
    when: string | null,
    recents: boolean | undefined,
    parent: HistoryItem | null
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
            push: (type: HistoryItem['type'], id: string, when: string | null, title: string, parent?: HistoryItem | null | string) => {
                set(state => {
                    const item = {
                        id,
                        type,
                        when,
                        title,
                        root: parent ? state.parent?.root : state.items.length,
                        sequence: state.items.length,
                        added: (new Date).toISOString(),
                        recents: true,
                        parent: typeof parent === 'string' ? state.recents.find(i => i.id === parent) ?? null : parent ?? null
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
            filterBreadcrumbs: (sequence: number, root: number|null) => {
                const breadcrumbs: HistoryItem[] = []
                const items = Array.from(get().items)
                for (let i = items.length - 1; i > 0; i--) {
                    const item = items[i]
                    if (item.sequence <= sequence && item.root === root) {
                        breadcrumbs.push(item)
                        if (item.sequence === root) {
                            break;
                        }
                    } else {
                        items[i] = {
                            ...item,
                            root: item.sequence
                        }
                    }
                }
                set(() => ({items}))
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


