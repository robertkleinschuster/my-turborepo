import {useSearchParams} from "next/navigation";
import type {HistoryItem} from "../store/history";
import {useHistory} from "../store/history";

export function useBreadcrumbs(): readonly HistoryItem[] {
    const filterBreadcrumbs = useHistory(state => state.filterBreadcrumbs)
    const params = useSearchParams()
    const historyRoot = params.get('root')
    const historySequence = params.get('sequence')
    if (historySequence === '' || historySequence === null || historyRoot === '' || historyRoot === null) {
        return []
    }
    return filterBreadcrumbs(Number.parseInt(historySequence), Number.parseInt(historyRoot));
}

export function useCurrentBreadcrumb(): HistoryItem | null {
    const items = useBreadcrumbs()
    return items.length ? items[items.length - 1] : null
}