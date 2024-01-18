"use client"

import {Card, Icon, Link, Navbar} from "konsta/react"
import {ExclamationmarkTriangle} from "framework7-icons/react"
import React from "react"

export default function Error(): React.JSX.Element {
    return <>
        <Navbar title="Fehler"/>
        <Card
        footer={<div className="flex gap-4">
            <Link onClick={() => {
                window.history.back()
            }}>Zurück</Link>
            <Link onClick={() => {
                window.location.reload()
            }}>Erneut versuchen</Link>
        </div>}
        header={<span className="flex gap-1 items-center"><Icon ios={<ExclamationmarkTriangle/>}/>Ups...</span>}
        outline
    >
        Es ist ein Fehler aufgetreten.
    </Card></>
}