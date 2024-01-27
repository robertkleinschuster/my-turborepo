import type {ReadonlyURLSearchParams} from "next/navigation";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import type {Alternative, Location, Station, Stop, Trip} from "hafas-client";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useEffect, useState} from "react";
import type {HistoryItem, History, BaseHistoryItem} from "../store/history";
import {useHistory} from "../store/history";
import {useAppId} from "../store/app-id";
import type {ClientCode} from "../client/client-code";
import { ClientCodeDefault} from "../client/client-code";
import {useSettings} from "../store/settings";

interface Navigation {
    tripObj: (client: ClientCode, trip: Trip) => void,
    alternative: (client: ClientCode, alternative: Alternative) => void,
    stationObj: (client: ClientCode, station: Station | Stop | Location, when?: string | null) => void,
    push: (item: HistoryItem) => void
    replace: (item: HistoryItem) => void
    push_breadcrumb: (item: HistoryItem) => void
    refresh: () => void
    stations: () => void
    trips: () => void
    back: () => void
    home: () => void,
    journeys: () => void
    history_overview: (rootItem?: HistoryItem | null) => void
    settings: () => void
    journey: (id: string) => void,
}

export function buildSearchParams(item: HistoryItem): URLSearchParams {
    const searchParams = new URLSearchParams();
    searchParams.set('sequence', item.sequence.toString())
    searchParams.set('root', item.root.toString())

    if (item.type === 'station') {
        addFilterParams(searchParams, item.params)
    }

    if (item.type === 'trip_search') {
        addFilterParams(searchParams, item.params)
        if (typeof item.params?.query === 'string') {
            searchParams.set('query', item.params.query)
        }
    }

    return searchParams;
}

export function addFilterParams(searchParams: URLSearchParams, params: BaseHistoryItem['params']): void {
    if (typeof params?.when === 'string') {
        searchParams.set('when', params.when)
    }

    if (Array.isArray(params?.modes)) {
        searchParams.delete('modes')
        params.modes.forEach(mode => {
            searchParams.append('modes', mode)
        })
    }
    if (Array.isArray(params?.groups)) {
        searchParams.delete('groups')
        params.groups.forEach(group => {
            searchParams.append('groups', group)
        })
    }

    if (Array.isArray(params?.lines)) {
        searchParams.delete('lines')
        params.lines.forEach(line => {
            searchParams.append('lines', line)
        })
    }
}

export function buildPath(item: HistoryItem): string | null {
    const client = item.client ?? ClientCodeDefault.DEFAULT

    if (item.type === 'settings') {
        return `/app/settings`
    }

    if (item.type === 'history') {
        return `/app/history`
    }

    if (item.type === 'trip_search') {
        return `/app/trips/${client}`
    }

    if (item.type === 'station_search') {
        return `/app/stations/${client}`
    }

    if (item.type === 'trip') {
        return `/app/trips/${client}/${encodeURIComponent(item.id)}`
    }

    if (item.type === 'station') {
        if (item.params?.mode === 'arrivals') {
            return `/app/stations/${client}/${encodeURIComponent(item.id)}/arrivals`
        } else if (item.params?.mode === 'nearby') {
            return `/app/stations/${client}/${encodeURIComponent(item.id)}/nearby`
        } else {
            return `/app/stations/${client}/${encodeURIComponent(item.id)}/departures`
        }
    }

    return null
}


