import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductspageComponent } from './productspage.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { productsMock, productsMock2 } from '../../mockData';
import { provideHttpClient } from '@angular/common/http';
import { ItemService } from '../../services/item.service';
import { type Product } from '../../interface';

describe('ProductspageComponent', () => {
  let component: ProductspageComponent;
  let fixture: ComponentFixture<ProductspageComponent>;
  let store: jasmine.SpyObj<Store>;
  let itemService: jasmine.SpyObj<ItemService>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);
    itemService = jasmine.createSpyObj('ItemService', [
      'getItemInStock',
      'addItemToCart',
    ]);
    let route = {
      params: of({ name: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProductspageComponent],
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: route },
        { provide: ItemService, useValue: itemService },
      ],
    }).compileComponents();
  });

  const prepareComponent = (productsMock: { products: Product[] }) => {
    fixture = TestBed.createComponent(ProductspageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock));
    fixture.detectChanges();
  };

  it('Make sure the productsPage component is correctly rendered', () => {
    // Prepare
    prepareComponent(productsMock);

    // Assert
    const categories = fixture.debugElement.query(By.css('#categorySection'));
    const error = fixture.debugElement.query(By.css('#errorMessage'));
    expect(categories).toBeTruthy();
    expect(error).toBeFalsy();
  });

  it('Make sure the error Message is shown if no product is displayed', () => {
    // Prepare
    prepareComponent({ products: [] });

    // Assert
    const categories = fixture.debugElement.query(By.css('#categorySection'));
    const error = fixture.debugElement.query(By.css('#errorMessage'));
    expect(categories).toBeFalsy();
    expect(error).toBeTruthy();
  });

  it('make sure the correct product is displayed', () => {
    // Prepare
    prepareComponent(productsMock2);

    // Assert
    expect(component.categoryProducts).toEqual([productsMock2.products[1]]);
  });

  it('make sure add Item is working correctly', () => {
    prepareComponent(productsMock2);

    itemService.getItemInStock.and.returnValue(4);
    component.addItem(productsMock2.products[1]);
    expect(itemService.addItemToCart).toHaveBeenCalledWith(
      productsMock2.products[1]
    );
  });

  it('Make sure navigation is done to the correct product', () => {
    //write test
  });
});
