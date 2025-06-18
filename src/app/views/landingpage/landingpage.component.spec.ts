import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingpageComponent } from './landingpage.component';
import { provideRouter } from '@angular/router';
import { cartReducer, productsReducer } from '../../store/store.reducer';
import { provideStore } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    await TestBed.configureTestingModule({
      imports: [LandingpageComponent],
      providers: [
        provideStore({ product: productsReducer, cart: cartReducer }),
        provideRouter([]),
        { provide: ProductsService, useValue: productService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
