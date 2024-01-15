import {useRouter} from "next/navigation";
import type {HistoryItem} from "../store/history";
import {useHistory} from "../store/history";
import {useAppId} from "../store/app-id";
import {useJourneyPlanner} from "../store/journey-planner";
import type {Alternative, Station, Trip} from "hafas-client";

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
    journey: (id: string) => void,
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
            router.push(`/app/journeys/overview/${encodeURIComponent(appId)}`)
        },
        journey: (id: string) => {
            router.push(`/app/journeys/${encodeURIComponent(id)}`)
        },
        history: (item: HistoryItem) => {
            const newItem = historyPush(item.type, item.id, item.when, item.title)
            if (item.type === 'trip') {
                router.push(`/app/trips/${encodeURIComponent(item.id)}?sequence=${newItem?.sequence}&root=${newItem?.root}`)
            }
            if (item.type === 'station') {
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?when=${encodeURIComponent(item.when ?? '')}&sequence=${newItem?.sequence}&root=${newItem?.root}`)
            }
        },
        breadcrumb: (item: HistoryItem) => {
            if (item.type === 'trip') {
                router.push(`/app/trips/${encodeURIComponent(item.id)}?sequence=${item.sequence}&root=${item.root}`)
            }
            if (item.type === 'station') {
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?when=${encodeURIComponent(item.when ?? '')}&sequence=${item.sequence}&root=${item.root}`)
            }
            if (item.type === 'station_search') {
                const newItem = historyPush(item.type, item.id, item.when, item.title)
                router.push(`/app/stations?sequence=${newItem?.sequence}&root=${newItem?.root}`)
            }
            if (item.type === 'trip_search') {
                const newItem = historyPush(item.type, item.id, item.when, item.title)
                router.push(`/app/trips?sequence=${newItem?.sequence}&root=${newItem?.root}`)
            }
        },
        trip: (id: string, when: string | null, title: string) => {
            const item = historyPush('trip', id, when, title)
            if (recordJourney) {
                addTripToJourney(title, id, when)
            }
            router.push(`/app/trips/${encodeURIComponent(id)}?sequence=${item?.sequence}&root=${item?.root}`)
        },
        alternative: (alternative: Alternative) => {
            const id = alternative.tripId;
            const line = alternative.line;
            const title = `${line?.name} ${alternative.destination?.name ?? ''}`
            const when = alternative.plannedWhen ?? null
            const item = historyPush('trip', id, when, title)
            if (recordJourney) {
                addTripToJourney(title, id, when)
            }
            router.push(`/app/trips/${encodeURIComponent(id)}?sequence=${item?.sequence}&root=${item?.root}`)
        },
        tripNoHistory: (id: string) => {
            router.push(`/app/trips/${encodeURIComponent(id)}`)
        },
        station: (id: string, when: string | null, title: string, products?: string[]) => {
            const item = historyPush('station', id, when, title)
            if (recordJourney) {
                addStationToJourney(title, id, when)
            }
            const searchParams = new URLSearchParams();
            if (when) {
                searchParams.set('when', when)
            }
            if (item) {
                searchParams.set('sequence', item.sequence.toString())
                if (item.root) {
                    searchParams.set('root', item.root.toString())
                }
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
            const item = historyPush('station_search', 'trip_search', null, 'Stationen')
            router.push(`/app/stations?sequence=${item?.sequence}&root=${item?.root}`)
        },
        trips: () => {
            const item = historyPush('trip_search', 'trip_search', null, 'Fahrten')
            router.push(`/app/trips?sequence=${item?.sequence}&root=${item?.root}`)
        }
    }
}