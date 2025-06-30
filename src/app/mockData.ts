import { type Product } from './interface';

const productsMock: { products: Product[] } = {
  products: [
    {
      availabilityStatus: 'In Stock',
      brand: 'Essence',
      category: 'beauty',
      description:
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
      discountPercentage: 10.48,
      id: 1,
      images: [
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      ],
      meta: {
        createdAt: '2025-04-30T09:41:02.053Z',
        updatedAt: '2025-04-30T09:41:02.053Z',
        barcode: '5784719087687',
        qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
      },
      minimumOrderQuantity: 48,
      price: 9.99,
      rating: 2.56,
      returnPolicy: 'No return policy',
      reviews: [],
      shippingInformation: 'Ships in 3-5 business days',
      sku: 'BEA-ESS-ESS-001',
      stock: 99,
      tags: ['beauty', 'mascara'],
      thumbnail:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Essence Mascara Lash Princess',
      warrantyInformation: '1 week warranty',
      weight: 4,
    },
    {
      availabilityStatus: 'In Stock',
      brand: 'Essence',
      category: 'beauty',
      description:
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
      discountPercentage: 10.48,
      id: 2,
      images: [
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      ],
      meta: {
        createdAt: '2025-04-30T09:41:02.053Z',
        updatedAt: '2025-04-30T09:41:02.053Z',
        barcode: '5784719087687',
        qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
      },
      minimumOrderQuantity: 48,
      price: 9.99,
      rating: 2.56,
      returnPolicy: 'No return policy',
      reviews: [],
      shippingInformation: 'Ships in 3-5 business days',
      sku: 'BEA-ESS-ESS-001',
      stock: 63,
      tags: ['beauty', 'mascara'],
      thumbnail:
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      title: 'Essence Mascara Lash Princess',
      warrantyInformation: '1 week warranty',
      weight: 4,
    },
  ],
};

const productsMock2 = {
  products: [
    {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      description:
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      category: 'sports',
      price: 9.99,
      discountPercentage: 10.48,
      rating: 2.56,
      stock: 0,
      tags: ['beauty', 'mascara'],
      brand: 'Essence',
      sku: 'BEA-ESS-ESS-001',
      weight: 4,
      dimensions: {
        width: 15.14,
        height: 13.08,
        depth: 22.99,
      },
      warrantyInformation: '1 week warranty',
      shippingInformation: 'Ships in 3-5 business days',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 3,
          comment: 'Would not recommend!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Eleanor Collins',
          reviewerEmail: 'eleanor.collins@x.dummyjson.com',
        },
        {
          rating: 4,
          comment: 'Very satisfied!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Lucas Gordon',
          reviewerEmail: 'lucas.gordon@x.dummyjson.com',
        },
        {
          rating: 5,
          comment: 'Highly impressed!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Eleanor Collins',
          reviewerEmail: 'eleanor.collins@x.dummyjson.com',
        },
      ],
      returnPolicy: 'No return policy',
      minimumOrderQuantity: 48,
      meta: {
        createdAt: '2025-04-30T09:41:02.053Z',
        updatedAt: '2025-04-30T09:41:02.053Z',
        barcode: '5784719087687',
        qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
      },
      images: [
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      ],
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/1.webp',
    },
    {
      id: 2,
      title: 'Eyeshadow Palette with Mirror',
      description:
        "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      category: 'beauty',
      price: 19.99,
      discountPercentage: 18.19,
      rating: 2.86,
      stock: 34,
      tags: ['beauty', 'eyeshadow'],
      brand: 'Glamour Beauty',
      sku: 'BEA-GLA-EYE-002',
      weight: 9,
      dimensions: {
        width: 9.26,
        height: 22.47,
        depth: 27.67,
      },
      warrantyInformation: '1 year warranty',
      shippingInformation: 'Ships in 2 weeks',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 5,
          comment: 'Great product!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Savannah Gomez',
          reviewerEmail: 'savannah.gomez@x.dummyjson.com',
        },
        {
          rating: 4,
          comment: 'Awesome product!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Christian Perez',
          reviewerEmail: 'christian.perez@x.dummyjson.com',
        },
        {
          rating: 1,
          comment: 'Poor quality!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Nicholas Bailey',
          reviewerEmail: 'nicholas.bailey@x.dummyjson.com',
        },
      ],
      returnPolicy: '7 days return policy',
      minimumOrderQuantity: 20,
      meta: {
        createdAt: '2025-04-30T09:41:02.053Z',
        updatedAt: '2025-04-30T09:41:02.053Z',
        barcode: '9170275171413',
        qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
      },
      images: [
        'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
      ],
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/2.webp',
    },
  ],
};

const cart = [
  {
    id: 16,
    buyCount: 1,
    price: 1.99,
    title: 'Apple',
    thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
    warrantyInformation: '1 week warranty',
    returnPolicy: 'No return policy',
    isOutOfStock: false,
  },
  {
    id: 11,
    buyCount: 1,
    price: 1899.99,
    title: 'Annibale Colombo Bed',
    thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/11.webp',
    warrantyInformation: '',
    returnPolicy: '',
    isOutOfStock: false,
  },
];

const outOfStockCart = [
  {
    id: 17,
    buyCount: 1,
    price: 1.99,
    title: 'Apple',
    thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
    warrantyInformation: '1 week warranty',
    returnPolicy: 'No return policy',
    isOutOfStock: true,
  },
];

const categoryName: { [key: string]: string } = {
  beauty: 'Beauty',
  fragrances: 'Fragrances',
  furniture: 'Furniture',
  groceries: 'Groceries',
  'home-decoration': 'Home decoration',
  'kitchen-accessories': 'Kitchen accessories',
  laptops: 'Laptops',
  'mens-shirts': "Men's shirts",
  'mens-shoes': "Men's shoes",
  'mens-watches': "Men's watches",
  'mobile-accessories': 'Mobile accessories',
  motorcycle: 'Motorcycle',
  'skin-care': 'Skin care',
  smartphones: 'Smartphones',
  'sports-accessories': 'Sports accessories',
  sunglasses: 'Sunglasses',
  tablets: 'Tablets',
  tops: 'Tops',
  vehicle: 'Vehicle',
  'womens-bags': "Women's bags",
  'womens-dresses': "Women's dresses",
  'womens-jewellery': "Women's jewellery",
  'womens-shoes': "Women's shoes",
  'womens-watches': "Women's watches",
};

const categoriesExtracted = [
  {
    name: 'beauty',
    title: 'Beauty',
    thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/1.webp',
  },
];

export {
  productsMock,
  productsMock2,
  cart,
  categoryName,
  outOfStockCart,
  categoriesExtracted,
};
