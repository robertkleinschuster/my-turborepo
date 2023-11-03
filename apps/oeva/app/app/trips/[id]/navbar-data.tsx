import { getClient } from '../../../../client/client'
import TripNavbar from './navbar'

export default async function TripNavbarData({ id }: { id: string }) {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(id), undefined)

    const lineName = trip.trip.line?.name ?? id;

    const direction = trip.trip.direction ?? '';

    return <TripNavbar subtitle={trip.trip.line?.fahrtNr ?? ''} title={`${lineName} ${direction}`} />

}