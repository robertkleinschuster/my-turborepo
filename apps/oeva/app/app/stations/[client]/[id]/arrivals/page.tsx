import React from 'react'
import {addMinutes, parseISO, startOfMinute} from "date-fns";
import Alternatives from '../../../../../../components/alternatives'
import type {ClientCodeParameter, Mode} from '../../../../../../client/client';
import {getClient} from '../../../../../../client/client'
import {buildProductsFilter} from '../../../../../../client/products-filter';
import {FilterWhenRelative} from "../../../../../../components/filter-when-relative";
import Time from "../../../../../../components/time";

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Arrivals({params, searchParams}: {
    params: { id: string, client: ClientCodeParameter },
    searchParams: { when?: string, products?: Mode['id'][] }
}): Promise<React.JSX.Element> {
    const when = searchParams.when ? parseISO(decodeURIComponent(searchParams.when)) : new Date()
    const client = getClient(params.client)
    const arrivals = await client.arrivals(decodeURIComponent(params.id), {
        duration: 60,
        when: startOfMinute(when),
        products: buildProductsFilter(client.profile.products, searchParams.products),
        remarks: true
    })

    const parseTime = (time: string | undefined): Date | null => {
        return time ? new Date(time) : null;
    }

    const whenEnd = arrivals.arrivals.length > 1 ?
        parseTime(arrivals.arrivals[arrivals.arrivals.length - 1].when) ?? addMinutes(when, 60) : addMinutes(when, 60)

    return <>
        <Alternatives alternatives={arrivals.arrivals} client={client.code} modes={client.modes}/>
        <FilterWhenRelative time={whenEnd} title={<>Fahrten ab <Time time={whenEnd}/> anzeigen</>}/>
    </>
}