import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpTestingController;

  const products = [
    {
      id: 1,
      title: 'Essence Mascara Lash Princess',
      description:
        'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
      category: 'beauty',
      price: 9.99,
      discountPercentage: 10.48,
      rating: 2.56,
      stock: 99,
      tags: ['beauty', 'mascara'],
      brand: 'Essence',
      sku: 'BEA-ESS-ESS-001',
      weight: 4,
      dimensions: {
        width: 15.14,
        height: 13.08,
        depth: 22.99,
      },
      warrantyInformation: '1 week warranty',
      shippingInformation: 'Ships in 3-5 business days',
      availabilityStatus: 'In Stock',
      reviews: [
        {
          rating: 3,
          comment: 'Would not recommend!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Eleanor Collins',
          reviewerEmail: 'eleanor.collins@x.dummyjson.com',
        },
        {
          rating: 4,
          comment: 'Very satisfied!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Lucas Gordon',
          reviewerEmail: 'lucas.gordon@x.dummyjson.com',
        },
        {
          rating: 5,
          comment: 'Highly impressed!',
          date: '2025-04-30T09:41:02.053Z',
          reviewerName: 'Eleanor Collins',
          reviewerEmail: 'eleanor.collins@x.dummyjson.com',
        },
      ],
      returnPolicy: 'No return policy',
      minimumOrderQuantity: 48,
      meta: {
        createdAt: '2025-04-30T09:41:02.053Z',
        updatedAt: '2025-04-30T09:41:02.053Z',
        barcode: '5784719087687',
        qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
      },
      images: [
        'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      ],
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/1.webp',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('make sure getProducts is working correctly', () => {
    service.getProducts().subscribe();
    const req = httpClient.expectOne(
      'https://dummyjson.com/products?limit=194'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(products);
  });

  it('make sure getProduct is working correctly', () => {
    const selectedProduct = service.getProduct(products, 1);
    expect(selectedProduct).toEqual(products[0]);
  });
});
