"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../store/history";
import {HistorySelectionProvider} from "../app/app/history/history-selection-context";
import {HistoryList} from "./history-list";
import {HistoryBlockTitle} from "./history-block-title";

const StationHistory = dynamic(() => Promise.resolve((): JSX.Element => {
    const filterRecents = useHistory(state => state.filterRecents)
    const recentItems = filterRecents().filter(item => item.type === 'station');

    return <HistorySelectionProvider>
        <HistoryBlockTitle/>
        <HistoryList items={recentItems}/>
    </HistorySelectionProvider>
}), {ssr: false})

export {StationHistory};