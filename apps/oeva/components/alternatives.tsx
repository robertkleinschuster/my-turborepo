"use client"

import type { Alternative } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";
import Time from "./time";

export default function Alternatives({ alternatives }: { alternatives: readonly Alternative[] }): React.JSX.Element {
    const router = useRouter()

    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <ListItem 
                after={<Time time={alternative.when ? new Date(alternative.when) : null}/>} 
                key={alternative.tripId + alternative.when} 
                link 
                onClick={() => { router.push(`/app/trips/${encodeURIComponent(alternative.tripId)}`) }}
                subtitle={alternative.destination?.name ?? alternative.origin?.name}
                title={alternative.line?.name}
                />)}
            </List>
        )}
    </>
}