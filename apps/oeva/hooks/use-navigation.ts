import {useParams, useRouter} from "next/navigation";
import type {HistoryItem} from "../store/history";
import {useHistory} from "../store/history";
import {useAppId} from "../store/app-id";
import {useJourneyPlanner} from "../store/journey-planner";

interface Navigation {
    trip: (id: string, when: string | null, title: string) => void,
    tripNoHistory: (id: string) => void,
    station: (id: string, when: string | null, title: string) => void,
    stationNoHistory: (id: string, when: string | null) => void,
    history: (item: HistoryItem, preserveParent?: boolean) => void
    refresh: () => void
    stations: () => void
    back: () => void
    home: () => void,
    journeys: () => void
    journey: (id: string) => void
}

export function useNavigation(): Navigation {
    const router = useRouter()
    const appId = useAppId()
    const params = useParams<{ id?: string }>()
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
        history: (item: HistoryItem, preserveParent = false) => {
            historyPush(item.type, item.id, item.when, item.title, preserveParent ? item.parent : null)


            if (item.type === 'trip') {
                if (recordJourney) {
                    addTripToJourney(item.title, item.id, item.when)
                }
                router.push(`/app/trips/${encodeURIComponent(item.id)}`)
            }
            if (item.type === 'station') {
                if (recordJourney) {
                    addStationToJourney(item.title, item.id, item.when)
                }
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?when=${encodeURIComponent(item.when ?? '')}`)
            }
        },
        trip: (id: string, when: string | null, title: string) => {
            historyPush('trip', id, when, title, params.id ? decodeURIComponent(params.id) : null)
            if (recordJourney) {
                addTripToJourney(title, id, when)
            }
            router.push(`/app/trips/${encodeURIComponent(id)}`)
        },
        tripNoHistory: (id: string) => {
            router.push(`/app/trips/${encodeURIComponent(id)}`)
        },
        station: (id: string, when: string | null, title: string) => {
            historyPush('station', id, when, title, params.id ? decodeURIComponent(params.id) : null)
            if (recordJourney) {
                addStationToJourney(title, id, when)
            }
            router.push(`/app/stations/${encodeURIComponent(id)}/departures?when=${encodeURIComponent(when ?? '')}`)
        },
        stationNoHistory: (id: string, when: string | null) => {
            router.push(`/app/stations/${encodeURIComponent(id)}/departures?when=${encodeURIComponent(when ?? '')}`)
        },
        stations: () => {
            router.push(`/app/stations`)
        }
    }
}