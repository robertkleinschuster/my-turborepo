"use client"

import { Block, List, ListItem } from "konsta/react"
import type { StopOver } from "hafas-client"
import { useRouter } from "next/navigation"
import React from "react"

export default function Stopovers({ stopovers }: { stopovers: readonly StopOver[] }): React.JSX.Element {
    const router = useRouter()

    const navigateToLocation = (id: string | undefined, when: string): void => {
        router.push(`/app/stations/${id}/departures?when=${encodeURIComponent(when)}`)
    }

    if (stopovers.length === 0) {
        return <Block className="text-center">Keine Ergebnisse</Block>
    }

    return <List inset strong>
        {stopovers.map(stopover => {
            const times:string[] = [];

            if (stopover.arrival) {
                times.push((new Date(stopover.arrival)).toLocaleTimeString(['de'], {timeStyle: 'short'}))
            }

            if (stopover.departure) {
                times.push((new Date(stopover.departure)).toLocaleTimeString(['de'], {timeStyle: 'short'}))
            }

            return <ListItem key={stopover.stop?.name} link onClick={() => { navigateToLocation(stopover.stop?.id, stopover.arrival ?? stopover.departure ?? '') }} title={stopover.stop?.name} after={times.join(' - ')} />
        })}
    </List>
}