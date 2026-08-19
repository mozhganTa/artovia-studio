import type { Product } from '../types/product'

export const featuredProducts: Product[] = [
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
    description: {
      fa: 'بشقاب مسی دست‌ساز با نقش‌های سنتی که توسط هنرمندان ایرانی قلم‌زنی شده است.',
      en: 'A handmade copper plate decorated with traditional patterns by Iranian artisans.',
    },
    material: {
      fa: 'مس',
      en: 'Copper',
    },
    dimensions: {
      fa: 'قطر ۳۰ سانتی‌متر',
      en: '30 cm diameter',
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
    description: {
      fa: 'دیوارکوب سفالی دست‌ساز با بافت طبیعی، مناسب فضاهای گرم و هنری.',
      en: 'A handmade ceramic wall piece with a natural texture for warm and artistic spaces.',
    },
    material: {
      fa: 'سفال',
      en: 'Ceramic',
    },
    dimensions: {
      fa: 'قطر ۲۵ سانتی‌متر',
      en: '25 cm diameter',
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
    description: {
      fa: 'تابلوی دست‌ساز با رنگ اکریلیک و ترکیبی از رنگ‌های گرم و زنده.',
      en: 'A handmade acrylic painting featuring a warm and vibrant color palette.',
    },
    material: {
      fa: 'رنگ اکریلیک روی بوم',
      en: 'Acrylic on canvas',
    },
    dimensions: {
      fa: '۴۰ در ۵۰ سانتی‌متر',
      en: '40 × 50 cm',
    },
    price: 3_200_000,
    isAvailable: false,
  },
]