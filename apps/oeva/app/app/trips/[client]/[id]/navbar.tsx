"use client"

import type {Operator as OperatorType} from "hafas-client";
import {Button, Icon, Navbar, NavbarBackLink} from "konsta/react"
import React from "react";
import {ArrowClockwise} from "framework7-icons/react"
import Operator from "../../../../../components/operator";
import {useNavigation} from "../../../../../hooks/use-navigation";
import type {ClientCode} from "../../../../../client/client-code";
import {ClientName} from "../../../../../components/client-name";

export default function TripNavbar({title, subtitle, operator, client}: {
    title: string,
    subtitle: string,
    client: ClientCode
    operator: OperatorType | undefined
}): React.JSX.Element {
    const nav = useNavigation()

    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                nav.back()
            }} text="Zurück"/>
        }
        right={<span className="flex gap-1">
            {operator ? <span className="text-5xl"><Operator operator={operator}/> </span> : null}
            <Button clear large onClick={() => {
                nav.refresh()
            }}><Icon ios={<ArrowClockwise/>}/></Button>
    </span>}
        subtitle={<>
            <p><ClientName clientCode={client}/></p>
            <p>{subtitle}</p>
        </>}
        title={title}
        titleClassName="truncate w-1/2"
    />
}