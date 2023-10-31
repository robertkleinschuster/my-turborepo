"use client"

import { Block, Button } from "konsta/react"
import { useRouter } from "next/navigation"
import React from "react"

export default function Error(): React.JSX.Element {
    const router = useRouter()

    return <Block>Es ist ein Fehler aufgetreten.<Button clear onClick={() => { router.back() }}>Zurück</Button></Block>
}