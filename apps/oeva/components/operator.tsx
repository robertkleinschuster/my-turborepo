import type { Operator } from "hafas-client";
import React from "react";

export default function Operator({operator}: {operator: Operator}): React.JSX.Element {
    if (operator.id === 'graz-linien') {
        return <span className="logo-hgl" />
    }

    if (operator.id === 'oebb-personenverkehr-ag-kundenservice') {
        return <span className="logo-oebb-1" />
    }

    return <></>
}