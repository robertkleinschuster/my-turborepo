import type {Alternative} from "hafas-client";
import type { MutableRefObject} from "react";
import React, {forwardRef} from "react";
import type {Mode} from "../client/client";
import Line from './line';

const AlternativeTitle = forwardRef(function AlternativeTitle({alternative, modes}: {
    alternative: Alternative,
    modes: readonly Mode[],
}, ref: MutableRefObject<HTMLSpanElement|null>): React.JSX.Element {
    return <span className={alternative.cancelled ? 'line-through' : undefined} ref={ref}>
        {alternative.line ? <Line line={alternative.line} modes={modes}/> : '-'}
        {' '}
        {alternative.direction ?? alternative.provenance ?? ''}
    </span>
})

export default AlternativeTitle