import type {Hint, Status, Warning} from "hafas-client";
import React from "react";
import {ExclamationmarkTriangleFill, XmarkOctagonFill} from "framework7-icons/react"
import {Badge, Icon} from "konsta/react";

export default function RemarkSummary({remarks, cancelled}: {
    remarks: readonly (Hint | Status | Warning)[] | undefined,
    cancelled: boolean | undefined
}): React.JSX.Element {

    const warnings = remarks?.filter(remark => remark.type === 'warning' || remark.type === 'status')?.length;

    return <>
        {cancelled ? <Badge className="gap-1 text-lg mr-1" colors={{bg: 'bg-red-500', text: 'text-black'}}><Icon
            ios={<XmarkOctagonFill/>}/> Ausfall</Badge> : null}
        {warnings ? <Badge className="gap-1 text-lg" colors={{bg: 'bg-amber-300', text: 'text-black'}}><Icon
            ios={<ExclamationmarkTriangleFill/>}/></Badge> : null}
    </>
}