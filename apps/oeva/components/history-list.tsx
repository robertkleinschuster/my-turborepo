"use client"

import {JSX, useRef} from "react";
import {Checkbox, List, ListItem} from "konsta/react";
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import {useLongPress} from "use-long-press";
import {useEditHistory, useEditHistoryDispatch} from "../app/app/history/context";

export function HistoryList({items}: {
    items: readonly HistoryItem[],
}): JSX.Element {
    const dispatchEdit = useEditHistoryDispatch()
    const edit = useEditHistory()
    const selectedIds = edit?.map(item => item.id)
    const changedMode = useRef<boolean>(false)

    const nav = useNavigation()
    const longPress = useLongPress<Element, HistoryItem>((event, meta) => {
        if (meta.context) {
            dispatchEdit(meta.context)
            changedMode.current = true
        }
    })
    return <List inset strong>
        {items.map(item => <ListItem
                {...longPress(item)}
                key={item.id + item.added}
                link={item.type === 'station' || item.type === 'trip'}
                media={selectedIds ?  <Checkbox
                    checked={selectedIds.includes(item.id)}
                    component="div"
                /> : null}
                onClick={() => {
                    if (changedMode.current) {
                        changedMode.current = false
                        return
                    }
                    if (edit) {
                        dispatchEdit(item)
                        return
                    }
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