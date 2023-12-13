"use client"

import {Navbar, NavbarBackLink, Searchbar} from "konsta/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import type {JSX} from "react";
import React, { useEffect, useState} from "react";

export default function NavSearchbar({title}: { title: string }): JSX.Element {
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
        router.replace(`${pathname}?query=${searchQuery}`)
    }, [searchQuery, router, pathname])


    return <Navbar
        left={
            <NavbarBackLink onClick={() => {
                router.push('/app/home')
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
        title={title}

    />
}