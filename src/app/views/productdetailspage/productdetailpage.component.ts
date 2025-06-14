import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product } from '../../interface';
import { type cartState, type productsState } from '../../store/store.reducer';
import { addToCart, removeFromStock } from '../../store/store.actions';

interface AppState {
  products: productsState;
  cart: cartState;
}

@Component({
  selector: 'app-productdetailpage',
  imports: [CurrencyPipe, DatePipe, FontAwesomeModule],
  templateUrl: './productdetailpage.component.html',
  styleUrl: './productdetailpage.component.css',
})
export class ProductdetailpageComponent {
  productID: number = 0;
  buyCount: number = 0;
  section: string = '';
  product: any;
  products: any;
  cartIcon = faCartPlus;
  back = faArrowLeft;

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
        if (products.length) {
          this.products = products;
        } else {
          this.products = JSON.parse(localStorage.getItem('products') || '[]');
        }

        this.product = this.getProduct(this.products);
      });
  }

  buy() {
    this.buyCount++;
    this.updateLocalStorage();
    this.store.dispatch(removeFromStock({ id: this.product.id }));
    this.store.dispatch(addToCart({ id: this.product.id }));
  }

  updateLocalStorage() {
    this.products = this.products.map((product: any) => {
      return product.id === Number(this.productID)
        ? { ...product, stock: product.stock - 1 }
        : product;
    });

    localStorage.setItem('products', JSON.stringify(this.products));
    localStorage.setItem(
      'cart',
      JSON.stringify({
        [this.buyCount]: this.product,
      })
    );
  }

  getProduct(products: any) {
    return products.find(
      (product: Product) => product.id === Number(this.productID)
    );
  }
}
