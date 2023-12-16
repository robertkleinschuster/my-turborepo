import {Button} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import type {
    ListSelectionContext,
} from "./list-selection";

export function createListSelectionToggle<T>(context: ListSelectionContext<T>) {
    return function ListSelectionToggle(): JSX.Element {
        const selection = context.useListSelection()
        const dispatch = context.useListSelectionDispatch()

        return <Button clear onClick={() => {
            dispatch(!selection)
        }}>{selection ? 'Abbrechen' : 'Bearbeiten'}</Button>
    }
}

