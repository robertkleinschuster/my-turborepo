import React from 'react';
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import Locations from '../../../../components/locations';
import {type ClientCode, defaultClient, getClient} from '../../../../client/client';
import {StationHistory} from "../../../../components/station-history";

export const fetchCache = 'default-cache'
export const revalidate = 3600

const fetchCachedLocations = unstable_cache(async (query: string, clientCode: ClientCode) => {
    const client = getClient(clientCode)
    return client.locations(query, {
        results: 20,
        linesOfStops: false,
        subStops: false,
        fuzzy: true,
        stops: true,
        poi: false,
        addresses: false,
        entrances: false
    })
}, ['locations'], {revalidate: false})


export default async function Stations({ searchParams }: { searchParams: { query: string } }): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <StationHistory/>
    }

    const client = getClient(defaultClient);

    const locations = await fetchCachedLocations(searchParams.query, defaultClient)

    return <Locations locations={locations.filter(location => location.type === 'station' || location.type === 'stop')} products={client.profile.products} />
}