import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import type {HistoryItem} from "../store/history";
import {useHistory} from "../store/history";

export function useBreadcrumbs(): readonly HistoryItem[] {
    const filterBreadcrumbs = useHistory(state => state.filterBreadcrumbs)
    const params = useSearchParams()
    const [items, setItems] = useState<readonly HistoryItem[]>([])

    useEffect(() => {
        const historyRoot = params.get('root')
        const historySequence = params.get('sequence')

        if (historySequence === '' || historySequence === null || historyRoot === '' || historyRoot === null) {
            setItems([])
        } else {
            setItems(filterBreadcrumbs(Number.parseInt(historySequence), Number.parseInt(historyRoot)))
        }

    }, [filterBreadcrumbs, params])

    return items;
}

export function useCurrentBreadcrumb(): HistoryItem | null {
    const items = useBreadcrumbs()
    return items.length ? items[items.length - 1] : null
}