import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { type Cart, type CartItem, type AppState } from '../../interface';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faTrash,
  faAdd,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from '../../services/utils.service';
import { ProductsService } from '../../services/products.service';
import {
  deleteItem,
  setOriginalStock,
  ItemOutOfStock,
} from '../../store/store.actions';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-checkoutpage',
  imports: [RouterModule, FontAwesomeModule, CurrencyPipe],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css',
})
export class CheckoutpageComponent implements OnInit {
  cart!: Cart;
  close = faClose;
  trash = faTrash;
  add = faAdd;
  minus = faMinus;
  totalAmount = 0;

  constructor(
    private store: Store<AppState>,
    private productService: ProductsService,
    public utilsService: UtilsService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.store
      .select((state: AppState) => state.cart)
      .subscribe(({ items }) => {
        this.cart = items;
        this.totalAmount = this.utilsService.getgrandTotal(this.cart);
      });
  }

  checkout(): void {
    this.productService.checkout(this.totalAmount);
  }

  closeCheckoutView(): void {
    this.utilsService.closeSideNavView();
  }

  addItem(cartItem: CartItem): void {
    let stock = this.itemService.getItemInStock(cartItem.id);
    if (stock && stock > 0) {
      this.itemService.addItemToCart(cartItem);
    } else {
      this.store.dispatch(
        ItemOutOfStock({ id: cartItem.id, isOutOfStock: true })
      );
    }
  }

  reduceItemBuyCount(cartItem: CartItem): void {
    this.itemService.reduceItemBuyCount(cartItem);
    let stock = this.itemService.getItemInStock(cartItem.id);
    if (stock && stock > 0) {
      this.store.dispatch(
        ItemOutOfStock({ id: cartItem.id, isOutOfStock: false })
      );
    }
  }

  removeItem(cartItem: CartItem): void {
    const { buyCount } = cartItem;
    this.store.dispatch(deleteItem({ id: cartItem.id }));
    this.store.dispatch(setOriginalStock({ id: cartItem.id, buyCount }));
  }
}
