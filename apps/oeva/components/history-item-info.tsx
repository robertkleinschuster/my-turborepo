import type {JSX} from "react";
import {Icon} from "konsta/react";
import {Clock} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import Time from "./time";

export function HistoryItemInfo({item}: { item: HistoryItem }): JSX.Element {
    return <span className="flex gap-1 items-center"><Icon ios={<Clock/>}/><Time
        time={typeof item.params?.when === 'string' ? new Date(item.params.when) : null}/></span>
}
