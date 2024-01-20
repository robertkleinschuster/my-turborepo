import type {Location, Station, Stop} from "hafas-client";
import {useEffect, useRef} from "react";
import {useIsVisible} from "../hooks/use-is-visible";
import {usePrefetch} from "../hooks/use-navigation";
import type {ClientCode} from "../client/client";

export function LocationTitle({client, location}: { client: ClientCode,location: Stop | Station | Location }) {
    const ref = useRef(null)
    const isVisible = useIsVisible(ref)
    const prefetch = usePrefetch()
    useEffect(() => {
        if (isVisible && location.id) {
            prefetch.stationObj(client, location)
        }
    }, [client, isVisible, location, location.id, prefetch]);

    return <span ref={ref}>{location.name}</span>
}