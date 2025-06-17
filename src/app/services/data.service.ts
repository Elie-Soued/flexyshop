import { Injectable } from '@angular/core';
import { type Product, type CategoryWithImage } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  extractCategories(products: Product[]): CategoryWithImage[] {
    const categoryMap = new Map<string, string>();

    products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, product.thumbnail);
      }
    });

    return Array.from(categoryMap.entries()).map(([name, thumbnail]) => ({
      name,
      thumbnail,
    }));
  }

  replaceImages(products: Product[]): void {
    products.forEach((product) => {
      product.thumbnail = `https://flexyshopimages.pilexlaflex.com/images/${product.id}.webp`;
    });
  }
}
