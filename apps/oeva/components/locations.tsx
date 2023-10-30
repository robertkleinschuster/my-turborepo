"use client"

import { Block, List, ListItem } from "konsta/react"
import type { Location, Station, Stop } from "hafas-client"
import { useRouter } from "next/navigation"
import React from "react"

export default function Locations({ locations }: { locations: readonly (Location | Stop | Station)[] }): React.JSX.Element {
    const router = useRouter()

    const navigateToLocation = (id: string | undefined): void => {
        router.push(`/app/stations/${id}/departures`)
    }

    if (locations.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <List inset strong>
        {locations.map(location => {
            return <ListItem key={location.name} link onClick={() => { navigateToLocation(location.id) }} title={location.name} />
        })}
    </List>
}