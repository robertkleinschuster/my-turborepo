import { Stop, createClient } from 'hafas-client'
import { profile as oebbProfile } from 'hafas-client/p/oebb/index.js'
import Locations from '../../../../components/locations'

const client = createClient(oebbProfile, 'OeVA')

export default async function Trip({params}: {params: {id: string}}) {

    if (!client.trip) {
        throw new Error('Missing trip endpoint in client.')
    }

    const trip = await client.trip(decodeURIComponent(params.id), undefined)

    if (!trip.trip.stopovers) {
        return <>Kein Daten</>
    }

    return <Locations locations={trip.trip.stopovers.filter(s => s.stop).map(s => s.stop as Stop)}/>
}