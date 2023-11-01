import TripNavbar from './navbar'
import { ClientCode, getClient } from '../../../../client/hafas/client'

export default async function TripNavbarData({ id }: { id: string }) {
    const client = getClient(ClientCode.OEBB)

    const trip = await client.trip(decodeURIComponent(id), undefined)

    return <TripNavbar title={trip.trip.line?.name ?? id} subtitle={trip.trip.direction ?? ''} />

}