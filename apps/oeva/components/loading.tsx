"use client"

import {Block, Button, Preloader} from "konsta/react"
import type {JSX} from "react";
import {useRouter} from "next/navigation";

export default function Loading({showCancel = true}: { showCancel?: boolean }): JSX.Element {
    const router = useRouter()
    return <Block className="h-full flex flex-col gap-4 justify-center items-center">
        <Preloader/>
        {showCancel ?
            <Button className="w-auto" clear onClick={() => {
                router.back()
            }}>Abbrechen</Button> : null
        }
    </Block>
}