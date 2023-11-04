import { getClient } from "../../../../client/client";
import StationNavbar from "./navbar";


export default async function StationNavbarData({ id }: { id: string }) {
    const client = getClient()
    const station = await client.stop(id, { linesOfStops: true, subStops: false, entrances: false })

    return <StationNavbar products={client.profile.products} id={id} title={station.name ?? id} />

}