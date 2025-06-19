import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    jasmine.clock().install();
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('Making sure throttle is working correctly', () => {
    const spy = jasmine.createSpy('throttleFn');
    const throttled = service.throttle(spy, 1000);

    throttled(); // executed
    throttled(); // ignored
    throttled(); // ignored

    expect(spy.calls.count()).toBe(1);

    jasmine.clock().tick(1000);
    throttled();
    expect(spy.calls.count()).toBe(2);

    jasmine.clock().tick(1000);
    throttled();
    expect(spy.calls.count()).toBe(3);
  });

  it('Make sure getRange is working correctly', () => {
    const range = service.getRange(3);
    expect(range.length).toEqual(3);
  });
});
