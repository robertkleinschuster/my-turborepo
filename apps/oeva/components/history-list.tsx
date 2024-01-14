"use client"

import type {JSX} from "react";
import {Icon, List} from "konsta/react";
import {Clock, Eye} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import {HistoryListItem} from "../app/app/history/history-selection-context";
import Time from "./time";

function Info({item}: { item: HistoryItem }): JSX.Element {
    if (item.type === 'station') {
        return <span className="flex gap-1 items-center"><Icon ios={<Clock/>}/><Time
            time={item.when ? new Date(item.when) : null}/></span>
    }
    return <>Ab. <Time time={item.when ? new Date(item.when) : null}/> {item.parent?.title}</>
}

export function HistoryList({items, nested, onClick}: {
    items: readonly HistoryItem[],
    nested?: boolean,
    onClick?: (item: HistoryItem) => void
}): JSX.Element {
    const nav = useNavigation()

    return <List inset={!nested} nested={nested} strong={!nested}>
        {items.map(item => <HistoryListItem
                footer={<span className="flex gap-1 items-center"><Icon ios={<Eye/>}/><Time
                    time={new Date(item.added)}/></span>}
                header={<Info item={item}/>}
                item={item}
                key={item.sequence}
                link
                onClick={() => {
                    if (onClick) {
                        onClick(item)
                    }
                    nav.history(item)
                }}
                title={item.title}
            />
        )}
    </List>
}