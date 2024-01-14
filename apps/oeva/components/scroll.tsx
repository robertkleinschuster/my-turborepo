"use client"

import React, { useEffect, useRef } from "react";
import {disableBodyScroll} from "body-scroll-lock"

export default function Scroll({ children, className }: { children: React.ReactNode, className?: string }): React.JSX.Element {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {ref.current && disableBodyScroll(ref.current) })
    return <div className={"overflow-auto h-full " + (className ?? '')} ref={ref}>{children}</div>
}