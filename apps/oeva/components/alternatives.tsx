"use client"

import type {Alternative, ProductType} from "hafas-client";
import {Block, List} from 'konsta/react'
import React, {useState} from "react";
import {RemarksPanel} from "./remarks-panel";
import {AlternativeItem} from "./alternative-item";

export default function Alternatives({alternatives, products}: {
    alternatives: readonly Alternative[],
    products: readonly ProductType[]
}): React.JSX.Element {
    const [showPanel, setShowPanel] = useState(false)
    const [subject, setSubject] = useState<Alternative | null>(null)

    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <AlternativeItem
                    alternative={alternative}
                    key={alternative.tripId + alternative.when} onLongPress={() => {
                        setSubject(alternative)
                        setShowPanel(true)
                    }}
                    products={products}
                />)}
            </List>
        )}
        <RemarksPanel onDismiss={() => {
            setShowPanel(false)
        }} remarks={subject?.remarks ?? []} show={showPanel}/>
    </>
}
