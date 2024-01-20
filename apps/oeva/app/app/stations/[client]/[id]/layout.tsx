import React from "react"
import type {Metadata} from "next";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import Scroll from "../../../../../components/scroll"
import type {ClientCodeParameter} from "../../../../../client/client";
import {getClient} from "../../../../../client/client";
import StationNavbarData from "./navbar-data"

export const fetchCache = 'default-cache'
export const revalidate = 3600

const fetchCachedStop = unstable_cache(async (id: string, clientCode: ClientCodeParameter) => {
    const client = getClient(clientCode)
    return client.stop(id, {linesOfStops: false, subStops: false, entrances: false})
}, ['stop'], {revalidate: false})

export async function generateMetadata(
    {params}: { params: { id: string, client: ClientCodeParameter } }
): Promise<Metadata> {
    const station = await fetchCachedStop(params.id, params.client)

    return {
        title: station.name
    }
}

export default function Layout({children, params}: {
    children: React.ReactNode,
    params: { id: string, client: ClientCodeParameter },
}): React.JSX.Element {
    return <>
        <StationNavbarData clientCode={params.client} id={decodeURIComponent(params.id)}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}