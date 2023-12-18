import type {Hint, Status, Warning} from "hafas-client";
import React from "react";
import {ExclamationmarkTriangleFill, XmarkOctagonFill} from "framework7-icons/react"
import {Badge, Icon} from "konsta/react";

export default function RemarkSummary({remarks, cancelled}: {
    remarks: readonly (Hint | Status | Warning)[] | undefined,
    cancelled: boolean | undefined
}): React.JSX.Element {

    const warnings = remarks?.filter(remark => remark.type === 'warning');

    const statuses = remarks?.filter(remark => remark.type === 'status')

    if (cancelled) {
        return <span className="flex gap-1 flex-wrap py-1">
            {statuses?.map(status => <Badge className="gap-1 text-lg"
                                            colors={{bg: 'bg-red-500', text: 'text-black'}} key={status.text}>
                <Icon ios={<XmarkOctagonFill/>}/> {status.text}</Badge>)}
            {warnings?.map(warning => <Badge className="gap-1 text-lg"
                                             colors={{bg: 'bg-amber-300', text: 'text-black'}} key={warning.summary}>
                <Icon ios={<ExclamationmarkTriangleFill/>}/> {warning.summary}</Badge>)}
        </span>
    } else {
        return <span className="flex gap-1 flex-wrap py-1">
            {statuses?.map(status => <Badge className="gap-1 text-lg" colors={{bg: 'bg-amber-300', text: 'text-black'}}
                                            key={status.text}>
                <Icon ios={<ExclamationmarkTriangleFill/>}/> {status.text}</Badge>)}
            {warnings?.map(warning => <Badge className="gap-1 text-lg"
                                             colors={{bg: 'bg-amber-300', text: 'text-black'}} key={warning.summary}>
                <Icon ios={<ExclamationmarkTriangleFill/>}/> {warning.summary}</Badge>)}
        </span>
    }
}