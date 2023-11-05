import type { StopOver } from "hafas-client";
import React from "react";
import { parseISO } from "date-fns";
import TimeDelay from "./time-delay";
import { Platform } from "./platform";

export function StopoverDeparture({ stopover }: { stopover: StopOver }): React.JSX.Element {
    const parseTime = (time: string | undefined): Date | null => {
        return time ? parseISO(time) : null;
    }

    return <>
        <TimeDelay delay={stopover.departureDelay} label="Ab. " planned={parseTime(stopover.plannedDeparture)} prognosed={parseTime(stopover.departure)} />
        {' '}
        <Platform planned={stopover.plannedDeparturePlatform} prognosed={stopover.prognosedDeparturePlatform} />
    </>
}