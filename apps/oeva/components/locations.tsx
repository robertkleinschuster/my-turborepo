"use client"

import {Icon, List, ListItem} from "konsta/react"
import type {Location, Station, Stop} from "hafas-client"
import React from "react"
import {Location as LocationIcon} from "framework7-icons/react"
import {useNavigation} from "../hooks/use-navigation";
import type {ClientCode, Mode} from "../client/client";
import StopProducts from "./stop-products"
import {LocationTitle} from "./location-title";
import {Message} from "./message";

export default function Locations({locations, client, products, when = null}: {
    locations: readonly (Location | Stop | Station)[],
    client: ClientCode
    products: readonly Mode[],
    when?: string|null
}): React.JSX.Element {
    const nav = useNavigation()

    if (locations.length === 0) {
        return <Message>Keine Ergebnisse</Message>
    }

    return <List inset strong>
        {locations.map(location => {
            return <ListItem
                after={location.type === 'stop' || location.type === 'station' ?
                    <StopProducts products={products} stop={location}/> : null}
                key={location.name}
                link
                onClick={() => {
                    nav.stationObj(client, location, when)
                }}
                subtitle={location.distance ? <span className="flex gap-1 items-center"><Icon ios={<LocationIcon/>}/>{location.distance} m, ~ {Math.round(location.distance / 75)} min</span> : undefined}
                title={<LocationTitle client={client} location={location}/>}
            />
        })}
    </List>
}