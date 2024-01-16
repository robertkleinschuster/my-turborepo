import {describe, expect, it} from "@jest/globals";
import type {HistoryItem} from "../store/history";
import {buildSearchParams} from "./use-navigation";

describe('buildSearchParams', () => {
    it('should add sequence and root', () => {
        const item: HistoryItem = {
            root: 0,
            sequence: 1,
            title: '',
            type: 'trip',
            id: '',
            params: {},
            recents: true,
            added: '',
            previous: null,
            next: null
        };

        const searchParams = buildSearchParams(item)
        expect(searchParams.get('root')).toEqual('0')
        expect(searchParams.get('sequence')).toEqual('1')
    })
    it('should add when parameter for type station station', () => {
        const item: HistoryItem = {
            root: 0,
            sequence: 1,
            title: '',
            type: 'station',
            id: '',
            params: {
                when: (new Date()).toISOString()
            },
            recents: true,
            added: '',
            previous: null,
            next: null
        };

        const searchParamsStation = buildSearchParams(item)
        expect(searchParamsStation.get('when')).toEqual(item.params?.when)

        item.type = 'settings'
        const searchParamsSettings = buildSearchParams(item)
        expect(searchParamsSettings.get('when')).toEqual(null)
    })
})