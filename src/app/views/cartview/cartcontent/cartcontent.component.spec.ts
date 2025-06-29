import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CartcontentComponent } from './cartcontent.component';
import { cart } from '../../../mockData';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { ItemService } from '../../../services/item.service';
import { ItemOutOfStock } from '../../../store/store.actions';

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

  it('Make sure component is correctly rendered', () => {
    //write test
  });

  it('make sure out of stock label is displayed if there is no more item is stock and disabled the add button', () => {
    //write test
  });

  it('make sure out of stock label is removed if there are items is stock and enable the add button', () => {
    //write test
  });

  it('make sure the reduceElement button is disabled if the stock is equal to 1', () => {
    //write test
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
