import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductspageComponent } from './productspage.component';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { productsReducer } from '../../store/store.reducer';

describe('ProductspageComponent', () => {
  let component: ProductspageComponent;
  let fixture: ComponentFixture<ProductspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductspageComponent],
      providers: [
        provideRouter([]),
        provideStore({ products: productsReducer }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure the productsPage component is correctly rendered', () => {
    // write test
  });

  it('Make sure products by category are fetched ', () => {
    // write test
  });
});
