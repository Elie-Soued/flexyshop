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
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { LandingpageComponent } from '../../views/landingpage/landingpage.component';
import { Location } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: jasmine.SpyObj<Store>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    let route = {
      params: of({ name: 'beauty' }),
    } as any;

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([{ path: '', component: LandingpageComponent }]),
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: route },
      ],
      imports: [HeaderComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
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

  it('should navigate to "/" when home and logo  are clicked clicked', fakeAsync(() => {
    const home = fixture.debugElement.query(By.css('#home')).nativeElement;
    home.click();
    tick(); // wait for routing to settle
    expect(location.path()).toBe('');

    const logo = fixture.debugElement.query(By.css('#logo')).nativeElement;
    logo.click();
    tick(); // wait for routing to settle
    expect(location.path()).toBe('');
  }));
});
