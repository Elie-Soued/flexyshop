import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Product {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
}

interface CategoryWithImage {
  name: string;
  thumbnail: string;
}

@Component({
  selector: 'app-landingpage',
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})
export class LandingpageComponent {
  allProducts: Product[] = [];
  categories: CategoryWithImage[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http
      .get<{ products: Product[] }>('https://dummyjson.com/products?limit=194')
      .subscribe({
        next: (response) => {
          this.allProducts = response.products;
          this.setCategories(this.allProducts);
        },
        error: (err) => console.error('Error fetching products:', err),
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
}
