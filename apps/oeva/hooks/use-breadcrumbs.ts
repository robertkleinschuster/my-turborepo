import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import type {HistoryItem} from "../store/history";
import {filterBreadcrumbs, useHistory} from "../store/history";

export function useBreadcrumbs(): readonly HistoryItem[] {
    const historyItems = useHistory(state => state.items)
    const updateBreadcrumbs = useHistory(state => state.updateBreadcrumbs)
    const params = useSearchParams()
    const [items, setItems] = useState<readonly HistoryItem[]>([])

    useEffect(() => {
        const historyRoot = params.get('root')
        const historySequence = params.get('sequence')

        if (historySequence === '' || historySequence === null || historyRoot === '' || historyRoot === null) {
            setItems([])
        } else {
            setItems(filterBreadcrumbs(historyItems, Number.parseInt(historySequence), Number.parseInt(historyRoot)))
        }

    }, [params, historyItems])

    useEffect(() => {
        const historyRoot = params.get('root')
        const historySequence = params.get('sequence')
        if (historySequence && historyRoot) {
            updateBreadcrumbs(Number.parseInt(historySequence), Number.parseInt(historyRoot))
        }
    }, [params, updateBreadcrumbs])

    return items;
}

export function useCurrentBreadcrumb(): HistoryItem | null {
    const items = useBreadcrumbs()
    return items.length ? items[items.length - 1] : null
}