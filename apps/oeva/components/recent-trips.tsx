"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../store/history";
import {HistoryList} from "./history-list";
import {EditHistoryProvider} from "../app/app/history/context";
import {RecentsBlockTitle} from "./recents-block-title";

const RecentTrips = dynamic(() => Promise.resolve((): JSX.Element => {
    const recents = useHistory(state => state.recents)
    const recentItems = recents.filter(item => item.type === 'trip');
    return <EditHistoryProvider>
        <RecentsBlockTitle/>
        <HistoryList items={recentItems}/>
    </EditHistoryProvider>
}), {ssr: false})

export {RecentTrips};