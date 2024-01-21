/* eslint-disable @typescript-eslint/no-non-null-assertion -- needed to normalize hafas client */
import type {HafasClient, Products, ProductType, Profile} from "hafas-client";
import {createClient} from "hafas-client"
import {profile as oebb} from "hafas-client/p/oebb/index"
import {profile as db} from "hafas-client/p/db/index"
import {profile as stv} from "hafas-client/p/stv/index"
import type {ClientCodeParameter} from "./client-code";
import {ClientCode, ClientCodeDefault} from "./client-code";
import {buildProductsForMode, mergeProducts, validateProductsFilter} from "./products-filter";

const userAgent = 'OeVA';

export interface Client {
    readonly name: string
    readonly code: ClientCode

    get profile(): Profile

    get modes(): Mode[]

    get productGroups(): ProductGroup[]

    productsByGroup: (id: ProductGroup['id']) => Products;

    buildProductsFilter: (modes: ModesParameter, groups: ProductGroupsParameter) => Products
    validateFilter: (modes: ModesParameter, groups: ProductGroupsParameter) => boolean

    arrivals: HafasClient['arrivals']
    departures: HafasClient['departures']
    journeys: HafasClient['journeys']
    refreshJourney: Exclude<HafasClient['refreshJourney'], undefined>
    journeysFromTrip: Exclude<HafasClient['journeysFromTrip'], undefined>
    locations: HafasClient['locations']
    lines: Exclude<HafasClient['lines'], undefined>
    stop: HafasClient['stop']
    trip: Exclude<HafasClient['trip'], undefined>
    tripsByName: Exclude<HafasClient['tripsByName'], undefined>
    remarks: Exclude<HafasClient['remarks'], undefined>
    nearby: HafasClient['nearby']
    reachableFrom: Exclude<HafasClient['reachableFrom'], undefined>
    serverInfo: HafasClient['serverInfo']
}

export class InvalidHafasClientError extends Error {
}

abstract class BaseClient implements Client {
    private createHafas(): HafasClient {
        return createClient(this.profile, userAgent)
    }

    private hafas = this.createHafas()
    abstract name: string
    abstract code: ClientCode

    abstract get profile(): Profile

    get productGroups(): ProductGroup[] {
        return productGroups
    }

    abstract productsByGroup(id: ProductGroup['id']): Products

    validateFilter(modes: ModesParameter, groups: ProductGroupsParameter): boolean {
        return validateProductsFilter(this.buildProductsFilter(modes, groups))
    }

    productsByMode(id: Mode['id']): Products {
        return buildProductsForMode(this.profile.products, id)
    }

    buildProductsFilter(modes: ModesParameter, groups: ProductGroupsParameter): Products {
        let modesArray: Mode['id'][] = []
        if (Array.isArray(modes)) {
            modesArray = modes
        }
        if (typeof modes === 'string') {
            modesArray = [modes]
        }

        let groupsArray: ProductGroup['id'][] = []
        if (Array.isArray(groups)) {
            groupsArray = groups
        }
        if (typeof groups === 'string') {
            groupsArray = [groups]
        }

        const products = mergeProducts([
            mergeProducts(modesArray.map(mode => this.productsByMode(mode))),
            mergeProducts(groupsArray.map(group => this.productsByGroup(group))),
        ], true)

        if (Object.keys(products).length === 0) {
            for (const product of this.profile.products) {
                products[product.id] = true
            }
        }

        return products
    }

    get modes(): Mode[] {
        const available = this.profile.products.map(product => product.mode)
        return modes.filter(mode => available.includes(mode.id));
    }

    constructor() {
        if (undefined === this.hafas.tripsByName) {
            throw new InvalidHafasClientError('Missing `tripsByName` method.');
        }
        if (undefined === this.hafas.trip) {
            throw new InvalidHafasClientError('Missing `trip` method.');
        }
        if (undefined === this.hafas.remarks) {
            throw new InvalidHafasClientError('Missing `remarks` method.');
        }
        if (undefined === this.hafas.reachableFrom) {
            throw new InvalidHafasClientError('Missing `reachableFrom` method.');
        }
    }

    locations = this.hafas.locations
    stop = this.hafas.stop
    departures = this.hafas.departures
    arrivals = this.hafas.arrivals
    tripsByName = this.hafas.tripsByName!
    trip = this.hafas.trip!
    remarks = this.hafas.remarks!
    journeys = this.hafas.journeys
    nearby = this.hafas.nearby
    reachableFrom = this.hafas.reachableFrom!
    lines = this.hafas.lines!
    serverInfo = this.hafas.serverInfo
    journeysFromTrip = this.hafas.journeysFromTrip!
    refreshJourney = this.hafas.refreshJourney!
}

