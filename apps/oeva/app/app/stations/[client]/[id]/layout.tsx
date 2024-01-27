import React from "react"
import type {Metadata} from "next";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import Scroll from "../../../../../components/scroll"
import type {ClientCodeParameter} from "../../../../../client/client";
import {getClient} from "../../../../../client/client";
import StationNavbar from "./navbar";

export const fetchCache = 'default-cache'
export const revalidate = 3600

const fetchCachedStop = unstable_cache(async (id: string, clientCode: ClientCodeParameter) => {
    const client = getClient(clientCode)
    return client.stop(id, {linesOfStops: true})
}, ['stop'], {revalidate: false})

export async function generateMetadata(
    {params}: { params: { id: string, client: ClientCodeParameter } }
): Promise<Metadata> {
    const station = await fetchCachedStop(params.id, params.client)

    return {
        title: station.name
    }
}

export default async function Layout({children, params}: {
    children: React.ReactNode,
    params: { id: string, client: ClientCodeParameter },
}): Promise<React.JSX.Element> {
    const client = getClient(params.client)
    const station = await fetchCachedStop(decodeURIComponent(params.id), client.code)

    return <>
        <StationNavbar client={client.code} groups={client.productGroups} modes={client.modes} station={station}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}