import dynamic from "next/dynamic";
import {ListItem} from "konsta/react";
import type {JSX} from "react";
import React, { useEffect, useRef} from "react";
import {useLongPress} from "use-long-press";
import type { StopOver} from "hafas-client";
import {useNavigation, usePrefetch} from "../hooks/use-navigation";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import {useIsVisible} from "../hooks/use-is-visible";
import type {ClientCode, Mode} from "../client/client";
import StopProducts from "./stop-products";
import {StopoverDeparture} from "./stopover-departure";
import {StopoverArrival} from "./stopover-arrival";
import RemarkSummary from "./remark-summary";

const StopoverItem = dynamic(() => Promise.resolve(({client, stopover, products, onLongPress}: {
    stopover: StopOver,
    client: ClientCode,
    products: readonly Mode[],
    onLongPress: () => void
}): JSX.Element => {
    const ref = useRef(null)
    const isVisible = useIsVisible(ref)
    const nav = useNavigation()
    const prefetch = usePrefetch()
    const longPress = useLongPress(() => {
        onLongPress()
    })

    const historyItem = useCurrentBreadcrumb()
    const planned = stopover.plannedDeparture ?? stopover.plannedArrival
    const when = planned ? new Date(planned) : null
    const prevWhen = historyItem?.previous?.type === 'station' && typeof historyItem.info?.when === 'string' ? new Date(historyItem.info.when) : null;

    const isPast = when && prevWhen && when <= prevWhen

    useEffect(() => {
        if (!isPast && isVisible && stopover.stop?.id) {
            prefetch.stationObj(client, stopover.stop, stopover.arrival ?? stopover.departure ?? null)
        }
    }, [isVisible, isPast, prefetch, stopover, client]);

    return <ListItem
        {...longPress()}
        after={<>
            {stopover.stop ? <StopProducts products={products} stop={stopover.stop}/> : null}
        </>}
        className={isPast ? "opacity-40" : undefined}
        footer={<StopoverDeparture stopover={stopover}/>}
        header={<StopoverArrival stopover={stopover}/>}
        key={(stopover.stop?.id ?? '') + (stopover.arrival ?? stopover.departure)}
        link={!isPast}
        onClick={() => {
            if (!isPast && stopover.stop) {
                nav.stationObj(client, stopover.stop, stopover.arrival ?? stopover.departure ?? null)
            }
        }}
        subtitle={<RemarkSummary cancelled={!stopover.departure && !stopover.arrival} remarks={stopover.remarks}/>}
        title={<span className={!stopover.departure && !stopover.arrival ? 'line-through' : undefined}
            ref={ref}>{stopover.stop?.name}</span>}
    />
}), {ssr: false})

export {StopoverItem}