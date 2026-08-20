export interface LocalizedText {
  fa: string
  en: string
}

export interface ProductPreview {
  id: string
  slug: string
  title: LocalizedText
  category: LocalizedText
  price: number
  imageUrl?: string
  isAvailable: boolean
}

export interface Product extends ProductPreview {
  description: LocalizedText
  material: LocalizedText
  dimensions: LocalizedText
}
export interface Product extends ProductPreview {
  description: LocalizedText
  material: LocalizedText
  dimensions: LocalizedText
}