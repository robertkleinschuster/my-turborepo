"use client"

import type {JSX, ReactNode} from "react";
import {Navbar, NavbarBackLink} from "konsta/react";
import {useNavigation} from "../../../../hooks/use-navigation";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    const nav = useNavigation()

    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>}
            title="Reisen"/>

        {children}
    </>
}