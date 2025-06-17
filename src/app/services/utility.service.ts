import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
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
    return Array.from({ length: Math.floor(n) }, (_, i) => i);
  }
}
