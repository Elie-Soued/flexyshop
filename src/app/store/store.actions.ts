import { createAction, props } from '@ngrx/store';
import { type Product } from '../interface';

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
  props<{ id: number }>()
);
