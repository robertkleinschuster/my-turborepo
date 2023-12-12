import {create} from "zustand";
import {persist} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    recents: readonly HistoryItem[]
    push: (type: string, id: string, title: string) => void,
    hideInRecents: (id: string) => void,
    clear: () => void
}

export interface HistoryItem {
    id: string,
    type: string,
    title: string,
    added: string,
    recents: boolean|undefined
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
        (set) => ({
            items: [],
            recents: [],
            push: (type: string, id: string, title: string) => {
                set(state => {
                    const items = [...state.items, {id, type, added: (new Date).toISOString(), title, recents: true}];
                    return {
                        items,
                        recents: updateRecents(items)
                    }
                })
            },
            hideInRecents: (id: string) => {
                set(state => {
                    const items = state.items.map(item => ({...item, recents: (item.recents ?? true) && item.id !== id}))
                    return {
                        items,
                        recents: updateRecents(items)
                    }
                })
            },
            clear: () => {
                set(() => ({
                    items: [],
                    recents: []
                }))
            }
        }),
        {
            name: 'history',
        },
    )
)


