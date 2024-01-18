"use client"

import type {JSX} from "react";
import {Icon, List} from "konsta/react";
import {Eye} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import {HistoryListItem} from "../app/app/history/history-selection-context";
import Time from "./time";
import {HistoryItemTitle} from "./history-item-title";
import {HistoryItemInfo} from "./history-item-info";
import {HistoryItemSubTitle} from "./history-item-subtitle";

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
                header={<HistoryItemInfo item={item}/>}
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
                subtitle={details ? <HistoryItemSubTitle item={item}/> : null}
                title={<HistoryItemTitle item={item}/>}
            />
        )}
    </List>
}