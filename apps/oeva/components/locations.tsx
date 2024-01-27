"use client"

import {Chip, Icon, List, ListItem} from "konsta/react"
import type {Location, Station, Stop} from "hafas-client"
import React from "react"
import {Location as LocationIcon} from "framework7-icons/react"
import {useNavigation} from "../hooks/use-navigation";
import type {ClientCode, Mode} from "../client/client";
import {LocationTitle} from "./location-title";
import {Message} from "./message";
import Line from "./line";

export default function Locations({locations, client, modes, when = null}: {
    locations: readonly (Location | Stop | Station)[],
    client: ClientCode
    modes: readonly Mode[],
    when?: string | null
}): React.JSX.Element {
    const nav = useNavigation()

    if (locations.length === 0) {
        return <Message>Keine Ergebnisse</Message>
    }

    return <List inset strong>
        {locations.map(location => {
            return <ListItem
                footer={
                    location.type === 'stop' || location.type === 'station' ?
                        <span className="flex flex-wrap gap-1 items-center">{location.lines?.map(line => <Chip
                            className="flex gap-1 items-center" key={line.id}><Line line={line}
                                                                                    modes={modes}/></Chip>)}</span> : null
                }
                key={location.name}
                link
                onClick={() => {
                    nav.stationObj(client, location, when)
                }}
                subtitle={location.distance ? <span className="flex gap-1 items-center"><Icon ios={
                    <LocationIcon/>}/>{location.distance} m, {Math.round(location.distance / 75) > 0 ? <>~ {Math.round(location.distance / 75)}</> : '< 1'} min</span> : undefined}
                title={<LocationTitle client={client} location={location}/>}
            />
        })}
    </List>
}