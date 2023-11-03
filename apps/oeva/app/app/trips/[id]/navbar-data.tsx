import TripNavbar from './navbar'
import { getClient } from '../../../../client/client'

export default async function TripNavbarData({ id }: { id: string }) {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(id), undefined)

    return <TripNavbar title={trip.trip.line?.name ?? id} subtitle={trip.trip.direction ?? ''} />

}