import React from 'react'
import Alternatives from '../../../../../components/alternatives'
import { ClientCode, getClient } from '../../../../../client/hafas/client'

export default async function Departures({ params, searchParams }: { params: { id: string }, searchParams: { when?: string } }): Promise<React.JSX.Element> {
    const when = searchParams.when ? new Date(decodeURIComponent(searchParams.when)) : undefined
    const client = getClient(ClientCode.OEBB)
    const departures = await client.departures(params.id, { duration: 1440, results: 40, when: when })
    return <Alternatives alternatives={departures.departures} />
}