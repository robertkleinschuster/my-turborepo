"use client"

import type {JSX} from "react";
import {List, ListItem} from "konsta/react";
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";

export function HistoryList({items}: { items: readonly HistoryItem[] }): JSX.Element {
    const nav = useNavigation()

    return <List inset strong>
        {items.map(item => <ListItem
                key={item.id + item.added}
                link={item.type === 'station' || item.type === 'trip'}
                onClick={() => {
                    if (item.type === 'station') {
                        nav.station(item.id, '', item.title)
                    }
                    if (item.type === 'trip') {
                        nav.trip(item.id, item.title)
                    }
                }}
                text={new Date(item.added).toLocaleString()}
                title={item.title}
            />
        )}
    </List>
}