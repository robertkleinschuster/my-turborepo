import React from 'react';
import Trips from '../../../../components/trips';
import { getClient } from '../../../../client/client';
import { buildProductsFilter } from '../../../../client/products-filter';

export default async function Stations({ searchParams }: { searchParams: { query: string, when?: string, products?: string[] } }): Promise<React.JSX.Element> {
    const client = getClient()

    const from = searchParams.when ? new Date(searchParams.when) : new Date();
    from.setHours(0, 0, 0, 0)

    const to = searchParams.when ? new Date(searchParams.when) : new Date();
    to.setHours(23, 59, 0, 0)

    if (searchParams.products && searchParams.query) {
        try {
            const trips = await client.tripsByName(searchParams.query, {
                onlyCurrentlyRunning: false,
                fromWhen: from,
                untilWhen: to,
                products: buildProductsFilter(client, searchParams.products),
            })
            return <Trips trips={trips.trips} />
        } catch (e) {
            return <Trips trips={[]} error={String(e)} />
        }
    }

    return <Trips trips={[]} error={!searchParams.products?.length ? 'Kein Angebot gewählt' : undefined} />
}