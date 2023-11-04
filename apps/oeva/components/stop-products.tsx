import type { ProductType, Station, Stop } from "hafas-client";
import React from "react";
import Product from "./product";

export default function StopProducts({ stop, products }: { stop: Stop | Station, products: readonly ProductType[] }): React.JSX.Element {
    return <span className="flex gap-1">
        {products.filter(product => {
            if (stop.products) {
                return stop.products[product.id];
            }
            return false;
        }).map(product => <Product key={product.id} product={product} />)}
    </span>
}