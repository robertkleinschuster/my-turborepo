import StationNavbar from "./navbar";
import { createClient } from 'hafas-client'
import { profile as oebbProfile } from 'hafas-client/p/oebb/index.js'

const client = createClient(oebbProfile, 'OeVA')

export default async function StationNavbarData({ id }: { id: string }) {
    const station = await client.stop(id, undefined)

    return <StationNavbar id={id} title={station.name ?? id} />

}