import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { productsMock } from '../mockData';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpClient: HttpTestingController;

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

  it('make sure getProducts returns all products', () => {
    service.getProducts().subscribe();
    const req = httpClient.expectOne(
      'https://dummyjson.com/products?limit=194'
    );
    expect(req.request.method).toEqual('GET');

    req.flush(productsMock.products);
  });

  it('make sure getProduct fetches the correct product based on the id provided ', () => {
    const selectedProduct = service.getProduct(productsMock.products, 1);
    expect(selectedProduct).toEqual(productsMock.products[0]);
  });

  it('make sure checkout is correctly executed', () => {
    //write test
  });
});
