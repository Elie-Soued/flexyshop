import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { SuccesspageComponent } from './successpage.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { clearCart } from '../../store/store.actions';

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
    const emoji = fixture.debugElement.query(By.css('#emoji')).nativeElement;
    const h2 = fixture.debugElement.query(By.css('h2')).nativeElement;
    const p = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(emoji.innerText).toEqual('🎉');
    expect(h2.innerText).toEqual('Payment Successful');
    expect(p.innerText).toEqual(
      'Thank you for your payment. Everything went smoothly!'
    );
  });

  it('Make sure cart is cleared on Init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(clearCart());
  });
});
