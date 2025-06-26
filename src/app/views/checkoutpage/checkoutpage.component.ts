import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { type Cart } from '../../interface';
import { Store } from '@ngrx/store';
import { type AppState } from '../../store/store.reducer';
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
import { reduceBuyCount, deleteItem } from '../../store/store.actions';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-checkoutpage',
  imports: [RouterModule, FontAwesomeModule, CurrencyPipe],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css',
})
export class CheckoutpageComponent implements OnInit {
  cart!: Cart[];
  close = faClose;
  trash = faTrash;
  add = faAdd;
  minus = faMinus;
  totalAmount = 0;
  outOfStock = false;

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

  checkout() {
    this.productService.checkout(this.totalAmount);
  }

  closeCheckoutView() {
    this.utilsService.closeSideNavView();
  }

  addItem(item: any) {
    let stock = this.itemService.getItemInStock(item.id);
    if (stock && stock > 0) {
      this.itemService.addItemToCart(item);
    } else {
      this.outOfStock = true;
    }
  }

  reduceItemBuyCount(item: any) {
    this.itemService.reduceItemBuyCount(item);
    let stock = this.itemService.getItemInStock(item.id);
    if (stock && stock > 0) {
      this.outOfStock = false;
    }
  }

  removeItem(id: number) {
    this.store.dispatch(deleteItem({ id }));
  }
}
