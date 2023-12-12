"use client"

import {Trip} from "hafas-client";
import {Block, List, ListItem} from 'konsta/react'
import React from "react";
import {parseISO} from "date-fns";
import TimeDelay from "./time-delay";
import RemarkSummary from "./remark-summary";
import {useNavigation} from "../hooks/use-navigation";

export default function Trips({trips, error}: { trips: readonly Trip[], error?: string }): React.JSX.Element {
    const nav = useNavigation()
    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    return <>
        {trips.length === 0 ? (
            <Block className="text-center">Keine Ergebnisse{error ? <p>{error}</p> : null}</Block>
        ) : (
            <List inset strong>
                {trips.map(trip => <ListItem
                    after={<RemarkSummary cancelled={trip.cancelled} remarks={trip.remarks}/>}
                    footer={trip.line?.fahrtNr}
                    header={<TimeDelay delay={trip.departureDelay} label="" planned={parseTime(trip.plannedDeparture)}
                                       prognosed={parseTime(trip.departure)}/>}
                    key={trip.id + trip.departure}
                    link
                    onClick={() => {
                        const line = trip.line;
                        const title = `${line?.name ?? ''} ${trip.direction ?? ''} ${parseTime(trip.plannedDeparture)?.toLocaleString()}`
                        nav.trip(trip.id, title)
                    }}
                    subtitle={trip.destination?.name ?? ''}
                    title={<span className={trip.cancelled ? 'line-through' : undefined}>{trip.line?.name}</span>}
                />)}
            </List>
        )}
    </>
}