import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Product } from '../interface';
import { productsMock } from '../mockData';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('make sure replaceImages replaces the thumbnail ', () => {
    // Prepare
    const products = [
      {
        id: 1,
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
      } as Product,
    ];

    //Act
    service.replaceImages(products);

    //Expect
    expect(products[0].thumbnail).toBe(
      'https://flexyshopimages.pilexlaflex.com/images/1.webp'
    );
  });

  it('make sure extractCategories extract the differents categories of all the products and assign a thumbnail to each category  ', () => {
    // Prepare
    const categories = service.extractCategories(productsMock.products);

    //Assert
    expect(categories).toEqual([
      {
        name: 'beauty',
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      },
    ]);
  });
});
