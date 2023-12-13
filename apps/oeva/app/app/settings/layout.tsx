"use client"

import type {JSX, ReactNode} from "react";
import Scroll from "../../../components/scroll";
import {SettingsNavbar} from "./settings-navbar";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    return <>
        <SettingsNavbar/>
        <Scroll>
            {children}
        </Scroll>
    </>
}