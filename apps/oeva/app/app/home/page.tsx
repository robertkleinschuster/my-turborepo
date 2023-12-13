"use client"

import {List, ListItem, Navbar} from 'konsta/react';
import type {JSX} from "react";
import {useRouter} from "next/navigation";

export default function Home(): JSX.Element {
    const router = useRouter()

    return (
        <>
            <Navbar title="OeVA"/>
            <List inset strong>
                <ListItem link onClick={() => {
                    router.push('/app/trips')
                }} title="Fahrten"/>
                <ListItem link onClick={() => {
                    router.push('/app/stations')
                }} title="Stationen"/>
                <ListItem link onClick={() => {
                    router.push('/app/history')
                }} title="Verlauf"/>
            </List>

            <List inset strong>
                <ListItem link onClick={() => {
                    router.push('/app/settings')
                }} title="Einstellungen"/>
            </List>
        </>
    );
}
