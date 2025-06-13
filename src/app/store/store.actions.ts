import { createAction, props } from '@ngrx/store';
import { type Product } from '../interface';

export const setInitialStore = createAction(
  '[store] setInitialStore',
  props<{ products: Product[] }>()
);
