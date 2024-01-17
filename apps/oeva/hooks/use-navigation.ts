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
    prefetch: boolean
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
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('journeys', 'journeys', 'Meine Reisen')
                const searchParams = buildSearchParams(item)
                router.push(`${path}?${searchParams.toString()}`)
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
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('history', 'history', 'Zuletzt verwendet')
                const searchParams = buildSearchParams(item)
                router.push(`${path}?${searchParams.toString()}`)
            }
        },
        settings: () => {
            const path = `/app/settings`
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('settings', 'settings', 'Einstellungen')
                const searchParams = buildSearchParams(item)
                router.push(`${path}?${searchParams.toString()}`)
            }
        },
        push: (item: HistoryItem) => {
            let path: null | string = null
            if (item.type === 'trip') {
                path = `/app/trips/${encodeURIComponent(item.id)}`
            }
            if (item.type === 'station') {
                path = `/app/stations/${encodeURIComponent(item.id)}/departures`
            }
            if (path !== null) {
                if (prefetch) {
                    router.prefetch(path)
                } else {
                    const newItem = historyPush(item.type, item.id, item.title, item.params)
                    const searchParams = buildSearchParams(newItem)
                    router.push(`${path}?${searchParams.toString()}`)
                }
            }
        },
        replace: (item: HistoryItem) => {
            let path: null | string = null
            if (item.type === 'trip') {
                path = `/app/trips/${encodeURIComponent(item.id)}`
            }
            if (item.type === 'station') {
                path = `/app/stations/${encodeURIComponent(item.id)}/departures`
            }
            if (path !== null) {
                if (prefetch) {
                    router.prefetch(path)
                } else {
                    historyUpdate(item)
                    const searchParams = buildSearchParams(item)
                    router.replace(`${path}?${searchParams.toString()}`)
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
                path = `/app/stations/${encodeURIComponent(item.id)}/departures`
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
                if (prefetch) {
                    router.prefetch(path)
                } else if (createNewItem) {
                    const newItem = historyPush(item.type, item.id, item.title, item.params)
                    const searchParams = buildSearchParams(newItem)
                    router.push(`${path}?${searchParams.toString()}`)
                } else {
                    const searchParams = buildSearchParams(item)
                    router.push(`${path}?${searchParams.toString()}`)
                }
            }
        },
        trip: (id: string, when: string | null, title: string) => {
            const path = `/app/trips/${encodeURIComponent(id)}`
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('trip', id, title, {when})
                const searchParams = buildSearchParams(item)
                if (recordJourney) {
                    addTripToJourney(title, id, when)
                }
                router.push(`${path}?${searchParams.toString()}`)
            }
        },
        alternative: (alternative: Alternative) => {
            const id = alternative.tripId;
            const path = `/app/trips/${encodeURIComponent(id)}`
            if (prefetch) {
                router.prefetch(path)
            } else {
                const line = alternative.line;
                const title = `${line?.name} ${alternative.destination?.name ?? ''}`
                const when = alternative.plannedWhen ?? null
                const item = historyPush('trip', id, title, {when})
                const searchParams = buildSearchParams(item)
                if (recordJourney) {
                    addTripToJourney(title, id, when)
                }
                router.push(`${path}?${searchParams.toString()}`)
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
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('station', id, title, {when})
                const searchParams = buildSearchParams(item)
                if (recordJourney) {
                    addStationToJourney(title, id, when)
                }
                if (products) {
                    products.forEach(product => {
                        searchParams.append('products', product)
                    })
                }
                router.push(`${path}?${searchParams.toString()}`)
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

            const path = `/app/stations`;
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('station_search', 'station_search', 'Stationen')
                const searchParams = buildSearchParams(item)
                router.push(`${path}?${searchParams.toString()}`)
            }
        },
        trips: () => {
            const path = `/app/trips`
            if (prefetch) {
                router.prefetch(path)
            } else {
                const item = historyPush('trip_search', 'trip_search', 'Fahrten')
                const searchParams = buildSearchParams(item)
                router.push(`${path}?${searchParams.toString()}`)
            }
        }
    }
}

export function useNavigation(): Navigation {
    const router = useRouter()
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const historyUpdate = useHistory(state => state.update)
    const recordJourney = useJourneyPlanner(state => state.recording)
    const addStationToJourney = useJourneyPlanner(state => state.addStation)
    const addTripToJourney = useJourneyPlanner(state => state.addTrip)

    const [nav, setNav] = useState(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, false))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, false))
    }, [addStationToJourney, addTripToJourney, appId, historyPush, historyUpdate, recordJourney, router])

    return nav;
}

export function usePrefetch(): Navigation {
    const router = useRouter()
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const historyUpdate = useHistory(state => state.update)
    const recordJourney = useJourneyPlanner(state => state.recording)
    const addStationToJourney = useJourneyPlanner(state => state.addStation)
    const addTripToJourney = useJourneyPlanner(state => state.addTrip)

    const [nav, setNav] = useState(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, true))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate, true))
    }, [addStationToJourney, addTripToJourney, appId, historyPush, historyUpdate, recordJourney, router])

    return nav;
}