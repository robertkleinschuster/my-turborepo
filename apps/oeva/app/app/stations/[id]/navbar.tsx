"use client"

import { Button, Icon, List, ListButton, ListInput, ListItem, Navbar, NavbarBackLink, Popover, Segmented, SegmentedButton, Toggle, Toolbar } from "konsta/react"
import { Clock, PlusCircle, MinusCircle } from "framework7-icons/react"
import { usePathname, useSearchParams, useSelectedLayoutSegment, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Time from "../../../../components/time";
import { ProductType } from "hafas-client";
import Product from "../../../../components/product";

function toDatetimeLocal(date: Date): string {
    const ten = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    const YYYY = date.getFullYear(),
        MM = ten(date.getMonth() + 1),
        DD = ten(date.getDate()),
        HH = ten(date.getHours()),
        II = ten(date.getMinutes());
    return `${YYYY}-${MM}-${DD}T${HH}:${II}`;
};

export default function StationNavbar({ id, title, products }: { id: string, title: string, products: readonly ProductType[] }): React.JSX.Element {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const segment = useSelectedLayoutSegment();
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

    return <><Navbar
        left={
            <NavbarBackLink onClick={() => { router.back() }} text="Zurück" />
        }
        subnavbar={
            <Segmented strong>
                <SegmentedButton active={segment === 'departures'} onClick={() => { router.replace(`/app/stations/${id}/departures?${searchParams.toString()}`) }} strong>
                    Abfahrten
                </SegmentedButton>
                <SegmentedButton active={segment === 'arrivals'} onClick={() => { router.replace(`/app/stations/${id}/arrivals?${searchParams.toString()}`) }} strong>
                    Ankünfte
                </SegmentedButton>
            </Segmented>

        }
        title={title}
    />
        <Toolbar innerClassName="gap-2 !justify-start" top>
            <Button className="filter-when w-auto" onClick={() => { setWhenOpen(true) }} rounded tonal>
                <Icon ios={<Clock />} />&nbsp;<Time time={when} />
            </Button>
            <Button className="filter-products w-auto gap-1" onClick={() => { setProductsOpen(true) }} rounded tonal>
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
        </Popover>


        <Popover
            onBackdropClick={() => { setProductsOpen(false) }}
            opened={productsOpen}
            target=".filter-products"
        >
            <List nested>
                {products.map(product => <ListItem
                    label
                    title={product.name}
                    media={<Product product={product} />}
                    key={product.id}
                    after={
                        <Toggle
                            className="-my-1"
                            checked={productsFilter.has(product.id)}
                            onChange={() => {
                                const newProductsFilter = new Set(productsFilter);
                                newProductsFilter.has(product.id) ? newProductsFilter.delete(product.id) : newProductsFilter.add(product.id)
                                setProductsFilter(newProductsFilter)
                            }}
                        />
                    }
                />)}
            </List>
        </Popover>
    </>
}