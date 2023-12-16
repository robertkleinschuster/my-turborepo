"use client"

import type {JSX} from "react";
import {Navbar, NavbarBackLink} from "konsta/react";
import type {Journey, WithLegs} from "../../../../lib/prisma";
import {useNavigation} from "../../../../hooks/use-navigation";
import {JourneyLegSelectionToggle} from "./journey-leg-selection-context";

export function JourneyNavbar({journey}: { journey: Journey<WithLegs> }): JSX.Element {
    const nav = useNavigation()

    return <Navbar
        left={<NavbarBackLink onClick={() => {
            nav.back()
        }} text="Zurück"/>}
        right={<JourneyLegSelectionToggle/>}
        title={journey.name}
    />
}