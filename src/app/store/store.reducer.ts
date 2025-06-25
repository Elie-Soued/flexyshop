import { createReducer, on } from '@ngrx/store';
import {
  setProducts,
  addToCart,
  removeFromStock,
  clearCart,
  reduceBuyCount,
  deleteItem,
} from './store.actions';
import { type Product, type Cart } from '../interface';

export interface productsState {
  products: Product[];
}

export interface cartState {
  items: Cart[];
}

export interface AppState {
  products: productsState;
  cart: cartState;
}

const productsInitialState: productsState = { products: [] };

const cartInitialState: cartState = { items: [] };

export const productsReducer = createReducer(
  productsInitialState,
  on(setProducts, (state, { products }) => ({ ...state, products })),
  on(removeFromStock, (state, { id }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === id ? { ...product, stock: product.stock - 1 } : product
    ),
  }))
);

export const cartReducer = createReducer(
  cartInitialState,

  on(addToCart, (state: any, { id, price, title, image }) => {
    const existingItem = state.items.find((item: any) => item.id === id);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item: any) =>
          item.id === id
            ? {
                ...item,
                buyCount: item.buyCount + 1,
                price: item.price,
                title: item.title,
                image: item.image,
              }
            : item
        ),
      };
    } else {
      return {
        items: [...state.items, { id: id, buyCount: 1, price, title, image }],
      };
    }
  }),

  on(clearCart, () => cartInitialState),
  on(reduceBuyCount, (state, { id }) => {
    return {
      items: state.items.map((item) =>
        item.id === id && item.buyCount > 1
          ? { ...item, buyCount: item.buyCount - 1 }
          : item
      ),
    };
  }),
  on(deleteItem, (state, { id }) => {
    return {
      items: state.items.filter((item) => item.id !== id),
    };
  })
);
