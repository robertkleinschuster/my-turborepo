"use client"

import type { Alternative } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";

export default function Alternatives({ alternatives }: { alternatives: readonly Alternative[] }): React.JSX.Element {
    const router = useRouter()

    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <ListItem 
                after={alternative.when ? (new Date(alternative.when)).toLocaleString() : ''} 
                key={alternative.tripId} 
                link 
                onClick={() => { router.push(`/app/trips/${encodeURIComponent(alternative.tripId)}`) }}
                subtitle={alternative.destination?.name ?? ''}
                title={alternative.line?.name}
                />)}
            </List>
        )}
    </>
}