import type { ProductPreview } from "../types/product";

export const featuredProducts: ProductPreview[] = [
  {
    id: '1',
    slug: 'engraved-copper-plate',
    title: {
      fa: 'بشقاب مسی قلم‌زنی‌شده',
      en: 'Engraved Copper Plate',
    },
    category: {
      fa: 'آثار مسی',
      en: 'Copper Artworks',
    },
    price: 4_850_000,
    isAvailable: true,
  },
  {
    id: '2',
    slug: 'handmade-ceramic-wall-plate',
    title: {
      fa: 'دیوارکوب سفالی دست‌ساز',
      en: 'Handmade Ceramic Wall Plate',
    },
    category: {
      fa: 'دیوارکوب سفالی',
      en: 'Ceramic Wall Art',
    },
    price: 2_750_000,
    isAvailable: true,
  },
  {
    id: '3',
    slug: 'acrylic-floral-artwork',
    title: {
      fa: 'تابلوی گل با رنگ اکریلیک',
      en: 'Acrylic Floral Artwork',
    },
    category: {
      fa: 'نقاشی',
      en: 'Paintings',
    },
    price: 3_200_000,
    isAvailable: false,
  },
]