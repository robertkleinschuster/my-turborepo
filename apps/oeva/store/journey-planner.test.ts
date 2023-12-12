import {describe, expect, it} from "@jest/globals";
import {renderHook, act} from "@testing-library/react";
import {useJourneyPlanner} from "./journey-planner";

describe('JourneyPlanner', () => {
    it('should contain legs in the order they were pushed', () => {

        const legs = renderHook(() => useJourneyPlanner(state => state.legs))
        const push = renderHook(() => useJourneyPlanner(state => state.push))

        act(() => {
            push.result.current('1')
            push.result.current('2')
            push.result.current('3')
        })

        expect(legs.result.current).toEqual(['1', '2', '3'])
    })

    it('should remove the last added leg', () => {
        const legs = renderHook(() => useJourneyPlanner(state => state.legs))
        const push = renderHook(() => useJourneyPlanner(state => state.push))
        const pop = renderHook(() => useJourneyPlanner(state => state.pop))

        act(() => {
            push.result.current('1')
            push.result.current('2')
            push.result.current('3')
            pop.result.current()
        })

        expect(legs.result.current).toEqual(['1', '2'])
    })
})