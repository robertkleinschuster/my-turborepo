import StationNavbar from "./navbar";
import { ClientCode, getClient } from "../../client";


export default async function StationNavbarData({ id }: { id: string }) {
    const client = getClient(ClientCode.OEBB)
    const station = await client.stop(id, undefined)

    return <StationNavbar id={id} title={station.name ?? id} />

}