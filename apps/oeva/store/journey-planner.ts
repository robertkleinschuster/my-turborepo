import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {Journey, JourneyLegCreate} from "../lib/prisma";

export interface JourneyPlanner {
    journey: Journey & { legs?: JourneyLegCreate[] } | null
    recording: boolean
    pause: () => void,
    resume: () => void,
    plan: (journey: Journey) => void
    addStation: (name: string, id: string, when: string | null) => void
    addTrip: (name: string, id: string, when: string | null) => void
    finish: () => Journey & { legs?: JourneyLegCreate[] }
}

export const useJourneyPlanner = create(
    persist<JourneyPlanner>(
        (set, get) => ({
            journey: null,
            recording: false,
            plan: (journey: Journey) => {
                set(() => ({recording: true, journey: {...journey, legs: []}}))
            },
            finish: () => {
                const journey = get().journey
                if (!journey) {
                    throw new Error('No journey in planning.')
                }
                set(() => ({recording: false, journey: null}))
                return journey;
            },
            pause: () => {
                set(() => ({recording: false}))
            },
            resume: () => {
                set(() => ({recording: true}))
            },
            addStation: (name: string, id: string, when: string | null) => {
                set(state => {
                    if (!state.journey) {
                        throw new Error('No journey in planning.')
                    }

                    const legs = state.journey.legs ?? []
                    const leg: JourneyLegCreate = {
                        journeyId: state.journey.id,
                        type: 'STAY',
                        name,
                        extId: id,
                        extType: 'STATION',
                        timeStart: when ? new Date(when) : null
                    }

                    return {
                        journey: {
                            ...state.journey,
                            legs: [...legs, leg]
                        }
                    }
                })
            },
            addTrip: (name: string, id: string, when: string | null) => {
                set(state => {
                    if (!state.journey) {
                        throw new Error('No journey in planning.')
                    }
                    const legs = state.journey.legs ?? []
                    const leg: JourneyLegCreate = {
                        journeyId: state.journey.id,
                        type: 'TRIP',
                        name,
                        extId: id,
                        extType: 'TRIP',
                        timeStart: when ? new Date(when) : null
                    }

                    return {
                        journey: {
                            ...state.journey,
                            legs: [...legs, leg]
                        }
                    }
                })
            }
        }),
        {
            name: 'journey-planner',
        },
    )
)