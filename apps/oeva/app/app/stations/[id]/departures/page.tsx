import React from 'react'
import Alternatives from '../../../../../components/alternatives'
import { getClient } from '../../../../../client/client'
import { buildProductsFilter } from '../../../../../client/products-filter'

export default async function Departures({ params, searchParams }: { params: { id: string }, searchParams: { when?: string, products?: string[] } }): Promise<React.JSX.Element> {
    const when = searchParams.when ? new Date(decodeURIComponent(searchParams.when)) : undefined
    const client = getClient()
    
    const departures = await client.departures(params.id, { duration: 1440, when: when, products: buildProductsFilter(client, searchParams.products)})
    return <Alternatives alternatives={departures.departures} />
}