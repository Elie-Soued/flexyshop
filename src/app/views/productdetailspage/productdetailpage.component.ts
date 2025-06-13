import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product } from '../../interface';

@Component({
  selector: 'app-productdetailpage',
  imports: [CurrencyPipe, DatePipe, FontAwesomeModule],
  templateUrl: './productdetailpage.component.html',
  styleUrl: './productdetailpage.component.css',
})
export class ProductdetailpageComponent {
  productID: number = 0;
  section: string = '';
  product: any;
  cart = faCartPlus;
  back = faArrowLeft;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<{ products: Product[] }>
  ) {
    this.activateRoute.params.subscribe((values) => {
      this.productID = values['id'];
      this.section = values['section'];
    });
  }

  ngOnInit() {
    this.store
      .select((state: any) => state.store)
      .subscribe(({ products }) => {
        if (!products.length) {
          this.product = JSON.parse(
            localStorage.getItem('products') || '[]'
          ).filter(
            (product: Product) => product.id === Number(this.productID)
          )[0];
        } else {
          this.product = products.filter(
            (product: Product) => product.id === Number(this.productID)
          )[0];
        }
      });
  }
}
