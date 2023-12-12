"use client"

import type {JSX} from "react";
import React from "react";
import dynamic from "next/dynamic";
import {useHistory} from "../store/history";
import {HistoryList} from "./history-list";

const StationRecents = dynamic(() => Promise.resolve((): JSX.Element => {
    const recents = useHistory(state => state.recents)
    return <HistoryList items={recents().filter(item => item.type === 'station')}/>
}), {ssr: false})

export {StationRecents};