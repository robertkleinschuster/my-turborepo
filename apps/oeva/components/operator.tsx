import type { Operator } from "hafas-client";
import React from "react";

export default function Operator({operator}: {operator: Operator}): React.JSX.Element {
    if (operator.id === 'graz-linien') {
        return <span className="logo-hgl" />
    }

    if (operator.id === 'wiener-linien-gmbh-co-kg') {
        return <span className="logo-wiener-linien" />
    }

    if (operator.id === 'wiener-lokalbahnen-gmbh') {
        return <span className="logo-wlb" />
    }

    if (operator.id === 'raaberbahn-ag-gysev-zrt') {
        return <span className="logo-gysev-3" />
    }

    if (operator.id === 'regiojet-a-s') {
        return <span className="logo-regiojet" />;
    }

    if (operator.id === 'oebb-personenverkehr-ag-kundenservice') {
        return <span className="logo-oebb-1" />
    }

    if (operator.id === 'regiobus-steiermark') {
        return <span className="logo-oebb-1" />
    }

    if (operator.id === 'osterreichische-postbus-ag') {
        return <span className="logo-postbus" />
    }

    return <span title={operator.id}></span>
}