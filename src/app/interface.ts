interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Reviews {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewName: string;
}

interface Review {
  [key: string]: any;
}

interface Product {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

interface CategoryWithImage {
  name: string;
  title: string;
  thumbnail: string;
}

interface CartItem {
  id: number;
  buyCount: number;
  title: string;
  price: number;
  thumbnail: string;
  warrantyInformation: string;
  returnPolicy: string;
  isOutOfStock: boolean;
}

type Cart = CartItem[];

interface productsState {
  products: Product[];
}

interface cartState {
  items: Cart;
}

interface AppState {
  products: productsState;
  cart: cartState;
}

export {
  type Product,
  type CategoryWithImage,
  type CartItem,
  type Cart,
  type productsState,
  type cartState,
  type AppState,
  type Reviews,
};
