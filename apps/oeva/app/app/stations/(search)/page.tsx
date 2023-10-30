import { createClient } from 'hafas-client'
import { profile as oebbProfile } from 'hafas-client/p/oebb/index.js'
import React from 'react';
import Locations from '../../../../components/locations';

export default async function Stations({ searchParams }: { searchParams: { query: string } }): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <></>
    }
    const userAgent = 'OeVA-App'

    const client = createClient(oebbProfile, userAgent)

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