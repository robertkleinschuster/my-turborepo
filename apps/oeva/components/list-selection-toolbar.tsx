import {Button, Icon, Toolbar} from "konsta/react";
import type {JSX} from "react";
import React, {useState} from "react";
import {Trash} from "framework7-icons/react"
import type {ListSelection} from "../context/list-selection";
import {useListSelection, useListSelectionDispatch} from "../context/list-selection";
import {ConfirmDialog} from "./confirm-dialog";

export function ListSelectionToolbar({onDelete, buildSummary}: {
    onDelete: (selection: ListSelection<string>) => void,
    buildSummary?: (selection: ListSelection<string>) => string
}): JSX.Element {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const selection = useListSelection()
    const dispatch = useListSelectionDispatch()
    const summary = buildSummary ? buildSummary(selection) : selection?.length ?? 'Ausgewählte';


    return <>
        {selection ? <Toolbar className="bottom-0 fixed z-30">
            <span className="flex gap-1">
                <Button className="bg-red-700 text-red-500 flex gap-1" disabled={selection.length === 0}
                        onClick={() => {
                            setConfirmDelete(true)
                        }} tonal><Icon ios={<Trash/>}/>Löschen</Button>
            </span>
        </Toolbar> : null}
        {selection ?
            <ConfirmDialog onConfirm={() => {
                onDelete(selection)
                setConfirmDelete(false)
                dispatch(false)
            }} onDismiss={() => {
                setConfirmDelete(false)
            }} opened={confirmDelete}
                           title={<>{summary} löschen?</>}/>
            : null}
    </>
}