"use client"

import type {JSX} from "react";
import {List, ListItem} from "konsta/react";
import type {Journey, WithLegs} from "../../../../lib/prisma";

export function JourneyDetails({journey}: { journey: Journey<WithLegs> }): JSX.Element {
    return <List inset strong>
        {journey.legs.map(leg => <ListItem
            key={leg.id}
            title={leg.name}
        />)}
    </List>
}