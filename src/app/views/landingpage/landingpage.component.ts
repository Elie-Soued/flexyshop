import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { setProducts } from '../../store/store.actions';
import {
  type Product,
  type CategoryWithImage,
  type Cart,
} from '../../interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent {
  categories: CategoryWithImage[] = [];
  cartIcon = faCartShopping;
  cart: Cart[] = [];
  currentYear = new Date().getFullYear();

  constructor(private http: HttpClient, private store: Store<{ store: {} }>) {}

  ngOnInit() {
    this.store
      .select((state: any) => state.products)
      .subscribe(({ products }) => {
        if (products.length) {
          this.setCategories(products);
        } else {
          this.http
            .get<{ products: Product[] }>(
              'https://dummyjson.com/products?limit=194'
            )
            .subscribe({
              next: (response) => {
                this.replaceImages(response.products);
                this.store.dispatch(
                  setProducts({ products: response.products })
                );
                this.setCategories(response.products);
              },
              error: (err) => console.error('Error fetching products:', err),
            });
        }
      });

    this.store
      .select((state: any) => state.cart)
      .subscribe(({ items }) => {
        this.cart = items;
      });
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

  replaceImages(products: Product[]) {
    products.forEach((product) => {
      product.thumbnail = `https://flexyshopimages.pilexlaflex.com/images/${product.id}.webp`;
    });
  }
}
