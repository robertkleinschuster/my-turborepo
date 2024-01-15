"use client"

import {Block, List} from "konsta/react"
import type {ProductType, StopOver} from "hafas-client"
import React, {useState} from "react"
import {RemarksPanel} from "./remarks-panel";
import {StopoverItem} from "./stopover-item";

export default function Stopovers({stopovers, products}: {
    stopovers: readonly StopOver[],
    products: readonly ProductType[]
}): React.JSX.Element {
    const [showPanel, setShowPanel] = useState(false)
    const [subject, setSubject] = useState<StopOver | null>(null)

    if (stopovers.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <>
        <List inset strong>
            {stopovers.map(stopover => {
                return <StopoverItem key={(stopover.stop?.id ?? '') + (stopover.arrival ?? stopover.departure)}
                                     onLongPress={() => {
                                         setSubject(stopover)
                                         setShowPanel(true)
                                     }}
                                     products={products}
                                     stopover={stopover}
                />
            })}
        </List>
        <RemarksPanel onDismiss={() => {
            setShowPanel(false)
        }} remarks={subject?.remarks ?? []} show={showPanel}/>
    </>
}