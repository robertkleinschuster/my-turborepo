"use client"

import { Block, List, ListItem } from "konsta/react"
import type { ProductType, StopOver } from "hafas-client"
import React from "react"
import StopProducts from "./stop-products"
import { StopoverDeparture } from "./stopover-departure"
import { StopoverArrival } from "./stopover-arrival"
import {useNavigation} from "../hooks/use-navigation";
import RemarkSummary from "./remark-summary";

export default function Stopovers({ stopovers, products }: { stopovers: readonly StopOver[], products: readonly ProductType[] }): React.JSX.Element {
    const nav = useNavigation()

    if (stopovers.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <List inset strong>
        {stopovers.map(stopover => {

            return <ListItem
                after={<>
                    {stopover.stop ? <StopProducts products={products} stop={stopover.stop}/> : null}
                </>}
                footer={<StopoverDeparture stopover={stopover} />}
                header={<StopoverArrival stopover={stopover} />}
                key={(stopover.stop?.id ?? '') + (stopover.arrival ?? stopover.departure)}
                link
                onClick={() => { stopover.stop?.id && nav.station(stopover.stop.id, stopover.arrival ?? stopover.departure ?? '', stopover.stop.name ?? '') }}
                title={<><span className={stopover.cancelled ? 'line-through' : undefined}>{stopover.stop?.name}</span> <RemarkSummary cancelled={stopover.cancelled} remarks={stopover.remarks}/></>}
            />
        })}
    </List>
}