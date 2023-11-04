"use client"

import { Block, List, ListItem } from "konsta/react"
import type { ProductType, StopOver } from "hafas-client"
import { useRouter } from "next/navigation"
import React from "react"
import TimeRange from "./time-range"
import Product from "./product"

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
            const from = stopover.arrival ? new Date(stopover.arrival) : null;
            const to = stopover.departure ? new Date(stopover.departure) : null;

            return <ListItem
                header={<TimeRange from={from} to={to} />}
                key={(stopover.stop?.id ?? '') + (stopover.arrival ?? stopover.departure)}
                after={
                    <span className="flex gap-1">
                        {products.filter(product => {
                            if (stopover.stop?.products) {
                                return stopover.stop.products[product.id];
                            }
                            return false;
                        }).map(product => <Product key={product.id} product={product} />)}
                    </span>
                }
                link
                onClick={() => { navigateToLocation(stopover.stop?.id, stopover.arrival ?? stopover.departure ?? '') }}
                title={stopover.stop?.name}
            />
        })}
    </List>
}