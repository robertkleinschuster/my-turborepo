import React from "react"
import Scroll from "../../../../components/scroll"
import TripNavbarData from "./navbar-data"


export default function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    return <>
        <TripNavbarData id={params.id} />
        <Scroll>
            {children}
        </Scroll>
    </>
}