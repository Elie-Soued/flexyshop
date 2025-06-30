import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  let cart = [
    {
      id: 16,
      buyCount: 1,
      price: 1.99,
      title: 'Apple',
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/16.webp',
      warrantyInformation: '',
      returnPolicy: '',
      isOutOfStock: false,
    },
    {
      id: 11,
      buyCount: 1,
      price: 1899.99,
      title: 'Annibale Colombo Bed',
      thumbnail: 'https://flexyshopimages.pilexlaflex.com/images/11.webp',
      warrantyInformation: '',
      returnPolicy: '',
      isOutOfStock: false,
    },
  ];

  beforeEach(() => {
    jasmine.clock().install();
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('Making sure throttle executes the function on the correct interval', () => {
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

  it('Make sure getRange creates an array with a specific length', () => {
    const range = service.getRange(3);
    expect(range.length).toEqual(3);

    const range2 = service.getRange(3, 5);
    expect(range2.length).toEqual(2);
  });

  it('make sure grandToal is correctly calculated', () => {
    const grandTotal = service.getgrandTotal(cart);
    expect(grandTotal).toEqual(1901.98);
  });

  it('make sure closeSideNavView is correctly executed', () => {
    //write test
  });
});
