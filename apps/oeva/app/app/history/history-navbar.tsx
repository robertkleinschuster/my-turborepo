"use client"

import {Button, Icon, Navbar} from "konsta/react";
import type {JSX} from "react";
import {useState} from "react";
import {Trash} from "framework7-icons/react"
import {useHistory} from "../../../store/history";
import {ConfirmDialog} from "../../../components/confirm-dialog";
import {useEditHistory, useEditHistoryDispatch} from "./context";

export function HistoryNavbar(): JSX.Element {
    const hideInRecents = useHistory(state => state.hideInRecents)
    const edit = useEditHistory()
    const dispatchEdit = useEditHistoryDispatch()
    const [confirmDelete, setConfirmDelete] = useState(false)
    return <>
        <Navbar
            right={edit ? <span className="flex gap-1">
                {edit.length ? <Button onClick={() => {setConfirmDelete(true)}} className="bg-red-700 flex gap-1"><Icon ios={<Trash/>}/>Löschen</Button> : null}
                <Button clear onClick={() => {dispatchEdit(false)}}>Abbrechen</Button>
            </span> : <Button clear onClick={() => {dispatchEdit(true)}}>Bearbeiten</Button>}
            title="Verlauf"
        />
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
        }} opened={confirmDelete} title={edit?.length === 1 ? <>&bdquo;{edit[0]?.title}&ldquo; löschen?</> : <>{edit?.length} Einträge löschen?</>}/>
    </>
}