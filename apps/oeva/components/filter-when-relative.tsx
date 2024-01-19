"use client"

import type {JSX} from "react";
import { useCallback} from "react";
import {List, ListItem} from "konsta/react";
import {addMinutes, formatISO, parseISO, startOfMinute} from "date-fns";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import type {HistoryItem} from "../store/history";
import {addFilterParams, useNavigation} from "../hooks/use-navigation";

export function FilterWhenRelative({minutes, title}: { minutes: number, title: string }): JSX.Element {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const breadcrumb = useCurrentBreadcrumb()
    const nav = useNavigation()

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

    return <List inset strong>
        <ListItem
            label
            onClick={() => {
                const when = searchParams.get('when');
                const current = when ? parseISO(when) : new Date()
                applyWhen(startOfMinute(addMinutes(current, minutes)))
            }}
            title={title}
        />
    </List>
}