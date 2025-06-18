import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutpageComponent } from './checkoutpage.component';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { cartReducer } from '../../store/store.reducer';

describe('CheckoutpageComponent', () => {
  let component: CheckoutpageComponent;
  let fixture: ComponentFixture<CheckoutpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutpageComponent],
      providers: [provideRouter([]), provideStore({ cart: cartReducer })],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure the checkoutPage is correctly rendered', () => {
    // write test
  });

  it('Make sure the Invoice is correctly calculated', () => {
    // write test
  });
  it('If no items are present in the cart, display message', () => {
    // write test
  });
});
