"use client"

import type {Props as ListItemProps} from "konsta/react/types/ListItem"
import type {JSX} from "react";
import {Checkbox, ListItem} from "konsta/react";
import type {ListSelectionContext} from "./list-selection";

interface SelectableListItemProps<T> extends ListItemProps {
    item: T
}

export function createSelectableListItem<T>(context: ListSelectionContext<T>) {
    return function SelectableListItem(props: SelectableListItemProps<T>): JSX.Element {
        const dispatch = context.useListSelectionDispatch()
        const selection = context.useListSelection()

        return <ListItem {...props}
                         label={Boolean(selection) || props.label}
                         link={!selection && props.link}
                         media={selection ? <Checkbox
                             checked={selection.includes(props.item)}
                             component="div"
                             onChange={() => {
                                 dispatch(props.item)
                             }}
                         /> : props.media}
                         onClick={(e) => {
                             if (selection) {
                                 return
                             }
                             props.onClick && props.onClick(e)
                         }}
        />
    }

}