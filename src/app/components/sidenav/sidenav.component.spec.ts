import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SidenavComponent } from './sidenav.component';
import { of, Subject } from 'rxjs';
import { cart } from '../../mockData';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { UtilsService } from '../../services/utils.service';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let store: jasmine.SpyObj<Store>;
  let utilsService: jasmine.SpyObj<UtilsService>;
  let closeSideNav: Subject<void>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);
    closeSideNav = new Subject<void>();
    utilsService = jasmine.createSpyObj(
      'UtilsService',
      ['closeSideNavView', 'getgrandTotal'],
      {
        closeSideNav$: closeSideNav.asObservable(),
      }
    );

    utilsService.closeSideNavView.and.callFake(() => {
      closeSideNav.next();
    });
    await TestBed.configureTestingModule({
      imports: [SidenavComponent],
      providers: [
        provideHttpClient(),
        { provide: Store, useValue: store },
        { provide: UtilsService, useValue: utilsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();
  });

  it('Make sure sideNav is correctly rendered', () => {
    const sidenavContainer = fixture.debugElement.query(
      By.css('mat-sidenav-container')
    );

    const sidenavContent = fixture.debugElement.query(
      By.css('mat-sidenav-content')
    );

    const sidenav = fixture.debugElement.query(By.css('mat-sidenav'));

    expect(sidenavContainer).toBeTruthy;
    expect(sidenavContent).toBeTruthy;
    expect(sidenav).toBeTruthy;
  });

  it('make sure the sidenav is correctly opened', fakeAsync(() => {
    const openCartbutton = fixture.debugElement.query(
      By.css('#openCart')
    ).nativeElement;

    const matSidenavContainer = fixture.debugElement.query(
      By.css('mat-sidenav-container')
    ).nativeElement;
    expect(
      matSidenavContainer.classList.contains('mat-drawer-container-has-open')
    ).toBeFalse();

    // Click the button
    openCartbutton.click();
    fixture.detectChanges();

    tick(500); // wait for animation
    fixture.detectChanges();

    // Now assert that the class has been added
    expect(
      matSidenavContainer.classList.contains('mat-drawer-container-has-open')
    ).toBeTrue();
  }));

  it('make sure the sidenav is correctly closed', fakeAsync(() => {
    //Prepare
    const openCartbutton = fixture.debugElement.query(
      By.css('#openCart')
    ).nativeElement;
    const matSidenavContainer = fixture.debugElement.query(
      By.css('mat-sidenav-container')
    ).nativeElement;
    component.ngOnInit();

    //Act
    openCartbutton.click();
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();

    //Assert
    expect(
      matSidenavContainer.classList.contains('mat-drawer-container-has-open')
    ).toBeTrue();

    //Act
    utilsService.closeSideNavView();
    tick(500);
    fixture.detectChanges();

    //Assert
    expect(
      matSidenavContainer.classList.contains('mat-drawer-container-has-open')
    ).toBeFalse();
  }));

  it('Number of items is displayed over the cart icon is correct', () => {
    const cartItems = fixture.debugElement.query(
      By.css('#cartItems')
    ).nativeElement;

    expect(cartItems.innerHTML).toEqual('2');
  });
});
