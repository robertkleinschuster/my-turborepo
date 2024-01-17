import type {Alternative, ProductType} from "hafas-client";
import type { MutableRefObject} from "react";
import React, {forwardRef} from "react";
import Line from './line';

const AlternativeTitle = forwardRef(function AlternativeTitle({alternative, products}: {
    alternative: Alternative,
    products: readonly ProductType[],
}, ref: MutableRefObject<HTMLSpanElement|null>): React.JSX.Element {
    return <span className={alternative.cancelled ? 'line-through' : undefined} ref={ref}>
        {alternative.line ? <Line line={alternative.line} products={products}/> : '-'}
        {' '}
        {alternative.direction ?? alternative.provenance ?? ''}
    </span>
})

export default AlternativeTitle