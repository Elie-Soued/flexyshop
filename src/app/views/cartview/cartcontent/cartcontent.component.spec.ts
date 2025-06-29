import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CartcontentComponent } from './cartcontent.component';
import { cart } from '../../../mockData';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('CartcontentComponent', () => {
  let component: CartcontentComponent;
  let fixture: ComponentFixture<CartcontentComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);
    await TestBed.configureTestingModule({
      imports: [CartcontentComponent],
      providers: [provideHttpClient(), { provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartcontentComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));

    fixture.detectChanges();
  });

  it('Make sure component is correctly rendered', () => {
    //write test
  });

  it('Make sure AddItem is correctly executed', () => {
    //write test
  });

  it('Make sure reduce buyCount is correctly executed', () => {
    //write test
  });

  it('Make sure removeItem is correctly executed', () => {
    //write test
  });
});
