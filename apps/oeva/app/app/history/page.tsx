"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import type {HistoryItem} from "../../../store/history";
import {useHistory} from "../../../store/history";
import {HistoryList} from "../../../components/history-list";
import type {ListSelection} from "../../../context/list-selection";
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
    const recents = useHistory(state => state.recents)
    const hideInRecents = useHistory(state => state.hideInRecents)

    return <>
        <HistoryList items={recents}/>
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