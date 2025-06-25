import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './header.component';
import { productsMock, cart } from '../../mockData';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    let route = {
      params: of({ name: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: route },
      ],
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock));
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
