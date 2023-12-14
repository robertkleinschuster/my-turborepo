import {describe, expect, it} from "@jest/globals";
import {renderHook, act} from "@testing-library/react";
import {useHistory} from "./history";

describe('History', () => {
    it('should contain items in the order they were pushed', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('station', '1', null, '')
            push.result.current('trip', 'A',  null, '')
            push.result.current('station', '2',  null, '')
        })

        expect(items.result.current.map(item => item.id)).toEqual(['1', 'A', '2'])
    })
    it('should set the most recent item matching the given parent id as the parent for the new item', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('station', '1',  null, '')
            push.result.current('trip', 'A',  null, '')
            push.result.current('station', '2',  null, '', '1')
        })

        expect(items.result.current.map(item => item.parent?.id)).toEqual([undefined, undefined, '1'])
    })
    it ('should increment the sequence number for each added item', () =>{
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('station', '1',  null, '')
            push.result.current('trip', 'A',  null, '')
            push.result.current('station', '2',  null, '')
        })

        expect(items.result.current.map(item => item.sequence)).toEqual([0, 1, 2])
    })
    it('should save the date when an item is added', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        const check = (new Date()).getTime()
        act(() => {
            push.result.current('station', '1',  null, '')
        })

        expect(new Date(items.result.current[0].added).getTime()).toBeGreaterThanOrEqual(check)
    })
    it('should expose recents only showing the latest entry for each id', () => {
        const recents = renderHook(() => useHistory(state => state.recents))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('station', '1',  null, '')
            push.result.current('trip', 'A',  null, '')
            push.result.current('station', '2',  null, '')
            push.result.current('station', '1',  null, '')
        })

        expect(recents.result.current.map(item => item.id)).toEqual(['1', '2', 'A'])
    })
    it('should contain the given title in its items', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const push = renderHook(() => useHistory(state => state.push))

        act(() => {
            push.result.current('station', '1', null, 'the title')
        })

        expect(items.result.current[0].title).toEqual('the title')
    })
    it('should clear all items', () => {
        const items = renderHook(() => useHistory(state => state.items))
        const recents = renderHook(() => useHistory(state => state.recents))
        const push = renderHook(() => useHistory(state => state.push))
        const clear = renderHook(() => useHistory(state => state.clear))

        act(() => {
            push.result.current('station', '1',  null, '')
            push.result.current('trip', 'A',  null, '')
            push.result.current('station', '2',  null, '')
            clear.result.current()
        })

        expect(items.result.current).toHaveLength(0)
        expect(recents.result.current).toHaveLength(0)
    })
    it('should hide all items with a specific id in recents', () => {
        const recents = renderHook(() => useHistory(state => state.recents))
        const push = renderHook(() => useHistory(state => state.push))
        const hideInRecents = renderHook(() => useHistory(state => state.hideInRecents))

        act(() => {
            push.result.current('station', '1',  null, '')
            push.result.current('station', '1',  null, '')
            push.result.current('trip', 'A',  null, '')
            push.result.current('station', '1',  null, '')
            push.result.current('trip', 'B',  null, '')
            push.result.current('station', '2',  null, '')
            push.result.current('trip', 'B',  null, '')

            hideInRecents.result.current('1')
            hideInRecents.result.current('B')
        })

        expect(recents.result.current.map(item => item.id)).toEqual(['2', 'A'])
    })
})