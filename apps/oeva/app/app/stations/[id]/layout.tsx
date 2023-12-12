import React from "react"
import type {Metadata, ResolvingMetadata} from "next";
import Scroll from "../../../../components/scroll"
import {getClient} from "../../../../client/client";
import StationNavbarData from "./navbar-data"


export async function generateMetadata(
    {params}: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const client = getClient()
    const station = await client.stop(params.id, {linesOfStops: true, subStops: false, entrances: false})
    const parentTitle = (await parent).title;

    return {
        title: parentTitle?.absolute ? `${station.name} - ${parentTitle.absolute}` : station.name
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
    </>
}