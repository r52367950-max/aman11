export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  gallery: string[];
  sizes?: string[];
  variants?: ProductVariant[];
  ingredients?: string[];
  usage?: string;
  benefits?: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  slug: string;
}

export interface ProductVariant {
  name: string;
  price: number;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const shopCategories: Category[] = [
  {
    id: '1',
    name: 'Skincare',
    description: 'Luxurious skincare products crafted with natural ingredients',
    image: '/images/misc/aman-essentials.jpg',
    productCount: 24,
  },
  {
    id: '2',
    name: 'Fragrance',
    description: 'Exquisite fragrances inspired by Aman destinations',
    image: '/images/misc/aman-essentials.jpg',
    productCount: 12,
  },
  {
    id: '3',
    name: 'Homeware',
    description: 'Elegant homeware to bring the Aman aesthetic to your space',
    image: '/images/misc/gift-card.jpg',
    productCount: 18,
  },
  {
    id: '4',
    name: 'Gift Sets',
    description: 'Curated gift sets for every occasion',
    image: '/images/misc/gift-card.jpg',
    productCount: 8,
  },
];

export const productsData: Product[] = [
  {
    id: '1',
    name: 'Purifying Cleanser',
    category: 'Skincare',
    description: 'A gentle, purifying cleanser that removes impurities while maintaining skin\'s natural balance. Formulated with botanical extracts and essential oils.',
    price: 85,
    currency: 'USD',
    image: '/images/misc/aman-essentials.jpg',
    gallery: ['/images/misc/aman-essentials.jpg', '/images/misc/aman-essentials.jpg'],
    sizes: ['100ml', '200ml'],
    ingredients: [
      'Aloe Vera Extract',
      'Green Tea Extract',
      'Chamomile Oil',
      'Vitamin E',
      'Hyaluronic Acid',
    ],
    usage: 'Apply to damp skin morning and evening. Massage gently and rinse with warm water.',
    benefits: [
      'Removes impurities without stripping',
      'Maintains skin\'s natural pH balance',
      'Calms and soothes the skin',
      'Prepares skin for subsequent treatments',
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    slug: 'purifying-cleanser',
  },
  {
    id: '2',
    name: 'Hydrating Face Cream',
    category: 'Skincare',
    description: 'Rich, luxurious face cream that provides intense hydration and nourishment. Perfect for dry and mature skin types.',
    price: 145,
    currency: 'USD',
    image: '/images/misc/aman-essentials.jpg',
    gallery: ['/images/misc/aman-essentials.jpg', '/images/misc/aman-essentials.jpg'],
    sizes: ['50ml', '100ml'],
    ingredients: [
      'Shea Butter',
      'Jojoba Oil',
      'Rosehip Oil',
      'Peptide Complex',
      'Ceramides',
    ],
    usage: 'Apply to cleansed face and neck morning and evening. Massage until fully absorbed.',
    benefits: [
      'Provides 24-hour hydration',
      'Strengthens skin barrier',
      'Reduces appearance of fine lines',
      'Restores skin radiance',
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    slug: 'hydrating-face-cream',
  },
  {
    id: '3',
    name: 'Rejuvenating Eye Serum',
    category: 'Skincare',
    description: 'Targeted eye treatment that reduces puffiness, dark circles, and fine lines around the delicate eye area.',
    price: 125,
    currency: 'USD',
    image: '/images/misc/aman-essentials.jpg',
    gallery: ['/images/misc/aman-essentials.jpg'],
    sizes: ['15ml'],
    ingredients: [
      'Caffeine',
      'Retinol',
      'Vitamin C',
      'Peptides',
      'Hyaluronic Acid',
    ],
    usage: 'Gently pat around the eye area morning and evening. Avoid direct contact with eyes.',
    benefits: [
      'Reduces puffiness and dark circles',
      'Minimizes fine lines and wrinkles',
      'Brightens the eye area',
      'Firms and lifts',
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 67,
    slug: 'rejuvenating-eye-serum',
  },
  {
    id: '4',
    name: 'Aman Signature Fragrance',
    category: 'Fragrance',
    description: 'Our signature fragrance captures the essence of Aman destinations. A sophisticated blend of rare ingredients that evokes tranquility and luxury.',
    price: 280,
    currency: 'USD',
    image: '/images/misc/aman-essentials.jpg',
    gallery: ['/images/misc/aman-essentials.jpg', '/images/misc/aman-essentials.jpg'],
    sizes: ['50ml', '100ml'],
    ingredients: [
      'Bergamot',
      'Sandalwood',
      'Oud',
      'Jasmine',
      'Amber',
    ],
    usage: 'Spray onto pulse points: wrists, neck, and behind ears.',
    benefits: [
      'Long-lasting scent',
      'Unique signature fragrance',
      'Unisex appeal',
      'Crafted with rare ingredients',
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 156,
    slug: 'aman-signature-fragrance',
  },
  {
    id: '5',
    name: 'Kyoto Candle',
    category: 'Homeware',
    description: 'Hand-poured candle inspired by the serene gardens of Kyoto. Notes of cherry blossom, green tea, and sandalwood.',
    price: 95,
    currency: 'USD',
    image: '/images/misc/aman-essentials.jpg',
    gallery: ['/images/misc/aman-essentials.jpg'],
    sizes: ['200g', '400g'],
    ingredients: [
      'Natural Soy Wax',
      'Essential Oils',
      'Cotton Wick',
    ],
    usage: 'Burn for 2-3 hours at a time. Trim wick before each use.',
    benefits: [
      '60+ hours burn time',
      'Natural ingredients',
      'Calming fragrance',
      'Elegant presentation',
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    slug: 'kyoto-candle',
  },
  {
    id: '6',
    name: 'Desert Stone Diffuser',
    category: 'Homeware',
    description: 'Elegant stone diffuser that gradually releases fragrance into your space. Includes a selection of Aman essential oil blends.',
    price: 165,
    currency: 'USD',
    image: '/images/misc/aman-essentials.jpg',
    gallery: ['/images/misc/aman-essentials.jpg'],
    variants: [
      { name: 'Sandstone', price: 165, image: '/images/misc/aman-essentials.jpg' },
      { name: 'Marble', price: 195, image: '/images/misc/aman-essentials.jpg' },
    ],
    ingredients: [
      'Natural Stone',
      'Essential Oil Blends',
    ],
    usage: 'Add 5-10 drops of essential oil to the stone. Reapply as needed.',
    benefits: [
      'Long-lasting fragrance',
      'Natural stone construction',
      'No electricity required',
      'Includes 3 essential oil blends',
    ],
    inStock: true,
    rating: 4.6,
    reviewCount: 45,
    slug: 'desert-stone-diffuser',
  },
  {
    id: '7',
    name: 'Ultimate Skincare Collection',
    category: 'Gift Sets',
    description: 'The complete Aman skincare ritual in an elegant gift box. Includes cleanser, toner, serum, and moisturizer.',
    price: 450,
    currency: 'USD',
    image: '/images/misc/gift-card.jpg',
    gallery: ['/images/misc/gift-card.jpg'],
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    slug: 'ultimate-skincare-collection',
  },
  {
    id: '8',
    name: 'Home Sanctuary Set',
    category: 'Gift Sets',
    description: 'Create your own sanctuary at home with our curated collection of candles, diffuser, and room spray.',
    price: 320,
    currency: 'USD',
    image: '/images/misc/gift-card.jpg',
    gallery: ['/images/misc/gift-card.jpg'],
    inStock: true,
    rating: 4.7,
    reviewCount: 56,
    slug: 'home-sanctuary-set',
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return productsData.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsData.filter((product) => product.category === category);
};

export const getAllProducts = (): Product[] => {
  return productsData;
};
