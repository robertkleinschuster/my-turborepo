"use client"

import { Button, Chip, Navbar, NavbarBackLink, Segmented, SegmentedButton, Toolbar } from "konsta/react"
import { usePathname, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import Time from "../../../../components/time";

export default function StationNavbar({ id, title }: { id: string, title: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment();

    const date = searchParams.get('when') ? new Date(decodeURIComponent(searchParams.get('when') ?? '')) : new Date()

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
                ab&nbsp;<Time time={date}/>
            </Chip>
            <Button small clear rounded onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams)
                const newDate = new Date(date.getTime() - 60 * 60000)
                newSearchParams.set('when', newDate.toISOString())
                router.replace(`${pathname}?${newSearchParams.toString()}`)
            }}>- 1 Stunde</Button>
            <Button small clear rounded onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams)
                const newDate = new Date(date.getTime() + 60 * 60000)
                newSearchParams.set('when', newDate.toISOString())
                router.replace(`${pathname}?${newSearchParams.toString()}`)
            }}>+ 1 Stunde</Button>
        </Toolbar>
    </>
}