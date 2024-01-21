import React from 'react';
import {endOfDay, parseISO, startOfDay} from 'date-fns';
import Trips from '../../../../../components/trips';
import type {ClientCodeParameter, ModesParameter, ProductGroupsParameter} from '../../../../../client/client';
import {getClient} from '../../../../../client/client';
import {TripHistory} from "../../../../../components/trip-history";
import {validateProductsFilter} from "../../../../../client/products-filter";

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Stations({params, searchParams}: {
    params: { client: ClientCodeParameter },
    searchParams: { query: string, when?: string, modes: ModesParameter, groups: ProductGroupsParameter}
}): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <TripHistory/>
    }

    const client = getClient(params.client)

    const products = client.buildProductsFilter(searchParams.modes, searchParams.groups)

    const from = startOfDay(searchParams.when ? parseISO(searchParams.when) : new Date())

    const to = endOfDay(searchParams.when ? parseISO(searchParams.when) : new Date())

    const hasProductsSelection = validateProductsFilter(products)

    if (hasProductsSelection && searchParams.query) {
        try {
            const trips = await client.tripsByName(searchParams.query, {
                onlyCurrentlyRunning: false,
                fromWhen: from,
                untilWhen: to,
                products,
            })
            return <Trips client={client.code} products={client.modes} trips={trips.trips}/>
        } catch (e) {
            return <Trips client={client.code} error={String(e)} products={client.modes} trips={[]}/>
        }
    }

    return <Trips client={client.code}
                  error={!hasProductsSelection ? 'Filter in dieser Datenquelle nicht möglich.' : undefined}
                  products={client.modes}
                  trips={[]}/>
}