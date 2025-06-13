import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product } from '../../../interface';

@Component({
  selector: 'app-productspage',
  imports: [FontAwesomeModule],
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css',
})
export class ProductspageComponent {
  section: string = '';
  products: Product[] = [];
  home = faHome;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<{ store: {} }>
  ) {
    this.activateRoute.params.subscribe((values) => {
      this.section = values['name'];
    });
  }

  ngOnInit() {
    this.store
      .select((state: any) => state.store)
      .subscribe(({ products }) => {
        if (!products.length) {
          this.products = JSON.parse(
            localStorage.getItem('products') || '[]'
          ).filter((product: Product) => product.category === this.section);
        } else {
          this.products = products.filter(
            (product: Product) => product.category === this.section
          );
        }
      });
  }
}
