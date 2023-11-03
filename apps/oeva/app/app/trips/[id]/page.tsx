import Stopovers from '../../../../components/stopovers'
import { getClient } from '../../../../client/client'

export default async function Trip({params}: {params: {id: string}}) {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(params.id), undefined)

    if (!trip.trip.stopovers) {
        return <>Kein Daten</>
    }

    return <Stopovers stopovers={trip.trip.stopovers}/>
}