import { createAction, props } from '@ngrx/store';
import { type Product } from '../interface';

// Product related actions
//------------------------

export const setProducts = createAction(
  '[store] setProducts',
  props<{ products: Product[] }>()
);

export const removeFromStock = createAction(
  '[store] removeFromStock',
  props<{ id: number }>()
);

export const addBackToStock = createAction(
  '[store] addBackToStock',
  props<{ id: number }>()
);

export const setOriginalStock = createAction(
  '[store] setOriginalStock',
  props<{ id: number; buyCount: number }>()
);

// Cart related actions
//----------------------

export const addToCart = createAction(
  '[cart] addToCart',
  props<{
    id: number;
    price: number;
    title: string;
    image: string;
    warranty: string;
    returnPolicy: string;
  }>()
);

export const reduceBuyCount = createAction(
  '[cart] reduceBuyCount',
  props<{ id: number }>()
);

export const deleteItem = createAction(
  '[cart] deleteItem',
  props<{ id: number }>()
);

export const clearCart = createAction('[cart] clearCart');
