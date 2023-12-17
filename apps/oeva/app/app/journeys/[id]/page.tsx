"use client"

import type {JSX} from "react";
import React from "react";
import {List, Navbar, NavbarBackLink} from "konsta/react";
import {type JourneyLeg} from "../../../../lib/prisma";
import {deleteLeg} from "../../../../lib/actions";
import type {ListSelection} from "../../../../context/list-selection";
import {useNavigation} from "../../../../hooks/use-navigation";
import {
    JourneyLegListItem,
    JourneyLegSelectionToggle,
    JourneyLegSelectionToolbar
} from "./selection-context";
import {useJourney, useJourneyDispatch} from "./context";

function DeleteSummary(selection: ListSelection<JourneyLeg>): JSX.Element {
    if (!selection) {
        return <></>
    }
    if (selection.length === 1) {
        return <>Abschnitt &bdquo;{selection[0]?.name}&ldquo; löschen?</>
    }
    return <>{selection.length} Abschnitte löschen?</>
}

export default function Journey(): JSX.Element {
    const nav = useNavigation()
    const journey = useJourney()
    const dispatch = useJourneyDispatch()
    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.back()
            }} text="Zurück"/>}
            right={<JourneyLegSelectionToggle/>}
            title={journey.name}
        />
        <List inset strong>
            {journey.legs.map(leg => <JourneyLegListItem
                item={leg}
                key={leg.id}
                title={leg.name}
            />)}
        </List>
        <JourneyLegSelectionToolbar
            buildSummary={DeleteSummary}
            onDelete={(selection) => {
                if (selection) {
                    const legIds = selection.map(item => item.id)
                    dispatch({action: 'delete_legs', legIds})
                    void deleteLeg(legIds)
                }
            }}/>
    </>
}