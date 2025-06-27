import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { type Cart, type AppState } from '../../interface';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from '../../services/utils.service';
import { ProductsService } from '../../services/products.service';
import { CartcontentComponent } from './cartcontent/cartcontent.component';

@Component({
  selector: 'app-cart-view',
  imports: [
    CartcontentComponent,
    RouterModule,
    FontAwesomeModule,
    CurrencyPipe,
  ],
  templateUrl: './cartview.component.html',
  styleUrl: './cartview.component.css',
})
export class CartViewComponent implements OnInit {
  cart!: Cart;
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

  checkout(): void {
    this.productService.checkout(this.totalAmount);
  }

  closeCheckoutView(): void {
    this.utilsService.closeSideNavView();
  }
}
