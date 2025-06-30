import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { setProducts } from '../../store/store.actions';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { DataService } from '../../services/data.service';
import {
  type Product,
  type CategoryWithImage,
  type AppState,
} from '../../interface';

@Component({
  selector: 'app-landingpage',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent implements OnInit {
  categories: CategoryWithImage[] = [];

  constructor(
    private store: Store<AppState>,
    private productService: ProductsService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.store
      .select((state: AppState) => state.products)
      .subscribe(({ products }) => {
        if (products.length) {
          this.categories = this.dataService.extractCategories(products);
        } else {
          this.productService.getProducts().subscribe({
            next: (response: { products: Product[] }) => {
              this.dataService.replaceImages(response.products);
              this.store.dispatch(setProducts({ products: response.products }));
              this.categories = this.dataService.extractCategories(
                response.products
              );
            },
            error: (err) => console.error('Error fetching products:', err),
          });
        }
      });
  }
}
