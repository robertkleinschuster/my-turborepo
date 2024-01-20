"use client"

import {List, ListItem, Navbar} from 'konsta/react';
import type {JSX} from "react";
import { useEffect} from "react";
import {useNavigation, usePrefetch} from "../../../hooks/use-navigation";

export const runtime = 'edge'

export default function Home(): JSX.Element {
    const nav = useNavigation()
    const prefetch = usePrefetch()

    useEffect(() => {
        prefetch.stations()
        prefetch.trips()
    }, [prefetch]);

    return (
        <>
            <Navbar title="OeVA"/>
            <List inset strong>
                <ListItem link onClick={() => {
                    nav.stations()
                }} title="Stationen"/>
                <ListItem link onClick={() => {
                    nav.trips()
                }} title="Fahrten"/>
                <ListItem link onClick={() => {
                    nav.history_overview()
                }} title="Zuletzt verwendet"/>
            </List>

            <List inset strong>
                <ListItem link onClick={() => {
                    nav.settings()
                }} title="Einstellungen"/>
            </List>
        </>
    );
}
