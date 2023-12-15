import {Button} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import {
    useListSelection, useListSelectionDispatch
} from "../context/list-selection";

export function ListSelectionToggle(): JSX.Element {
    const selection = useListSelection()
    const dispatch = useListSelectionDispatch()

    return <Button clear onClick={() => {
        dispatch(!selection)
    }}>{selection ? 'Abbrechen' : 'Bearbeiten'}</Button>
}