import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('Making sure updateStatus dispatches the correct value', (done) => {
    service.toast$.subscribe((value) => {
      expect(value).toEqual('pilex');
      done();
    });

    service.updateToastStatus('pilex');
  });

  it('Making sure clearStatus sends an empty string', (done) => {
    service.toast$.subscribe((value) => {
      expect(value).toEqual('');
      done();
    });

    service.clearToastStatus();
  });
});
