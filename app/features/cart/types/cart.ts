import type { ProductPreview } from "~/features/products/types/product";

export interface CartItem {
    product: ProductPreview
    quantity: number
}