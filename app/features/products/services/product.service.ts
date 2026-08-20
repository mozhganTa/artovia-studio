import { featuredProducts } from '../data/featured-products'
import type { Product } from '../types/product'

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  return featuredProducts.find(product => {
    return product.slug === slug
  }) ?? null
}