"use client"

import {List, ListItem, Navbar} from 'konsta/react';
import type {JSX} from "react";
import {useNavigation} from "../../../hooks/use-navigation";

export default function Home(): JSX.Element {
    const nav = useNavigation()
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
                <ListItem link onClick={() => {
                    nav.journeys()
                }} title="Meine Reisen"/>
            </List>

            <List inset strong>
                <ListItem link onClick={() => {
                    nav.settings()
                }} title="Einstellungen"/>
            </List>
        </>
    );
}
