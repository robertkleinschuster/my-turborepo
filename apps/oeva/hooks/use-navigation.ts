import {useRouter} from "next/navigation";
import type {Alternative, Station, Trip} from "hafas-client";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useEffect, useState} from "react";
import type {HistoryItem, History} from "../store/history";
import {useHistory} from "../store/history";
import {useAppId} from "../store/app-id";
import type {JourneyPlanner} from "../store/journey-planner";
import {useJourneyPlanner} from "../store/journey-planner";

interface Navigation {
    trip: (id: string, when: string | null, title: string, trip?: Trip) => void,
    alternative: (alternative: Alternative) => void,
    tripNoHistory: (id: string) => void,
    station: (id: string, when: string | null, title: string, products?: string[], station?: Station) => void,
    stationNoHistory: (id: string, when: string | null) => void,
    push: (item: HistoryItem) => void
    replace: (item: HistoryItem) => void
    push_breadcrumb: (item: HistoryItem) => void
    refresh: () => void
    stations: () => void
    trips: () => void
    back: () => void
    home: () => void,
    journeys: () => void
    history_overview: () => void
    settings: () => void
    journey: (id: string) => void,
}

export function buildSearchParams(item: HistoryItem): URLSearchParams {
    const searchParams = new URLSearchParams();
    searchParams.set('sequence', item.sequence.toString())
    searchParams.set('root', item.root.toString())

    if (item.type === 'station') {
        addStationParams(searchParams, item.params)
    }

    return searchParams;
}

export function addStationParams(searchParams: URLSearchParams, params: HistoryItem['params']): void {
    if (typeof params?.when === 'string') {
        searchParams.set('when', params.when)
    }

    if (Array.isArray(params?.products)) {
        searchParams.delete('products')
        params.products.forEach(product => {
            searchParams.append('products', product)
        })
    }
}


