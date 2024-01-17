import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import Alternatives from '../../../../../components/alternatives'
import {type ClientCode, defaultClient, getClient} from '../../../../../client/client'
import {buildProductsFilter} from '../../../../../client/products-filter'

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedDepartures = unstable_cache(async (id: string, clientCode: ClientCode, when: string | undefined, products: string[] | undefined) => {
    const client = getClient(clientCode)
    return client.departures(id, {
        duration: 1440,
        results: 40,
        when: when ? new Date(when) : undefined,
        products: buildProductsFilter(client.profile.products, products),
        remarks: true
    })
}, ['departures'], {revalidate: 60})


export default async function Departures({params, searchParams}: {
    params: { id: string },
    searchParams: { when?: string, products?: string[] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? decodeURIComponent(searchParams.when) : undefined
    const client = getClient(defaultClient)

    const departures = await fetchCachedDepartures(params.id, defaultClient, when, searchParams.products)
    return <Alternatives alternatives={departures.departures} products={client.profile.products}/>
}