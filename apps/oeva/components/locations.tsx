"use client"

import {Block, List, ListItem} from "konsta/react"
import type {Location, ProductType, Station, Stop} from "hafas-client"
import React, {useEffect} from "react"
import {useNavigation, usePrefetch} from "../hooks/use-navigation";
import StopProducts from "./stop-products"

export default function Locations({locations, products}: {
    locations: readonly (Location | Stop | Station)[],
    products: readonly ProductType[]
}): React.JSX.Element {
    const nav = useNavigation()
    const prefetch = usePrefetch()
    useEffect(() => {
        for (const location of locations) {
            if (location.id) {
                prefetch.station(location.id, null, '')
            }
        }
    }, [locations, prefetch]);
    if (locations.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <List inset strong>
        {locations.map(location => {
            return <ListItem
                after={location.type === 'stop' || location.type === 'station' ?
                    <StopProducts products={products} stop={location}/> : null}
                key={location.name}
                link
                onClick={() => {
                    location.id && nav.station(location.id, new Date().toISOString(), location.name ?? '')
                }}
                title={location.name}
            />
        })}
    </List>
}