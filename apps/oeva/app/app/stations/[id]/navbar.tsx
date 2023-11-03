"use client"

import { Block, Chip, Icon, List, ListButton, ListItem, Navbar, NavbarBackLink, Popover, Segmented, SegmentedButton, Toolbar } from "konsta/react"
import { Clock, PlusCircle, MinusCircle } from "framework7-icons/react"
import { usePathname, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Time from "../../../../components/time";

export default function StationNavbar({ id, title }: { id: string, title: string }) {
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

    const [popoverOpened, setPopoverOpened] = useState(false);
    const popoverTargetRef = useRef(null);

    const openPopover = (targetRef) => {
        popoverTargetRef.current = targetRef;
        setPopoverOpened(true);
    };


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
            <Chip className="filter-when" onClick={() => {openPopover('.filter-when')}}>
                <Icon ios={<Clock />}/>&nbsp;<Time time={when} />
            </Chip>
        </Toolbar>

        <Popover
            opened={popoverOpened}
            target={popoverTargetRef.current}
            onBackdropClick={() => { setPopoverOpened(false) }}
        >
            <List nested>
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