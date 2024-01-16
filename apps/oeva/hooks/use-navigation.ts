import {useRouter} from "next/navigation";
import type {Alternative, Station, Trip} from "hafas-client";
import type {HistoryItem} from "../store/history";
import {useHistory} from "../store/history";
import {useAppId} from "../store/app-id";
import {useJourneyPlanner} from "../store/journey-planner";

interface Navigation {
    trip: (id: string, when: string | null, title: string, trip?: Trip) => void,
    alternative: (alternative: Alternative) => void,
    tripNoHistory: (id: string) => void,
    station: (id: string, when: string | null, title: string, products?: string[], station?: Station) => void,
    stationNoHistory: (id: string, when: string | null) => void,
    history: (item: HistoryItem) => void
    breadcrumb: (item: HistoryItem) => void
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

    if (item.type === 'station' && item.params.when !== null) {
        searchParams.set('when', item.params.when)
    }

    return searchParams;
}

export function useNavigation(): Navigation {
    const router = useRouter()
    const appId = useAppId()
    const historyPush = useHistory(state => state.push)
    const recordJourney = useJourneyPlanner(state => state.recording)
    const addStationToJourney = useJourneyPlanner(state => state.addStation)
    const addTripToJourney = useJourneyPlanner(state => state.addTrip)

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
            const item = historyPush('journeys', 'journeys', null, 'Meine Reisen')
            const searchParams = buildSearchParams(item)
            router.push(`/app/journeys/overview/${encodeURIComponent(appId)}?${searchParams.toString()}`)
        },
        journey: (id: string) => {
            router.push(`/app/journeys/${encodeURIComponent(id)}`)
        },
        history_overview: () => {
            const item = historyPush('history', 'history', null, 'Zuletzt verwendet')
            router.push(`/app/history?sequence=${item?.sequence}&root=${item?.root}`)
        },
        settings: () => {
            const item = historyPush('settings', 'settings', null, 'Einstellungen')
            router.push(`/app/settings?sequence=${item?.sequence}&root=${item?.root}`)
        },
        history: (item: HistoryItem) => {
            const newItem = historyPush(item.type, item.id, item.when, item.title, item.params)
            const searchParams = buildSearchParams(newItem)
            if (item.type === 'trip') {
                router.push(`/app/trips/${encodeURIComponent(item.id)}?${searchParams.toString()}`)
            }
            if (item.type === 'station') {
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?when=${encodeURIComponent(item.when ?? '')}&sequence=${newItem?.sequence}&root=${newItem?.root}`)
            }
        },
        breadcrumb: (item: HistoryItem) => {
            if (item.type === 'trip') {
                const searchParams = buildSearchParams(item)
                router.push(`/app/trips/${encodeURIComponent(item.id)}?${searchParams.toString()}`)
            }
            if (item.type === 'station') {
                const searchParams = buildSearchParams(item)
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?when=${searchParams.toString()}`)
            }
            if (item.type === 'station_search') {
                const newItem = historyPush(item.type, item.id, item.when, item.title, item.params)
                const searchParams = buildSearchParams(newItem)
                router.push(`/app/stations?${searchParams.toString()}`)
            }
            if (item.type === 'trip_search') {
                const newItem = historyPush(item.type, item.id, item.when, item.title, item.params)
                const searchParams = buildSearchParams(newItem)
                router.push(`/app/trips?${searchParams.toString()}`)
            }
        },
        trip: (id: string, when: string | null, title: string) => {
            const item = historyPush('trip', id, when, title)
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
            const item = historyPush('trip', id, when, title)
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
            const item = historyPush('station', id, when, title)
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
            const item = historyPush('station_search', 'station_search', null, 'Stationen')
            const searchParams = buildSearchParams(item)
            router.push(`/app/stations?${searchParams.toString()}`)
        },
        trips: () => {
            const item = historyPush('trip_search', 'trip_search', null, 'Fahrten')
            const searchParams = buildSearchParams(item)
            router.push(`/app/trips?${searchParams.toString()}`)
        }
    }
}