import { createReducer, on } from '@ngrx/store';
import {
  setProducts,
  setCart,
  addToCart,
  removeFromStock,
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

  on(setCart, (state, { items }) => ({ ...state, items })),

  on(addToCart, (state: any, { id, price, title }) => {
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
              }
            : item
        ),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { id: id, buyCount: 1, price, title }],
      };
    }
  })
);
