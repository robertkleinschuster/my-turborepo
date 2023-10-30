import React from "react"
import { createClient } from 'hafas-client'
import { profile as stvProfile } from 'hafas-client/p/stv/index.js'
import Scroll from "../../../../components/scroll"
import StationNavbar from "./navbar"

const client = createClient(stvProfile, 'OeVA')

export default async function Layout({ children, params}: {children: React.ReactNode, params: {id: string}}) {
    const station = await client.stop(params.id, undefined)

    return <>
        <StationNavbar id={params.id} title={station.name ?? params.id}/>
        <Scroll>
            {children}
        </Scroll>
    </>
}