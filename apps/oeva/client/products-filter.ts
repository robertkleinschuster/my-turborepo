import type {Products, ProductType} from "hafas-client";

export function buildProductsFilter(available: readonly ProductType[], list: string[] | undefined | null): Products {
    const filter: Products = {};
    if (list?.length) {
        for (const product of available) {
            filter[product.id] = list.includes(product.id);
        }
    }
    return filter;
}