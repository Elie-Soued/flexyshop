import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { setProducts } from '../../store/store.actions';
import { type Product, type CategoryWithImage } from '../../interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent {
  categories: CategoryWithImage[] = [];
  cart = faCartShopping;

  constructor(private http: HttpClient, private store: Store<{ store: {} }>) {}

  ngOnInit() {
    if (localStorage.getItem('products')) {
      this.updateProduct(JSON.parse(localStorage.getItem('products') || '[]'));
    } else {
      this.http
        .get<{ products: Product[] }>(
          'https://dummyjson.com/products?limit=194'
        )
        .subscribe({
          next: (response) => {
            this.updateProduct(response.products);
            localStorage.setItem('products', JSON.stringify(response.products));
          },
          error: (err) => console.error('Error fetching products:', err),
        });
    }
  }

  updateProduct(products: Product[]) {
    this.setCategories(products);
    this.store.dispatch(setProducts({ products }));
  }

  setCategories(products: Product[]) {
    const categoryMap = new Map<string, string>();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product.thumbnail);
      }
    });

    // Convert Map to an array of objects
    this.categories = Array.from(categoryMap.entries()).map(
      ([name, thumbnail]) => ({
        name,
        thumbnail,
      })
    );
  }
}
