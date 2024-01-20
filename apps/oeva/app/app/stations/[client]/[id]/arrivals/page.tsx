import React from 'react'
import {parseISO, startOfMinute} from "date-fns";
import Alternatives from '../../../../../../components/alternatives'
import type {ClientCodeParameter, Mode} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import {buildProductsFilter} from '../../../../../../client/products-filter';
import {FilterWhenRelative} from "../../../../../../components/filter-when-relative";

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Arrivals({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, products?: Mode['id'][] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient(params.client)
    const arrivals = await client.arrivals(decodeURIComponent(params.id), {
        duration: 1440,
        results: 40,
        when: startOfMinute(when),
        products: buildProductsFilter(client.profile.products, searchParams.products),
        remarks: true
    })
    return <>
        <FilterWhenRelative minutes={-30} title="Früher"/>
        <Alternatives alternatives={arrivals.arrivals} client={client.code} modes={client.modes}/>
        <FilterWhenRelative minutes={+30} title="Später"/>
    </>
}