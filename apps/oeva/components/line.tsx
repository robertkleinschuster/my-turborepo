import type { Line, ProductType } from "hafas-client";
import React from "react";
import Product from "./product";

export default function Line({ line, products }: { line: Line, products: readonly ProductType[] }): React.JSX.Element {
    if (line.product === 'train-and-s-bahn') {
        if (line.productName === 'ICE') {
            return <><span className="class-a-ice" /> {line.fahrtNr}</>
        }

        if (line.productName === 'RJ') {
            return <><span className="class-a-rj" /> {line.fahrtNr}</>
        }

        if (line.productName === 'WB') {
            return <><span className="class-a-west" /> {line.fahrtNr}</>
        }

        if (line.productName === 'NJ') {
            return <><span className="class-a-nj" /> {line.fahrtNr}</>
        }

        if (line.productName === 'RJX') {
            return <><span className="class-a-rjx" /> {line.fahrtNr}</>
        }

        if (line.productName === 'EC') {
            return <><span className="class-a-ec" /> {line.fahrtNr}</>
        }

        if (line.productName === 'EN') {
            return <><span className="class-a-en" /> {line.fahrtNr}</>
        }

        if (line.productName === 'IC') {
            return <><span className="class-a-ic" /> {line.fahrtNr}</>
        }

        if (line.productName === 'D') {
            return <><span className="class-a-d" /> {line.fahrtNr}</>
        }

        if (line.productName === 'REX') {
            return <><span className="class-a-rex" /> {line.name?.startsWith('REX') ? line.name.substring(3) : line.name}</>
        }

        if (line.name?.startsWith('REX')) {
            return <><span className="class-a-rex" /> {line.name.substring(3)}</>
        }

        if (line.name?.startsWith('R')) {
            return <><span className="class-a-r" /> {line.name.substring(1)}</>
        }

        if (line.productName === 'R') {
            return <><span className="class-a-r" /> {line.name}</>
        }

        if (line.name?.startsWith('S')) {
            return <><span className="class-a-sbahn" /> {line.name.substring(1)}</>
        }

        return <><span className="class-a-modern-train" /> {line.name}</>
    }
    const lineName = line.name ?? line.fahrtNr

    for (const product of products) {
        if (product.id === line.product) {
            return <><Product product={product} /> {lineName}</>
        }
    }

    return <span title={`${line.product}:${line.productName}`}>-</span>
}