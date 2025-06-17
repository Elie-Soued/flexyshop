import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type Product } from '../interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  limit = 194;
  url = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(
      `${this.url}?limit=${this.limit}`
    );
  }

  getProduct(products: Product[], productID: number): Product {
    return products.find(
      (product: Product) => product.id === Number(productID)
    )!;
  }
}
