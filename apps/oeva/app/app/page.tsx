"use client"

import type {JSX} from "react";
import { useRef, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useSettings} from "../../store/settings";

export default function Home(): JSX.Element {
    const router = useRouter()
    const startpage = useSettings(state => state.startpage)
    const firstView = useRef<boolean>(true)

    useEffect(() => {
        if (firstView.current) {
            firstView.current = false
            router.replace(`/app/home`)
        }
    }, [firstView, startpage]);

    return <></>;
}
