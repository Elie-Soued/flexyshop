import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addBackToStock,
  addToCart,
  removeFromStock,
  reduceBuyCount,
  deleteItem,
} from '../store/store.actions';
import { ProductsService } from './products.service';
import { type CartItem, type AppState } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private store: Store<AppState>,
    private productService: ProductsService
  ) {}

  addItemToCart(cartItem: CartItem): void {
    this.store.dispatch(removeFromStock({ id: cartItem.id }));
    this.store.dispatch(
      addToCart({
        id: cartItem.id,
        price: cartItem.price,
        title: cartItem.title,
        image: cartItem.image,
        warranty: cartItem.warranty,
        returnPolicy: cartItem.returnPolicy,
      })
    );
  }

  reduceItemBuyCount(cartItem: CartItem): void {
    this.store.dispatch(addBackToStock({ id: cartItem.id }));
    this.store.dispatch(reduceBuyCount({ id: cartItem.id }));
  }

  removeItemFromCart(cartItem: CartItem): void {
    this.store.dispatch(deleteItem({ id: cartItem.id }));
  }

  getItemInStock(id: number): number {
    let stock;
    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        stock = this.productService.getProduct(products, id).stock!;
      });

    return stock!;
  }
}
