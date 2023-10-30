"use client"

import { Navbar, NavbarBackLink } from "konsta/react"
import { useRouter } from "next/navigation";

export default function TripNavbar({title}: {title: string}) {
    const router = useRouter()

    return <Navbar
    left={
        <NavbarBackLink onClick={() => { router.back() }} text="Zurück" />
    }
    title={title}
/>
}