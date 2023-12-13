import type {JSX} from "react";
import React, {useState} from "react";
import {BlockTitle, Button, Icon} from "konsta/react";
import {Trash} from "framework7-icons/react"
import {useEditHistory, useEditHistoryDispatch} from "../app/app/history/context";
import {useHistory} from "../store/history";
import {ConfirmDialog} from "./confirm-dialog";

export function RecentsBlockTitle(): JSX.Element {
    const hideInRecents = useHistory(state => state.hideInRecents)
    const edit = useEditHistory()
    const dispatchEdit = useEditHistoryDispatch()
    const [confirmDelete, setConfirmDelete] = useState(false)
    return <><BlockTitle>
        Zuletzt verwendet
        {edit ? <span className="flex gap-1">
                {edit.length ? <Button className="bg-red-700 flex gap-1" onClick={() => {
                    setConfirmDelete(true)
                }}><Icon ios={<Trash/>}/>Löschen</Button> : null}
            <Button clear onClick={() => {
                dispatchEdit(false)
            }}>Abbrechen</Button>
            </span> : <span>
            <Button clear onClick={() => {
                dispatchEdit(true)
            }}>Bearbeiten</Button>
            </span>
        }
    </BlockTitle>
        <ConfirmDialog onConfirm={() => {
            if (edit) {
                edit.forEach(item => {
                    hideInRecents(item.id)
                })
            }
            setConfirmDelete(false)
            dispatchEdit(false)
        }} onDismiss={() => {
            setConfirmDelete(false)
        }} opened={confirmDelete}
                       title={edit?.length === 1 ? <>&bdquo;{edit[0]?.title}&ldquo; löschen?</> : <>{edit?.length} Einträge
                           löschen?</>}/>
    </>
}