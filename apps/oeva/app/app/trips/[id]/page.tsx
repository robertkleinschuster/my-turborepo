import React from "react";
import Stopovers from '../../../../components/stopovers'
import {getClient} from '../../../../client/client'
import Remarks from '../../../../components/remarks'

export default async function Trip({params}: { params: { id: string } }): Promise<React.JSX.Element> {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(params.id), {remarks: true})

    if (!trip.trip.stopovers) {
        return <>Kein Daten</>
    }

    return <>
        <Remarks remarks={trip.trip.remarks} type='status'/>
        <Remarks remarks={trip.trip.remarks} type='warning'/>
        <Stopovers products={client.profile.products} stopovers={trip.trip.stopovers}/>
        <Remarks remarks={trip.trip.remarks} type='hint'/>
    </>
}