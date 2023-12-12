import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    push: (type: string, id: string, title: string) => void,
    clear: () => void
}

interface HistoryItem {
    id: string,
    type: string,
    title: string,
    added: string
}

export const useHistory = create(
    persist<History>(
        set => ({
            items: [],
            push: (type: string, id: string, title: string) => {
                set(state => ({
                    items: [...state.items, {id, type, added: (new Date).toISOString(), title}]
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


