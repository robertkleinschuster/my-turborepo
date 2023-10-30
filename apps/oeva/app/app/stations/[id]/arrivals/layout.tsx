"use client"

import { Navbar, NavbarBackLink, Segmented, SegmentedButton } from "konsta/react"
import { useRouter } from "next/navigation"
import Scroll from "../../../../../components/scroll"
import React from "react"

export default function Layout({ children, params}: {children: React.ReactNode, params: {id: string}}) {
    const router = useRouter()
    return <>
        <Navbar
            left={
                <NavbarBackLink onClick={() => { router.back() }} text="Zurück" />
            }
            subnavbar={
                <Segmented strong>
                    <SegmentedButton strong onClick={() => { router.replace(`/app/stations/${params.id}/departures`) }}>
                        Abfahrten
                    </SegmentedButton>
                    <SegmentedButton active strong>
                        Ankünfte
                    </SegmentedButton>
                </Segmented>
            }
            title={document.title}
        />
        <Scroll>
            {children}
        </Scroll>
    </>
}