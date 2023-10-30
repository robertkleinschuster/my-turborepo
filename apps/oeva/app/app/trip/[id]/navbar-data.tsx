import { createClient } from 'hafas-client'
import { profile as oebbProfile } from 'hafas-client/p/oebb/index.js'
import TripNavbar from './navbar'
const client = createClient(oebbProfile, 'OeVA')

export default async function TripNavbarData({id}: {id: string}) {
    if (!client.trip) {
        throw new Error('Missing trip endpoint in client.')
    }

    const trip = await client.trip(decodeURIComponent(id), undefined)

    return <TripNavbar title={trip.trip.line?.name ?? id} subtitle={trip.trip.direction ?? ''}/>

}