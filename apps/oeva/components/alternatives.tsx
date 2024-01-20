"use client"

import type {Alternative} from "hafas-client";
import {Block, List} from 'konsta/react'
import React, {useState} from "react";
import type {ClientCode, Mode} from "../client/client";
import {RemarksPanel} from "./remarks-panel";
import {AlternativeItem} from "./alternative-item";

export default function Alternatives({alternatives, client, modes}: {
    alternatives: readonly Alternative[],
    client: ClientCode,
    modes: readonly Mode[]
}): React.JSX.Element {
    const [showPanel, setShowPanel] = useState(false)
    const [subject, setSubject] = useState<Alternative | null>(null)

    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Keine Fahrten in diesem Zeitraum</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <AlternativeItem
                    alternative={alternative}
                    client={client}
                    key={alternative.tripId + alternative.when} modes={modes}
                    onLongPress={() => {
                        setSubject(alternative)
                        setShowPanel(true)
                    }}
                />)}
            </List>
        )}
        <RemarksPanel onDismiss={() => {
            setShowPanel(false)
        }} remarks={subject?.remarks ?? []} show={showPanel}/>
    </>
}
