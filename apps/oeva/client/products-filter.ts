import type { Products } from "hafas-client";
import type { Client } from "./client";

export function buildProductsFilter(client: Client, products: string[] | undefined): Products {
    const filter: Products = {};
    if (products?.length) {
        for (const product of client.profile.products) {
            filter[product.id] = products.includes(product.id);
        }
    }
    return filter;
}