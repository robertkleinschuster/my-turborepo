"use client"

import type { Alternative, ProductType } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";
import Time from "./time";
import Line from "./line";

export default function Alternatives({ alternatives, products }: { alternatives: readonly Alternative[], products: readonly ProductType[] }): React.JSX.Element {
    const router = useRouter()
    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <ListItem 
                after={<Time time={alternative.when ? new Date(alternative.when) : null}/>} 
                footer={alternative.line?.fahrtNr} 
                key={alternative.tripId + alternative.when}
                link
                media={alternative.line ? <Line line={alternative.line} products={products}/> : '-'}
                onClick={() => { router.push(`/app/trips/${encodeURIComponent(alternative.tripId)}`) }}
                title={`${alternative.line?.name} ${alternative.direction ?? alternative.provenance ?? ''}`}
                />)}
            </List>
        )}
    </>
}