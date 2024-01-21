import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import type {
    ClientCode,
    ClientCodeParameter,
    ModesParameter,
    ProductGroupsParameter
} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import Locations from "../../../../../../components/locations";
import {Message} from "../../../../../../components/message";

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedNearby = unstable_cache(async (id: string, clientCode: ClientCode, modes: ModesParameter, groups: ProductGroupsParameter) => {
    const client = getClient(clientCode)
    const location = await client.stop(id, {linesOfStops: false, subStops: false, entrances: false})
    return client.nearby(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- hafas-client type
        location.type === 'location' ? location : location.location!
        , {
            products: client.buildProductsFilter(modes, groups),
        })
}, ['nearby'], {revalidate: false})


export default async function Departures({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, modes: ModesParameter, groups: ProductGroupsParameter}
}): Promise<React.JSX.Element> {
    const client = getClient(params.client)

    if (!client.validateFilter(searchParams.modes, searchParams.groups)) {
        return <Message>Filter in dieser Datenquelle nicht möglich.</Message>
    }

    const locations = await fetchCachedNearby(decodeURIComponent(params.id), client.code, searchParams.modes, searchParams.groups)
    return <Locations client={client.code} locations={locations} products={client.modes} when={searchParams.when}/>
}