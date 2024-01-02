"use client"

import type {ProductType, Trip} from "hafas-client";
import {Block, List, ListItem} from 'konsta/react'
import React from "react";
import {parseISO} from "date-fns";
import {useNavigation} from "../hooks/use-navigation";
import TimeDelay from "./time-delay";
import RemarkSummary from "./remark-summary";
import Line from "./line";

export default function Trips({trips, products, error}: { trips: readonly Trip[], products: readonly ProductType[], error?: string }): React.JSX.Element {
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
                        const title = `${line?.name ?? ''} ${trip.destination?.name ?? ''}`
                        nav.trip(trip.id, trip.plannedDeparture ?? null, title)
                    }}
                    title={<span className={trip.cancelled ? 'line-through' : undefined}>{trip.line ? <Line line={trip.line} products={products}/>: null} {trip.destination?.name ?? ''}</span>}
                />)}
            </List>
        )}
    </>
}