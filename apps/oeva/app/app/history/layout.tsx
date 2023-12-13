"use client"

import type {JSX, ReactNode} from "react";
import Scroll from "../../../components/scroll";
import {HistoryNavbar} from "./history-navbar";
import {EditHistoryProvider} from "./context";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    return <EditHistoryProvider>
        <HistoryNavbar/>
        <Scroll>
            {children}
        </Scroll>
    </EditHistoryProvider>
}