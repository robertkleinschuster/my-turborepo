"use client"

import type {JSX, ReactNode} from "react";
import {Block} from "konsta/react";

export function Message({children}: {children: ReactNode}): JSX.Element {
    return <Block className="text-center">{children}</Block>
}