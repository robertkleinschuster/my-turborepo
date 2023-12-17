"use client"

import {Button, Icon, Toolbar} from "konsta/react";
import type {JSX} from "react";
import React, {useState} from "react";
import {Trash} from "framework7-icons/react"
import {ConfirmDialog} from "../components/confirm-dialog";
import type {ListSelection, ListSelectionContext} from "./list-selection";

export function createListSelectionToolbar<T>(context: ListSelectionContext<T>) {
    return function ListSelectionToolbar({onDelete, buildSummary}: {
        onDelete: (selection: ListSelection<T>) => void,
        buildSummary?: (selection: ListSelection<T>) => JSX.Element
    }): JSX.Element {
        const [confirmDelete, setConfirmDelete] = useState(false)
        const selection = context.useListSelection()
        const dispatch = context.useListSelectionDispatch()
        const summary = buildSummary ? buildSummary(selection) : 'Ausgewählte Einträge löschen?';


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
                }} opened={confirmDelete} title={summary}/>
                : null}
        </>
    }
}