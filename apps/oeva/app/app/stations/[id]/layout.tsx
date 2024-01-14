import React from "react"
import type {Metadata} from "next";
import Scroll from "../../../../components/scroll"
import {getClient} from "../../../../client/client";
import StationNavbarData from "./navbar-data"
import {Breadcrumbs} from "../../../../components/breadcrumbs";


export async function generateMetadata(
    {params}: { params: { id: string } }
): Promise<Metadata> {
    const client = getClient()
    const station = await client.stop(params.id, {linesOfStops: true, subStops: false, entrances: false})

    return {
        title: station.name
    }
}

export default function Layout({children, params}: {
    children: React.ReactNode,
    params: { id: string }
}): React.JSX.Element {
    return <>
        <StationNavbarData id={params.id}/>
        <Scroll>
            {children}
        </Scroll>
        <Breadcrumbs/>
    </>
}