import { TestBed } from '@angular/core/testing';

import { ErrorHandleInterceptor } from './error-handle-interceptor.service';

describe('ErrorHandleInterceptor', () => {
  let service: ErrorHandleInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandleInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
