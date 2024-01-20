import type {JSX} from "react";
import {Icon} from "konsta/react";
import {ArrowRight, Hourglass} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import Time from "./time";
import {HistoryItemTitle} from "./history-item-title";

export function HistoryItemSubTitle({item}: { item: HistoryItem }): JSX.Element {
    if (item.recents_overview && item.children) {
        return <span>{item.children.length} Abschnitte</span>
    }

    return <div className="flex flex-wrap gap-1 items-center">
        {item.previous?.type === 'trip' || item.previous?.type === 'station' ?
            <span>{item.type === 'trip' ? "Ab" : "An"}.&nbsp;<Time
                time={typeof item.info?.when === 'string' ? new Date(item.info.when) : null}/> <HistoryItemTitle item={item.previous}/></span> : null}
        {item.previous?.title && item.next?.title ?
            <Icon ios={item.type === 'trip' ? <ArrowRight/> : <Hourglass/>}/> : null}
        {item.next?.type === 'trip' || item.next?.type === 'station' ?
            <span>{item.type === 'trip' ? "An" : "Ab"}.&nbsp;<Time
                time={typeof item.next.info?.when === 'string' ? new Date(item.next.info.when) : null}/> <HistoryItemTitle
                item={item.next}/></span> : null}
    </div>
}
