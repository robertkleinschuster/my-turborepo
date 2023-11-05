"use client"

import type { Alternative, ProductType } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";
import { parseISO } from "date-fns";
import Line from "./line";
import TimeDelay from "./time-delay";
import { Platform } from "./platform";

export default function Alternatives({ alternatives, products }: { alternatives: readonly Alternative[], products: readonly ProductType[] }): React.JSX.Element {
    const router = useRouter()

    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    return <>
        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <ListItem
                    footer={alternative.line?.fahrtNr}
                    header={<>
                        <TimeDelay delay={alternative.delay} label="" planned={parseTime(alternative.plannedWhen)} prognosed={parseTime(alternative.when)} />
                        {' '}
                        <Platform planned={alternative.plannedPlatform} prognosed={alternative.platform} />
                    </>}
                    key={alternative.tripId + alternative.when}
                    link
                    media={alternative.line ? <Line line={alternative.line} products={products} /> : '-'}
                    onClick={() => { router.push(`/app/trips/${encodeURIComponent(alternative.tripId)}`) }}
                    title={`${alternative.line?.name} ${alternative.direction ?? alternative.provenance ?? ''}`}
                />)}
            </List>
        )}
    </>
}