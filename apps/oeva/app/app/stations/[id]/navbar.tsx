"use client"

import {Button, Icon, Navbar, NavbarBackLink, Segmented, SegmentedButton} from "konsta/react"
import {useSearchParams, useSelectedLayoutSegment, useRouter} from "next/navigation";
import React from "react";
import type {ProductType} from "hafas-client";
import {ArrowClockwise} from "framework7-icons/react"
import Filter from "../../../../components/filter";

export default function StationNavbar({id, title, products}: {
    id: string,
    title: string,
    products: readonly ProductType[]
}): React.JSX.Element {
    const segment = useSelectedLayoutSegment();
    const router = useRouter()
    const searchParams = useSearchParams()

    return <><Navbar
        left={
            <NavbarBackLink onClick={() => {
                router.back()
            }} text="Zurück"/>
        }
        right={<Button clear large onClick={() => {
            router.refresh()
        }}><Icon ios={<ArrowClockwise/>}/></Button>}
        subnavbar={
            <Segmented strong>
                <SegmentedButton active={segment === 'departures'} onClick={() => {
                    router.replace(`/app/stations/${id}/departures?${searchParams.toString()}`)
                }} strong>
                    Abfahrten
                </SegmentedButton>
                <SegmentedButton active={segment === 'arrivals'} onClick={() => {
                    router.replace(`/app/stations/${id}/arrivals?${searchParams.toString()}`)
                }} strong>
                    Ankünfte
                </SegmentedButton>
            </Segmented>

        }
        title={title}
    />
        <Filter products={products} showTime/>
    </>
}