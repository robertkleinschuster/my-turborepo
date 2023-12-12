"use client"

import type {JSX} from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../../../store/history";
import {HistoryList} from "../../../components/history-list";

function History(): JSX.Element {
    const recents = useHistory(state => state.recents)
    const hideInRecents = useHistory(state => state.hideInRecents)

    return <HistoryList items={recents} onDelete={hideInRecents}/>
}

export default dynamic(() => Promise.resolve(History), {ssr: false})