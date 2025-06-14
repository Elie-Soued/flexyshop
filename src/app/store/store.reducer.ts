import { createReducer, on } from '@ngrx/store';
import { setProducts, addToCart, removeFromStock } from './store.actions';
import { type Product } from '../interface';

export interface productsState {
  products: Product[];
}

export interface cartState {
  items: {
    id: number;
    buyCount: number;
  }[];
}

export interface AppState {
  products: productsState;
  cart: cartState;
}

const productsInitialState: productsState = { products: [] };

const cartInitialState = { items: [] };

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
  on(addToCart, (state: any, { id }) => {
    const existingItem = state.items.find((item: any) => item.id === id);

    console.log('state :>> ', state);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item: any) =>
          item.id === id ? { ...item, buyCount: item.buyCount + 1 } : item
        ),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { id: id, buyCount: 1 }],
      };
    }
  })
);
