"use client"

import type {ProductType} from "hafas-client";
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
import React, {useEffect, useState} from "react";
import {addHours, addMinutes, subHours, subMinutes} from "date-fns";
import {formatInputDate, formatInputDatetimeLocal} from "../helper/date-time";
import type {HistoryItem} from "../store/history";
import { useHistory} from "../store/history";
import {useCurrentBreadcrumb} from "../hooks/use-breadcrumbs";
import {addStationParams, useNavigation} from "../hooks/use-navigation";
import Time from "./time";
import Product from "./product";

export default function Filter({products, showTime = false}: {
    products: readonly ProductType[],
    showTime?: boolean
}): React.JSX.Element {
    const router = useRouter()
    const nav = useNavigation()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment()

    const [when, setWhen] = useState(searchParams.get('when') ? new Date(decodeURIComponent(searchParams.get('when') ?? '')) : new Date())
    const [productsFilter, setProductsFilter] = useState<Set<string>>(new Set(searchParams.getAll('products')))

    const updateHistory = useHistory(state => state.update)
    const breadcrumb = useCurrentBreadcrumb()

    useEffect(() => {
        const params: HistoryItem['params'] = {
            when: when.toISOString(),
            products: Array.from(productsFilter),
            mode: segment === 'departures' ? 'departures' : 'arrivals'
        }

        if (breadcrumb) {
            breadcrumb.params = params
            nav.replace(breadcrumb)
        } else {
            const newSearchParams = new URLSearchParams(searchParams)
            addStationParams(newSearchParams, params)
            router.replace(`${pathname}?${newSearchParams.toString()}`)
        }
    }, [pathname, router, searchParams, when, productsFilter, updateHistory, nav, breadcrumb])

    const [whenOpen, setWhenOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false)

    return <>
        <Toolbar innerClassName="gap-2 !justify-start" top>
            {showTime ?
                <Button className="filter-when !w-auto" onClick={() => {
                    setWhenOpen(true)
                }} rounded tonal>
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
                            setWhen(new Date(e.target.value))
                        }} type="date"
                        value={formatInputDate(when)}
                    />
                </Chip>
            }

            <Button className="filter-products !w-auto gap-1" onClick={() => {
                setProductsOpen(true)
            }} rounded tonal>
                <span>{productsFilter.size ? 'Verkehrsmittel:' : 'Verkehrsmittel wählen'}</span>
                {products.filter(product => productsFilter.has(product.id)).map(product =>
                    <Product key={product.id} product={product}/>
                )}
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
                            setWhen(new Date(e.target.value))
                        }}
                        type="datetime-local"
                        value={formatInputDatetimeLocal(when)}
                    />
                </Button>


                <Button onClick={() => {
                    setWhen(new Date())
                }}>Jetzt</Button>

                <Segmented>
                    <SegmentedButton
                        onClick={() => {
                            setWhen(subHours(when, 1))
                        }}
                    >- 1 std</SegmentedButton>
                    <SegmentedButton
                        onClick={() => {
                            setWhen(addHours(when, 1))
                        }}
                    >+ 1 std</SegmentedButton>
                </Segmented>
                <Segmented>
                    <SegmentedButton
                        onClick={() => {
                            setWhen(subMinutes(when, 5))
                        }}
                    >- 5 min</SegmentedButton>
                    <SegmentedButton
                        onClick={() => {
                            setWhen(addMinutes(when, 5))
                        }}
                    >+ 5 min</SegmentedButton>
                </Segmented>
            </div>
        </Popover>


        <Popover
            onBackdropClick={() => {
                setProductsOpen(false)
            }}
            opened={productsOpen}
            target=".filter-products"
        >
            <List nested>
                {products.map(product => <ListItem
                    after={
                        <Toggle
                            checked={productsFilter.has(product.id)}
                            className="-my-1"
                            onChange={() => {
                                const newProductsFilter = new Set(productsFilter);
                                newProductsFilter.has(product.id) ? newProductsFilter.delete(product.id) : newProductsFilter.add(product.id)
                                setProductsFilter(newProductsFilter)
                            }}
                        />
                    }
                    key={product.id}
                    label
                    media={<Product product={product}/>}
                    title={product.name}
                />)}
            </List>
        </Popover>
    </>
}