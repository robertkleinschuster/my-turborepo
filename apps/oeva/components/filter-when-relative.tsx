"use client"

import type {JSX} from "react";
import React, {useCallback} from "react";
import {List, ListItem} from "konsta/react";
import {addMinutes, formatISO, parseISO, startOfMinute} from "date-fns";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import type {Alternative} from "hafas-client";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import type {HistoryItem} from "../store/history";
import {addFilterParams, useNavigation} from "../hooks/use-navigation";
import Time from "./time";

export function FilterWhenRelative({alternatives}: { alternatives: readonly Alternative[] }): JSX.Element {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const breadcrumb = useCurrentBreadcrumb()
    const nav = useNavigation()
    const when = searchParams.get('when') ? parseISO(decodeURIComponent(searchParams.get('when') ?? '')) : new Date()

    const applyFilter = useCallback((params: HistoryItem['params']) => {
        if (breadcrumb) {
            breadcrumb.params = params
            nav.replace(breadcrumb)
        } else {
            const newSearchParams = new URLSearchParams(searchParams)
            addFilterParams(newSearchParams, params)
            router.replace(`${pathname}?${newSearchParams.toString()}`)
        }
    }, [breadcrumb, nav, pathname, router, searchParams])

    const applyWhen = useCallback((w: Date) => {
        const params: HistoryItem['params'] = breadcrumb?.params ?? {}
        params.when = formatISO(w)
        applyFilter(params)
    }, [applyFilter, breadcrumb?.params])

    const parseTime = (time: string | undefined): Date | null => {
        return time ? new Date(time) : null;
    }

    const whenEnd = alternatives?.length > 1 ?
        parseTime(alternatives[alternatives.length - 1].when) ?? addMinutes(when, 60) : addMinutes(when, 60)

    return <List inset strong>
        <ListItem
            label
            onClick={() => {
                applyWhen(startOfMinute(whenEnd))
            }}
            title={<>Fahrten ab <Time time={whenEnd}/> anzeigen</>}
        />
    </List>
}