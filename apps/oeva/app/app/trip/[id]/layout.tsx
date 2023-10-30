import React from "react"
import { createClient } from 'hafas-client'
import { profile as oebbProfile } from 'hafas-client/p/oebb/index.js'
import Scroll from "../../../../components/scroll"
import TripNavbar from "./navbar"

const client = createClient(oebbProfile, 'OeVA')

export default async function Layout({ children, params}: {children: React.ReactNode, params: {id: string}}) {
    if (!client.trip) {
        throw new Error('Missing trip endpoint in client.')
    }

    const trip = await client.trip(decodeURIComponent(params.id), undefined)

    return <>
        <TripNavbar title={trip.trip.line?.name ?? params.id} subtitle={trip.trip.direction ?? ''}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}