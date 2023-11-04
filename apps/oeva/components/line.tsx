import type { Line, ProductType } from "hafas-client";
import React from "react";
import Product from "./product";

export default function Line({ line, products }: { line: Line, products: readonly ProductType[] }): React.JSX.Element {
    if (line.product === 'train-and-s-bahn') {
        if (line.productName === 'RJ') {
            return <span className="class-a-rj" />
        }

        if (line.productName === 'NJ') {
            return <span className="class-a-nj" />
        }

        if (line.productName === 'RJX') {
            return <span className="class-a-rjx" />
        }

        if (line.productName === 'EC') {
            return <span className="class-a-ec" />
        }

        if (line.productName === 'EN') {
            return <span className="class-a-en" />
        }

        if (line.productName === 'IC') {
            return <span className="class-a-ic" />
        }

        if (line.productName === 'D') {
            return <span className="class-a-d" />
        }

        if (line.productName === 'REX' || line.name?.startsWith('REX')) {
            return <span className="class-a-rex" />
        }

        if (line.productName === 'R' || line.name?.startsWith('R')) {
            return <span className="class-a-r" />
        }

        if (line.name?.startsWith('S')) {
            return <span className="class-a-sbahn" />
        }

        return <span>{line.productName}</span>
    }

    for (const product of products) {
        if (product.id === line.product) {
            return <Product product={product} />
        }
    }

    return <span>-</span>
}