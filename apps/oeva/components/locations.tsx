"use client"

import { Block, List, ListItem } from "konsta/react"
import type { Location, Station, Stop } from "hafas-client"
import { useRouter } from "next/navigation"
import React from "react"
import Scroll from "./scroll"

export default function Locations({ locations }: { locations: readonly (Location | Stop | Station)[] }): React.JSX.Element {
    const router = useRouter()

    const navigateToLocation = (id: string | undefined): void => {
        router.push(`/app/stations/${id}/departures`)
    }

    return <Scroll>
        {locations.length === 0 ? (
            <Block className="text-center">Nothing found</Block>
        ) : (
            <List inset strong>
                {locations.map(location => <ListItem key={location.name} link onClick={() => { navigateToLocation(location.id) }} title={location.name} />)}
            </List>
        )}
    </Scroll>

}