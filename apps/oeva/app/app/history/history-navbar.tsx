"use client"

import {Button, Icon, Navbar, Toolbar} from "konsta/react";
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
            right={edit ?
                <Button clear onClick={() => {
                    dispatchEdit(false)
                }}>Abbrechen</Button>
                : <Button clear onClick={() => {
                    dispatchEdit(true)
                }}>Bearbeiten</Button>}
            title="Verlauf"
        />
        {edit ? <Toolbar className="bottom-0 fixed z-30">
            <span className="flex gap-1">
                <Button className="bg-red-700 text-red-500 flex gap-1" disabled={edit.length === 0} onClick={() => {
                    setConfirmDelete(true)
                }} tonal><Icon ios={<Trash/>}/>Löschen</Button>
            </span>
        </Toolbar> : null}
        {edit ?
            <ConfirmDialog onConfirm={() => {
                edit.forEach(item => {
                    hideInRecents(item.id)
                })
                setConfirmDelete(false)
                dispatchEdit(false)
            }} onDismiss={() => {
                setConfirmDelete(false)
            }} opened={confirmDelete}
                           title={edit.length === 1 ? <>&bdquo;{edit[0]?.title}&ldquo; löschen?</> :
                               <>{edit.length} Einträge löschen?</>}/>
            : null}
    </>
}