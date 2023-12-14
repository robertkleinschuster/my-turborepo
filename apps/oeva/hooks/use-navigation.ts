import {useParams, useRouter} from "next/navigation";
import type {HistoryItem} from "../store/history";
import { useHistory} from "../store/history";

interface Navigation {
    trip: (id: string, when: string | null, title: string) => void,
    station: (id: string, when: string | null, title: string) => void,
    history: (item: HistoryItem) => void
    refresh: () => void
    back: () => void
}

export function useNavigation(): Navigation {
    const router = useRouter()
    const params = useParams<{id?: string}>()
    const historyPush = useHistory(state => state.push)

    return {
        refresh: () => {
            router.refresh()
        },
        back: () => {
            router.back()
        },
        history: (item: HistoryItem) => {
            historyPush(item.type, item.id, item.when, item.title, item.parent)

            if (item.type === 'trip') {
                router.push(`/app/trips/${encodeURIComponent(item.id)}`)
            }
            if (item.type === 'station') {
                router.push(`/app/stations/${encodeURIComponent(item.id)}/departures?when=${encodeURIComponent(item.when ?? '')}`)
            }
        },
        trip: (id: string, when: string | null, title: string) => {
            historyPush('trip', id, when, title, params.id ? decodeURIComponent(params.id) : null)
            router.push(`/app/trips/${encodeURIComponent(id)}`)
        },
        station: (id: string, when: string | null, title: string) => {
            historyPush('station', id, when, title, params.id ? decodeURIComponent(params.id) : null)
            router.push(`/app/stations/${encodeURIComponent(id)}/departures?when=${encodeURIComponent(when ?? '')}`)
        }
    }
}