import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addBackToStock,
  addToCart,
  removeFromStock,
  reduceBuyCount,
  deleteItem,
  setOriginalStock,
} from '../store/store.actions';
import { ProductsService } from './products.service';
import {
  type CartItem,
  type AppState,
  type Cart,
  type Product,
} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private store: Store<AppState>,
    private productService: ProductsService
  ) {}

  addItemToCart(item: CartItem | Product): void {
    this.store.dispatch(removeFromStock({ id: item.id }));
    this.store.dispatch(
      addToCart({
        id: item.id,
        price: item.price,
        title: item.title,
        thumbnail: item.thumbnail,
        warrantyInformation: item.warrantyInformation,
        returnPolicy: item.returnPolicy,
        isOutOfStock: false,
      })
    );
  }

  reduceItemBuyCount(cartItem: CartItem): void {
    this.store.dispatch(addBackToStock({ id: cartItem.id }));
    this.store.dispatch(reduceBuyCount({ id: cartItem.id }));
  }

  removeItemFromCart(cartItem: CartItem): void {
    const { buyCount } = cartItem;
    this.store.dispatch(deleteItem({ id: cartItem.id }));
    this.store.dispatch(setOriginalStock({ id: cartItem.id, buyCount }));
  }

  clearCart(cart: Cart): void {
    cart.forEach((cartItem) => {
      this.removeItemFromCart(cartItem);
    });
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
