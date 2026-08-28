import { products } from '../data/products'
import type { Product } from '../types/product'

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  return products.find(product => {
    return product.slug === slug
  }) ?? null
}