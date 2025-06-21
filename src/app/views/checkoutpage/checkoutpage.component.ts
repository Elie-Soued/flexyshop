import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { type Cart } from '../../interface';
import { Store } from '@ngrx/store';
import { type AppState } from '../../store/store.reducer';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faCreditCard } from '@fortawesome/free-solid-svg-icons';
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
  home = faHome;
  creditCard = faCreditCard;

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
      });
  }

  checkout() {
    const totalAmount = this.utilsService.getgrandTotal(this.cart);
    this.productService.checkout(totalAmount);
  }
}
