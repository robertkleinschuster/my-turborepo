import type {Products, ProductType} from "hafas-client";
import type {Mode} from "./client";

export function buildProductsFilter(available: readonly ProductType[], list: Mode['id'][] | undefined | null): Products {
    const filter: Products = {};
    if (list?.length) {
        for (const product of available) {
            filter[product.id] = list.includes(product.mode);
        }
    }

    return filter;
}