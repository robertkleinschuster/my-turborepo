import type {Location, Station, Stop} from "hafas-client";
import {useEffect, useRef} from "react";
import {useIsVisible} from "../hooks/use-is-visible";
import {usePrefetch} from "../hooks/use-navigation";

export function LocationTitle({location}: { location: Stop | Station | Location }) {
    const ref = useRef(null)
    const isVisible = useIsVisible(ref)
    const prefetch = usePrefetch()
    useEffect(() => {
        if (isVisible && location.id) {
            prefetch.station(location.id, new Date().toISOString(), '')
        }
    }, [isVisible, location.id, prefetch]);

    return <span ref={ref}>{location.name}</span>
}