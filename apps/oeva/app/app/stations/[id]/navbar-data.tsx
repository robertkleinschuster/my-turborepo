import React from "react";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {type ClientCode, defaultClient, getClient} from "../../../../client/client";
import StationNavbar from "./navbar";

const fetchCachedStop = unstable_cache(async (id: string, clientCode: ClientCode) => {
    const client = getClient(clientCode)
    return client.stop(id, {linesOfStops: false, subStops: false, entrances: false})
}, ['stop'], {revalidate: false})

export default async function StationNavbarData({id}: { id: string }): Promise<React.JSX.Element> {
    const client = getClient(defaultClient)
    const station = await fetchCachedStop(id, defaultClient)

    return <StationNavbar id={id} products={client.profile.products} title={station.name ?? id}/>

}