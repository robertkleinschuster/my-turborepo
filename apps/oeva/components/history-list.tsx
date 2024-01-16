"use client"

import type {JSX} from "react";
import {Icon, List} from "konsta/react";
import {Clock, Eye, ArrowRight, Hourglass} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import {HistoryListItem} from "../app/app/history/history-selection-context";
import Time from "./time";

function Info({item}: { item: HistoryItem }): JSX.Element {
    return <span className="flex gap-1 items-center"><Icon ios={<Clock/>}/><Time
        time={typeof item.params?.when === 'string' ? new Date(item.params.when) : null}/></span>
}

function SubTitle({item}: { item: HistoryItem }): JSX.Element {
    return <div className="flex flex-wrap gap-1 items-center">
        {item.previous?.type === 'trip' || item.previous?.type === 'station' ? <span>{item.type === 'trip' ? "Ab" : "An"}.&nbsp;<Time time={typeof item.params?.when === 'string' ? new Date(item.params.when) : null}/> {item.previous.title}</span> : null}
        {item.previous?.title && item.next?.title ? <Icon ios={item.type === 'trip' ? <ArrowRight/> : <Hourglass/>}/> : null}
        {item.next?.type === 'trip' || item.next?.type === 'station' ? <span>{item.type === 'trip' ? "An" : "Ab"}.&nbsp;<Time time={typeof item.next.params?.when === 'string' ? new Date(item.next.params.when) : null}/> {item.next.title}</span> : null}
    </div>
}

export function HistoryList({items, nested, breadcrumbs, details, onClick}: {
    items: readonly HistoryItem[],
    nested?: boolean,
    breadcrumbs?: boolean
    details?: boolean
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
                    if (breadcrumbs) {
                        nav.push_breadcrumb(item)
                    } else {
                        nav.push(item)
                    }
                }}
                subtitle={details ? <SubTitle item={item}/> : null}
                title={item.title}
            />
        )}
    </List>
}