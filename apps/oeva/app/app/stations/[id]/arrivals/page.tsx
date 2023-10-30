import { createClient } from 'hafas-client'
import { profile as stvProfile } from 'hafas-client/p/stv/index.js'
import React from 'react'
import Alternatives from '../../../../../components/alternatives'

const client = createClient(stvProfile, 'OeVA')

export default async function Arrivals({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
    const arrivals = await client.arrivals(params.id, undefined)
    return <Alternatives alternatives={arrivals.arrivals} />
}