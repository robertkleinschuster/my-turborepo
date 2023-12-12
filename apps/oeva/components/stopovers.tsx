"use client"

import {Block, List, ListItem} from "konsta/react"
import type {ProductType, StopOver} from "hafas-client"
import React, {useState} from "react"
import {useNavigation} from "../hooks/use-navigation";
import StopProducts from "./stop-products"
import {StopoverDeparture} from "./stopover-departure"
import {StopoverArrival} from "./stopover-arrival"
import RemarkSummary from "./remark-summary";
import {useLongPress} from "use-long-press";
import {RemarksPanel} from "./remarks-panel";

export default function Stopovers({stopovers, products}: {
    stopovers: readonly StopOver[],
    products: readonly ProductType[]
}): React.JSX.Element {
    const nav = useNavigation()
    const [showPanel, setShowPanel] = useState(false)
    const [subject, setSubject] = useState<StopOver | null>(null)
    const longPress = useLongPress<Element, StopOver>((event, meta) => {
        if (meta.context?.remarks?.length) {
            setSubject(meta.context)
            setShowPanel(true)
        }
    })
    if (stopovers.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <>
        <List inset strong>
            {stopovers.map(stopover => {

                return <ListItem
                    {...longPress(stopover)}
                    after={<>
                        {stopover.stop ? <StopProducts products={products} stop={stopover.stop}/> : null}
                    </>}
                    footer={<StopoverDeparture stopover={stopover}/>}
                    header={<StopoverArrival stopover={stopover}/>}
                    key={(stopover.stop?.id ?? '') + (stopover.arrival ?? stopover.departure)}
                    link
                    onClick={() => {
                        stopover.stop?.id && nav.station(stopover.stop.id, stopover.arrival ?? stopover.departure ?? '', stopover.stop.name ?? '')
                    }}
                    subtitle={<RemarkSummary cancelled={stopover.cancelled} remarks={stopover.remarks}/>}
                    title={<span
                        className={stopover.cancelled ? 'line-through' : undefined}>{stopover.stop?.name}</span>}
                />
            })}
        </List>
        <RemarksPanel onDismiss={() => {
            setShowPanel(false)
        }} remarks={subject?.remarks ?? []} show={showPanel}/>
    </>
}