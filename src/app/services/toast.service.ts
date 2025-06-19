import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastStatus = new Subject<string>();
  public toast$ = this.toastStatus.asObservable();

  constructor() {}

  updateToastStatus(status: string): void {
    this.toastStatus.next(status);
  }

  clearToastStatus() {
    this.toastStatus.next('');
  }
}
