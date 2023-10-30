"use client"

import type { Alternative } from "hafas-client";
import { Block, List, ListItem } from 'konsta/react'
import React from "react";

export default function Alternatives({ alternatives }: { alternatives: readonly Alternative[] }): React.JSX.Element {
    return <>

        {alternatives.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {alternatives.map(alternative => <ListItem key={alternative.tripId} title={alternative.line?.name} />)}
            </List>
        )}
    </>
}