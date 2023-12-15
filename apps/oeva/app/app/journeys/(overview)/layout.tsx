"use client"

import type {JSX, ReactNode} from "react";
import React, { useState} from "react";
import {Navbar, NavbarBackLink} from "konsta/react";
import {useNavigation} from "../../../../hooks/use-navigation";
import {ListSelectionToggle} from "../../../../components/list-selection-toggle";
import {ListSelectionProvider} from "../../../../context/list-selection";
import {ListSelectionToolbar} from "../../../../components/list-selection-toolbar";
import {deleteJourney} from "../actions";
import Loading from "../../loading";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    const nav = useNavigation()
    const [loading, setLoading] = useState<boolean>(false)
    return <ListSelectionProvider>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>}
            right={<ListSelectionToggle/>}
            title="Reisen"/>
        {loading ? <Loading showCancel={false}/> : children}
        <ListSelectionToolbar onDelete={(selection) => {
            if (selection) {
                setLoading(true)
                void deleteJourney(selection).then(() => {
                    nav.refresh()
                    setLoading(false)
                })
            }
        }}/>
    </ListSelectionProvider>
}