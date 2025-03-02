import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { detailGuard } from './auth.guard';

describe('detailGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => detailGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
