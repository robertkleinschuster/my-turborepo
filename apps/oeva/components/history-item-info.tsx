import type {JSX} from "react";
import {Icon} from "konsta/react";
import {Clock} from "framework7-icons/react"
import type {HistoryItem} from "../store/history";
import Time from "./time";

export function HistoryItemInfo({item}: { item: HistoryItem }): JSX.Element {
    if (item.recents_overview && item.children?.length) {
        return <span className="flex gap-1 items-center flex-wrap"><Icon ios={<Clock/>}/><Time
            time={typeof item.children[0].params?.when === 'string' ? new Date(item.children[0].params.when) : null}/>
            {item.previous && item.type === 'station' && item.info?.distance ? <span>{item.info.distance} m Fußweg von {item.previous.title}</span> : null}
        </span>
    }

    if (!item.params?.when) {
        return <></>
    }
    return <span className="flex gap-1 items-center flex-wrap"><Icon ios={<Clock/>}/><Time
        time={typeof item.params.when === 'string' ? new Date(item.params.when) : null}/>
        {item.previous && item.type === 'station' && item.info?.distance ? <span>{item.info.distance} m Fußweg von {item.previous.title}</span> : null}
    </span>
}
