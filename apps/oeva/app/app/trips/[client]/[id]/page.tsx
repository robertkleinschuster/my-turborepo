import React from "react";
import Stopovers from '../../../../../components/stopovers'
import {ClientCodeParameter, getClient} from '../../../../../client/client'
import Remarks from '../../../../../components/remarks'

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Trip({params}: { params: { id: string, client: ClientCodeParameter } }): Promise<React.JSX.Element> {
    const client = getClient(params.client)

    const trip = await client.trip(decodeURIComponent(params.id), {remarks: true})

    if (!trip.trip.stopovers) {
        return <>Kein Daten</>
    }

    return <>
        <Remarks remarks={trip.trip.remarks} type='status'/>
        <Remarks remarks={trip.trip.remarks} type='warning'/>
        <Stopovers client={client.code} products={client.modes} stopovers={trip.trip.stopovers}/>
        <Remarks remarks={trip.trip.remarks} type='hint'/>
    </>
}