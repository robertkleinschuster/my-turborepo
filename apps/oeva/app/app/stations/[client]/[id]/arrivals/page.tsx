import React from 'react'
import {parseISO, startOfMinute} from "date-fns";
import Alternatives from '../../../../../../components/alternatives'
import type {ClientCodeParameter, ModesParameter, ProductGroupsParameter} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import {FilterWhenRelative} from "../../../../../../components/filter-when-relative";
import {Message} from "../../../../../../components/message";

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Arrivals({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, modes: ModesParameter, groups: ProductGroupsParameter }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient(params.client)

    if (!client.validateFilter(searchParams.modes, searchParams.groups)) {
        return <Message>Filter in dieser Datenquelle nicht möglich.</Message>
    }

    const arrivals = await client.arrivals(decodeURIComponent(params.id), {
        duration: 60,
        when: startOfMinute(when),
        products: client.buildProductsFilter(searchParams.modes, searchParams.groups),
        remarks: true
    })

    return <>
        <Alternatives alternatives={arrivals.arrivals} client={client.code} modes={client.modes}/>
        <FilterWhenRelative alternatives={arrivals.arrivals}/>
    </>
}