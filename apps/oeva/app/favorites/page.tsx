"use client"

import { List, ListItem, Navbar } from "konsta/react";

export default function Favorites(): React.JSX.Element {
    return <>
        <Navbar title="Favoriten"/>
        <List inset strong>
            <ListItem title="RJ 79 - Vindobona" />
        </List>
    </>
}