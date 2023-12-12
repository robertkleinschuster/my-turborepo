"use client"

import {Block, Button, Preloader} from "konsta/react"
import type {JSX} from "react";
import {useRouter} from "next/navigation";

export default function Loading(): JSX.Element {
    const router = useRouter()
    return <Block className="h-full flex flex-col gap-4 justify-center items-center">
        <Preloader/>
        <Button className="w-auto" clear onClick={() => {
            router.back()
        }}>Abbrechen</Button>
    </Block>
}