import type {Products, ProductType} from "hafas-client";
import type {Mode} from "./client";

export function buildProductsForMode(available: readonly ProductType[], mode: Mode['id']): Products {
    const filter: Products = {};

    for (const product of available) {
        filter[product.id] =  mode === product.mode;
    }

    return filter;
}

export function validateProductsFilter(products: Products): boolean
{
    return Object.values(products).filter(value => value).length > 0
}

export function mergeProducts(products: Products[], and = false): Products {
    const result: Products = {};
    for (const productsItem of products) {
        for (const key of Object.keys(productsItem)) {
            if (Object.hasOwn(result, key) && and) {
                result[key] = result[key] && Boolean(productsItem[key])
            } else if (Object.hasOwn(result, key) && !and) {
                result[key] = result[key] || Boolean(productsItem[key])
            } else {
                result[key] = Boolean(productsItem[key])
            }
        }
    }
    return result
}