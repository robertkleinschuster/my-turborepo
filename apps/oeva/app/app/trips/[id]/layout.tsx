import type {JSX, ReactNode} from "react";
import Scroll from "../../../../components/scroll"
import {getClient} from "../../../../client/client";
import TripNavbarData from "./navbar-data"
import type {Metadata, ResolvingMetadata} from "next";

export async function generateMetadata(
    {params}: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(params.id), undefined)

    const lineName = trip.trip.line?.name ?? params.id;

    const direction = trip.trip.direction ?? '';
    const parentTitle = (await parent).title
    return {
        title: parentTitle?.absolute ? `${lineName} ${direction} - ${parentTitle.absolute}` : `${lineName} ${direction}`
    }
}
export default function Layout({children, params}: { children: ReactNode, params: { id: string } }): JSX.Element {
    return <>
        <TripNavbarData id={params.id}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}