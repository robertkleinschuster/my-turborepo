"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import type {HistoryItem} from "../../../store/history";
import {useHistory} from "../../../store/history";
import {HistoryList} from "../../../components/history-list";
import type {ListSelection} from "../../../context/list-selection";
import {HistorySelectionToolbar} from "./history-selection-context";
import {useSearchParams} from "next/navigation";
import {useNavigation} from "../../../hooks/use-navigation";

function DeleteSummary(selection: ListSelection<HistoryItem>): JSX.Element {
    if (!selection) {
        return <></>
    }
    if (selection.length === 1) {
        return <>Eintrag &bdquo;{selection[0]?.title}&ldquo; löschen?</>
    }

    return <>{selection.length} Einträge löschen?</>
}

function History(): JSX.Element {
    const nav = useNavigation()
    const searchParams = useSearchParams()
    const root = searchParams.get('filterRoot')
    const sequence = searchParams.get('filterSequence')
    const filterParents = useHistory(state => state.filterParents)
    const filterBreadcrumbs = useHistory(state => state.filterBreadcrumbs)
    const hideInRecents = useHistory(state => state.hideInRecents)
    const items = root === null || sequence === null ?
        filterParents() :
        filterBreadcrumbs(Number.parseInt(sequence), Number.parseInt(root)).filter(item => !item.recents_overview)
    return <>
        <HistoryList
            details
            items={items}
            navigate={false}
            onClick={item => {
                if (root === null || sequence === null) {
                    nav.history_overview(item)
                } else {
                    nav.push(item)
                }
            }}
        />
        <HistorySelectionToolbar
            buildSummary={DeleteSummary}
            onDelete={selection => {
                if (selection) {
                    selection.forEach(item => {
                        hideInRecents(item.id)
                    })
                }
            }}/>
    </>
}

export default dynamic(() => Promise.resolve(History), {ssr: false})