"use client"

import { App } from "konsta/react"
import React from "react"
import Navigation from "./navigation"

export default function AppLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return <App className="flex flex-col !min-h-0" id="app" safeAreas theme="ios">
        <main className="flex flex-col flex-grow overflow-hidden">
            {children}
        </main>
        <Navigation />
    </App>
}