"use client"

import type {JSX} from "react";
import {List} from "konsta/react";
import type {Journey, WithLegs} from "../../../../lib/prisma";
import {SelectableListItem} from "../../../../components/selectable-list-item";

export function JourneyDetails({journey}: { journey: Journey<WithLegs> }): JSX.Element {
    return <List inset strong>
        {journey.legs.map(leg => <SelectableListItem
            id={leg.id}
            key={leg.id}
            title={leg.name}
        />)}
    </List>
}