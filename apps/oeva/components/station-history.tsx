"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../store/history";
import {HistoryList} from "./history-list";
import {HistoryBlockTitle} from "./history-block-title";
import {HistorySelectionProvider} from "../app/app/history/history-selection-context";

const StationHistory = dynamic(() => Promise.resolve((): JSX.Element => {
    const recents = useHistory(state => state.recents)
    const recentItems = recents.filter(item => item.type === 'station');

    return <HistorySelectionProvider>
        <HistoryBlockTitle/>
        <HistoryList items={recentItems}/>
    </HistorySelectionProvider>
}), {ssr: false})

export {StationHistory};