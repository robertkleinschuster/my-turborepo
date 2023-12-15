"use client"

import {List, ListItem, Navbar} from 'konsta/react';
import type {JSX} from "react";
import {useRouter} from "next/navigation";
import {useNavigation} from "../../../hooks/use-navigation";

export default function Home(): JSX.Element {
    const router = useRouter()
    const nav = useNavigation()
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
                    nav.journeys()
                }} title="Meine Reisen"/>
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
