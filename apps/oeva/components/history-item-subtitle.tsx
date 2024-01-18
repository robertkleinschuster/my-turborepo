import type {JSX} from "react";
import {Icon} from "konsta/react";
import {ArrowRight, Hourglass} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import Time from "./time";

export function HistoryItemSubTitle({item}: { item: HistoryItem }): JSX.Element {
    return <div className="flex flex-wrap gap-1 items-center">
        {item.previous?.type === 'trip' || item.previous?.type === 'station' ?
            <span>{item.type === 'trip' ? "Ab" : "An"}.&nbsp;<Time
                time={typeof item.params?.when === 'string' ? new Date(item.params.when) : null}/> {item.previous.title}</span> : null}
        {item.previous?.title && item.next?.title ?
            <Icon ios={item.type === 'trip' ? <ArrowRight/> : <Hourglass/>}/> : null}
        {item.next?.type === 'trip' || item.next?.type === 'station' ?
            <span>{item.type === 'trip' ? "An" : "Ab"}.&nbsp;<Time
                time={typeof item.next.params?.when === 'string' ? new Date(item.next.params.when) : null}/> {item.next.title}</span> : null}
    </div>
}
