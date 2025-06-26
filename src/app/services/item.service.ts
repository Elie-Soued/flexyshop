import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type AppState } from '../store/store.reducer';
import {
  addBackToStock,
  addToCart,
  removeFromStock,
  reduceBuyCount,
  deleteItem,
} from '../store/store.actions';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(
    private store: Store<AppState>,
    private productService: ProductsService
  ) {}

  addItemToCart(product: any) {
    this.store.dispatch(removeFromStock({ id: product.id }));

    this.store.dispatch(
      addToCart({
        id: product.id,
        price: product.price,
        title: product.title,
        image: product.thumbnail,
        warranty: product.warrantyInformation,
        returnPolicy: product.returnPolicy,
      })
    );
  }

  reduceItemBuyCount(product: any) {
    this.store.dispatch(addBackToStock({ id: product.id }));
    this.store.dispatch(reduceBuyCount({ id: product.id }));
  }

  removeItemFromCart(product: any) {
    this.store.dispatch(deleteItem({ id: product.id }));
  }

  getItemInStock(id: number) {
    let stock;
    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        stock = this.productService.getProduct(products, id).stock!;
      });

    return stock;
  }
}
