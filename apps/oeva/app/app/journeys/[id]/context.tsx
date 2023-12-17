"use client"

import type {Dispatch, JSX, ReactNode} from "react";
import {createContext, useContext, useReducer} from "react";
import type {Journey, WithLegs} from "../../../../lib/prisma";

export type JourneyContext = Journey<WithLegs> | null

export interface JourneyDeleteLegAction {
    action: 'delete_legs'
    legIds: string[]
}

export interface JourneyReplaceAction {
    action: 'replace'
    journey: JourneyContext
}


export type JourneyAction = JourneyDeleteLegAction | JourneyReplaceAction

const JourneyContext = createContext<JourneyContext>(null)
const JourneyContextDispatch = createContext<Dispatch<JourneyAction>>(() => null)


export function useJourney(): Journey<WithLegs> {
    const journey = useContext(JourneyContext);
    if (!journey) {
        throw new Error('Journey not initialized')
    }
    return journey
}

export function useJourneyDispatch(): Dispatch<JourneyAction> {
    return useContext(JourneyContextDispatch);
}

export function JourneyProvider({children, journey}: { children: ReactNode, journey: Journey<WithLegs> }): JSX.Element {
    const [state, dispatch] = useReducer(
        (prevState: JourneyContext, action: JourneyAction) => {
            if (!prevState) {
                return prevState;
            }
            if (action.action === 'delete_legs') {
                return {
                    ...prevState,
                    legs: prevState.legs.filter(leg => !action.legIds.includes(leg.id))
                }
            }
            return action.journey
        },
        journey
    )


    return <JourneyContext.Provider value={state}>
        <JourneyContextDispatch.Provider value={dispatch}>
            {children}
        </JourneyContextDispatch.Provider>
    </JourneyContext.Provider>
}