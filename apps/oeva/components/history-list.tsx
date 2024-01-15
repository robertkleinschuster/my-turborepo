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
        time={item.when ? new Date(item.when) : null}/></span>
}

function SubTitle({item}: { item: HistoryItem }): JSX.Element {
    if (item.type === 'trip' && item.parent?.type === 'station' || item.type === 'station' && item.parent?.type === 'trip') {
        return <div className="flex flex-wrap gap-1 items-center">
            <span>An.&nbsp;<Time time={item.parent.when ? new Date(item.parent.when) : null}/> {item.parent.title}</span>
            {item.next ? <>
                {item.type === 'trip' ? <Icon ios={<ArrowRight/>}/> : <Icon ios={<Hourglass/>}/>}
                <span>Ab.&nbsp;<Time time={item.next.when ? new Date(item.next.when) : null}/> {item.next.title}</span>
            </> : null}

        </div>
    }
    return <></>
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
                        nav.breadcrumb(item)
                    } else {
                        nav.history(item)
                    }
                }}
                title={item.title}
                subtitle={details ? <SubTitle item={item}/> : null}
            />
        )}
    </List>
}