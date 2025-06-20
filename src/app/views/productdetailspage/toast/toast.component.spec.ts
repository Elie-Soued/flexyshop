import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../../../services/toast.service';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  let toastService: jasmine.SpyObj<ToastService>;
  let toastSubject = new Subject<string>();

  beforeEach(async () => {
    toastService = jasmine.createSpyObj('ToastService', ['updateToastStatus'], {
      toast$: toastSubject.asObservable(),
    });
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers: [{ provide: ToastService, useValue: toastService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('On init toast should not be dispayed', () => {
    toastSubject.next('');

    fixture.detectChanges();
    const toastBody = fixture.debugElement.query(
      By.css('#toastBodyContainer')
    ).nativeElement;

    const toast = fixture.debugElement.query(By.css('#toast')).nativeElement;

    expect(toast.classList.contains('d-none')).toBeTrue();
    expect(toastBody.classList.contains('d-none')).toBeTrue();
  });

  it('If toastStatus is equal to success, display success Toast', () => {
    toastSubject.next('success');
    fixture.detectChanges();

    const toastBody = fixture.debugElement.query(
      By.css('#toastBody')
    ).nativeElement;

    const toast = fixture.debugElement.query(By.css('#toast')).nativeElement;
    const text = toastBody.textContent.trim();

    expect(text).toEqual('This item was added to your cart.');
    expect(toast.classList.contains('bg-success')).toBeTrue();
  });

  it('If toastStatus is equal to error,display error Toast', () => {
    toastSubject.next('error');
    fixture.detectChanges();

    const toastBody = fixture.debugElement.query(
      By.css('#toastBody')
    ).nativeElement;

    const toast = fixture.debugElement.query(By.css('#toast')).nativeElement;
    const text = toastBody.textContent.trim();

    expect(text).toEqual('This item is not available anymore.');
    expect(toast.classList.contains('bg-danger')).toBeTrue();
  });
});
