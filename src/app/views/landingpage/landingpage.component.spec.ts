import { LandingpageComponent } from './landingpage.component';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { productsMock } from '../../mockData';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;

  let productService: jasmine.SpyObj<ProductsService>;
  let dataService: jasmine.SpyObj<DataService>;
  let store: jasmine.SpyObj<Store>;

  const categoriesExtracted = [
    {
      name: 'beauty',
      title: 'Beauty',
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/1.webp',
    },
  ];

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', ['getProducts']);
    dataService = jasmine.createSpyObj('DataService', [
      'extractCategories',
      'replaceImages',
    ]);
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    await TestBed.configureTestingModule({
      imports: [LandingpageComponent],
      providers: [
        provideRouter([]),
        { provide: ProductsService, useValue: productService },
        { provide: Store, useValue: store },
        { provide: DataService, useValue: dataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingpageComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('If no products are available, categoriesWrapper is not rendered', () => {
    //Arrange
    productService.getProducts.and.returnValue(of({ products: [] }));
    const categoryWrapperBefore = fixture.debugElement.query(
      By.css('#categoriesWrapper')
    );

    //Expect
    expect(categoryWrapperBefore).toBeFalsy();
  });

  it('If products are available, categories Wrapper is rendered', fakeAsync(() => {
    //Arrange
    productService.getProducts.and.returnValue(of(productsMock));
    dataService.replaceImages.and.callFake(() => {});
    dataService.extractCategories.and.returnValue(categoriesExtracted);

    //Act
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    //Assert
    const categoryWrapperAfter = fixture.debugElement.query(
      By.css('#categoriesWrapper')
    );

    expect(categoryWrapperAfter).toBeTruthy();
  }));

  it('If products are in the store, the categories are directly created and displayed', fakeAsync(() => {
    //Arrange
    dataService.extractCategories.and.returnValue(categoriesExtracted);

    //Act
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    //Expect
    expect(component.categories).toEqual(categoriesExtracted);
  }));

  it('If products are not  in the store, the categories are first fetched then they are extracted from products', fakeAsync(() => {
    // Arrange
    store.select.and.returnValue(of({ products: [] }));
    productService.getProducts.and.returnValue(of(productsMock));
    dataService.replaceImages.and.callFake(() => {});
    dataService.extractCategories.and.returnValue(categoriesExtracted);

    //Act
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    // Assert
    expect(productService.getProducts).toHaveBeenCalled();
    expect(dataService.replaceImages).toHaveBeenCalledWith(
      productsMock.products
    );
    expect(dataService.extractCategories).toHaveBeenCalledWith(
      productsMock.products
    );
    expect(component.categories).toEqual(categoriesExtracted);
  }));
});
