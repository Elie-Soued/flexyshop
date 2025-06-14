import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product } from '../../interface';
import { type AppState } from '../../store/store.reducer';
import { RouterModule } from '@angular/router';
import { setProducts } from '../../store/store.actions';

@Component({
  selector: 'app-productspage',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css',
})
export class ProductspageComponent {
  section: string = '';
  products: Product[] = [];
  home = faHome;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.activateRoute.params.subscribe((values) => {
      this.section = values['name'];
    });
  }

  ngOnInit() {
    this.store
      .select((state: any) => state.products)
      .subscribe(({ products }) => {
        if (!products.length) {
          const products = JSON.parse(localStorage.getItem('products') || '[]');
          this.products = products.filter(
            (product: Product) => product.category === this.section
          );
          this.store.dispatch(setProducts({ products }));
        } else {
          this.products = products.filter(
            (product: Product) => product.category === this.section
          );
        }
      });
  }
}
