import React from 'react'
// eslint-disable-next-line camelcase -- nextjs
import {unstable_cache} from "next/cache";
import {formatISO, parseISO, startOfMinute} from "date-fns";
import Alternatives from '../../../../../../components/alternatives'
import type {
    ClientCode,
    ClientCodeParameter,
    ModesParameter, ProductGroupsParameter
} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import {FilterWhenRelative} from "../../../../../../components/filter-when-relative";
import {Message} from "../../../../../../components/message";

export const fetchCache = 'default-cache'
export const revalidate = 60


const fetchCachedDepartures = unstable_cache(async (id: string, clientCode: ClientCode, when: string, modes: ModesParameter, groups: ProductGroupsParameter) => {
    const client = getClient(clientCode)

    return client.departures(id, {
        duration: 60,
        when: parseISO(when),
        products: client.buildProductsFilter(modes, groups),
        remarks: true
    })
}, ['departures1'], {revalidate: false})


export default async function Departures({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, modes: ModesParameter, groups: ProductGroupsParameter }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient(params.client)

    if (!client.validateFilter(searchParams.modes, searchParams.groups)) {
        return <Message>Filter in dieser Datenquelle nicht möglich.</Message>
    }

    const departures = await fetchCachedDepartures(decodeURIComponent(params.id), client.code, formatISO(startOfMinute(when)), searchParams.modes, searchParams.groups)

    return <>
        <Alternatives alternatives={departures.departures} client={client.code} modes={client.modes}/>
        <FilterWhenRelative alternatives={departures.departures}/>
    </>
}