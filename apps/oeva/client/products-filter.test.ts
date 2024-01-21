import {describe, expect, it} from "@jest/globals";
import type {Products, ProductType} from "hafas-client";
import {buildProductsForMode, mergeProducts} from "./products-filter";

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
            }, {
                id: 'bus',
                name: 'Bus',
                short: 'Bus',
                mode: 'bus',
                default: false,
                bitmasks: []
            }
        ];

        const filter = buildProductsForMode(available, 'train');

        expect(filter).toEqual({
            tram: true,
            train: true,
            bus: false,
        })
    })
    it('should merge products objects by keeping keys true that are true all objects', () => {
        const products: Products[] = [
            {
                tram: true,
                train: false,
                bus: false,
            },
            {
                tram: true,
                train: true,
                bus: true,
            },
            {
                tram: true,
                train: false,
                bus: true,
            },
            {
                tram: true,
                subway: false
            },
        ]

        expect(mergeProducts(products, true)).toEqual({
            tram: true,
            train: false,
            bus: false,
            subway: false,
        })
    })
    it('should merge products objects by keeping keys true that are true in at least one object', () => {
        const products: Products[] = [
            {
                tram: true,
                train: false,
                bus: false,
            },
            {
                tram: true,
                train: true,
                bus: true,
            },
            {
                tram: true,
                train: false,
                bus: true,
            },
            {
                tram: true,
                subway: false
            },
        ]

        expect(mergeProducts(products)).toEqual({
            tram: true,
            train: true,
            bus: true,
            subway: false,
        })
    })
})
