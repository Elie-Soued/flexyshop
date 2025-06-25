import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { type Cart } from '../../interface';
import { Store } from '@ngrx/store';
import { type AppState } from '../../store/store.reducer';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from '../../services/utils.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-checkoutpage',
  imports: [RouterModule, FontAwesomeModule, CurrencyPipe],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css',
})
export class CheckoutpageComponent implements OnInit {
  cart!: Cart[];
  close = faClose;
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
}
