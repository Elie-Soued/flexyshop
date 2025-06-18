import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faStar, faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Cart } from '../../interface';
import { type AppState } from '../../store/store.reducer';
import { addToCart, removeFromStock } from '../../store/store.actions';
import Toast from 'bootstrap/js/dist/toast.js';
import { ProductsService } from '../../services/products.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-productdetailpage',
  imports: [CurrencyPipe, DatePipe, FontAwesomeModule, RouterModule],
  templateUrl: './productdetailpage.component.html',
  styleUrl: './productdetailpage.component.css',
})
export class ProductdetailpageComponent {
  productID: number = 0;
  section: string = '';
  product!: any;
  cart!: Cart[];
  cartIcon = faCartPlus;
  toast!: Toast;
  star = faStar;
  home = faHome;
  throttledBuy: () => void;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>,
    private productService: ProductsService,
    public utilityService: UtilityService
  ) {
    this.throttledBuy = this.utilityService.throttle(() => this.buy(), 1000);
    this.activateRoute.params.subscribe((values) => {
      this.productID = values['id'];
      this.section = values['section'];
    });
  }

  ngOnInit() {
    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        this.product = this.productService.getProduct(products, this.productID);
      });
  }

  buy() {
    if (this.product.stock > 0) {
      this.store.dispatch(removeFromStock({ id: this.product.id }));
      this.store.dispatch(
        addToCart({
          id: this.product.id,
          price: this.product.price,
          title: this.product.title,
          image: this.product.thumbnail,
        })
      );
      this.toast = Toast.getOrCreateInstance(
        document.getElementById('toastSuccess')!,
        {
          delay: 500,
        }
      );
    } else {
      this.toast = Toast.getOrCreateInstance(
        document.getElementById('toastError')!,
        {
          delay: 500,
        }
      );
    }
    this.toast?.show();
  }
}
