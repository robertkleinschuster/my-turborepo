"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {BlockTitle} from "konsta/react";
import {useHistory} from "../store/history";
import {HistoryList} from "./history-list";

const RecentTrips = dynamic(() => Promise.resolve((): JSX.Element => {
    const recents = useHistory(state => state.recents)
    const recentItems = recents.filter(item => item.type === 'trip');
    const hideInRecents = useHistory(state => state.hideInRecents)

    return <>
        <BlockTitle>Zuletzt verwendet</BlockTitle>
        <HistoryList items={recentItems} onDelete={hideInRecents}/>
    </>
}), {ssr: false})

export {RecentTrips};