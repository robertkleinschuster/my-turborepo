import {create} from "zustand";
import {persist} from "zustand/middleware";

interface Settings {
    startpage: 'home' | 'trips' | 'stations' | 'history'
    setStartpage: (startpage: Settings['startpage']) => void
}

export const useSettings = create(
    persist<Settings>(
        (set) => ({
            startpage: 'home',
            setStartpage: (startpage: Settings['startpage']) => {
                set(() => ({startpage}))
            },
        }),
        {
            name: 'settings',
        },
    )
)