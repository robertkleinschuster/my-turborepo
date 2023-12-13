import type {JSX, ReactNode} from "react";
import {Dialog, DialogButton} from "konsta/react";

export function ConfirmDialog({title, opened, onDismiss, onConfirm}: {
    title: ReactNode,
    opened: boolean,
    onDismiss: () => void,
    onConfirm: () => void
}): JSX.Element {
    return <Dialog
        buttons={
            <>
                <DialogButton onClick={() => {
                    onDismiss()
                }}>
                    Abbrechen
                </DialogButton>
                <DialogButton onClick={() => {
                    onConfirm()
                }} strong className="text-red-500">
                    Löschen
                </DialogButton>
            </>
        }
        opened={opened}
        title={title}
    />
}