import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductdetailpageComponent } from './productdetailpage.component';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';
import { productsMock, productsMock2 } from '../../mockData';
import { of } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { removeFromStock, addToCart } from '../../store/store.actions';
import { By } from '@angular/platform-browser';

describe('ProductdetailpageComponent', () => {
  let component: ProductdetailpageComponent;
  let fixture: ComponentFixture<ProductdetailpageComponent>;

  let productService: jasmine.SpyObj<ProductsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['getProduct']);
    toastService = jasmine.createSpyObj(
      'ToastService',
      ['updateToastStatus', 'clearToastStatus'],
      { toast$: of('') }
    );
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    let route = {
      params: of({ id: 1, section: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProductdetailpageComponent],
      providers: [
        provideRouter([]),
        { provide: ProductsService, useValue: productService },
        { provide: Store, useValue: store },
        { provide: ToastService, useValue: toastService },
        { provide: ActivatedRoute, useValue: route },
      ],
    }).compileComponents();

    store.select.and.returnValue(of(productsMock));
    fixture = TestBed.createComponent(ProductdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('If item is present in stock, update the store accordingly and send success message', () => {
    //Prepare
    productService.getProduct.and.returnValue(productsMock.products[0]);

    //Act
    component.ngOnInit();
    component.buy();

    //Assert
    expect(toastService.updateToastStatus).toHaveBeenCalledWith('success');
    expect(store.dispatch).toHaveBeenCalledWith(
      removeFromStock({
        id: 1,
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      addToCart({
        id: 1,
        price: 9.99,
        title: 'Essence Mascara Lash Princess',
        image:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      })
    );
  });

  it('If item is not present in stock, do not update the store and send an error message', () => {
    //Prepare
    productService.getProduct.and.returnValue(productsMock2.products[0]);

    //Act
    component.ngOnInit();
    component.buy();

    //Assert
    expect(toastService.updateToastStatus).toHaveBeenCalledWith('error');
    expect(store.dispatch).not.toHaveBeenCalledWith(removeFromStock({ id: 1 }));
    expect(store.dispatch).not.toHaveBeenCalledWith(
      addToCart({
        id: 1,
        price: 9.99,
        title: 'Essence Mascara Lash Princess',
        image:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      })
    );
  });

  it('throttledBuy function is fired when user clicks on the buy button', () => {
    const buySpy = spyOn(component, 'throttledBuy');
    const button = fixture.debugElement.query(
      By.css('#buyButton')
    ).nativeElement;

    button.click();
    expect(buySpy).toHaveBeenCalled();
  });
});
