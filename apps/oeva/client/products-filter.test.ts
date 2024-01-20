import {describe, expect, it} from "@jest/globals";
import type {ProductType} from "hafas-client";
import {buildProductsFilter} from "./products-filter";

describe('buildProductsFilter', () => {
    it('should transform a list of strings to object with boolean properties', () => {
        const available: ProductType[] = [
            {
                id: 'tram',
                name: 'Tram',
                short: 'tram',
                mode: 'train',
                default: false,
                bitmasks: []
            },
            {
                id: 'train',
                name: 'Train',
                short: 'Train',
                mode: 'train',
                default: false,
                bitmasks: []
            },   {
                id: 'bus',
                name: 'Bus',
                short: 'Bus',
                mode: 'bus',
                default: false,
                bitmasks: []
            }
        ];
        const filter = buildProductsFilter(available, ['train']);

        expect(filter).toEqual({
            tram: true,
            train: true,
            bus: false,
        })
    })
    it('should return empty object for null or empty list', () => {
        const available: ProductType[] = [
            {
                id: 'tram',
                name: 'Tram',
                short: 'tram',
                mode: 'train',
                default: false,
                bitmasks: []
            },
            {
                id: 'train',
                name: 'Train',
                short: 'Train',
                mode: 'train',
                default: false,
                bitmasks: []
            }
        ];

        expect(buildProductsFilter(available, [])).toEqual({})
        expect(buildProductsFilter(available, null)).toEqual({})

    })
})
