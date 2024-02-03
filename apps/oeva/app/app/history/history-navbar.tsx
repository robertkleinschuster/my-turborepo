"use client"

import {Button, Navbar, NavbarBackLink} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import {useSearchParams} from "next/navigation";
import {useNavigation} from "../../../hooks/use-navigation";
import {HistoryItemTitle} from "../../../components/history-item-title";
import {filterBreadcrumbs, filterParents, useHistory} from "../../../store/history";
import {historyToText} from "../../../helper/history-text-fomatter";
import {HistorySelectionToggle} from "./history-selection-context";

export function HistoryNavbar(): JSX.Element {
    const nav = useNavigation()
    const searchParams = useSearchParams()
    const items = useHistory(state => state.items)

    const root = searchParams.get('filterRoot')

    const parents = root ? filterParents(items, Number.parseInt(root)) : null
    const parent = parents?.length ? parents[0] : null

    function save(): void {
        const sequence = searchParams.get('filterSequence')
        if (root !== null && sequence !== null) {
            const itemsToSave = filterBreadcrumbs(items, Number.parseInt(sequence), Number.parseInt(root))
                .filter(item => !item.recents_overview)

            void window.navigator.clipboard.writeText(historyToText(itemsToSave))
        }
    }

    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                if (root) {
                    nav.back()
                } else {
                    nav.home()
                }
            }} text="Zurück"/>
        }
        right={searchParams.get('filterRoot') ? <Button onClick={save}>Kopieren</Button> : <HistorySelectionToggle/>}
        subtitle={parent ? <HistoryItemTitle item={parent}/> : null}
        title="Zuletzt verwendet"
    />
}