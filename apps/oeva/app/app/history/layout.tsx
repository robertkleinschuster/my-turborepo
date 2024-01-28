"use client"

import type {JSX, ReactNode} from "react";
import { Suspense} from "react";
import Scroll from "../../../components/scroll";
import {HistoryNavbar} from "./history-navbar";
import {HistorySelectionProvider} from "./history-selection-context";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    return <HistorySelectionProvider>
        <Suspense>
            <HistoryNavbar/>
        </Suspense>
        <Scroll>
            {children}
        </Scroll>
    </HistorySelectionProvider>
}