import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductspageComponent } from './productspage.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { productsMock, productsMock2 } from '../../mockData';
import { provideHttpClient } from '@angular/common/http';

describe('ProductspageComponent', () => {
  let component: ProductspageComponent;
  let fixture: ComponentFixture<ProductspageComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);
    let route = {
      params: of({ name: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ProductspageComponent],
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: route },
      ],
    }).compileComponents();
  });

  it('Make sure the productsPage component is correctly rendered', () => {
    // Prepare
    fixture = TestBed.createComponent(ProductspageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock));
    fixture.detectChanges();

    // Assert
    const categories = fixture.debugElement.query(By.css('#categorySection'));
    const error = fixture.debugElement.query(By.css('#errorMessage'));
    expect(categories).toBeTruthy();
    expect(error).toBeFalsy();
  });

  it('Make sure the error Message is shown if no product is displayed', () => {
    // Prepare
    fixture = TestBed.createComponent(ProductspageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ products: [] }));
    fixture.detectChanges();

    // Assert
    const categories = fixture.debugElement.query(By.css('#categorySection'));
    const error = fixture.debugElement.query(By.css('#errorMessage'));
    expect(categories).toBeFalsy();
    expect(error).toBeTruthy();
  });

  it('make sure the correct product is displayed', () => {
    // Prepare
    fixture = TestBed.createComponent(ProductspageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock2));
    fixture.detectChanges();

    // Assert
    expect(component.categoryProducts).toEqual([productsMock2.products[1]]);
  });

  it('make sure add Item is working correctly', () => {
    //write test
  });

  it('Make sure navigation is done to the correct product', () => {
    // write test
  });
});
