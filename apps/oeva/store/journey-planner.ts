import {create} from "zustand";

interface JourneyPlanner {
    legs: readonly string[],
    push: (url: string) => void,
    pop: () => void,
}

export const useJourneyPlanner = create<JourneyPlanner>(set => ({
    legs: [],
    push: (leg: string) => {
        set(state => ({
            legs: [...state.legs, leg]
        }))
    },
    pop: () => {
        set(state => ({
            legs: [...state.legs.slice(0, state.legs.length - 1)]
        }))
    }
}))

