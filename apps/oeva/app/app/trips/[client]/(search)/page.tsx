import React from 'react';
import {endOfDay, parseISO, startOfDay} from 'date-fns';
import Trips from '../../../../../components/trips';
import type {ClientCodeParameter, Mode} from '../../../../../client/client';
import {getClient} from '../../../../../client/client';
import {buildProductsFilter} from '../../../../../client/products-filter';
import {TripHistory} from "../../../../../components/trip-history";

export const fetchCache = 'default-cache'
export const revalidate = 60

export default async function Stations({params, searchParams}: {
    params: { client: ClientCodeParameter },
    searchParams: { query: string, when?: string, products?: Mode['id'][] }
}): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <TripHistory/>
    }

    const client = getClient(params.client)

    const from = startOfDay(searchParams.when ? parseISO(searchParams.when) : new Date())

    const to = endOfDay(searchParams.when ? parseISO(searchParams.when) : new Date())

    if (searchParams.products && searchParams.query) {
        try {
            const trips = await client.tripsByName(searchParams.query, {
                onlyCurrentlyRunning: false,
                fromWhen: from,
                untilWhen: to,
                products: buildProductsFilter(client.profile.products, searchParams.products),
            })
            return <Trips client={client.code} products={client.modes} trips={trips.trips}/>
        } catch (e) {
            return <Trips client={client.code} error={String(e)} products={client.modes} trips={[]}/>
        }
    }

    return <Trips client={client.code}
                  error={!searchParams.products?.length ? 'Kein Verkehrsmittel gewählt' : undefined}
                  products={client.modes}
                  trips={[]}/>
}