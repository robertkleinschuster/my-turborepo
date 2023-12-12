"use client"

import {App} from "konsta/react"
import React from "react"
import Navigation from "./navigation"

export default function AppLayout({children}: { children: React.ReactNode }): React.JSX.Element {
    return <App className="flex flex-col !min-h-full" id="app" safeAreas theme="ios">
        <main className="flex flex-col flex-grow overflow-hidden bg-ios-light-surface dark:bg-ios-dark-surface">
            {children}
        </main>
        <Navigation/>
    </App>
}