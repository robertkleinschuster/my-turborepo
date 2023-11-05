"use client"

import type { Alternative, ProductType } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import { useRouter } from "next/navigation";
import React from "react";
import { parseISO } from "date-fns";
import Operator from "./operator";
import TimeDelay from "./time-delay";
import { Platform } from "./platform";
import AlternativeTitle from "./alternative-title";
import RemarkSummary from "./remark-summary";

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
                    className={
                       alternative.delay ? "dark:bg-amber-950 bg-red-100" : undefined
                    }
                    after={<RemarkSummary cancelled={alternative.cancelled} remarks={alternative.remarks}/>}
                    footer={alternative.line?.fahrtNr}
                    header={<>
                        <TimeDelay delay={alternative.delay} label="" planned={parseTime(alternative.plannedWhen)} prognosed={parseTime(alternative.when)} />
                        {' '}
                        <Platform planned={alternative.plannedPlatform} prognosed={alternative.platform} />
                    </>}
                    key={alternative.tripId + alternative.when}
                    link
                    media={<span className="text-3xl">{alternative.line?.operator ? <Operator operator={alternative.line.operator} /> : '-'}</span>}
                    onClick={() => { router.push(`/app/trips/${encodeURIComponent(alternative.tripId)}`) }}
                    title={<AlternativeTitle alternative={alternative} products={products}/>}
                />)}
            </List>
        )}
    </>
}