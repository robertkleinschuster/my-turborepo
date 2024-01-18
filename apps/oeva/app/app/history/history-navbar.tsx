"use client"

import {Navbar, NavbarBackLink} from "konsta/react";
import type {JSX} from "react";
import React from "react";
//import {HistorySelectionToggle} from "./history-selection-context";
import {useNavigation} from "../../../hooks/use-navigation";

export function HistoryNavbar(): JSX.Element {
    const nav = useNavigation()

    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                nav.back()
            }} text="Zurück"/>
        }
        title="Zuletzt verwendet"
    />
}