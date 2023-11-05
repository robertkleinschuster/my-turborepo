"use client"

import { Block, List, ListItem } from "konsta/react"
import type { ProductType, StopOver } from "hafas-client"
import { useRouter } from "next/navigation"
import React from "react"
import StopProducts from "./stop-products"
import { StopoverDeparture } from "./stopover-departure"
import { StopoverArrival } from "./stopover-arrival"

export default function Stopovers({ stopovers, products }: { stopovers: readonly StopOver[], products: readonly ProductType[] }): React.JSX.Element {
    const router = useRouter()

    const navigateToLocation = (id: string | undefined, when: string): void => {
        router.push(`/app/stations/${id}/departures?when=${encodeURIComponent(when)}`)
    }

    if (stopovers.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <List inset strong>
        {stopovers.map(stopover => {

            return <ListItem
                after={stopover.stop ? <StopProducts products={products} stop={stopover.stop} /> : null}
                footer={<StopoverDeparture stopover={stopover} />}
                header={<StopoverArrival stopover={stopover} />}
                key={(stopover.stop?.id ?? '') + (stopover.arrival ?? stopover.departure)}
                link
                onClick={() => { navigateToLocation(stopover.stop?.id, stopover.arrival ?? stopover.departure ?? '') }}
                title={stopover.stop?.name}
            />
        })}
    </List>
}