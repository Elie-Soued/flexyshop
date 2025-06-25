import { Injectable } from '@angular/core';
import { type Cart } from '../interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private closeSideNav = new Subject<void>();
  public closeSideNav$ = this.closeSideNav.asObservable();

  constructor() {}

  throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return () => {
      if (!inThrottle) {
        func.apply(this);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  getRange(n: number): number[] {
    return Array.from({ length: Math.floor(n) }, (v, i) => i);
  }

  getgrandTotal(cart: Cart[]): number {
    return cart.reduce((sum, item) => sum + item.price * item.buyCount, 0);
  }

  closeSideNavView() {
    this.closeSideNav.next();
  }
}
