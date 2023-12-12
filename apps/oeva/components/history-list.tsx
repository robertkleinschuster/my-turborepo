"use client"

import type {JSX} from "react";
import {useState} from "react";
import {Dialog, DialogButton, List, ListItem} from "konsta/react";
import type {HistoryItem} from "../store/history";
import {useNavigation} from "../hooks/use-navigation";
import {useLongPress} from "use-long-press";

export function HistoryList({items, onDelete}: {
    items: readonly HistoryItem[],
    onDelete: (id: string) => void
}): JSX.Element {
    const nav = useNavigation()
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [subject, setSubject] = useState<HistoryItem | null>(null)
    const longPress = useLongPress<Element, HistoryItem>((event, meta) => {
        if (meta.context) {
            setSubject(meta.context)
            setShowConfirm(true)
        }
    })
    return <>
        <List inset strong>
            {items.map(item => <ListItem
                    {...longPress(item)}
                    key={item.id + item.added}
                    link={item.type === 'station' || item.type === 'trip'}
                    onClick={() => {
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
        <Dialog
            buttons={
                <>
                    <DialogButton onClick={() => {
                        setShowConfirm(false)
                    }}>
                        Abbrechen
                    </DialogButton>
                    <DialogButton onClick={() => {
                        if (subject) {
                            onDelete(subject.id)
                        }
                        setShowConfirm(false)

                    }} strong style={{color: "red"}}>
                        Löschen
                    </DialogButton>
                </>
            }
            opened={showConfirm}
            title={<>&bdquo;{subject?.title}&ldquo; entfernen?</>}
        />
    </>
}