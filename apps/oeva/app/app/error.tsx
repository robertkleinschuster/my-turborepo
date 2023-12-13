"use client"

import {Card, Link} from "konsta/react"
import {useRouter} from "next/navigation"
import React from "react"

export default function Error(): React.JSX.Element {
    const router = useRouter()

    return <Card
        footer={<div className="flex gap-4">
            <Link onClick={() => {
                router.back()
            }}>Zurück</Link>
            <Link onClick={() => {
                router.refresh()
            }}>Neu Laden</Link>
        </div>}
        header="Ups..."
        outline
    >
        Es ist ein Fehler aufgetreten.
    </Card>
}