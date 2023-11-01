"use client"

import { Button, Chip, Navbar, NavbarBackLink, Segmented, SegmentedButton, Toolbar } from "konsta/react"
import { usePathname, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
            <Chip>
                ab&nbsp;<Time time={when} />
            </Chip>
            <Button clear onClick={() => {
                setWhen(new Date())
            }} rounded small>Jetzt</Button>
            <Button clear onClick={() => {
                setWhen(new Date(when.getTime() - 60 * 60000))

            }} rounded small>- 1 Stunde</Button>
            <Button clear onClick={() => {
                setWhen(new Date(when.getTime() + 60 * 60000))
            }} rounded small>+ 1 Stunde</Button>
        </Toolbar>
    </>
}