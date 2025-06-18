import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductdetailpageComponent } from './productdetailpage.component';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { cartReducer, productsReducer } from '../../store/store.reducer';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductsService } from '../../services/products.service';

describe('ProductdetailpageComponent', () => {
  let component: ProductdetailpageComponent;
  let fixture: ComponentFixture<ProductdetailpageComponent>;
  let httpClient: HttpTestingController;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['getProduct']);
    await TestBed.configureTestingModule({
      imports: [ProductdetailpageComponent],
      providers: [
        provideRouter([]),
        provideStore({ cart: cartReducer, products: productsReducer }),
        provideHttpClientTesting(),
        { provide: ProductsService, useValue: productService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
