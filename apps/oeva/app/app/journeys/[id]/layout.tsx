"use client"

import type {JSX, ReactNode} from "react";
import { useState} from "react";
import {ListSelectionProvider} from "../../../../context/list-selection";
import {ListSelectionToolbar} from "../../../../components/list-selection-toolbar";
import {deleteLeg} from "../actions";
import {useNavigation} from "../../../../hooks/use-navigation";
import Loading from "./loading";

export default function Layout({children}: { children: ReactNode }): JSX.Element {
    const [loading, setLoading] = useState(false)
    const nav = useNavigation()
    return <ListSelectionProvider>
        {loading ? <Loading showCancel={false}/> : children}
        <ListSelectionToolbar onDelete={(selection) => {
            if (selection) {
                setLoading(true)
                void deleteLeg(selection).then(() => {
                    nav.refresh()
                    setLoading(false)
                })
            }
        }}/>
    </ListSelectionProvider>
}