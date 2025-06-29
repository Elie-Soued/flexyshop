import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartViewComponent } from './cartview.component';
import { Store } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { cart } from '../../mockData';
import { provideHttpClient } from '@angular/common/http';

describe('CheckoutpageComponent', () => {
  let component: CartViewComponent;
  let fixture: ComponentFixture<CartViewComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      imports: [CartViewComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: Store, useValue: store },
      ],
    }).compileComponents();
  });

  it('Make sure the cartView is correctly rendered', () => {
    //Prepare
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();

    //Assert
    const invoiceTable = fixture.debugElement.query(By.css('#invoiceTable'));
    const emptyCart = fixture.debugElement.query(By.css('#emptyCart'));
    expect(invoiceTable).toBeTruthy();
    expect(emptyCart).toBeFalsy();
  });

  it('If no items are present in the cart, display message', () => {
    //Prepare
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: [] }));
    fixture.detectChanges();

    //Assert
    const invoiceTable = fixture.debugElement.query(By.css('#invoiceTable'));
    const emptyCart = fixture.debugElement.query(By.css('#emptyCart'));
    expect(invoiceTable).toBeFalsy();
    expect(emptyCart).toBeTruthy();
  });

  it('Make sure checkout is correctly executed', () => {
    //write test
  });

  it('Make sure clearCart is correctly executed', () => {
    //write test
  });

  it('Make sure close cart is correctly executed', () => {
    //write test
  });
});
