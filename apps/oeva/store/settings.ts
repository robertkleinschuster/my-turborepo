import {create} from "zustand";
import {persist} from "zustand/middleware";
import type {ClientCode} from "../client/client-code";

interface Settings {
    startpage: 'home' | 'trips' | 'stations' | 'history',
    client: ClientCode|null,
    setClient: (client: ClientCode) => void,
    setStartpage: (startpage: Settings['startpage']) => void
}

export const useSettings = create(
    persist<Settings>(
        (set) => ({
            startpage: 'home',
            setStartpage: (startpage: Settings['startpage']) => {
                set(() => ({startpage}))
            },
            client: null,
            setClient: (client: ClientCode) => {
                set(() => ({client}))
            }
        }),
        {
            name: 'settings',
        },
    )
)