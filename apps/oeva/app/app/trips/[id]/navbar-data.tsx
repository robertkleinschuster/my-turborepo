"use server"

import React from "react";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {type ClientCode, defaultClient, getClient} from '../../../../client/client'
import TripNavbar from './navbar'

const fetchCachedTrip = unstable_cache(async (id: string, clientCode: ClientCode) => {
    const client = getClient(clientCode)
    return client.trip(id, undefined)
}, ['trip'], {revalidate: false})

export default async function TripNavbarData({id}: { id: string }): Promise<React.JSX.Element> {
    const trip = await fetchCachedTrip(id, defaultClient)

    const lineName = trip.trip.line?.name ?? id;

    const direction = trip.trip.direction ?? '';

    return <TripNavbar operator={trip.trip.line?.operator}
                       subtitle={trip.trip.line?.fahrtNr ?? ''} title={`${lineName} ${direction}`}/>

}