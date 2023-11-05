import type { StopOver } from "hafas-client";
import React from "react";
import { parseISO } from "date-fns";
import TimeDelay from "./time-delay";
import { Platform } from "./platform";

export function StopoverArrival({ stopover }: { stopover: StopOver }): React.JSX.Element {
    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    return <>
        <TimeDelay delay={stopover.arrivalDelay} label="An. " planned={parseTime(stopover.plannedArrival)} prognosed={parseTime(stopover.arrival)} />
        {' '}
        <Platform planned={stopover.plannedArrivalPlatform} prognosed={stopover.prognosedArrivalPlatform} />
    </>
}