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
    historyUpdate: History['update']
): Navigation {
    return {
        refresh: () => {
            router.refresh()
        },
        back: () => {
            router.back()
        },
        home: () => {
            router.push('/app/home')
        },
        journeys: () => {
            const item = historyPush('journeys', 'journeys', 'Meine Reisen')
            const searchParams = buildSearchParams(item)
            router.push(`/app/journeys/overview/${encodeURIComponent(appId)}?${searchParams.toString()}`)
        },
        journey: (id: string) => {
            router.push(`/app/journeys/${encodeURIComponent(id)}`)
        },
        history_overview: () => {
            const item = historyPush('history', 'history', 'Zuletzt verwendet')
            const searchParams = buildSearchParams(item)
            router.push(`/app/history?${searchParams.toString()}`)
        },
        settings: () => {
            const item = historyPush('settings', 'settings', 'Einstellungen')
            const searchParams = buildSearchParams(item)
            router.push(`/app/settings?${searchParams.toString()}`)
        },
        push: (item: HistoryItem) => {
            const newItem = historyPush(item.type, item.id, item.title, item.params)
            const searchParams = buildSearchParams(newItem)
            if (item.type === 'trip') {
                router.push(`/app/trips/${encodeURIComponent(item.id)}?${searchParams.toString()}`)
            }
            if (item.type === 'station') {
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?${searchParams.toString()}`)
            }
        },
        replace: (item: HistoryItem) => {
            historyUpdate(item)
            const searchParams = buildSearchParams(item)
            if (item.type === 'trip') {
                router.replace(`/app/trips/${encodeURIComponent(item.id)}?${searchParams.toString()}`)
            }
            if (item.type === 'station') {
                router.replace(`/app/stations/${encodeURIComponent(item.id)}/departures?${searchParams.toString()}`)
            }
        },
        push_breadcrumb: (item: HistoryItem) => {
            if (item.type === 'trip') {
                const searchParams = buildSearchParams(item)
                router.push(`/app/trips/${encodeURIComponent(item.id)}?${searchParams.toString()}`)
            }
            if (item.type === 'station') {
                const searchParams = buildSearchParams(item)
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?${searchParams.toString()}`)
            }
            if (item.type === 'station_search') {
                const newItem = historyPush(item.type, item.id, item.title, item.params)
                const searchParams = buildSearchParams(newItem)
                router.push(`/app/stations?${searchParams.toString()}`)
            }
            if (item.type === 'trip_search') {
                const newItem = historyPush(item.type, item.id, item.title, item.params)
                const searchParams = buildSearchParams(newItem)
                router.push(`/app/trips?${searchParams.toString()}`)
            }
        },
        trip: (id: string, when: string | null, title: string) => {
            const item = historyPush('trip', id, title, {when})
            const searchParams = buildSearchParams(item)
            if (recordJourney) {
                addTripToJourney(title, id, when)
            }
            router.push(`/app/trips/${encodeURIComponent(id)}?${searchParams.toString()}`)
        },
        alternative: (alternative: Alternative) => {
            const id = alternative.tripId;
            const line = alternative.line;
            const title = `${line?.name} ${alternative.destination?.name ?? ''}`
            const when = alternative.plannedWhen ?? null
            const item = historyPush('trip', id, title, {when})
            const searchParams = buildSearchParams(item)
            if (recordJourney) {
                addTripToJourney(title, id, when)
            }
            router.push(`/app/trips/${encodeURIComponent(id)}?${searchParams.toString()}`)
        },
        tripNoHistory: (id: string) => {
            router.push(`/app/trips/${encodeURIComponent(id)}`)
        },
        station: (id: string, when: string | null, title: string, products?: string[]) => {
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
            router.push(`/app/stations/${encodeURIComponent(id)}/departures?${searchParams.toString()}`)
        },
        stationNoHistory: (id: string, when: string | null) => {
            router.push(`/app/stations/${encodeURIComponent(id)}/departures?when=${encodeURIComponent(when ?? '')}`)
        },
        stations: () => {
            const item = historyPush('station_search', 'station_search', 'Stationen')
            const searchParams = buildSearchParams(item)
            router.push(`/app/stations?${searchParams.toString()}`)
        },
        trips: () => {
            const item = historyPush('trip_search', 'trip_search', 'Fahrten')
            const searchParams = buildSearchParams(item)
            router.push(`/app/trips?${searchParams.toString()}`)
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

    const [nav, setNav] = useState(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate))

    useEffect(() => {
        setNav(createNav(router, historyPush, appId, recordJourney, addStationToJourney, addTripToJourney, historyUpdate))
    }, [addStationToJourney, addTripToJourney, appId, historyPush, historyUpdate, recordJourney, router])

    return nav;
}