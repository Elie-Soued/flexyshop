import { Injectable } from '@angular/core';
import { type Cart } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
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
    return Array.from({ length: Math.floor(n) });
  }

  getgrandTotal(cart: Cart[]): number {
    return cart.reduce((sum, item) => sum + item.price * item.buyCount, 0);
  }
}
