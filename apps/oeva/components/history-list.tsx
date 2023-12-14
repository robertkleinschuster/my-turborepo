"use client"

import type {JSX} from "react";
import {Checkbox, Icon, List, ListItem} from "konsta/react";
import {Clock, Eye} from "framework7-icons/react"
import {useLongPress} from "use-long-press";
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import {useEditHistory, useEditHistoryDispatch} from "../app/app/history/context";
import Time from "./time";

function Info({item}: { item: HistoryItem }): JSX.Element {
    if (item.type === 'station') {
        return <span className="flex gap-1 items-center"><Icon ios={<Clock/>}/><Time
            time={item.when ? new Date(item.when) : null}/></span>
    }
    if (item.type === 'trip') {
        return <>Ab. <Time time={item.when ? new Date(item.when) : null}/> {item.parent?.title}</>
    }
    return <></>
}

export function HistoryList({items}: {
    items: readonly HistoryItem[],
}): JSX.Element {
    const dispatchEdit = useEditHistoryDispatch()
    const edit = useEditHistory()
    const selectedIds = edit?.map(item => item.id)

    const nav = useNavigation()
    const longPress = useLongPress<Element, HistoryItem>((event, meta) => {
        if (meta.context) {
            dispatchEdit(meta.context)
        }
    })
    return <List inset strong>
        {items.map(item => <ListItem
                {...longPress(item)}
                footer={<span className="flex gap-1 items-center"><Icon ios={<Eye/>}/><Time
                    time={new Date(item.added)}/></span>}
                header={<Info item={item}/>}
                key={item.sequence}
                label={Boolean(edit)}
                link={!edit && (item.type === 'station' || item.type === 'trip')}
                media={selectedIds ? <Checkbox
                    checked={selectedIds.includes(item.id)}
                    component="div"
                    onChange={() => {
                        dispatchEdit(item)
                    }}
                /> : null}
                onClick={() => {
                    if (edit) {
                        return
                    }
                    nav.history(item)
                }}
                title={item.title}
            />
        )}
    </List>
}