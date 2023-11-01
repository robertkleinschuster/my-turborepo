/* eslint-disable @typescript-eslint/no-non-null-assertion -- needed to normalize hafas client */
import type { HafasClient } from "hafas-client";
import { createClient } from "hafas-client"
import { profile as oebb } from "hafas-client/p/oebb/index"
import { profile as db } from "hafas-client/p/db/index"
import { profile as stv } from "hafas-client/p/stv/index"

const userAgent = 'OeVA';

export interface Client {
    readonly name: string
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
    protected abstract createHafas(): HafasClient
    private hafas = this.createHafas()
    abstract name: string

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
    protected createHafas(): HafasClient {
        return createClient(oebb, userAgent)
    }
}

export class DbNavigator extends BaseClient {
    readonly name: string = 'DB Navigator'
    protected createHafas(): HafasClient {
        return createClient(db, userAgent)
    }
}

export class BusBahnBim extends BaseClient {
    readonly name: string = 'BusBahnBim'
    protected createHafas(): HafasClient {
        return createClient(stv, userAgent)
    }
}

export enum ClientCode {
    OEBB,
    DB,
    STV,
}

export const clients = new Map<ClientCode, Client>([
    [ClientCode.OEBB, new OebbScotty()],
    [ClientCode.DB, new DbNavigator()],
    [ClientCode.STV, new BusBahnBim()]
])


export const defaultClient = ClientCode.OEBB

export function getClient(code: ClientCode): Client {
    const client = clients.get(code);
    if (!client) {
        throw new Error(`No client with code: ${code}`);
    }
    return client
}
