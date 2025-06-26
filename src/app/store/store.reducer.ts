import { createReducer, on } from '@ngrx/store';
import {
  setProducts,
  addToCart,
  removeFromStock,
  addBackToStock,
  clearCart,
  reduceBuyCount,
  deleteItem,
  setOriginalStock,
} from './store.actions';
import { CartItem, type productsState, type cartState } from '../interface';

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
  })),
  on(addBackToStock, (state, { id }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === id ? { ...product, stock: product.stock + 1 } : product
    ),
  })),

  on(setOriginalStock, (state, { id, buyCount }) => ({
    ...state,
    products: state.products.map((product) =>
      product.id === id
        ? { ...product, stock: product.stock + buyCount }
        : product
    ),
  }))
);

export const cartReducer = createReducer(
  cartInitialState,

  on(
    addToCart,
    (
      state: cartState,
      { id, price, title, thumbnail, warrantyInformation, returnPolicy }
    ) => {
      const existingItem = state.items.find((item: CartItem) => item.id === id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item: CartItem) =>
            item.id === id
              ? {
                  ...item,
                  buyCount: item.buyCount + 1,
                }
              : item
          ),
        };
      } else {
        return {
          items: [
            ...state.items,
            {
              id: id,
              buyCount: 1,
              price,
              title,
              thumbnail,
              warrantyInformation,
              returnPolicy,
            },
          ],
        };
      }
    }
  ),

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
