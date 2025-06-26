import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { type Product } from '../../interface';
import { RouterModule } from '@angular/router';
import { type AppState } from '../../interface';

@Component({
  selector: 'app-productspage',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './productspage.component.html',
  styleUrl: './productspage.component.css',
})
export class ProductspageComponent implements OnInit {
  section: string = '';
  products: Product[] = [];
  categoryProducts: Product[] = [];
  home = faHome;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.activateRoute.params.subscribe((values) => {
      this.section = values['name'];
    });
  }

  ngOnInit(): void {
    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        this.categoryProducts = products.filter(
          (product: Product) => product.category === this.section
        );
      });
  }
}
