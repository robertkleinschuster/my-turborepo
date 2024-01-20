"use client"

import {Block, Icon, List, ListItem} from "konsta/react"
import type {Location, ProductType, Station, Stop} from "hafas-client"
import React from "react"
import {Location as LocationIcon} from "framework7-icons/react"
import {useNavigation} from "../hooks/use-navigation";
import StopProducts from "./stop-products"
import {LocationTitle} from "./location-title";

export default function Locations({locations, products, when = null}: {
    locations: readonly (Location | Stop | Station)[],
    products: readonly ProductType[],
    when?: string|null
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
                    nav.stationObj(location, when)
                }}
                subtitle={location.distance ? <span className="flex gap-1 items-center"><Icon ios={<LocationIcon/>}/>{location.distance} m, ~ {Math.round(location.distance / 75)} min</span> : undefined}
                title={<LocationTitle location={location}/>}
            />
        })}
    </List>
}