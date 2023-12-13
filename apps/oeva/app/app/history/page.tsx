"use client"

import type {JSX} from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../../../store/history";
import {HistoryList} from "../../../components/history-list";

function History(): JSX.Element {
    const recents = useHistory(state => state.recents)

    return <HistoryList items={recents}/>
}

export default dynamic(() => Promise.resolve(History), {ssr: false})