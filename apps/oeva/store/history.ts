import {create} from "zustand";
import {persist} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    push: (type: string, id: string, title: string) => void,
    clear: () => void
}

interface HistoryItem {
    id: string,
    type: string,
    title: string,
    added: Date
}

export const useHistory = create(
    persist<History>(
        set => ({
            items: [],
            push: (type: string, id: string, title: string) => {
                set(state => ({
                    items: [...state.items, {id, type, added: new Date, title}]
                }))
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


