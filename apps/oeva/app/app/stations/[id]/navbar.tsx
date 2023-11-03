"use client"

import { Chip, Icon, List, ListButton, ListInput, Navbar, NavbarBackLink, Popover, Segmented, SegmentedButton, Toolbar } from "konsta/react"
import { Clock, PlusCircle, MinusCircle } from "framework7-icons/react"
import { usePathname, useSearchParams, useSelectedLayoutSegment, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Time from "../../../../components/time";

function toDatetimeLocal(date: Date): string {
    const ten = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    const YYYY = date.getFullYear(),
        MM = ten(date.getMonth() + 1),
        DD = ten(date.getDate()),
        HH = ten(date.getHours()),
        II = ten(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
};

export default function StationNavbar({ id, title }: { id: string, title: string }): React.JSX.Element {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment();
    const [when, setWhen] = useState(searchParams.get('when') ? new Date(decodeURIComponent(searchParams.get('when') ?? '')) : new Date())

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('when', when.toISOString())
        router.replace(`${pathname}?${newSearchParams.toString()}`)
    }, [pathname, router, searchParams, when])

    const [whenOpen, setWhenOpen] = useState(false);

    return <><Navbar
        left={
            <NavbarBackLink onClick={() => { router.back() }} text="Zurück" />
        }
        subnavbar={
            <Segmented strong>
                <SegmentedButton active={segment === 'departures'} onClick={() => { router.replace(`/app/stations/${id}/departures?${searchParams.toString()}`) }} strong>
                    Abfahrten
                </SegmentedButton>
                <SegmentedButton active={segment === 'arrivals'} onClick={() => { router.replace(`/app/stations/${id}/arrivals?${searchParams.toString()}`) }} strong>
                    Ankünfte
                </SegmentedButton>
            </Segmented>

        }
        title={title}
    />
        <Toolbar top>
            <Chip className="filter-when" onClick={() => { setWhenOpen(true) }}>
                <Icon ios={<Clock />} />&nbsp;<Time time={when} />
            </Chip>
        </Toolbar>

        <Popover
            onBackdropClick={() => { setWhenOpen(false) }}
            opened={whenOpen}
            target=".filter-when"
        >
            <List nested>
                <ListInput
                    onChange={(e: Event) => { setWhen(new Date((e.target as HTMLInputElement).value)) }}
                    outline
                    type="datetime-local"
                    value={toDatetimeLocal(when)}
                />
                <ListButton onClick={() => {
                    setWhen(new Date())
                }} >Jetzt</ListButton>
                <ListButton onClick={() => {
                    setWhen(new Date(when.getTime() - 60 * 60000))

                }} >
                    <Icon
                        ios={<MinusCircle />}
                    />&nbsp;1 Stunde</ListButton>
                <ListButton onClick={() => {
                    setWhen(new Date(when.getTime() + 60 * 60000))
                }} >
                    <Icon
                        ios={<PlusCircle />}
                    />&nbsp;1 Stunde</ListButton>
            </List>
        </Popover>
    </>
}