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
import {
  addToCart,
  reduceBuyCount,
  deleteItem,
} from '../../store/store.actions';

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

  constructor(
    private store: Store<AppState>,
    private productService: ProductsService,
    public utilsService: UtilsService
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
    this.store.dispatch(
      addToCart({
        id: item.id,
        price: item.price,
        title: item.title,
        image: item.thumbnail,
        warranty: item.warrantyInformation,
        returnPolicy: item.returnPolicy,
      })
    );
  }

  reduceItemBuyCount(id: number) {
    this.store.dispatch(reduceBuyCount({ id }));
  }

  removeItem(id: number) {
    this.store.dispatch(deleteItem({ id }));
  }
}