export class OebbScotty extends BaseClient {
    readonly name: string = 'ÖBB Scotty'
    readonly code: ClientCode = ClientCode.OEBB

    get profile(): Profile & {auth: object, client: object, ext: string, ver: string} {
        return {
            ...oebb,
            auth: {
                "type": "AID",
                "aid": "5vHavmuWPWIfetEe"
            },
            client: {
                "id": "OEBB",
                "type": "WEB",
                "name": "webapp",
                "l": "vs_webapp",
                "v": "20230821"
            },
            ext: "OEBB.13",
            ver: "1.57",
        };
    }

    productsByGroup(id: ProductGroup['id']): Products {
        return {
            nationalExpress: id === 'long-distance',
            national: id === 'long-distance' || id === 'regional',
            interregional: id === 'long-distance' || id === 'regional',
            regional: id === 'regional',
            suburban: id === 'city' || id === 'regional',
            bus: id === 'other' || id === 'city' || id === 'regional',
            ferry: id === 'other',
            subway: id === 'city',
            tram: id === 'city',
            onCall: id === 'other',
        }
    }
}

export class DbNavigator extends BaseClient {
    readonly name: string = 'DB Navigator'
    readonly code: ClientCode = ClientCode.DB

    get profile(): Profile {
        return db;
    }

    productsByGroup(id: ProductGroup['id']): Products {
        return {
            nationalExpress: id === 'long-distance',
            national: id === 'long-distance' || id === 'regional',
            regionalExpress: id === 'regional',
            regional: id === 'regional',
            suburban: id === 'city' || id === 'regional',
            bus: id === 'city' || id === 'regional' || id === 'other',
            ferry: id === 'other',
            subway: id === 'city',
            tram: id === 'city',
            taxi: id === 'other',
        }
    }
}

export class BusBahnBim extends BaseClient {
    readonly name: string = 'BusBahnBim'
    readonly code: ClientCode = ClientCode.STV

    get profile(): Profile {
        return stv;
    }

    productsByGroup(id: ProductGroup['id']): Products {
        return {
            'train-and-s-bahn': id === 'long-distance' || id === 'regional',
            'u-bahn': id === 'city',
            tram: id === 'city',
            'city-bus': id === 'city',
            'regional-bus': id === 'regional',
            'long-distance-bus': id === 'long-distance',
            'other-bus': id === 'other',
            'aerial-lift': id === 'other',
            ferry: id === 'other',
            'on-call': id === 'other'
        }
    }
}


export const clients = new Map<ClientCode, Client>([
    [ClientCode.OEBB, new OebbScotty()],
    [ClientCode.DB, new DbNavigator()],
    [ClientCode.STV, new BusBahnBim()]
])

export interface Mode {
    id: ProductType['mode'],
    name: string,
    filter: boolean
}

export type ModesParameter = Mode['id'] | Mode['id'][] | null | undefined
export type ProductGroupsParameter = ProductGroup['id'] | ProductGroup['id'][] | null | undefined

export interface ProductGroup {
    id: 'city' | 'regional' | 'long-distance' | 'other',
    name: string,
}

const productGroups: ProductGroup[] = [
    {
        id: 'city',
        name: 'Stadtverkehr',
    },
    {
        id: 'regional',
        name: 'Regionalverkehr',
    },
    {
        id: 'long-distance',
        name: 'Fernverkehr',
    },
    {
        id: 'other',
        name: 'Andere',
    }
]

const modes: Mode[] = [
    {
        id: 'bus',
        name: 'Busse',
        filter: true,
    },
    {
        id: 'train',
        name: 'Schienenfahrzeuge',
        filter: true,
    },
    {
        id: 'watercraft',
        name: 'Wasserfahrzeuge',
        filter: true,
    },
    {
        id: 'gondola',
        name: 'Gondel',
        filter: true,
    },
    {
        id: 'taxi',
        name: 'AST',
        filter: false,
    },
    {
        id: 'aircraft',
        name: 'Flugzeug',
        filter: false,
    },
    {
        id: 'car',
        name: 'Auto',
        filter: false,
    },
    {
        id: 'bicycle',
        name: 'Fahrrad',
        filter: false,
    },
    {
        id: 'walking',
        name: 'zu Fuß',
        filter: false,
    },
]

const defaultClient = ClientCode.STV

export function getClient(code: ClientCodeParameter | null | undefined = null): Client {
    const client = clients.get(code && code !== ClientCodeDefault.DEFAULT ? code : defaultClient);
    if (!client) {
        throw new Error(`No client with code: ${code}`);
    }
    return client
}

export {
    ClientCode,
    ClientCodeDefault,
    type ClientCodeParameter
}