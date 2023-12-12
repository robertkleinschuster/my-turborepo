"use client"

import type {Alternative, ProductType} from "hafas-client";
import {Block, List, ListItem} from 'konsta/react'
import React, {useState} from "react";
import {parseISO} from "date-fns";
import {useNavigation} from "../hooks/use-navigation";
import Operator from "./operator";
import TimeDelay from "./time-delay";
import {Platform} from "./platform";
import AlternativeTitle from "./alternative-title";
import RemarkSummary from "./remark-summary";
import {useLongPress} from "use-long-press";
import {RemarksPanel} from "./remarks-panel";

export default function Alternatives({alternatives, products}: {
    alternatives: readonly Alternative[],
    products: readonly ProductType[]
}): React.JSX.Element {
    const nav = useNavigation()

    const [showPanel, setShowPanel] = useState(false)
    const [subject, setSubject] = useState<Alternative|null>(null)
    const longPress = useLongPress<Element, Alternative>((event, meta) => {
        if (meta.context?.remarks?.length) {
            setSubject(meta.context)
            setShowPanel(true)
        }
    })

    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <ListItem
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
                    key={alternative.tripId + alternative.when}
                    link
                    media={<span className="text-3xl">{alternative.line?.operator ?
                        <Operator operator={alternative.line.operator}/> : '-'}</span>}
                    onClick={() => {
                        const line = alternative.line;
                        const title = `${line?.name} ${alternative.direction ?? alternative.provenance ?? ''} ${parseTime(alternative.plannedWhen)?.toLocaleString()}`
                        nav.trip(alternative.tripId, title)
                    }}
                    subtitle={<RemarkSummary cancelled={alternative.cancelled} remarks={alternative.remarks}/>}
                    title={<AlternativeTitle alternative={alternative} products={products}/>}
                />)}
            </List>
        )}
        <RemarksPanel onDismiss={() => {
            setShowPanel(false)
        }} remarks={subject?.remarks ?? []} show={showPanel}/>
    </>
}
