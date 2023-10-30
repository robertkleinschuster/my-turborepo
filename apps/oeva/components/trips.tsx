"use client"

import type { Trip } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";

export default function Trips({ trips }: { trips: readonly Trip[] }): React.JSX.Element {
    const router = useRouter()

    return <>
        {trips.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {trips.map(trip => <ListItem
                    after={trip.departure ? (new Date(trip.departure)).toLocaleTimeString(['de'], {timeStyle: 'short'}) : ''}
                    key={trip.id}
                    link
                    onClick={() => { router.push(`/app/trips/${encodeURIComponent(trip.id)}`) }}
                    subtitle={trip.destination?.name ?? ''}
                    title={trip.line?.name}
                />)}
            </List>
        )}
    </>
}