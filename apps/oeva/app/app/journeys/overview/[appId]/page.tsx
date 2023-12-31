"use client"

import type {JSX} from "react";
import React, {useState} from "react";
import {List, ListInput, Navbar, NavbarBackLink, Preloader} from "konsta/react";
import {useNavigation} from "../../../../../hooks/use-navigation";
import {createJourney, deleteJourney} from "../../../../../lib/actions";
import type {ListSelection} from "../../../../../context/list-selection";
import type {Journey} from "../../../../../lib/prisma";
import {useAppId} from "../../../../../store/app-id";
import {useJourneyPlanner} from "../../../../../store/journey-planner";
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
    const appId = useAppId()
    const nav = useNavigation()
    const journeys = useJourneyList()
    const dispatch = useJourneyListDispatch()
    const [createName, setCreateName] = useState<string>('')
    const [creating, setCreating] = useState(false)
    const [createError, setCreateError] = useState('')
    const planning = useJourneyPlanner(state => state.journey)

    function handleCreateJourney(): void
    {
        setCreating(true)
        void createJourney(appId, createName).then(journey => {
            dispatch({action: 'create', journey})
            setCreating(false)
            setCreateName('')
            nav.refresh()
        })
    }

    function validateCreateJourney(): boolean
    {
        if (!createName.length) {
            setCreateError('Bitte einen Namen für deie neue Reise eingeben.')
            return false;
        }
        return true;
    }

    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>}
            right={<JourneySelectionToggle/>}
            title="Meine Reisen"/>
        <List inset strong>
            <ListInput
                error={createError}
                floatingLabel
                info={creating ? <span className="flex gap-1 justify-start"><Preloader className="!text-inherit"
                    size="h-4"/>wird erstellt...</span> : null}
                label={<span className="text-primary">Neue Reise</span>}
                onBlur={() => {
                    setCreateName('')
                    setCreateError('')
                }}
                onChange={(e: Event) => {
                    setCreateName((e.target as HTMLInputElement).value)
                }}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        if (validateCreateJourney()) {
                            (event.target as HTMLInputElement).blur()
                            handleCreateJourney()
                        }
                    }
                }}
                placeholder="Name der Reise"
                type="text"
                value={createName}
            />

            {journeys.map(journey => <JourneyListItem
                after={planning?.id === journey.id ? 'in Planung': null}
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
                void deleteJourney(journeyIds).then(() => {
                    nav.refresh()
                })
            }
        }}/>
    </>
}