"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {useSearchParams} from "next/navigation";
import type {HistoryItem} from "../../../store/history";
import {filterBreadcrumbs, filterParents, useHistory} from "../../../store/history";
import {HistoryList} from "../../../components/history-list";
import type {ListSelection} from "../../../context/list-selection";
import {useNavigation} from "../../../hooks/use-navigation";
import {HistorySelectionToolbar} from "./history-selection-context";

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
    const historyItems = useHistory(state => state.items)
    const hideInRecents = useHistory(state => state.hideInRecents)
    const items = root === null || sequence === null ?
        filterParents(historyItems) :
        filterBreadcrumbs(historyItems, Number.parseInt(sequence), Number.parseInt(root)).filter(item => !item.recents_overview)
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