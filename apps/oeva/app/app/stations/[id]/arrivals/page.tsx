import React from 'react'
import Alternatives from '../../../../../components/alternatives'
import {getClient} from '../../../../../client/client'
import {buildProductsFilter} from '../../../../../client/products-filter';

export default async function Arrivals({params, searchParams}: {
    params: { id: string },
    searchParams: { when?: string, products?: string[] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? new Date(decodeURIComponent(searchParams.when)) : undefined;
    const client = getClient()
    const arrivals = await client.arrivals(params.id, {
        duration: 1440,
        results: 40,
        when,
        products: buildProductsFilter(client.profile.products, searchParams.products),
        remarks: true
    })
    return <Alternatives alternatives={arrivals.arrivals} products={client.profile.products}/>
}