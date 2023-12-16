"use client"

import type {JSX, ReactNode} from "react";
import React, {useState} from "react";
import {deleteLeg} from "../actions";
import {useNavigation} from "../../../../hooks/use-navigation";
import type {JourneyLeg} from "../../../../lib/prisma";
import type {ListSelection} from "../../../../context/list-selection";
import Loading from "./loading";
import {JourneyLegSelectionProvider, JourneyLegSelectionToolbar} from "./journey-leg-selection-context";

function DeleteSummary(selection: ListSelection<JourneyLeg>): JSX.Element {
    if (!selection) {
        return <></>
    }
    if (selection.length === 1) {
        return <>Abschnitt &bdquo;{selection[0]?.name}&ldquo; löschen?</>
    }
    return <>{selection.length} Abschnitte löschen?</>
}

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    const [loading, setLoading] = useState(false)
    const nav = useNavigation()
    return <JourneyLegSelectionProvider>
        {loading ? <Loading showCancel={false}/> : children}
        <JourneyLegSelectionToolbar
            buildSummary={DeleteSummary}
            onDelete={(selection) => {
                if (selection) {
                    setLoading(true)
                    void deleteLeg(selection.map(item => item.id)).then(() => {
                        nav.refresh()
                        setLoading(false)
                    })
                }
            }}/>
    </JourneyLegSelectionProvider>
}