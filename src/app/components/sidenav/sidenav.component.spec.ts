import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SidenavComponent } from './sidenav.component';
import { of } from 'rxjs';
import { cart } from '../../mockData';
import { provideHttpClient } from '@angular/common/http';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select']);
    await TestBed.configureTestingModule({
      imports: [SidenavComponent],
      providers: [provideHttpClient(), { provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    store.select.and.returnValue(of({ items: cart }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
