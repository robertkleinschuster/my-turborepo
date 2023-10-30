import { createClient } from 'hafas-client'
import { profile as stvProfile } from 'hafas-client/p/stv/index.js'
import React from 'react'
import Alternatives from '../../../../../components/alternatives'

const client = createClient(stvProfile, 'OeVA')

export default async function Departures({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
    const departures = await client.departures(params.id, undefined)
    return <Alternatives alternatives={departures.departures} />
}