import React from 'react';
import Trips from '../../../../components/trips';
import { getClient } from '../../../../client/client';

export default async function Stations({ searchParams }: { searchParams: { query: string } }): Promise<React.JSX.Element> {
    if (!searchParams.query
        || searchParams.query.trim().length < 2
        || searchParams.query.trim() === 'ICE'
        || searchParams.query.trim() === 'RJ'
        || searchParams.query.trim() === 'IC'
        || searchParams.query.trim() === 'EC'
        || searchParams.query.trim() === 'RB'
        || searchParams.query.trim() === 'RE'
        || searchParams.query.trim() === 'REX'
        || searchParams.query.trim() === 'IR'
        || searchParams.query.trim() === 'ER'
        || searchParams.query.trim() === 'Tram'
        || searchParams.query.trim() === 'Bus'
    ) {
        return <></>
    }

    const client = getClient()

    const from = new Date();
    from.setHours(0, 0, 0, 0)

    const to = new Date();
    to.setHours(23, 59, 0, 0)

    const trips = await client.tripsByName(searchParams.query, { onlyCurrentlyRunning: false, fromWhen: from, untilWhen: to })

    return <Trips trips={trips.trips} />
}