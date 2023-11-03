import StationNavbar from "./navbar";
import { getClient } from "../../../../client/client";


export default async function StationNavbarData({ id }: { id: string }) {
    const client = getClient()
    const station = await client.stop(id, undefined)

    return <StationNavbar id={id} title={station.name ?? id} />

}