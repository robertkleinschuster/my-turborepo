import type {JSX, ReactNode} from "react";
import React from "react";
import type {Metadata} from "next";
import Scroll from "../../../../components/scroll"
import {getClient} from "../../../../client/client";
import TripNavbarData from "./navbar-data"

export const fetchCache = 'default-cache'
export const revalidate = 60

export async function generateMetadata(
    {params}: { params: { id: string } }
): Promise<Metadata> {
    const client = getClient()

    const trip = await client.trip(decodeURIComponent(params.id), undefined)

    const lineName = trip.trip.line?.name ?? params.id;

    const direction = trip.trip.direction ?? '';
    return {
        title: `${lineName} ${direction}`
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