import React from "react"

export function Platform({ planned, prognosed }: { planned: string | undefined, prognosed: string | undefined }): React.JSX.Element {
    if (planned && prognosed) {
        if (planned === prognosed) {
            return <span>Steig {planned}</span>
        }

        return <span>Steig <span className="line-through">{planned}</span> <span className="font-bold">{prognosed}</span></span>
    }

    if (planned) {
        return <span>Steig {planned}</span>

    }

    if (prognosed) {
        return <span>Steig {prognosed}</span>
    }
    return <></>
}