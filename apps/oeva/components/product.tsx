import React from "react";
import type {Mode} from "../client/client";

export default function Product({ product }: { product: Mode }): React.JSX.Element {
    if (product.id === 'train') {
        return <span className="class-a-modern-train" />
    }

    if (product.id === 'bus') {
        return <span className="class-a-bus" />
    }

    if (product.id === 'gondola') {
        return <span className="class-a-ablecar" />
    }

    if (product.id === 'watercraft') {
        return <span className="class-a-haf-prod-ship" />
    }

    if (product.id === 'taxi') {
        return <span className="class-a-haf-prod-ast" />
    }

    return <span>{product.name}</span>
}