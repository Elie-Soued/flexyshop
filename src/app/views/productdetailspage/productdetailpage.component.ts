import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product, type Cart } from '../../interface';
import { type AppState } from '../../store/store.reducer';
import { setCart, addToCart, removeFromStock } from '../../store/store.actions';

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
        this.product = this.getProduct(products);
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
