import React from 'react';
import Locations from '../../../../components/locations';
import { getClient } from '../../../../client/client';
import {StationHistory} from "../../../../components/station-history";

export const fetchCache = 'default-cache'
export const revalidate = 3600

export default async function Stations({ searchParams }: { searchParams: { query: string } }): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <StationHistory/>
    }

    const client = getClient();

    const locations = await client.locations(searchParams.query, {
        results: 20,
        linesOfStops: false,
        subStops: false,
        fuzzy: true,
        stops: true,
        poi: false,
        addresses: false,
        entrances: false
    })

    return <Locations locations={locations.filter(location => location.type === 'station' || location.type === 'stop')} products={client.profile.products} />
}