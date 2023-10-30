import { createClient } from 'hafas-client'
import { profile as oebbProfile } from 'hafas-client/p/oebb/index.js'
import React from 'react'
import Alternatives from '../../../../../components/alternatives'

const client = createClient(oebbProfile, 'OeVA')

export default async function Departures({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
    const departures = await client.departures(params.id, undefined)
    return <Alternatives alternatives={departures.departures} />
}