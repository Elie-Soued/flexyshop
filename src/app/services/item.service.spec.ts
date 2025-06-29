import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ItemService } from './item.service';
import { productsMock, cart } from '../mockData';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import {
  addBackToStock,
  addToCart,
  deleteItem,
  reduceBuyCount,
  removeFromStock,
  setOriginalStock,
} from '../store/store.actions';

describe('ItemService', () => {
  let service: ItemService;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), { provide: Store, useValue: store }],
    });
    service = TestBed.inject(ItemService);
    store.select.and.returnValue(of(productsMock));
  });

  it('make sure addItemToCart is correctly executed', () => {
    service.addItemToCart(cart[0]);

    expect(store.dispatch).toHaveBeenCalledWith(
      addToCart({
        id: 16,
        price: 1.99,
        title: 'Apple',
        thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
        warrantyInformation: '1 week warranty',
        returnPolicy: 'No return policy',
        isOutOfStock: false,
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(removeFromStock({ id: 16 }));
  });
  it('make sure reduceItemBuyCount is correctly executed', () => {
    service.reduceItemBuyCount(cart[0]);

    expect(store.dispatch).toHaveBeenCalledWith(addBackToStock({ id: 16 }));
    expect(store.dispatch).toHaveBeenCalledWith(reduceBuyCount({ id: 16 }));
  });
  it('make sure removeItemFromCart is correctly executed', () => {
    service.removeItemFromCart(cart[0]);
    const { buyCount } = cart[0];
    expect(store.dispatch).toHaveBeenCalledWith(deleteItem({ id: 16 }));
    expect(store.dispatch).toHaveBeenCalledWith(
      setOriginalStock({ id: 16, buyCount })
    );
  });
  it('make sure clearCart is correctly executed', () => {
    const removeItemSpy = spyOn(service, 'removeItemFromCart');
    service.clearCart(cart);
    cart.forEach((item) => {
      expect(removeItemSpy).toHaveBeenCalledWith(item);
    });
  });
  it('make sure getItemInStock is correctly executed', () => {
    const stockProduct1 = service.getItemInStock(1);
    expect(stockProduct1).toEqual(99);

    const stockProduct2 = service.getItemInStock(2);
    expect(stockProduct2).toEqual(63);
  });
});