function createNav(
    router: AppRouterInstance,
    historyPush: History['push'],
    appId: string,
    historyUpdate: History['update'],
    prefetch: boolean,
    historyPrepare: History['prepare'],
    currentPathname: string,
    currentSearchParams: ReadonlyURLSearchParams,
    settingsClient: ClientCode | null
): Navigation {
    const isCurrent = (href: string): boolean => {
        return href === `${currentPathname}?${currentSearchParams.toString()}`
    }

    return {
        refresh: () => {
            router.refresh()
        },
        back: () => {
            if (!prefetch) {
                router.back()
            }
        },
        home: () => {
            const path = '/app/home'
            if (prefetch) {
                router.prefetch(path)
            } else {
                router.push(path)
            }
        },
        journeys: () => {
            const path = `/app/journeys/overview/${encodeURIComponent(appId)}`;

            const item = historyPrepare('journeys', 'journeys', 'Meine Reisen')
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        journey: (id: string) => {
            const path = `/app/journeys/${encodeURIComponent(id)}`
            if (prefetch) {
                router.prefetch(path)
            } else {
                router.push(path)
            }
        },
        history_overview: (rootItem: HistoryItem | null = null) => {
            const item = historyPrepare('history', 'history', 'Zuletzt verwendet')
            const searchParams = buildSearchParams(item)
            const path = buildPath(item)
            if (rootItem?.children?.length) {
                searchParams.set('filterRoot', rootItem.root.toString())
                searchParams.set('filterSequence', rootItem.children[rootItem.children.length - 1].sequence.toString())
            }
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        settings: () => {
            const item = historyPrepare('settings', 'settings', 'Einstellungen')
            const searchParams = buildSearchParams(item)
            const path = buildPath(item)
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        push: (item: HistoryItem) => {
            const path = buildPath(item)
            if (path !== null) {
                const newItem = historyPrepare(item.type, item.id, item.title, item.params)
                newItem.client = item.client
                newItem.info = item.info
                const searchParams = buildSearchParams(newItem)
                const href = `${path}?${searchParams.toString()}`

                if (isCurrent(href)) {
                    return;
                }

                if (prefetch) {
                    router.prefetch(href)
                } else {
                    historyPush(newItem)
                    router.push(href)
                }
            }
        },
        replace: (item: HistoryItem) => {
            const path = buildPath(item)
            if (path !== null) {
                const searchParams = buildSearchParams(item)
                const href = `${path}?${searchParams.toString()}`

                if (isCurrent(href)) {
                    return;
                }

                if (prefetch) {
                    router.prefetch(href)
                } else {
                    historyUpdate(item)
                    router.replace(href)
                }
            }
        },
        push_breadcrumb: (item: HistoryItem) => {
            const path = buildPath(item)
            if (path !== null) {
                if (item.type === 'station_search' || item.type === 'trip_search') {
                    const newItem = historyPrepare(item.type, item.id, item.title, item.params)
                    newItem.client = item.client
                    const searchParams = buildSearchParams(newItem)
                    const href = `${path}?${searchParams.toString()}`
                    if (prefetch) {
                        router.prefetch(href)
                    } else {
                        historyPush(newItem)
                        router.push(href)
                    }
                } else {
                    const searchParams = buildSearchParams(item)
                    const href = `${path}?${searchParams.toString()}`
                    if (prefetch) {
                        router.prefetch(href)
                    } else {
                        router.push(href)
                    }
                }
            }
        },
        alternative: (client, alternative: Alternative) => {
            const id = alternative.tripId;
            const line = alternative.line;
            const when = alternative.plannedWhen ?? null
            const item = historyPrepare('trip', id, line?.name ?? '', {when})
            item.client = client
            item.info = {
                line: line?.name ?? null,
                product: alternative.line?.product ?? null,
                direction: alternative.direction ?? null,
                destination: alternative.destination?.name ?? null,
                origin: alternative.origin?.name ?? null,
                provenance: alternative.provenance ?? null,
                when
            }
            const path = buildPath(item)
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        tripObj: (client, trip: Trip) => {
            const id = trip.id;
            const line = trip.line;
            const when = trip.plannedDeparture ?? trip.plannedArrival ?? null
            const item = historyPrepare('trip', id, line?.name ?? '', {when})
            item.client = client
            item.info = {
                line: line?.name ?? null,
                product: line?.product ?? null,
                direction: trip.direction ?? null,
                destination: trip.destination?.name ?? null,
                origin: trip.origin?.name ?? null,
                when
            }
            const searchParams = buildSearchParams(item)
            const path = buildPath(item)
            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        stationObj: (client: ClientCode, station: Station | Stop | Location, when: string | null = null) => {
            if (!station.id) {
                return;
            }
            const item = historyPrepare('station', station.id, station.name ?? '', {when})
            item.client = client
            item.info = {
                distance: station.distance?.toString() ?? null,
                when
            }
            const path = buildPath(item)
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        stations: () => {
            const item = historyPrepare('station_search', 'station_search', 'Stationen')
            item.id = `${item.id}-${item.sequence}`
            item.client = settingsClient
            const searchParams = buildSearchParams(item)
            const path = buildPath(item)
            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        trips: () => {
            const item = historyPrepare('trip_search', 'trip_search', 'Fahrten')
            item.id = `${item.id}-${item.sequence}`
            item.client = settingsClient
            const searchParams = buildSearchParams(item)
            const path = buildPath(item)
            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        }
    }
}

export function useNavigation(): Navigation {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const historyPrepare = useHistory(state => state.prepare)
    const historyUpdate = useHistory(state => state.update)
    const settingsClient = useSettings(state => state.client)
    const [nav, setNav] = useState(createNav(router, historyPush, appId, historyUpdate, false, historyPrepare, pathname, searchParams, settingsClient))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, historyUpdate, false, historyPrepare, pathname, searchParams, settingsClient))
    }, [appId, historyPush, historyUpdate, router, historyPrepare, pathname, searchParams, settingsClient])

    return nav;
}

export function usePrefetch(): Navigation {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const historyPrepare = useHistory(state => state.prepare)
    const historyUpdate = useHistory(state => state.update)
    const settingsClient = useSettings(state => state.client)

    const [nav, setNav] = useState(createNav(router, historyPush, appId, historyUpdate, true, historyPrepare, pathname, searchParams, settingsClient))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, historyUpdate, true, historyPrepare, pathname, searchParams, settingsClient))
    }, [appId, historyPush, historyUpdate, router, historyPrepare, pathname, searchParams, settingsClient])

    return nav;
}