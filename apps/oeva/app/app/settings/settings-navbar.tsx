"use client"

import {Navbar, NavbarBackLink} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import {useNavigation} from "../../../hooks/use-navigation";

export function SettingsNavbar(): JSX.Element {
    const nav = useNavigation()
    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>
        }
        title="Einstellungen"
    />

}