"use client"

import type { ProductType } from "hafas-client";
import { Button, Icon, List, ListButton, ListInput, ListItem, Popover, Toggle, Toolbar } from "konsta/react";
import { Clock, Calendar, PlusCircle, MinusCircle } from "framework7-icons/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Time from "./time";
import Product from "./product";

function toDatetimeLocal(date: Date): string {
    const ten = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    const YYYY = date.getFullYear(),
        MM = ten(date.getMonth() + 1),
        DD = ten(date.getDate());
    return `${YYYY}-${MM}-${DD}`;
};

export default function Filter({ products, showTime = false }: { products: readonly ProductType[], showTime?: boolean }): React.JSX.Element {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [when, setWhen] = useState(searchParams.get('when') ? new Date(decodeURIComponent(searchParams.get('when') ?? '')) : new Date())
    const [productsFilter, setProductsFilter] = useState<Set<string>>(new Set(searchParams.getAll('products')))

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.delete('products')
        productsFilter.forEach(product => { newSearchParams.append('products', product) })
        newSearchParams.set('when', when.toISOString())
        router.replace(`${pathname}?${newSearchParams.toString()}`)
    }, [pathname, router, searchParams, when, productsFilter])

    const [whenOpen, setWhenOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false)

    return <>
        <Toolbar innerClassName="gap-2 !justify-start" top>
            {showTime ?
                <Button className="filter-when !w-auto" onClick={() => { setWhenOpen(true) }} rounded tonal>
                    <Icon ios={<Clock />} />&nbsp;<Time time={when} />
                </Button>
                :
                <Button className="filter-when !w-auto" onClick={() => { setWhenOpen(true) }} rounded tonal>
                    <Icon ios={<Calendar />} />&nbsp;{when.toLocaleDateString(['de'], { dateStyle: 'short' })}
                </Button>
            }

            <Button className="filter-products !w-auto gap-1" onClick={() => { setProductsOpen(true) }} rounded tonal>
                <span>{productsFilter.size ? 'Angebot:' : 'Angebot wählen'}</span>
                {products.filter(product => productsFilter.has(product.id)).map(product =>
                    <Product key={product.id} product={product} />
                )}
            </Button>
        </Toolbar>

        <Popover
            onBackdropClick={() => { setWhenOpen(false) }}
            opened={whenOpen}
            target=".filter-when"
        >

            {showTime ?
                <List nested>
                    <ListInput
                        onChange={(e: Event) => { setWhen(new Date((e.target as HTMLInputElement).value)) }}
                        outline
                        type="datetime-local"
                        value={toDatetimeLocal(when)}
                    />
                    <ListButton onClick={() => {
                        setWhen(new Date())
                    }} >Jetzt</ListButton>
                    <ListButton onClick={() => {
                        setWhen(new Date(when.getTime() - 60 * 60000))

                    }} >
                        <Icon
                            ios={<MinusCircle />}
                        />&nbsp;1 Stunde</ListButton>
                    <ListButton onClick={() => {
                        setWhen(new Date(when.getTime() + 60 * 60000))
                    }} >
                        <Icon
                            ios={<PlusCircle />}
                        />&nbsp;1 Stunde</ListButton>
                </List>
                :
                <List nested>
                    <ListInput
                        onChange={(e: Event) => { setWhen(new Date((e.target as HTMLInputElement).value)) }}
                        outline
                        type="date"
                        value={toDatetimeLocal(when)}
                    />
                    <ListButton onClick={() => {
                        setWhen(new Date())
                    }} >Heute</ListButton>
                    <ListButton onClick={() => {
                        setWhen(new Date(when.getTime() - 1440 * 60000))
                    }} >
                        <Icon
                            ios={<MinusCircle />}
                        />&nbsp;1 Tag</ListButton>
                    <ListButton onClick={() => {
                        setWhen(new Date(when.getTime() + 1440 * 60000))
                    }} >
                        <Icon
                            ios={<PlusCircle />}
                        />&nbsp;1 Tag</ListButton>
                </List>
            }
        </Popover>


        <Popover
            onBackdropClick={() => { setProductsOpen(false) }}
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
                    media={<Product product={product} />}
                    title={product.name}
                />)}
            </List>
        </Popover>
    </>
}