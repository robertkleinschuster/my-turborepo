"use client"

import {Navbar, NavbarBackLink} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import {useSearchParams} from "next/navigation";
import {useNavigation} from "../../../hooks/use-navigation";
import {HistoryItemTitle} from "../../../components/history-item-title";
import {filterParents, useHistory} from "../../../store/history";
import {HistorySelectionToggle} from "./history-selection-context";

export function HistoryNavbar(): JSX.Element {
    const nav = useNavigation()
    const searchParams = useSearchParams()
    const items = useHistory(state => state.items)

    const root = searchParams.get('filterRoot')

    const parents = root ? filterParents(items, Number.parseInt(root)) : null
    const parent = parents?.length ? parents[0] : null

    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>
        }
        right={searchParams.get('filterRoot') ? null : <HistorySelectionToggle/>}
        title={parent ? <HistoryItemTitle item={parent}/> : "Zuletzt verwendet"}
    />
}