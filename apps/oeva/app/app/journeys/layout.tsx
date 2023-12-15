"use client"

import type {JSX, ReactNode} from "react";
import {Button, Navbar, NavbarBackLink} from "konsta/react";
import {useAppId} from "../../../store/app-id";
import {useNavigation} from "../../../hooks/use-navigation";
import {create} from "./actions";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    const appId = useAppId(state => state.appId)
    const nav = useNavigation()

    return <>
        <Navbar
            left={<NavbarBackLink onClick={() => {
                nav.home()
            }} title="Zurück"/>}
            right={
                <Button onClick={async () => {
                    await create(appId)
                    nav.refresh()
                }} tonal>Neu</Button>
            }
            title="Reisen"/>

        {children}
    </>
}