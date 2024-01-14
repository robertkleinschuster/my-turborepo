import {create} from "zustand";
import {persist} from 'zustand/middleware'

interface History {
    items: readonly HistoryItem[],
    parent: HistoryItem | null,
    recents: readonly HistoryItem[],
    breadcrumbs: readonly HistoryItem[],
    push: (type: HistoryItem['type'], id: string, when: string | null, title: string, parent?: HistoryItem | null | string) => void,
    hideInRecents: (id: string) => void,
    clear: () => void
}

export interface HistoryItem {
    id: string,
    sequence: number,
    type: 'trip'|'station',
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

function updateBreadcrumbs(items: readonly HistoryItem[]): readonly HistoryItem[]{
    const result: HistoryItem[] = [];
    for (const item of items.toReversed()) {
        result.push(item)
        if (!item.parent && result.length > 1) {
            break;
        }
    }
    return result.toReversed();
}

export const useHistory = create(
    persist<History>(
        (set) => ({
            items: [],
            recents: [],
            breadcrumbs: [],
            parent: null,
            push: (type: HistoryItem['type'], id: string, when: string | null, title: string, parent?: HistoryItem | null | string) => {
                set(state => {
                    const item = {
                        id,
                        type,
                        when,
                        title,
                        sequence: state.parent ? state.parent.sequence + 1 : 0,
                        added: (new Date).toISOString(),
                        recents: true,
                        parent: typeof parent === 'string' ? state.recents.find(i => i.id === parent) ?? null : parent ?? null
                    }
                    const items = [...state.items, item];
                    return {
                        items,
                        parent: item,
                        breadcrumbs: parent ? updateBreadcrumbs(items) : [item],
                        recents: updateRecents(items)
                    }
                })
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
                    recents: []
                }))
            }
        }),
        {
            name: 'history',
        },
    )
)


