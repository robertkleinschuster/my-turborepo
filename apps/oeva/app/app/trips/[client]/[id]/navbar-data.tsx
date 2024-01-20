"use server"

import React from "react";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {type ClientCode, getClient} from '../../../../../client/client'
import TripNavbar from './navbar'

const fetchCachedTrip = unstable_cache(async (id: string, clientCode: ClientCode) => {
    const client = getClient(clientCode)
    return client.trip(id, undefined)
}, ['trip'], {revalidate: false})

export default async function TripNavbarData({id, clientCode}: { id: string, clientCode: ClientCode }): Promise<React.JSX.Element> {
    const trip = await fetchCachedTrip(id, clientCode)

    const lineName = trip.trip.line?.name ?? '';

    const direction = trip.trip.direction ?? '';

    return <TripNavbar client={clientCode}
                       operator={trip.trip.line?.operator}
                       subtitle={trip.trip.line?.fahrtNr ?? ''} title={`${lineName} ${direction}`}/>

}