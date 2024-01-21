"use client"

import {
    Button,
    Chip,
    Icon,
    List,
    ListItem,
    Popover,
    Segmented,
    SegmentedButton,
    Toggle,
    Toolbar
} from "konsta/react";
import {Clock, Calendar} from "framework7-icons/react"
import {usePathname, useRouter, useSearchParams, useSelectedLayoutSegment} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {addHours, addMinutes, formatISO, startOfMinute, subHours, subMinutes} from "date-fns";
import {formatInputDate, formatInputDatetimeLocal} from "../helper/date-time";
import type {HistoryItem} from "../store/history";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import {addFilterParams, useNavigation} from "../hooks/use-navigation";
import type {Mode, ProductGroup} from "../client/client";
import Time from "./time";
import Product from "./product";

export default function Filter({modes, groups, showTime = false, modesOnly}: {
    modes: readonly Mode[],
    groups: readonly ProductGroup[]
    showTime?: boolean,
    modesOnly?: boolean
}): React.JSX.Element {
    const router = useRouter()
    const nav = useNavigation()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment()

    const [when, setWhen] = useState(searchParams.get('when') ? new Date(decodeURIComponent(searchParams.get('when') ?? '')) : new Date())
    const [modesFilter, setModesFilter] = useState<Set<string>>(new Set(searchParams.getAll('modes')))
    const [groupsFilter, setGroupsFilter] = useState<Set<string>>(new Set(searchParams.getAll('groups')))
    const breadcrumb = useCurrentBreadcrumb()
    const [whenOpen, setWhenOpen] = useState(false);
    const [modesOpen, setModesOpen] = useState(false)
    const [groupsOpen, setGroupsOpen] = useState(false)

    useEffect(() => {
        if (searchParams.get('when')) {
            setWhen(new Date(decodeURIComponent(searchParams.get('when') ?? '')))
        }
    }, [searchParams]);

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
        setWhen(w)
        const params: HistoryItem['params'] = {
            query: searchParams.get('query'),
            when: formatISO(startOfMinute(w)),
            modes: Array.from(modesFilter),
            groups: Array.from(groupsFilter),
            mode: segment,
        }
        applyFilter(params)
    }, [applyFilter, groupsFilter, modesFilter, searchParams, segment])

    const applyModesFilter = useCallback((filter: Set<string>) => {
        setModesFilter(filter)
        const params: HistoryItem['params'] = {
            query: searchParams.get('query'),
            when: formatISO(startOfMinute(when)),
            modes: Array.from(filter),
            groups: Array.from(groupsFilter),
            mode: segment,
        }

        applyFilter(params)
    }, [applyFilter, groupsFilter, searchParams, segment, when])

    const applyGroupsFilter = useCallback((filter: Set<string>) => {
        setGroupsFilter(filter)
        const params: HistoryItem['params'] = {
            query: searchParams.get('query'),
            when: formatISO(startOfMinute(when)),
            modes: Array.from(modesFilter),
            groups: Array.from(filter),
            mode: segment,
        }

        applyFilter(params)
    }, [applyFilter, modesFilter, searchParams, segment, when])

    return <>
        <Toolbar innerClassName="gap-2 !justify-start" top>
            {!modesOnly ?
                <>
                    {showTime ?
                        <Button className="filter-when !w-auto" onClick={() => {
                            setWhenOpen(true)
                        }} rounded small tonal={when >= startOfMinute(new Date()) && when <= startOfMinute(addMinutes(new Date(), 5))}>
                            <Icon ios={<Clock/>}/>&nbsp;<Time time={when}/>
                        </Button>
                        :
                        <Chip
                            className="font-semibold relative"
                            colors={{
                                fillBgIos: 'bg-primary bg-opacity-15',
                                fillTextIos: 'text-primary'
                            }}
                        >
                            <Icon ios={<Calendar/>}/>
                            <input
                                className="border-none bg-transparent after:absolute after:w-full after:h-full after:left-0"
                                onChange={e => {
                                    applyWhen(new Date(e.target.value))
                                }} type="date"
                                value={formatInputDate(when)}
                            />
                        </Chip>
                    }
                </> : null}
            <Button className="filter-modes !w-auto gap-1" onClick={() => {
                setModesOpen(true)
            }} rounded small tonal={!modesFilter.size}>
                <span>{modesFilter.size ? `Verkehrsmittel (${modesFilter.size})` : 'Verkehrsmittel'}</span>
            </Button>

            <Button className="filter-groups !w-auto gap-1" onClick={() => {
                setGroupsOpen(true)
            }} rounded small tonal={!groupsFilter.size}>
                <span>{groupsFilter.size ? `Kategorien (${groupsFilter.size})` : 'Kategorien'}</span>
            </Button>
        </Toolbar>

        <Popover
            onBackdropClick={() => {
                setWhenOpen(false)
            }}
            opened={whenOpen}
            target=".filter-when"
        >
            <div className="gap-4 flex flex-col m-4">
                <Button
                    className="relative"
                    tonal
                >
                    <input
                        className="border-none bg-transparent after:absolute after:w-full after:h-full after:left-0"
                        onChange={e => {
                            applyWhen(new Date(e.target.value))
                        }}
                        type="datetime-local"
                        value={formatInputDatetimeLocal(when)}
                    />
                </Button>


                <Button onClick={() => {
                    applyWhen(new Date())
                }} tonal>Jetzt</Button>

                <Segmented>
                    <SegmentedButton
                        onClick={() => {
                            applyWhen(subHours(when, 1))
                        }}
                    >- 1 std</SegmentedButton>
                    <SegmentedButton
                        onClick={() => {
                            applyWhen(addHours(when, 1))
                        }}
                    >+ 1 std</SegmentedButton>
                </Segmented>
                <Segmented>
                    <SegmentedButton
                        onClick={() => {
                            applyWhen(subMinutes(when, 5))
                        }}
                    >- 5 min</SegmentedButton>
                    <SegmentedButton
                        onClick={() => {
                            applyWhen(addMinutes(when, 5))
                        }}
                    >+ 5 min</SegmentedButton>
                </Segmented>

                <Button onClick={() => {
                    setWhenOpen(false)
                }}>Anzeigen</Button>
            </div>
        </Popover>


        <Popover
            className="w-72"
            onBackdropClick={() => {
                setModesOpen(false)
            }}
            opened={modesOpen}
            target=".filter-modes"
        >
            <List nested>
                {modes.filter(mode => mode.filter).map(mode => <ListItem
                    after={
                        <Toggle
                            checked={modesFilter.has(mode.id)}
                            className="-my-1"
                            onChange={() => {
                                const newProductsFilter = new Set(modesFilter);
                                newProductsFilter.has(mode.id) ? newProductsFilter.delete(mode.id) : newProductsFilter.add(mode.id)
                                applyModesFilter(newProductsFilter)
                            }}
                        />
                    }
                    key={mode.id}
                    label
                    media={<Product product={mode}/>}
                    title={mode.name}
                />)}
            </List>
        </Popover>

        <Popover
            className="w-72"
            onBackdropClick={() => {
                setGroupsOpen(false)
            }}
            opened={groupsOpen}
            target=".filter-groups"
        >
            <List nested>
                {groups.map(group => <ListItem
                    after={
                        <Toggle
                            checked={groupsFilter.has(group.id)}
                            className="-my-1"
                            onChange={() => {
                                const newFilter = new Set(groupsFilter);
                                newFilter.has(group.id) ? newFilter.delete(group.id) : newFilter.add(group.id)
                                applyGroupsFilter(newFilter)
                            }}
                        />
                    }
                    key={group.id}
                    label
                    title={group.name}
                />)}
            </List>
        </Popover>
    </>
}