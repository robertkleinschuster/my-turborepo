"use client"

import {List} from "konsta/react";
import type {JSX} from "react";
import type {Journey, WithLegs} from "../../../../lib/prisma";
import {useNavigation} from "../../../../hooks/use-navigation";
import {SelectableListItem} from "../../../../components/selectable-list-item";

export function JourneyList({journeys}: { journeys: Journey<WithLegs>[] }): JSX.Element {
    const nav = useNavigation()

    return <List inset strong>
        {journeys.map(journey => <SelectableListItem
            id={journey.id}
            key={journey.id}
            link
            onClick={() => {
                nav.journey(journey.id)
            }}
            title={journey.name}
        />)}
    </List>
}