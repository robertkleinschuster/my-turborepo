import {describe, expect, it} from "@jest/globals";
import {renderHook, act} from "@testing-library/react";
import {useHistory} from "./history";

describe('History', () => {
    it('should contain items in the order they were pushed', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('stations', '1', '')
            push.result.current('trips', 'A', '')
            push.result.current('stations', '2', '')
        })

        expect(items.result.current.map(item => item.id)).toEqual(['1', 'A', '2'])
    })
    it('should save the date when an item is added', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        const check = (new Date()).getTime()
        act(() => {
            push.result.current('stations', '1', '')
        })

        expect(new Date(items.result.current[0].added).getTime()).toBeGreaterThanOrEqual(check)
    })
    it('should expose recents only showing the latest entry for each id', () => {
        const recents = renderHook(() => useHistory(state => state.recents))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('stations', '1', '')
            push.result.current('trips', 'A', '')
            push.result.current('stations', '2', '')
            push.result.current('stations', '1', '')
        })

        expect(recents.result.current().map(item => item.id)).toEqual(['1', '2', 'A'])
    })
    it('should contain the given title in its items', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('stations', '1', 'the title')
        })

        expect(items.result.current[0].title).toEqual('the title')
    })
    it('should clear all items', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))
        const clear = renderHook(() => useHistory(state => state.clear))

        act(() => {
            push.result.current('stations', '1', '')
            push.result.current('trips', 'A', '')
            push.result.current('stations', '2', '')
            clear.result.current()
        })

        expect(items.result.current).toHaveLength(0)
    })
})