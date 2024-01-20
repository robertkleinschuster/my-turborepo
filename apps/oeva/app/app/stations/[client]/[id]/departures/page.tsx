import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {formatISO, parseISO, startOfMinute} from "date-fns";
import Alternatives from '../../../../../../components/alternatives'
import type {Mode, ClientCode, ClientCodeParameter} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import {buildProductsFilter} from '../../../../../../client/products-filter'
import {FilterWhenRelative} from "../../../../../../components/filter-when-relative";

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedDepartures = unstable_cache(async (id: string, clientCode: ClientCode, when: string, products: Mode['id'][] | undefined) => {
    const client = getClient(clientCode)
    return client.departures(id, {
        duration: 1440,
        results: 40,
        when: parseISO(when),
        products: buildProductsFilter(client.profile.products, products),
        remarks: true
    })
}, ['departures'], {revalidate: false})


export default async function Departures({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, products?: Mode['id'][] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient(params.client)

    const departures = await fetchCachedDepartures(decodeURIComponent(params.id), client.code, formatISO(startOfMinute(when)), searchParams.products)
    return <>
        <FilterWhenRelative minutes={-30} title="Früher"/>
        <Alternatives alternatives={departures.departures} client={client.code} modes={client.modes}/>
        <FilterWhenRelative minutes={+30} title="Später"/>
    </>
}