"use client"

import {List, ListItem} from "konsta/react";
import type {JSX} from "react";
import type {Journey, WithLegs} from "../../../lib/prisma";
import {useNavigation} from "../../../hooks/use-navigation";
import {addLeg} from "./actions";

export function JourneyList({journeys}: { journeys: Journey<WithLegs>[] }): JSX.Element {
    const nav = useNavigation()

    return <List>
        {journeys.map(journey => <ListItem
            after={<>Legs: {journey.legs.length}</>}
            key={journey.id}
            label
            onClick={async () => {
                await addLeg(journey.id)
                nav.refresh()
            }}
            title={journey.name}
        />)}
    </List>
}