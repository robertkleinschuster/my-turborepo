"use client"

import React, { useEffect, useRef } from "react";
import {disableBodyScroll} from "body-scroll-lock"

export default function Scroll({ children }: { children: React.ReactNode }): React.JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {ref.current && disableBodyScroll(ref.current) })
    return <div className="overflow-auto h-full" ref={ref}>{children}</div>
}