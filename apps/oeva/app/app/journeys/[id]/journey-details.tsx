"use client"

import type {JSX} from "react";
import {List} from "konsta/react";
import type {Journey, WithLegs} from "../../../../lib/prisma";
import {JourneyLegListItem} from "./journey-leg-selection-context";

export function JourneyDetails({journey}: { journey: Journey<WithLegs> }): JSX.Element {
    return <List inset strong>
        {journey.legs.map(leg => <JourneyLegListItem
            item={leg}
            key={leg.id}
            title={leg.name}
        />)}
    </List>
}