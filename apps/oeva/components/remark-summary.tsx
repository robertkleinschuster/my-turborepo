import { Hint, Status, Warning } from "hafas-client";
import React from "react";
import {ExclamationmarkTriangleFill} from "framework7-icons/react"
import { Badge, Icon } from "konsta/react";

export default function RemarkSummary({ remarks }: { remarks: readonly (Hint | Status | Warning)[] | undefined }): React.JSX.Element {
    if (remarks === undefined) {
        return <></>
    }

    const warnings = remarks.filter(remark => remark.type === 'warning').length;

    if (!warnings) {
        return <>
        </>

    }

    return <Badge className="gap-1 text-lg" colors={{ bg: 'bg-amber-300', text: 'text-black' }}>{warnings > 1 ? warnings : null}<Icon ios={<ExclamationmarkTriangleFill/>} /></Badge>
}