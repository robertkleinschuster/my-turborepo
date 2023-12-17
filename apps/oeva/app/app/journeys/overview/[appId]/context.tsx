"use client"

import type {Dispatch, JSX, ReactNode} from "react";
import {createContext, useContext, useReducer} from "react";
import type {Journey} from "../../../../../lib/prisma";

export type JourneyList = Journey[]

export interface JourneyListDeleteAction {
    action: 'delete'
    journeyIds: string[]
}

export interface JourneyListReplaceAction {
    action: 'replace'
    journeys: Journey[]
}


export type JourneyListAction = JourneyListDeleteAction | JourneyListReplaceAction

const JourneyListContext = createContext<JourneyList>([])
const JourneyListDispatchContext = createContext<Dispatch<JourneyListAction>>(() => null)


export function useJourneyList(): JourneyList {
    return useContext(JourneyListContext);
}

export function useJourneyListDispatch(): Dispatch<JourneyListAction> {
    return useContext(JourneyListDispatchContext);
}

export function JourneyListProvider({children, journeys}: { children: ReactNode, journeys: Journey[] }): JSX.Element {
    const [state, dispatch] = useReducer(
        (prevState: JourneyList, action: JourneyListAction) => {
            if (action.action === 'delete') {
                return prevState.filter(journey => !action.journeyIds.includes(journey.id))
            }
            return action.journeys
        },
        journeys
    )


    return <JourneyListContext.Provider value={state}>
        <JourneyListDispatchContext.Provider value={dispatch}>
            {children}
        </JourneyListDispatchContext.Provider>
    </JourneyListContext.Provider>
}