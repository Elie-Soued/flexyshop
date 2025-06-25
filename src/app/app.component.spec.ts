import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { productsMock } from './mockData';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let store: jasmine.SpyObj<Store>;
  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    let route = {
      params: of({ name: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: route },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock));
    expect(app).toBeTruthy();
  });

  it(`should have the 'flexyshop' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('flexyshop');
  });
});
