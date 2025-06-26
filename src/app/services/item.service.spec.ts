import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { ItemService } from './item.service';
import { productsMock } from '../mockData';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('ItemService', () => {
  let service: ItemService;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), { provide: Store, useValue: store }],
    });
    service = TestBed.inject(ItemService);
    store.select.and.returnValue(of(productsMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
