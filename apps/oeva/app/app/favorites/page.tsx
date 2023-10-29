"use client"

import { List, ListItem, Navbar } from "konsta/react";
import { useRouter } from "next/navigation";

export default function Favorites(): React.JSX.Element {
    const router = useRouter()
    return <>
        <Navbar title="Favoriten"/>
        <List inset strong>
            <ListItem link onClick={() => {router.push('/trains')}} title="RJ 79 - Vindobona" />
        </List>
    </>
}