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