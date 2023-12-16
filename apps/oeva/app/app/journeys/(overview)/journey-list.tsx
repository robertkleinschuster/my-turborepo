"use client"

import {List} from "konsta/react";
import type {JSX} from "react";
import type {Journey, WithLegs} from "../../../../lib/prisma";
import {useNavigation} from "../../../../hooks/use-navigation";
import {JourneyListItem} from "./journey-selection-context";

export function JourneyList({journeys}: { journeys: Journey<WithLegs>[] }): JSX.Element {
    const nav = useNavigation()

    return <List inset strong>
        {journeys.map(journey => <JourneyListItem
            item={journey}
            key={journey.id}
            link
            onClick={() => {
                nav.journey(journey.id)
            }}
            title={journey.name}
        />)}
    </List>
}