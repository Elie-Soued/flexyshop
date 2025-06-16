import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product, type Cart } from '../../interface';
import { type AppState } from '../../store/store.reducer';
import { addToCart, removeFromStock } from '../../store/store.actions';
import Toast from 'bootstrap/js/dist/toast.js';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.activateRoute.params.subscribe((values) => {
      this.productID = values['id'];
      this.section = values['section'];
    });
  }

  ngOnInit() {
    this.store
      .select((state: any) => state.products)
      .subscribe(({ products }) => {
        this.product = this.getProduct(products);
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
        })
      );
      this.toast = Toast.getOrCreateInstance(
        document.getElementById('toastSuccess')!,
        {
          delay: 750,
        }
      );
    } else {
      this.toast = Toast.getOrCreateInstance(
        document.getElementById('toastError')!,
        {
          delay: 750,
        }
      );
    }
    this.toast?.show();
  }

  debounce(func: Function, timeout = 200) {
    let timer: any;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this);
      }, timeout);
    };
  }

  onBuy() {
    this.debounce(this.buy)();
  }

  getProduct(products: Product[]): Product {
    return products.find(
      (product: Product) => product.id === Number(this.productID)
    )!;
  }
}
