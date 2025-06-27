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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
