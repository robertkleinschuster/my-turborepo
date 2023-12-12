"use client"

import type {JSX} from "react";
import {List, ListItem} from "konsta/react";
import dynamic from "next/dynamic";
import {useHistory} from "../../../store/history";
import {useNavigation} from "../../../hooks/use-navigation";

function History(): JSX.Element {
    const historyItems = useHistory(state => state.items).toReversed()
    const nav = useNavigation()

    return <List inset strong>
        {historyItems.map(item => <ListItem
                key={item.id}
                link={item.type === 'station' || item.type === 'trip'}
                onClick={() => {
                    if (item.type === 'station') {
                        nav.station(item.id, '', item.title)
                    }
                    if (item.type === 'trip') {
                        nav.trip(item.id, item.title)
                    }
                }}
                text={item.added.toLocaleString()}
                title={item.title}
            />
        )}
    </List>
}

export default dynamic(() => Promise.resolve(History), {ssr: false})