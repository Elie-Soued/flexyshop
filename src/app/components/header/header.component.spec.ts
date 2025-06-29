import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './header.component';
import { productsMock, cart } from '../../mockData';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    router = jasmine.createSpyObj('Location', ['path']);
    let route = {
      params: of({ name: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: route },
        { provide: Location, useValue: location },
      ],
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of(productsMock));
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();
  });

  it('Header is correctly rendered', () => {
    const logo = fixture.debugElement.query(By.css('#logo')).nativeElement;
    const home = fixture.debugElement.query(By.css('#home')).nativeElement;
    const sideNav = fixture.debugElement.query(
      By.css('app-sidenav')
    ).nativeElement;

    expect(home).toBeTruthy();
    expect(logo).toBeTruthy();
    expect(sideNav).toBeTruthy();
  });

  it('Navigation is working correctly', () => {
    //write test
  });
});
