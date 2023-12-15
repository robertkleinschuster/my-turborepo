import type {Props} from "konsta/react/types/ListItem"
import type {HTMLAttributes, JSX} from "react";
import {Checkbox, ListItem} from "konsta/react";
import {useListSelection, useListSelectionDispatch} from "../context/list-selection";

export function SelectableListItem(props: Props & HTMLAttributes<Element> & { id: string }): JSX.Element {
    const dispatch = useListSelectionDispatch()
    const selection = useListSelection()

    return <ListItem {...props}
                     label={Boolean(selection) || props.label}
                     link={!selection && props.link}
                     media={selection ? <Checkbox
                         checked={selection.includes(props.id)}
                         component="div"
                         onChange={() => {
                             dispatch(props.id)
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