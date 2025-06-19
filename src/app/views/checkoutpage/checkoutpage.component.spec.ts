import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutpageComponent } from './checkoutpage.component';
import { Store } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CheckoutpageComponent', () => {
  let component: CheckoutpageComponent;
  let fixture: ComponentFixture<CheckoutpageComponent>;
  let store: jasmine.SpyObj<Store>;

  let cart = [
    {
      id: 16,
      buyCount: 1,
      price: 1.99,
      title: 'Apple',
      image: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
    },
    {
      id: 11,
      buyCount: 1,
      price: 1899.99,
      title: 'Annibale Colombo Bed',
      image: 'https://flexyshopimages.pilexlaflex.com/images/11.webp',
    },
  ];

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);

    await TestBed.configureTestingModule({
      imports: [CheckoutpageComponent],
      providers: [provideRouter([]), { provide: Store, useValue: store }],
    }).compileComponents();
  });

  it('Make sure the checkoutPage is correctly rendered', () => {
    fixture = TestBed.createComponent(CheckoutpageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();

    const invoiceTable = fixture.debugElement.query(By.css('#invoiceTable'));
    const emptyCart = fixture.debugElement.query(By.css('#emptyCart'));
    expect(invoiceTable).toBeTruthy();
    expect(emptyCart).toBeFalsy();
  });

  it('If no items are present in the cart, display message', () => {
    fixture = TestBed.createComponent(CheckoutpageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: [] }));
    fixture.detectChanges();
    const invoiceTable = fixture.debugElement.query(By.css('#invoiceTable'));
    const emptyCart = fixture.debugElement.query(By.css('#emptyCart'));

    expect(invoiceTable).toBeFalsy();
    expect(emptyCart).toBeTruthy();
  });
});
