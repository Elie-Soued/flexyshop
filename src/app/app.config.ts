import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { productsReducer, cartReducer } from './store/store.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

const metaReducers = [
  localStorageSync({
    keys: ['products', 'cart'],
    rehydrate: true,
  }),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(
      { products: productsReducer, cart: cartReducer },
      { metaReducers }
    ),
  ],
};
