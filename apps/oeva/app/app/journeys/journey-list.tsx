"use client"

import {List, ListItem} from "konsta/react";
import type {JSX} from "react";
import type {Journey, WithLegs} from "../../../lib/prisma";
import {useNavigation} from "../../../hooks/use-navigation";
import {addLeg} from "./actions";

export function JourneyList({journeys}: { journeys: Journey<WithLegs>[] }): JSX.Element {
    const nav = useNavigation()

    const onClick = (journeyId: string): void => {
        void addLeg(journeyId)
            .then(() => {
            nav.refresh()
        })
    }

    return <List>
        {journeys.map(journey => <ListItem
            after={<>Legs: {journey.legs.length}</>}
            key={journey.id}
            label
            onClick={() => {
                onClick(journey.id)
            }}
            title={journey.name}
        />)}
    </List>
}