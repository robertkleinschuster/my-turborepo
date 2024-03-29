"use client"

import {Button, Icon, Navbar, NavbarBackLink, Segmented, SegmentedButton} from "konsta/react"
import {useSearchParams, useSelectedLayoutSegment, useRouter, usePathname} from "next/navigation";
import React from "react";
import {ArrowClockwise} from "framework7-icons/react"
import type {Location, Station, Stop} from "hafas-client";
import Filter from "../../../../../components/filter";
import {useCurrentBreadcrumb} from "../../../../../hooks/use-breadcrumbs";
import type {ClientCode, Mode, ProductGroup} from "../../../../../client/client";
import type {StationHistoryItem} from "../../../../../store/history";
import {ClientName} from "../../../../../components/client-name";
import {useNavigation} from "../../../../../hooks/use-navigation";

export default function StationNavbar({station, client, modes, groups}: {
    station: Station|Stop|Location
    client: ClientCode
    modes: readonly Mode[]
    groups: readonly ProductGroup[]
}): React.JSX.Element {
    const segment = useSelectedLayoutSegment();
    const router = useRouter()
    const nav = useNavigation()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const breadcrumb = useCurrentBreadcrumb() as StationHistoryItem | null
    const parts = pathname.split('/')
    const basePath = parts.slice(0, parts.length - 1).join('/')

    const lines = station.type === 'station' || station.type === 'stop' ? station.lines : undefined

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
                    if (breadcrumb) {
                        breadcrumb.params.mode = 'departures'
                        nav.replace(breadcrumb)
                    } else {
                        router.replace(`${basePath}/departures?${searchParams.toString()}`)
                    }
                }} strong>
                    Abfahrten
                </SegmentedButton>
                <SegmentedButton active={segment === 'arrivals'} onClick={() => {
                    if (breadcrumb) {
                        breadcrumb.params.mode = 'arrivals'
                        nav.replace(breadcrumb)
                    } else {
                        router.replace(`${basePath}/arrivals?${searchParams.toString()}`)
                    }
                }} strong>
                    Ankünfte
                </SegmentedButton>
                <SegmentedButton active={segment === 'nearby'} onClick={() => {
                    if (breadcrumb) {
                        breadcrumb.params.mode = 'nearby'
                        nav.replace(breadcrumb)
                    } else {
                        router.replace(`${basePath}/nearby?${searchParams.toString()}`)
                    }
                }} strong>
                    In der Nähe
                </SegmentedButton>
            </Segmented>

        }
        subtitle={
            <>
                <p><ClientName clientCode={client}/></p>
                {breadcrumb?.type === 'station' && breadcrumb.previous?.type === 'station' && breadcrumb.info.distance ?
                    <p>{breadcrumb.info.distance} m Fußweg von {breadcrumb.previous.title}</p> : null}
            </>
        }
        subtitleClassName="truncate"
        title={station.name}
        titleClassName="truncate w-1/2"
    />
        <Filter groups={groups} lines={lines} modes={modes} modesOnly={segment === 'nearby'} showTime/>
    </>
}