import {Block, Link, Navbar, Page, Panel} from "konsta/react";
import type {JSX} from "react";
import React from "react";
import type {Hint, Status, Warning} from "hafas-client";
import Remarks from "./remarks";

export function RemarksPanel({onDismiss, show, remarks}: {
    onDismiss: () => void,
    show: boolean,
    remarks: readonly (Hint | Status | Warning)[]
}): JSX.Element {
    return <Panel
        floating
        onBackdropClick={() => {
            onDismiss()
        }}
        opened={show}
        side="right"
    >
        <Page className="no-safe-areas-top no-safe-areas-bottom">
            <Navbar
                right={
                    <Link navbar onClick={() => {
                        onDismiss()
                    }}>
                        Schließen
                    </Link>
                }
                title="Informationen"
            />
            <Block className="space-y-4">
                <Remarks remarks={remarks} type='warning'/>
                <Remarks remarks={remarks} type='status'/>
                <Remarks remarks={remarks} type='hint'/>
            </Block>
        </Page>
    </Panel>
}