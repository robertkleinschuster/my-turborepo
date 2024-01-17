"use client"

import {Block, List, ListItem} from "konsta/react"
import type {Location, ProductType, Station, Stop} from "hafas-client"
import React from "react"
import {useNavigation} from "../hooks/use-navigation";
import StopProducts from "./stop-products"
import {LocationTitle} from "./location-title";

export default function Locations({locations, products}: {
    locations: readonly (Location | Stop | Station)[],
    products: readonly ProductType[]
}): React.JSX.Element {
    const nav = useNavigation()

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
                    location.id && nav.station(location.id, null, location.name ?? '')
                }}
                title={<LocationTitle location={location}/>}
            />
        })}
    </List>
}