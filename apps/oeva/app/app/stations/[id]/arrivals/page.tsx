import React from 'react'
import {parseISO, startOfMinute} from "date-fns";
import Alternatives from '../../../../../components/alternatives'
import {getClient} from '../../../../../client/client'
import {buildProductsFilter} from '../../../../../client/products-filter';

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Arrivals({params, searchParams}: {
    params: { id: string },
    searchParams: { when?: string, products?: string[] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient()
    const arrivals = await client.arrivals(decodeURIComponent(params.id), {
        duration: 1440,
        results: 40,
        when: startOfMinute(when),
        products: buildProductsFilter(client.profile.products, searchParams.products),
        remarks: true
    })
    return <Alternatives alternatives={arrivals.arrivals} products={client.profile.products}/>
}