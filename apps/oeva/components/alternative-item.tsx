import type {Alternative, ProductType} from "hafas-client";
import React, {useEffect, useRef} from "react";
import {useLongPress} from "use-long-press";
import {parseISO} from "date-fns";
import {ListItem} from "konsta/react";
import {useIsVisible} from "../hooks/use-is-visible";
import {useNavigation, usePrefetch} from "../hooks/use-navigation";
import TimeDelay from "./time-delay";
import {Platform} from "./platform";
import RemarkSummary from "./remark-summary";
import AlternativeTitle from "./alternative-title";

export function AlternativeItem({alternative, products, onLongPress}: {
    alternative: Alternative,
    products: readonly ProductType[],
    onLongPress: () => void
}): React.JSX.Element {
    const ref = useRef<HTMLSpanElement>(null)
    const isVisible = useIsVisible(ref)
    const nav = useNavigation()
    const prefetch = usePrefetch()
    const longPress = useLongPress(() => {
        onLongPress()
    })
    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    useEffect(() => {
        if (isVisible) {
            prefetch.alternative(alternative)
        }
    }, [alternative, isVisible, prefetch]);

    return <ListItem
        {...longPress(alternative)}
        className={
            alternative.delay ? "dark:bg-amber-950 bg-red-100" : undefined
        }
        footer={alternative.line?.fahrtNr}
        header={<>
            <TimeDelay delay={alternative.delay} label="" planned={parseTime(alternative.plannedWhen)}
                       prognosed={parseTime(alternative.when)}/>
            {' '}
            <Platform planned={alternative.plannedPlatform} prognosed={alternative.platform}/>
        </>}
        link
        onClick={() => {
            nav.alternative(alternative)
        }}
        subtitle={<RemarkSummary cancelled={alternative.cancelled} remarks={alternative.remarks}/>}
        title={<AlternativeTitle alternative={alternative} products={products} ref={ref}/>}
    />
}