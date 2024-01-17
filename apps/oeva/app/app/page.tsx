"use client"

import type {JSX} from "react";
import {useRef, useEffect} from "react";
import {useSettings} from "../../store/settings";
import {useNavigation} from "../../hooks/use-navigation";

export const runtime = 'edge'

export default function Home(): JSX.Element {
    const nav = useNavigation()
    const startpage = useSettings(state => state.startpage)
    const firstView = useRef<boolean>(true)

    useEffect(() => {
        if (firstView.current) {
            firstView.current = false
            if (startpage === 'history') {
                nav.history_overview();
            } else if (startpage === 'stations') {
                nav.stations();
            } else if (startpage === 'trips') {
                nav.trips()
            } else {
                nav.home()
            }
        }
    }, [firstView, nav, startpage]);

    return <></>;
}
