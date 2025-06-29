import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CartcontentComponent } from './cartcontent.component';
import { cart, outOfStockCart } from '../../../mockData';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { ItemService } from '../../../services/item.service';
import { ItemOutOfStock } from '../../../store/store.actions';
import { By } from '@angular/platform-browser';

describe('CartcontentComponent', () => {
  let component: CartcontentComponent;
  let fixture: ComponentFixture<CartcontentComponent>;
  let store: jasmine.SpyObj<Store>;
  let itemService: jasmine.SpyObj<ItemService>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', [
      'select',
      'dispatch',
      'ItemOutOfStock',
    ]);
    itemService = jasmine.createSpyObj(ItemService, [
      'getItemInStock',
      'addItemToCart',
      'removeItemFromCart',
      'reduceItemBuyCount',
    ]);
    await TestBed.configureTestingModule({
      imports: [CartcontentComponent],
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: ItemService, useValue: itemService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartcontentComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));

    fixture.detectChanges();
  });

  it('make sure out of stock label is displayed if there is no more item is stock and disabled the add button', () => {
    component.cart = outOfStockCart;
    fixture.detectChanges();

    const outOfStockBadge = fixture.debugElement.query(
      By.css('[id="17-outOfStock"]')
    ).nativeElement;

    expect(outOfStockBadge).toBeTruthy();
  });

  it('make sure out of stock label is removed if there are items is stock and enable the add button', () => {
    component.cart = cart;
    component.reduceItemBuyCount(cart[0]);
    fixture.detectChanges();
    const outOfStockBadge = fixture.debugElement.query(
      By.css('[id="16-outOfStock"]')
    );

    expect(outOfStockBadge).toBeFalsy();
  });

  it('make sure the reduceElement button is disabled if the stock is equal to 1', () => {
    component.cart = [
      {
        id: 16,
        buyCount: 1,
        price: 1.99,
        title: 'Apple',
        thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
        warrantyInformation: '1 week warranty',
        returnPolicy: 'No return policy',
        isOutOfStock: false,
      },
    ];

    fixture.detectChanges();

    const reduceItemBuyCountBtn = fixture.debugElement.query(
      By.css('[id="16-reduceItemBuyCountBtn"]')
    ).nativeElement;

    expect(reduceItemBuyCountBtn.disabled).toBeTruthy();

    component.cart = [
      {
        id: 16,
        buyCount: 2,
        price: 1.99,
        title: 'Apple',
        thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
        warrantyInformation: '1 week warranty',
        returnPolicy: 'No return policy',
        isOutOfStock: false,
      },
    ];

    fixture.detectChanges();

    const reduceItemBuyCountBtn2 = fixture.debugElement.query(
      By.css('[id="16-reduceItemBuyCountBtn"]')
    ).nativeElement;

    expect(reduceItemBuyCountBtn2.disabled).toBeFalsy();
  });

  it('Make sure AddItem is correctly executed', () => {
    // If stock is not empty
    itemService.getItemInStock.and.returnValue(99);
    component.addItem(cart[0]);
    expect(itemService.addItemToCart).toHaveBeenCalledWith(cart[0]);

    // If stock is empty
    itemService.getItemInStock.and.returnValue(0);
    component.addItem(cart[0]);
    expect(store.dispatch).toHaveBeenCalledWith(
      ItemOutOfStock({ id: cart[0].id, isOutOfStock: true })
    );
  });

  it('Make sure reduce buyCount is correctly executed', () => {
    itemService.getItemInStock.and.returnValue(0);
    component.reduceItemBuyCount(cart[0]);
    expect(itemService.reduceItemBuyCount).toHaveBeenCalledWith(cart[0]);
    expect(store.dispatch).not.toHaveBeenCalledWith(
      ItemOutOfStock({
        id: cart[0].id,
        isOutOfStock: false,
      })
    );

    itemService.getItemInStock.and.returnValue(99);
    component.reduceItemBuyCount(cart[0]);
    expect(itemService.reduceItemBuyCount).toHaveBeenCalledWith(cart[0]);
    expect(store.dispatch).toHaveBeenCalledWith(
      ItemOutOfStock({
        id: cart[0].id,
        isOutOfStock: false,
      })
    );
  });

  it('Make sure removeItem is correctly executed', () => {
    component.removeItem(cart[0]);
    expect(itemService.removeItemFromCart).toHaveBeenCalledWith(cart[0]);
  });
});
