import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastStatus = signal({
    status: '',
    timestamp: 0,
  });

  constructor() {}

  updateToastStatus(status: string): void {
    this.toastStatus.set({ status, timestamp: Date.now() });
  }

  clearToastStatus() {
    this.toastStatus.set({
      status: '',
      timestamp: 0,
    });
  }
}
