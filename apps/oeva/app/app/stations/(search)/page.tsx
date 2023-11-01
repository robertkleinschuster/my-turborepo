import React from 'react';
import Locations from '../../../../components/locations';
import { ClientCode, getClient } from '../../client';

export default async function Stations({ searchParams }: { searchParams: { query: string } }): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <></>
    }

    const client = getClient(ClientCode.OEBB);

    const locations = await client.locations(searchParams.query, {
        results: 20,
        language: 'de',
        linesOfStops: false,
        subStops: false,
        fuzzy: true,
        stops: true,
        poi: false,
        addresses: false,
        entrances: false
    })

    return <Locations locations={locations.filter(location => location.type === 'station' || location.type === 'stop')} />
}