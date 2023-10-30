"use client"

import { Navbar, Searchbar } from "konsta/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function NavSearchbar() {
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
    subnavbar={
        <Searchbar
            disableButton
            disableButtonText="Cancel"
            onClear={handleClear}
            onChange={handleSearch}
            value={searchQuery}
        />
    }
    title="Stationen"

/>
}