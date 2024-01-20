import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {type ClientCode, defaultClient, getClient} from '../../../../../client/client'
import Locations from "../../../../../components/locations";
import {buildProductsFilter} from "../../../../../client/products-filter";

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedNearby = unstable_cache(async (id: string, clientCode: ClientCode, products: string[] | undefined) => {
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
    params: { id: string },
    searchParams: { when?: string, products?: string[] }
}): Promise<React.JSX.Element> {
    const client = getClient(defaultClient)

    const locations = await fetchCachedNearby(decodeURIComponent(params.id), defaultClient, searchParams.products)
    return <Locations locations={locations} products={client.profile.products} when={searchParams.when}/>
}