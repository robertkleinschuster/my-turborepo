import type {JSX, ReactNode} from "react";
import React from "react";
import type {Metadata} from "next";
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import Scroll from "../../../../../components/scroll"
import type {ClientCodeParameter} from "../../../../../client/client";
import { getClient} from "../../../../../client/client";
import TripNavbarData from "./navbar-data"

export const fetchCache = 'default-cache'
export const revalidate = 60

const fetchCachedTrip = unstable_cache(async (id: string, clientCode: ClientCodeParameter) => {
    const client = getClient(clientCode)
    return client.trip(id, undefined)
}, ['trip'], {revalidate: false})

export async function generateMetadata(
    {params}: { params: { id: string, client: ClientCodeParameter } }
): Promise<Metadata> {
    const trip = await fetchCachedTrip(decodeURIComponent(params.id), params.client)

    const lineName = trip.trip.line?.name ?? params.id;

    const direction = trip.trip.direction ?? '';
    return {
        title: `${lineName} ${direction}`
    }
}
export default function Layout({children, params}: { children: ReactNode, params: { id: string, client: ClientCodeParameter } }): JSX.Element {
    const client = getClient(params.client)
    return <>
        <TripNavbarData clientCode={client.code} id={decodeURIComponent(params.id)}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}