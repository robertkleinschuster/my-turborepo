import type { ProductType } from "hafas-client";
import React from "react";

export default function Product({ product }: { product: ProductType }): React.JSX.Element {
    if (product.id === 'train-and-s-bahn') {
        return <span className="class-a-modern-train" />
    }

    if (product.id === 'tram') {
        return <span className="class-a-haf-prod-tram" />
    }

    if (product.id === 'u-bahn') {
        return <span className="class-a-haf-prod-ubahn" />
    }

    if (product.id === 'city-bus') {
        return <span className="class-a-haf-prod-bus" />
    }

    if (product.id === 'regional-bus') {
        return <span className="class-a-bus" />
    }

    if (product.id === 'long-distance-bus') {
        return <span className="class-m-ic-bus" />
    }

    if (product.id === 'other-bus') {
        return <span className="class-m-bus" />
    }

    if (product.id === 'aerial-lift') {
        return <span className="class-a-haf-prod-cablecar" />
    }

    if (product.id === 'ferry') {
        return <span className="class-a-haf-prod-ship" />
    }


    if (product.id === 'on-call') {
        return <span className="class-a-haf-prod-ast" />
    }

    return <span>-</span>
}