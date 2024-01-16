import dynamic from "next/dynamic";
import {ListItem} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import {useLongPress} from "use-long-press";
import type {ProductType, StopOver} from "hafas-client";
import {useNavigation} from "../hooks/use-navigation";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import StopProducts from "./stop-products";
import {StopoverDeparture} from "./stopover-departure";
import {StopoverArrival} from "./stopover-arrival";
import RemarkSummary from "./remark-summary";

const StopoverItem = dynamic(() => Promise.resolve(({stopover, products, onLongPress}: {
    stopover: StopOver,
    products: readonly ProductType[],
    onLongPress: () => void
}): JSX.Element => {
    const nav = useNavigation()
    const longPress = useLongPress(() => {
        onLongPress()
    })

    const historyItem = useCurrentBreadcrumb()
    const planned = stopover.plannedDeparture ?? stopover.plannedArrival
    const when = planned ? new Date(planned) : null
    const prevWhen = historyItem?.previous?.type === 'station' && historyItem.when ? new Date(historyItem.when) : null;

    const isPast = when && prevWhen && when <= prevWhen

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
            if (!isPast) {
                stopover.stop?.id && nav.station(stopover.stop.id, stopover.arrival ?? stopover.departure ?? '', stopover.stop.name ?? '')
            }
        }}
        subtitle={<RemarkSummary cancelled={!stopover.departure && !stopover.arrival} remarks={stopover.remarks}/>}
        title={<span
            className={!stopover.departure && !stopover.arrival ? 'line-through' : undefined}>{stopover.stop?.name}</span>}
    />
}), {ssr: false})

export {StopoverItem}