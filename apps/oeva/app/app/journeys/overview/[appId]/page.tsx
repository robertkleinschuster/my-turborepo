"use client"

import type {JSX} from "react";
import React, { useRef,useState} from "react";
import {Dialog, DialogButton, Icon, List, ListInput, ListItem, Navbar, NavbarBackLink} from "konsta/react";
import {PlusSquare} from "framework7-icons/react"
import {useNavigation} from "../../../../../hooks/use-navigation";
import {createJourney, deleteJourney} from "../../../../../lib/actions";
import type {ListSelection} from "../../../../../context/list-selection";
import type {Journey} from "../../../../../lib/prisma";
import {useAppId} from "../../../../../store/app-id";
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
    const [createDialog, setCreateDialog] = useState(false)
    const [createName, setCreateName] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)
    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>}
            right={<JourneySelectionToggle/>}
            title="Meine Reisen"/>
        <List inset strong>
            <ListItem
                label
                media={<Icon className="text-primary" ios={<PlusSquare/>}/>}
                onClick={() => {
                    setCreateDialog(true)
                    inputRef.current?.focus()
                }}
                title={<span className="text-primary">Neu</span>}
            />
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

        <Dialog
            buttons={
                <>
                    <DialogButton onClick={() => {
                        setCreateDialog(false)
                    }}>
                        Abbrechen
                    </DialogButton>
                    <DialogButton onClick={() => {
                        void createJourney(appId, createName).then(journey => {
                            dispatch({action: 'create', journey})
                            setCreateDialog(false)
                            nav.refresh()
                        })
                    }} strong>
                        Erstellen
                    </DialogButton>
                </>
            }
            content={<List nested>
                <ListInput
                    label="Name"
                    onChange={(e: Event) => {
                        setCreateName((e.target as HTMLInputElement).value)
                    }}
                    outline
                    type="text"
                    value={createName}
                />
            </List>
            }
            opened={createDialog}
            title="Neue Reise"
        />

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