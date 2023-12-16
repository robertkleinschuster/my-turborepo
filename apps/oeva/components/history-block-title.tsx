import type {JSX} from "react";
import React, {useState} from "react";
import {BlockTitle, Button, Icon} from "konsta/react";
import {Trash} from "framework7-icons/react"
import {useHistory} from "../store/history";
import {historySelectionContext, HistorySelectionToggle} from "../app/app/history/history-selection-context";
import {ConfirmDialog} from "./confirm-dialog";

export function HistoryBlockTitle(): JSX.Element {
    const hideInRecents = useHistory(state => state.hideInRecents)
    const selection = historySelectionContext.useListSelection()
    const dispatch = historySelectionContext.useListSelectionDispatch()
    const [confirmDelete, setConfirmDelete] = useState(false)
    return <><BlockTitle>
        Zuletzt verwendet
        <span className="flex gap-1">
            {selection ?
                <Button className="bg-red-700 text-red-500 flex gap-1" disabled={selection.length === 0}
                        onClick={() => {
                            setConfirmDelete(true)
                        }} tonal><Icon ios={<Trash/>}/>Löschen</Button>
                : null}
            <HistorySelectionToggle/>
        </span>
    </BlockTitle>
        <ConfirmDialog onConfirm={() => {
            if (selection) {
                selection.forEach(item => {
                    hideInRecents(item.id)
                })
            }
            setConfirmDelete(false)
            dispatch(false)
        }} onDismiss={() => {
            setConfirmDelete(false)
        }} opened={confirmDelete}
                       title={selection?.length === 1 ? <>&bdquo;{selection[0]?.title}&ldquo; löschen?</> : <>{selection?.length} Einträge
                           löschen?</>}/>
    </>
}