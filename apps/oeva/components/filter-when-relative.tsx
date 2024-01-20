"use client"

import type {JSX, ReactNode} from "react";
import {useCallback} from "react";
import {List, ListItem} from "konsta/react";
import {formatISO, startOfMinute} from "date-fns";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import type {HistoryItem} from "../store/history";
import {addFilterParams, useNavigation} from "../hooks/use-navigation";

export function FilterWhenRelative({time, title}: { time: Date, title: ReactNode }): JSX.Element {
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
                applyWhen(startOfMinute(time))
            }}
            title={title}
        />
    </List>
}