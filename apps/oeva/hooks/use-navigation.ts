import {useRouter} from "next/navigation";
import {useHistory} from "../store/history";

interface Navigation {
    trip: (id: string, title: string) => void,
    station: (id: string, when: string, title: string) => void,
    refresh: () => void
    back: () => void
}

export function useNavigation(): Navigation {
    const router = useRouter()
    const historyPush = useHistory(state => state.push)
    return {
        refresh: () => {
          router.refresh()
        },
        back: () => {
          router.back()
        },
        trip: (id: string, title: string) => {
            historyPush('trip', id, title)
            router.push(`/app/trips/${encodeURIComponent(id)}`)
        },
        station: (id: string, when: string, title: string) => {
            historyPush('station', id, title)
            router.push(`/app/stations/${encodeURIComponent(id)}/departures?when=${encodeURIComponent(when)}`)
        }
    }
}