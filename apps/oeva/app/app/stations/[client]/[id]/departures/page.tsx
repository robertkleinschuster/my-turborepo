import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {addMinutes, formatISO, parseISO, startOfMinute, subMinutes} from "date-fns";
import Alternatives from '../../../../../../components/alternatives'
import type {Mode, ClientCode, ClientCodeParameter} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import {buildProductsFilter} from '../../../../../../client/products-filter'
import {FilterWhenRelative} from "../../../../../../components/filter-when-relative";
import Time from "../../../../../../components/time";

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedDepartures = unstable_cache(async (id: string, clientCode: ClientCode, when: string, products: Mode['id'][] | undefined) => {
    const client = getClient(clientCode)
    return client.departures(id, {
        duration: 60,
        when: parseISO(when),
        products: buildProductsFilter(client.profile.products, products),
        remarks: true
    })
}, ['departures1'], {revalidate: false})


export default async function Departures({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, products?: Mode['id'][] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient(params.client)

    const departures = await fetchCachedDepartures(decodeURIComponent(params.id), client.code, formatISO(startOfMinute(when)), searchParams.products)

    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    const whenEnd = departures.departures.length > 1 ?
        parseTime(departures.departures[departures.departures.length - 1].when) ?? addMinutes(when, 60) : addMinutes(when, 60)

    return <>
        <Alternatives alternatives={departures.departures} client={client.code} modes={client.modes}/>
        <FilterWhenRelative time={whenEnd} title={<>Fahrten ab <Time time={whenEnd}/> anzeigen</>}/>
    </>
}