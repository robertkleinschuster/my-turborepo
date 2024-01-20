import type {Alternative} from "hafas-client";
import React, {useEffect, useRef} from "react";
import {useLongPress} from "use-long-press";
import {addMinutes, parseISO} from "date-fns";
import {Icon, ListItem} from "konsta/react";
import {ExclamationmarkTriangle} from "framework7-icons/react"
import {useIsVisible} from "../hooks/use-is-visible";
import {useNavigation, usePrefetch} from "../hooks/use-navigation";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import type {ClientCode, Mode} from "../client/client";
import TimeDelay from "./time-delay";
import {Platform} from "./platform";
import RemarkSummary from "./remark-summary";
import AlternativeTitle from "./alternative-title";

export function AlternativeItem({alternative, client, modes, onLongPress}: {
    alternative: Alternative,
    client: ClientCode,
    modes: readonly Mode[],
    onLongPress: () => void
}): React.JSX.Element {
    const ref = useRef<HTMLSpanElement>(null)
    const isVisible = useIsVisible(ref)
    const nav = useNavigation()
    const prefetch = usePrefetch()
    const breadcrumb = useCurrentBreadcrumb()

    const longPress = useLongPress(() => {
        onLongPress()
    })
    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    useEffect(() => {
        if (isVisible) {
            prefetch.alternative(client, alternative)
        }
    }, [alternative, client, isVisible, prefetch]);

    const walkingMeterPerMinute = 75;

    const walkingDistance = breadcrumb?.type === 'station' && typeof breadcrumb.info?.distance === 'string' ? breadcrumb.info.distance : null;
    const walkingMinutes = walkingDistance ? Number.parseInt(walkingDistance) / walkingMeterPerMinute : null
    const walkingArrival = walkingMinutes && typeof breadcrumb?.info?.when === 'string' ?
        addMinutes(parseISO(breadcrumb.info.when), walkingMinutes) : null
    const when = parseTime(alternative.when)

    const reachable = !walkingArrival || when && walkingArrival <= when

    const arrival = typeof breadcrumb?.info?.when === 'string' ? parseISO(breadcrumb.info.when) : null
    const inPast = arrival && when && arrival >= when;

    return <ListItem
        {...longPress(alternative)}
        className={
            alternative.delay ? "dark:bg-amber-950 bg-red-100" : undefined
        }
        footer={alternative.line?.fahrtNr}
        header={<span className="flex gap-1 items-center">
            <TimeDelay delay={alternative.delay} label="" planned={parseTime(alternative.plannedWhen)}
                       prognosed={parseTime(alternative.when)}/>
            <Platform planned={alternative.plannedPlatform} prognosed={alternative.platform}/>
            {inPast ? <span className="flex gap-1 items-center dark:text-yellow-400 text-red-500"><Icon
                    ios={<ExclamationmarkTriangle/>}/>Abfahrt vor Ankunft</span> :
                <>{!reachable ? <span className="flex gap-1 items-center dark:text-yellow-400 text-red-500"><Icon ios={
                    <ExclamationmarkTriangle/>}/>{walkingDistance} m Fußweg von {breadcrumb?.previous?.title}</span> : null}</>
            }

        </span>}
        link
        onClick={() => {
            nav.alternative(client, alternative)
        }}
        subtitle={<RemarkSummary cancelled={alternative.cancelled} remarks={alternative.remarks}/>}
        title={<AlternativeTitle alternative={alternative} modes={modes} ref={ref}/>}
    />
}