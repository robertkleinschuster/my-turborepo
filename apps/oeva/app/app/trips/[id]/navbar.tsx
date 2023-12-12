"use client"

import type {Operator as OperatorType} from "hafas-client";
import {Navbar, NavbarBackLink} from "konsta/react"
import React from "react";
import Operator from "../../../../components/operator";
import {useNavigation} from "../../../../hooks/use-navigation";

export default function TripNavbar({title, subtitle, operator}: {
    title: string,
    subtitle: string,
    operator: OperatorType | undefined
}): React.JSX.Element {
    const nav = useNavigation()

    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                nav.back()
            }} text="Zurück"/>
        }
        right={
            operator ? <span className="text-5xl"><Operator operator={operator}/> </span> : null
        }
        subtitle={subtitle}
        title={title}
    />
}