function createNav(
    router: AppRouterInstance,
    historyPush: History['push'],
    appId: string,
    recordJourney: JourneyPlanner['recording'],
    addStationToJourney: JourneyPlanner['addStation'],
    addTripToJourney: JourneyPlanner['addTrip'],
    historyUpdate: History['update'],
    prefetch: boolean,
    historyPrepare: History['prepare'],
): Navigation {
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
        history_overview: () => {
            const path = `/app/history`

            const item = historyPrepare('history', 'history', 'Zuletzt verwendet')
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        settings: () => {
            const path = `/app/settings`

            const item = historyPrepare('settings', 'settings', 'Einstellungen')
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        push: (item: HistoryItem) => {
            let path: null | string = null
            if (item.type === 'trip') {
                path = `/app/trips/${encodeURIComponent(item.id)}`
            }
            if (item.type === 'station') {
                if (item.params?.mode === 'arrivals') {
                    path = `/app/stations/${encodeURIComponent(item.id)}/arrivals`
                } else {
                    path = `/app/stations/${encodeURIComponent(item.id)}/departures`
                }
            }
            if (path !== null) {
                const newItem = historyPrepare(item.type, item.id, item.title, item.params)
                const searchParams = buildSearchParams(newItem)
                const href = `${path}?${searchParams.toString()}`

                if (prefetch) {
                    router.prefetch(href)
                } else {
                    historyPush(newItem)
                    router.push(href)
                }
            }
        },
        replace: (item: HistoryItem) => {
            let path: null | string = null
            if (item.type === 'trip') {
                path = `/app/trips/${encodeURIComponent(item.id)}`
            }
            if (item.type === 'station') {
                if (item.params?.mode === 'arrivals') {
                    path = `/app/stations/${encodeURIComponent(item.id)}/arrivals`
                } else {
                    path = `/app/stations/${encodeURIComponent(item.id)}/departures`
                }
            }
            if (path !== null) {
                const searchParams = buildSearchParams(item)
                const href = `${path}?${searchParams.toString()}`

                if (prefetch) {
                    router.prefetch(href)
                } else {
                    historyUpdate(item)
                    router.replace(href)
                }
            }
        },
        push_breadcrumb: (item: HistoryItem) => {
            let path: null | string = null
            let createNewItem = false
            if (item.type === 'trip') {
                path = `/app/trips/${encodeURIComponent(item.id)}`
            }
            if (item.type === 'station') {
                if (item.params?.mode === 'arrivals') {
                    path = `/app/stations/${encodeURIComponent(item.id)}/arrivals`
                } else {
                    path = `/app/stations/${encodeURIComponent(item.id)}/departures`
                }
            }
            if (item.type === 'station_search') {
                createNewItem = true
                path = `/app/stations`
            }
            if (item.type === 'trip_search') {
                createNewItem = true
                path = `/app/trips`
            }
            if (path !== null) {
                if (createNewItem) {
                    const newItem = historyPrepare(item.type, item.id, item.title, item.params)
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
        trip: (id: string, when: string | null, title: string) => {
            const path = `/app/trips/${encodeURIComponent(id)}`

            const item = historyPrepare('trip', id, title, {when})
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`

            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                if (recordJourney) {
                    addTripToJourney(title, id, when)
                }
                router.push(href)
            }
        },
        alternative: (alternative: Alternative) => {
            const id = alternative.tripId;
            const path = `/app/trips/${encodeURIComponent(id)}`

            const line = alternative.line;
            const title = `${line?.name} ${alternative.destination?.name ?? ''}`
            const when = alternative.plannedWhen ?? null
            const item = historyPrepare('trip', id, title, {when})
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                if (recordJourney) {
                    addTripToJourney(title, id, when)
                }
                router.push(href)
            }
        },
        tripNoHistory: (id: string) => {
            if (prefetch) {
                router.prefetch(`/app/trips/${encodeURIComponent(id)}`)
            } else {
                router.push(`/app/trips/${encodeURIComponent(id)}`)
            }
        },
        station: (id: string, when: string | null, title: string, products?: string[]) => {
            const path = `/app/stations/${encodeURIComponent(id)}/departures`;

            const item = historyPrepare('station', id, title, {when})
            const searchParams = buildSearchParams(item)
            if (products) {
                products.forEach(product => {
                    searchParams.append('products', product)
                })
            }

            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                if (recordJourney) {
                    addStationToJourney(title, id, when)
                }
                router.push(href)
            }
        },
        stationNoHistory: (id: string, when: string | null) => {
            const path = `/app/stations/${encodeURIComponent(id)}/departures?when=${encodeURIComponent(when ?? '')}`

            if (prefetch) {
                router.prefetch(path)
            } else {
                router.push(path)
            }
        },
        stations: () => {
            const path = `/app/stations`

            const item = historyPrepare('station_search', 'station_search', 'Stationen')
            const searchParams = buildSearchParams(item)
            const href = `${path}?${searchParams.toString()}`
            if (prefetch) {
                router.prefetch(href)
            } else {
                historyPush(item)
                router.push(href)
            }
        },
        trips: () => {
            const path = `/app/trips`

            const item = historyPrepare('trip_search', 'trip_search', 'Fahrten')
            const searchParams = buildSearchParams(item)
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
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const historyPrepare = useHistory(state => state.prepare)
    const historyUpdate = useHistory(state => state.update)
    const recordJourney = useJourneyPlanner(state => state.recording)
    const addStationToJourney = useJourneyPlanner(state => state.addStation)
    const addTripToJourney = useJourneyPlanner(state => state.addTrip)

    const [nav, setNav] = useState(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, false, historyPrepare))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, false, historyPrepare))
    }, [addStationToJourney, addTripToJourney, appId, historyPush, historyUpdate, recordJourney, router, historyPrepare])

    return nav;
}

export function usePrefetch(): Navigation {
    const router = useRouter()
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const historyPrepare = useHistory(state => state.prepare)
    const historyUpdate = useHistory(state => state.update)
    const recordJourney = useJourneyPlanner(state => state.recording)
    const addStationToJourney = useJourneyPlanner(state => state.addStation)
    const addTripToJourney = useJourneyPlanner(state => state.addTrip)

    const [nav, setNav] = useState(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, true, historyPrepare))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, true, historyPrepare))
    }, [addStationToJourney, addTripToJourney, appId, historyPush, historyUpdate, recordJourney, router, historyPrepare])

    return nav;
}