import {create} from "zustand";
import {persist} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    recents: () => readonly HistoryItem[]
    push: (type: string, id: string, title: string) => void,
    clear: () => void
}

export interface HistoryItem {
    id: string,
    type: string,
    title: string,
    added: string
}

export const useHistory = create(
    persist<History>(
        (set, get) => ({
            items: [],
            push: (type: string, id: string, title: string) => {
                set(state => ({
                    items: [...state.items, {id, type, added: (new Date).toISOString(), title}]
                }))
            },
            recents: (): readonly HistoryItem[] => {
                const recents = new Map<string, HistoryItem>;
                const items = get().items;
                for (let i = items.length - 1; i >= 0; i--) {
                    if (!recents.has(items[i].id)) {
                        recents.set(items[i].id, items[i])
                    }
                }
                return Array.from(recents.values());
            },
            clear: () => {
                set(() => ({
                    items: []
                }))
            }
        }),
        {
            name: 'history',
        },
    )
)


