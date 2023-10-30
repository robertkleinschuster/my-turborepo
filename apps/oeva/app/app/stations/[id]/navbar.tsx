"use client"

import { Navbar, NavbarBackLink, Segmented, SegmentedButton } from "konsta/react"
import { useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";

export default function StationNavbar({id, title}: {id: string, title: string}) {
    const router = useRouter()
    const segment = useSelectedLayoutSegment();    

    return <Navbar
    left={
        <NavbarBackLink onClick={() => { router.back() }} text="Zurück" />
    }
    subnavbar={
        <Segmented strong>
            <SegmentedButton active={segment === 'departures'} onClick={() => { router.replace(`/app/stations/${id}/departures`) }} strong>
                Abfahrten
            </SegmentedButton>
            <SegmentedButton active={segment === 'arrivals'} onClick={() => { router.replace(`/app/stations/${id}/arrivals`) }} strong>
                Ankünfte
            </SegmentedButton>
        </Segmented>
    }
    title={title}
/>
}