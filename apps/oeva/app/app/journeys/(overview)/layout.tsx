"use client"

import type {JSX, ReactNode} from "react";
import React, {useState} from "react";
import {Navbar, NavbarBackLink} from "konsta/react";
import {useNavigation} from "../../../../hooks/use-navigation";
import {deleteJourney} from "../actions";
import Loading from "../../loading";
import type {ListSelection} from "../../../../context/list-selection";
import type {Journey} from "../../../../lib/prisma";
import {JourneySelectionProvider, JourneySelectionToggle, JourneySelectionToolbar} from "./journey-selection-context";

function DeleteSummary(selection: ListSelection<Journey>): JSX.Element {
    if (!selection) {
        return <></>
    }
    if (selection.length === 1) {
        return <>Reise &bdquo;{selection[0]?.name}&ldquo; löschen?</>
    }
    return <>{selection.length} Reisen löschen?</>
}

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    const nav = useNavigation()
    const [loading, setLoading] = useState<boolean>(false)
    return <JourneySelectionProvider>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>}
            right={<JourneySelectionToggle/>}
            title="Meine Reisen"/>
        {loading ? <Loading showCancel={false}/> : children}
        <JourneySelectionToolbar buildSummary={DeleteSummary} onDelete={selection => {
            if (selection) {
                setLoading(true)
                void deleteJourney(selection.map(journey => journey.id)).then(() => {
                    nav.refresh()
                    setLoading(false)
                })
            }
        }}/>
    </JourneySelectionProvider>
}