"use client"

import type { Trip } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";
import { parseISO } from "date-fns";
import TimeDelay from "./time-delay";
import RemarkSummary from "./remark-summary";

export default function Trips({ trips, error }: { trips: readonly Trip[], error?: string }): React.JSX.Element {
    const router = useRouter()

    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    return <>
        {trips.length === 0 ? (
            <Block className="text-center">Keine Ergebnisse{error ? <p>{error}</p> : null}</Block>
        ) : (
            <List inset strong>
                {trips.map(trip => <ListItem
                    after={<RemarkSummary cancelled={trip.cancelled} remarks={trip.remarks} />}
                    footer={trip.line?.fahrtNr}
                    header={<TimeDelay delay={trip.departureDelay} label="" planned={parseTime(trip.plannedDeparture)} prognosed={parseTime(trip.departure)} />}
                    key={trip.id + trip.departure}
                    link
                    onClick={() => { router.push(`/app/trips/${encodeURIComponent(trip.id)}`) }}
                    subtitle={trip.destination?.name ?? ''}
                    title={<span className={trip.cancelled ? 'line-through' : undefined}>trip.line?.name</span>}
                />)}
            </List>
        )}
    </>
}