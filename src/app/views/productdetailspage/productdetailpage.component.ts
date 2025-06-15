import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product, type Cart } from '../../interface';
import { type AppState } from '../../store/store.reducer';
import {
  setProducts,
  setCart,
  addToCart,
  removeFromStock,
} from '../../store/store.actions';

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
  products!: Product[];
  cart!: Cart[];
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
          localStorage.setItem('products', JSON.stringify(products));
        } else {
          this.products = JSON.parse(localStorage.getItem('products') || '[]');
          this.store.dispatch(setProducts({ products: this.products }));
        }
        this.product = this.getProduct(this.products);
      });

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

  buy() {
    this.store.dispatch(removeFromStock({ id: this.product.id }));
    this.store.dispatch(
      addToCart({
        id: this.product.id,
        price: this.product.price,
        title: this.product.title,
      })
    );
  }

  getProduct(products: any) {
    return products.find(
      (product: Product) => product.id === Number(this.productID)
    );
  }
}
