"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../store/history";
import {HistoryList} from "./history-list";
import {BlockTitle} from "konsta/react";

const RecentStations = dynamic(() => Promise.resolve((): JSX.Element => {
    const recents = useHistory(state => state.recents)
    return <>
        <BlockTitle>Zuletzt verwendet</BlockTitle>
        <HistoryList items={recents().filter(item => item.type === 'station')}/>
    </>
}), {ssr: false})

export {RecentStations};