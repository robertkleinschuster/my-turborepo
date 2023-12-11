import React from "react";
import {getClient} from "../../../../client/client";
import StationNavbar from "./navbar";


export default async function StationNavbarData({id}: { id: string }): Promise<React.JSX.Element> {
    const client = getClient()
    const station = await client.stop(id, {linesOfStops: true, subStops: false, entrances: false})

    return <StationNavbar id={id} products={client.profile.products} title={station.name ?? id}/>

}