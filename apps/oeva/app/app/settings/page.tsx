"use client"

import type {JSX} from "react";
import dynamic from "next/dynamic";
import {BlockTitle, List, ListItem, Radio} from "konsta/react";
import {useSettings} from "../../../store/settings";

function History(): JSX.Element {
    const startpage = useSettings(state => state.startpage)
    const setStartpage = useSettings(state => state.setStartpage)
    return <>
        <BlockTitle>Startseite</BlockTitle>
        <List inset strong>
            <ListItem label media={<Radio
                checked={startpage === 'home'}
                component="div"
                onChange={() => {
                    setStartpage('home')
                }}
                value="home"
            />} title="Home"/>
            <ListItem label media={<Radio
                checked={startpage === 'trips'}
                component="div"
                onChange={() => {
                    setStartpage('trips')
                }}
                value="home"
            />} title="Fahrten"/>
            <ListItem label media={<Radio
                checked={startpage === 'stations'}
                component="div"
                onChange={() => {
                    setStartpage('stations')
                }}
                value="home"
            />} title="Stationen"/>
            <ListItem label media={<Radio
                checked={startpage === 'history'}
                component="div"
                onChange={() => {
                    setStartpage('history')
                }}
                value="home"
            />} title="Verlauf"/>
        </List>
    </>
}

export default dynamic(() => Promise.resolve(History), {ssr: false})