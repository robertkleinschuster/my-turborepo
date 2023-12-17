import type {JSX, ReactNode} from "react";
import React from "react";
import {loadJourneys} from "../../../../../lib/actions";
import {JourneySelectionProvider} from "./selection-context";
import {JourneyListProvider} from "./context";

export default async function Layout({children, params}: {
    children: ReactNode,
    params: { appId: string }
}): Promise<JSX.Element> {
    const journeys = await loadJourneys(decodeURIComponent(params.appId))

    return <JourneySelectionProvider>
        <JourneyListProvider journeys={journeys}>
            {children}
        </JourneyListProvider>
    </JourneySelectionProvider>
}