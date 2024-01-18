import type {JSX} from "react";
import {useEffect, useRef} from "react";
import type {HistoryItem} from "../store/history";
import {useIsVisible} from "../hooks/use-is-visible";
import {usePrefetch} from "../hooks/use-navigation";

export function HistoryItemTitle({item}: { item: HistoryItem }): JSX.Element {
    const ref = useRef(null)
    const isVisible = useIsVisible(ref)
    const prefetch = usePrefetch()
    useEffect(() => {
        if (isVisible) {
            prefetch.push(item)
        }
    }, [isVisible, item, prefetch])
    return <span ref={ref}>{item.title}</span>
}