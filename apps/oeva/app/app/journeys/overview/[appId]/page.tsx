"use client"

import type {JSX} from "react";
import React from "react";
import {List, Navbar, NavbarBackLink} from "konsta/react";
import {useNavigation} from "../../../../../hooks/use-navigation";
import {deleteJourney} from "../../../../../lib/actions";
import type {ListSelection} from "../../../../../context/list-selection";
import type {Journey} from "../../../../../lib/prisma";
import {useJourneyList, useJourneyListDispatch} from "./context";
import {JourneyListItem, JourneySelectionToggle, JourneySelectionToolbar} from "./selection-context";

function DeleteSummary(selection: ListSelection<Journey>): JSX.Element {
    if (!selection) {
        return <></>
    }
    if (selection.length === 1) {
        return <>Reise &bdquo;{selection[0]?.name}&ldquo; löschen?</>
    }
    return <>{selection.length} Reisen löschen?</>
}

export default function Journey(): JSX.Element {
    const nav = useNavigation()
    const journeys = useJourneyList()
    const dispatch = useJourneyListDispatch()

    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>}
            right={<JourneySelectionToggle/>}
            title="Meine Reisen"/>
        <List inset strong>
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
        <JourneySelectionToolbar buildSummary={DeleteSummary} onDelete={selection => {
            if (selection) {
                const journeyIds = selection.map(journey => journey.id);
                dispatch({action: 'delete', journeyIds})
                void deleteJourney(journeyIds)
            }
        }}/>
    </>
}