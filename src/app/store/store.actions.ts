import { createAction, props } from '@ngrx/store';
import { type Product, Cart } from '../interface';

export const setProducts = createAction(
  '[store] setProducts',
  props<{ products: Product[] }>()
);

export const removeFromStock = createAction(
  '[store] removeFromStock',
  props<{ id: number }>()
);

export const addToCart = createAction(
  '[cart] addToCart',
  props<{ id: number; price: number; title: string; image: string }>()
);

export const setCart = createAction(
  '[cart] setCart',
  props<{ items: Cart[] }>()
);
