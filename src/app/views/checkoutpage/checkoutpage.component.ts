import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { type Cart } from '../../interface';
import { Store } from '@ngrx/store';
import { type AppState } from '../../store/store.reducer';
import { setCart } from '../../store/store.actions';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-checkoutpage',
  imports: [RouterModule, FontAwesomeModule, CurrencyPipe],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css',
})
export class CheckoutpageComponent {
  cart!: Cart[];

  home = faHome;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select((state: any) => state.cart)
      .subscribe(({ items }) => {
        if (items.length) {
          this.cart = items;
          localStorage.setItem('cart', JSON.stringify(items));
        } else {
          this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
          if (this.cart.length) {
            this.store.dispatch(setCart({ items: this.cart }));
          }
        }
      });
  }

  get grandTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.buyCount, 0);
  }
}
