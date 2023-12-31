/* eslint-disable @typescript-eslint/no-non-null-assertion -- needed to normalize hafas client */
import type { HafasClient, Profile } from "hafas-client";
import { createClient } from "hafas-client"
import { profile as oebb } from "hafas-client/p/oebb/index"
import { profile as db } from "hafas-client/p/db/index"
import { profile as stv } from "hafas-client/p/stv/index"

const userAgent = 'OeVA';

export interface Client {
    readonly name: string
    get profile(): Profile
    locations: HafasClient['locations']
    stop: HafasClient['stop']
    departures: HafasClient['departures']
    arrivals: HafasClient['arrivals']
    tripsByName: Exclude<HafasClient['tripsByName'], undefined>
    trip: Exclude<HafasClient['trip'], undefined>
    remarks: Exclude<HafasClient['remarks'], undefined>
    journeys: HafasClient['journeys']
    nearby: HafasClient['nearby']
    reachableFrom: Exclude<HafasClient['reachableFrom'], undefined>
}

export class InvalidHafasClientError extends Error {
}

abstract class BaseClient implements Client {
    private createHafas(): HafasClient {
        return createClient(this.profile, userAgent)
    }
    private hafas = this.createHafas()
    abstract name: string
    abstract get profile(): Profile

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
}

export class OebbScotty extends BaseClient {
    readonly name: string = 'ÖBB Scotty'

    get profile(): Profile {
        return oebb;
    }
}

export class DbNavigator extends BaseClient {
    readonly name: string = 'DB Navigator'
    get profile(): Profile {
        return db;
    }
}

export class BusBahnBim extends BaseClient {
    readonly name: string = 'BusBahnBim'
    get profile(): Profile {
        return stv;
    }
}

export enum ClientCode {
    OEBB = 'oebb',
    DB = 'db',
    STV = 'stv'
}

export const clients = new Map<ClientCode, Client>([
    [ClientCode.OEBB, new OebbScotty()],
    [ClientCode.DB, new DbNavigator()],
    [ClientCode.STV, new BusBahnBim()]
])


export const defaultClient = ClientCode.STV

export function getClient(code: ClientCode = defaultClient): Client {
    const client = clients.get(code);
    if (!client) {
        throw new Error(`No client with code: ${code}`);
    }
    return client
}
