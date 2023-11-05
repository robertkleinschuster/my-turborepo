import { Alternative, Line as LineType, ProductType } from "hafas-client";
import Line from './line';
import React from "react";

export default function AlternativeTitle({ alternative, products }: { alternative: Alternative & { line?: LineType & { number?: string } } , products: readonly ProductType[]}): React.JSX.Element {
    return <>
        {alternative.line ? <Line line={alternative.line} products={products} /> : '-'}
        {' '}
        {alternative.line?.number} {alternative.direction ?? alternative.provenance ?? ''}
    </>
}