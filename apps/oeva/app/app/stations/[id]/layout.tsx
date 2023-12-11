import React from "react"
import Scroll from "../../../../components/scroll"
import StationNavbarData from "./navbar-data"

export default function Layout({children, params}: {
    children: React.ReactNode,
    params: { id: string }
}): React.JSX.Element {
    return <>
        <StationNavbarData id={params.id}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}