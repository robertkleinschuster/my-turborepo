import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import type {Mode, ClientCode, ClientCodeParameter} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import Locations from "../../../../../../components/locations";
import {buildProductsFilter} from "../../../../../../client/products-filter";

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedNearby = unstable_cache(async (id: string, clientCode: ClientCode, products: Mode['id'][] | undefined) => {
    const client = getClient(clientCode)
    const location = await client.stop(id, {linesOfStops: false, subStops: false, entrances: false})
    return client.nearby(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hafas-client type
        location.type === 'location' ? location : location.location!
        , {
            products: buildProductsFilter(client.profile.products, products),
        })
}, ['nearby'], {revalidate: false})


export default async function Departures({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, products?: Mode['id'][] }
}): Promise<React.JSX.Element> {
    const client = getClient(params.client)

    const locations = await fetchCachedNearby(decodeURIComponent(params.id), client.code, searchParams.products)
    return <Locations client={client.code} locations={locations} products={client.modes} when={searchParams.when}/>
}