import React from 'react';
import {endOfDay, parseISO, startOfDay} from 'date-fns';
import Trips from '../../../../components/trips';
import {getClient} from '../../../../client/client';
import {buildProductsFilter} from '../../../../client/products-filter';
import {TripHistory} from "../../../../components/trip-history";

export default async function Stations({searchParams}: {
    searchParams: { query: string, when?: string, products?: string[] }
}): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <TripHistory/>
    }

    const client = getClient()

    const from = startOfDay(searchParams.when ? parseISO(searchParams.when) : new Date())

    const to = endOfDay(searchParams.when ? parseISO(searchParams.when) : new Date())

    if (searchParams.products && searchParams.query) {
        try {
            const trips = await client.tripsByName(searchParams.query, {
                onlyCurrentlyRunning: false,
                fromWhen: from,
                untilWhen: to,
                products: buildProductsFilter(client, searchParams.products),
            })
            return <Trips products={client.profile.products} trips={trips.trips}/>
        } catch (e) {
            return <Trips error={String(e)} products={client.profile.products} trips={[]}/>
        }
    }

    return <Trips error={!searchParams.products?.length ? 'Kein Verkehrsmittel gewählt' : undefined} products={client.profile.products}
                  trips={[]}/>
}