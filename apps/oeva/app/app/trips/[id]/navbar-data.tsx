import React from "react";
import {getClient} from '../../../../client/client'
import TripNavbar from './navbar'

export default async function TripNavbarData({id}: { id: string }): Promise<React.JSX.Element> {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(id), undefined)

    const lineName = trip.trip.line?.name ?? id;

    const direction = trip.trip.direction ?? '';

    return <TripNavbar operator={trip.trip.line?.operator}
                       subtitle={trip.trip.line?.fahrtNr ?? ''} title={`${lineName} ${direction}`}/>

}