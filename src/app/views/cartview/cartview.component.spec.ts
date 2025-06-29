import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartViewComponent } from './cartview.component';
import { Store } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { cart } from '../../mockData';
import { provideHttpClient } from '@angular/common/http';
import { type Cart } from '../../interface';

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

  const prepareCartView = (cart: Cart | []) => {
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();
  };

  it('Make sure the cartView is correctly rendered', () => {
    //Prepare
    prepareCartView(cart);
    const invoiceTable = fixture.debugElement.query(By.css('#invoiceTable'));
    const emptyCart = fixture.debugElement.query(By.css('#emptyCart'));

    //Assert
    expect(invoiceTable).toBeTruthy();
    expect(emptyCart).toBeFalsy();
  });

  it('If no items are present in the cart, display message', () => {
    //Prepare
    prepareCartView([]);
    const invoiceTable = fixture.debugElement.query(By.css('#invoiceTable'));
    const emptyCart = fixture.debugElement.query(By.css('#emptyCart'));

    //Assert
    expect(invoiceTable).toBeFalsy();
    expect(emptyCart).toBeTruthy();
  });

  it('Make sure checkout is correctly executed', () => {
    //Prepare
    prepareCartView(cart);
    const spyCheckout = spyOn(component, 'checkout');
    const checkoutButton = fixture.debugElement.query(
      By.css('#checkout')
    ).nativeElement;

    //Act
    checkoutButton.click();

    //Assert
    expect(spyCheckout).toHaveBeenCalled();
  });

  it('Make sure clearCart is correctly executed', () => {
    //Prepare
    prepareCartView(cart);

    const spyClearCart = spyOn(component, 'clearCart');
    const clearCartButton = fixture.debugElement.query(
      By.css('#clearCart')
    ).nativeElement;

    //Act
    clearCartButton.click();

    //Assert
    expect(spyClearCart).toHaveBeenCalled();
  });

  it('Make sure close cart is correctly executed', () => {
    //Prepare
    prepareCartView(cart);

    const spyCloseView = spyOn(component, 'closeCheckoutView');
    const closeViewButton = fixture.debugElement.query(
      By.css('#closeView')
    ).nativeElement;

    //Act
    closeViewButton.click();

    //Assert
    expect(spyCloseView).toHaveBeenCalled();
  });
});
