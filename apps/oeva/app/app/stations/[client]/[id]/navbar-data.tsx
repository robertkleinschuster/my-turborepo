import React from "react";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import type {ClientCodeParameter, ClientCode} from "../../../../../client/client";
import {getClient} from "../../../../../client/client";
import StationNavbar from "./navbar";

const fetchCachedStop = unstable_cache(async (id: string, clientCode: ClientCode) => {
    const client = getClient(clientCode)
    return client.stop(id, {linesOfStops: false, subStops: false, entrances: false})
}, ['stop'], {revalidate: false})

export default async function StationNavbarData({id, clientCode}: {
    id: string,
    clientCode: ClientCodeParameter
}): Promise<React.JSX.Element> {
    const client = getClient(clientCode)
    const station = await fetchCachedStop(id, client.code)

    return <StationNavbar client={client.code} groups={client.productGroups} modes={client.modes} title={station.name ?? id}/>

}