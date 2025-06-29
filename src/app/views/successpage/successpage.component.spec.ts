import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SuccesspageComponent } from './successpage.component';
import { provideRouter } from '@angular/router';

describe('SuccesspageComponent', () => {
  let component: SuccesspageComponent;
  let fixture: ComponentFixture<SuccesspageComponent>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['dispatch']);
    await TestBed.configureTestingModule({
      imports: [SuccesspageComponent],
      providers: [provideRouter([]), { provide: Store, useValue: store }],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccesspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure component is correctly rendered', () => {
    //write test
  });

  it('Make sure cart is cleared on Init', () => {
    //write test
  });
});
