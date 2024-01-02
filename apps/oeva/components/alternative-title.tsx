import type {Alternative, ProductType} from "hafas-client";
import React from "react";
import Line from './line';

export default function AlternativeTitle({alternative, products}: {
    alternative: Alternative,
    products: readonly ProductType[]
}): React.JSX.Element {
    return <span className={alternative.cancelled ? 'line-through' : undefined}>
        {alternative.line ? <Line line={alternative.line} products={products}/> : '-'}
        {' '}
        {alternative.direction ?? alternative.provenance ?? ''}
    </span>
}