import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Cart, type AppState, type Product } from '../../interface';
import { ProductsService } from '../../services/products.service';
import { UtilsService } from '../../services/utils.service';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from './toast/toast.component';
import { ItemService } from '../../services/item.service';
import { StarsComponent } from '../../components/stars/stars.component';

@Component({
  selector: 'app-productdetailpage',
  imports: [
    CurrencyPipe,
    DatePipe,
    FontAwesomeModule,
    RouterModule,
    ToastComponent,
    StarsComponent,
  ],
  templateUrl: './productdetailpage.component.html',
  styleUrl: './productdetailpage.component.css',
})
export class ProductdetailpageComponent implements OnInit {
  productID: number = 0;
  section: string = '';
  product!: Product;
  cart!: Cart;
  cartIcon = faCartPlus;
  back = faArrowLeft;
  throttledBuy: () => void;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>,
    private productService: ProductsService,
    private toastService: ToastService,
    public utilsService: UtilsService,
    private itemService: ItemService
  ) {
    this.throttledBuy = this.utilsService.throttle(() => this.buy(), 1000);
    this.activateRoute.params.subscribe((values) => {
      this.productID = values['id'];
      this.section = values['section'];
    });
  }

  ngOnInit(): void {
    this.toastService.clearToastStatus();

    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        this.product = this.productService.getProduct(products, this.productID);
      });
  }

  buy(): void {
    if (this.product.stock > 0) {
      this.itemService.addItemToCart(this.product);
      this.toastService.updateToastStatus('success');
    } else {
      this.toastService.updateToastStatus('error');
    }
  }
}
