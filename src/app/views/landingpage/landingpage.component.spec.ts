import { LandingpageComponent } from './landingpage.component';
import { provideRouter } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';
import { By } from '@angular/platform-browser';
import { type Product } from '../../interface';
import { of } from 'rxjs';
import { DataService } from '../../services/data.service';
import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';

describe('LandingpageComponent', () => {
  let component: LandingpageComponent;
  let fixture: ComponentFixture<LandingpageComponent>;

  let productService: jasmine.SpyObj<ProductsService>;
  let dataService: jasmine.SpyObj<DataService>;
  let store: jasmine.SpyObj<Store>;

  const categoriesExtracted = [
    {
      name: 'beauty',
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/1.webp',
    },
  ];

  const productsMock: { products: Product[] } = {
    products: [
      {
        availabilityStatus: 'In Stock',
        brand: 'Essence',
        category: 'beauty',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
        discountPercentage: 10.48,
        id: 1,
        images: [
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        ],
        meta: {
          createdAt: '2025-04-30T09:41:02.053Z',
          updatedAt: '2025-04-30T09:41:02.053Z',
          barcode: '5784719087687',
          qrCode: 'https://cdn.dummyjson.com/public/qr-code.png',
        },
        minimumOrderQuantity: 48,
        price: 9.99,
        rating: 2.56,
        returnPolicy: 'No return policy',
        reviews: [],
        shippingInformation: 'Ships in 3-5 business days',
        sku: 'BEA-ESS-ESS-001',
        stock: 99,
        tags: ['beauty', 'mascara'],
        thumbnail:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        title: 'Essence Mascara Lash Princess',
        warrantyInformation: '1 week warranty',
        weight: 4,
      },
    ],
  };

  const item = {
    id: 6,
    buyCount: 1,
    price: 49.99,
    title: 'Calvin Klein CK One',
    image: 'https://flexyshopimages.pilexlaflex.com/images/6.webp',
  };

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

  it('categoriesWrapper is not rendered', () => {
    //Arrange
    productService.getProducts.and.returnValue(of({ products: [] }));
    const categoryWrapperBefore = fixture.debugElement.query(
      By.css('#categoriesWrapper')
    );
    const checkoutLink = fixture.debugElement.query(By.css('#checkoutLink'));

    //Expect
    expect(categoryWrapperBefore).toBeFalsy();
    expect(checkoutLink).toBeTruthy();
  });

  it('categoriesWrapper is rendered', fakeAsync(() => {
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
    const checkoutLink = fixture.debugElement.query(By.css('#checkoutLink'));
    expect(categoryWrapperAfter).toBeTruthy();
    expect(checkoutLink).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('[id="beauty/sectionLink"]'))
        .nativeElement
    );
  }));

  it('If products are in the store, the categories are directly abstracted', fakeAsync(() => {
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

  it('Make sure the correct the cart icon is correctly updated depending on the number of items in the cart', () => {
    component.cart = [
      {
        id: 6,
        buyCount: 1,
        price: 49.99,
        title: 'Calvin Klein CK One',
        image: 'https://flexyshopimages.pilexlaflex.com/images/6.webp',
      },
      {
        id: 5,
        buyCount: 1,
        price: 99.99,
        title: 'ouf item',
        image: 'https://flexyshopimages.pilexlaflex.com/images/5.webp',
      },
    ];

    fixture.detectChanges();

    const cartItems = fixture.debugElement.query(By.css('#cartItems'));

    expect(cartItems).toBeTruthy();
    const text = cartItems.nativeElement.textContent.trim();
    expect(text).toBe('2'); // Replace '2' with whatever you expect to be shown
  });
});
