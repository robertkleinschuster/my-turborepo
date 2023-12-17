import type {JSX, ReactNode} from "react";
import React from "react";
import {loadJourney} from "../../../../lib/actions";
import {JourneyLegSelectionProvider} from "./selection-context";
import {JourneyProvider} from "./context";

export default async function Layout({children, params}: {
    children: ReactNode,
    params: { id: string }
}): Promise<JSX.Element> {
    const journey = await loadJourney(decodeURIComponent(params.id))

    return <JourneyLegSelectionProvider>
        <JourneyProvider journey={journey}>
            {children}
        </JourneyProvider>
    </JourneyLegSelectionProvider>
}