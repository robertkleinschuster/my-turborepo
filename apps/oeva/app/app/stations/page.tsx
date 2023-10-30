import { createClient } from 'hafas-client'
import { profile as stvProfile } from 'hafas-client/p/stv/index.js'
import React from 'react';
import Locations from '../../../components/locations';
import NavSearchbar from '../../../components/nav-searchbar';

export default async function Stations({ searchParams }: { searchParams: { query: string } }): Promise<React.JSX.Element> {
    if (!searchParams.query) {
        return <>
            <NavSearchbar />
        </>;
    }
    const userAgent = 'OeVA-App'

    const client = createClient(stvProfile, userAgent)

    const locations = await client.locations(searchParams.query, undefined)
    return <>
        <NavSearchbar />
        <Locations locations={locations} />;
    </>

}