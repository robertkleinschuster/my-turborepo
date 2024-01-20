"use client"

import {Navbar, NavbarBackLink, Searchbar} from "konsta/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import type {JSX} from "react";
import React, { useEffect, useState} from "react";
import {useNavigation} from "../hooks/use-navigation";
import {ClientCode} from "../client/client-code";
import {ClientName} from "./client-name";

export default function NavSearchbar({title, client}: { title: string, client: ClientCode }): JSX.Element {
    const nav = useNavigation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') ?? '')


    const handleSearch = (e: Event): void => {
        setSearchQuery((e.target as HTMLInputElement).value);
    };
    const handleClear = (): void => {
        setSearchQuery('');
    };


    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('query', searchQuery)
        router.replace(`${pathname}?${newSearchParams.toString()}`)
    }, [searchQuery, router, pathname, searchParams])


    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                nav.home()
            }} text="Zurück"/>
        }
        subnavbar={
            <Searchbar
                disableButton
                disableButtonText="Abbrechen"
                onChange={handleSearch}
                onClear={handleClear}
                placeholder="Suchen..."
                value={searchQuery}
            />
        }
        subtitle={<ClientName clientCode={client}/>}
        title={title}
    />
}