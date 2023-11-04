"use client"

import type { Trip } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";
import Time from "./time";

export default function Trips({ trips, error }: { trips: readonly Trip[], error?: string }): React.JSX.Element {
    const router = useRouter()

    return <>
        {trips.length === 0 ? (
            <Block className="text-center">Keine Ergebnisse{error ? <p>{error}</p> : null}</Block>
        ) : (
            <List inset strong>
                {trips.map(trip => <ListItem
                    after={<Time time={trip.departure ? new Date(trip.departure) : null}/>}
                    key={trip.id + trip.departure}
                    link
                    onClick={() => { router.push(`/app/trips/${encodeURIComponent(trip.id)}`) }}
                    subtitle={trip.destination?.name ?? ''}
                    title={trip.line?.name}
                />)}
            </List>
        )}
    </>
}