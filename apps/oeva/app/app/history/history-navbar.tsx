"use client"

import {Button, Icon, Navbar} from "konsta/react";
import type {JSX} from "react";
import { Trash } from "framework7-icons/react"
import {useHistory} from "../../../store/history";

export function HistoryNavbar(): JSX.Element {
    const clearHistory = useHistory(state => state.clear)

    return <Navbar
        right={<Button onClick={() => {clearHistory()}}><Icon ios={<Trash/>}/></Button>}
        title="Verlauf"
    />
}