import { createReducer, on } from '@ngrx/store';
import { setInitialStore } from './store.actions';
import { type Product } from '../interface';

interface storeState {
  products: Product[];
}

const initialState: storeState = { products: [] };

export const storeReducer = createReducer(
  initialState,
  on(setInitialStore, (state, { products }) => ({ ...state, products }))
);
