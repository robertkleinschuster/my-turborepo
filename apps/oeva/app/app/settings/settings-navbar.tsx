"use client"

import {Navbar, NavbarBackLink} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import {useRouter} from "next/navigation";


export function SettingsNavbar(): JSX.Element {
    const router = useRouter()
    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                router.push('/app/home')
            }} text="Zurück"/>
        }
        title="Einstellungen"
    />

}