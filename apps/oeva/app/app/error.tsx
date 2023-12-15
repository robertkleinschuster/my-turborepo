"use client"

import {Card, Icon, Link, Navbar} from "konsta/react"
import {ExclamationmarkTriangle} from "framework7-icons/react"
import {useRouter} from "next/navigation"
import React from "react"

export default function Error(): React.JSX.Element {
    const router = useRouter()

    return <>
        <Navbar title="Fehler"/>
        <Card
        footer={<div className="flex gap-4">
            <Link onClick={() => {
                router.back()
            }}>Zurück</Link>
            <Link onClick={() => {
                router.refresh()
            }}>Erneut versuchen</Link>
        </div>}
        header={<span className="flex gap-1 items-center"><Icon ios={<ExclamationmarkTriangle/>}/>Ups...</span>}
        outline
    >
        Es ist ein Fehler aufgetreten.
    </Card></>
}