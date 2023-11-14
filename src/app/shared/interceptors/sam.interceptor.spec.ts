import { TestBed } from '@angular/core/testing';

import { SamInterceptor } from './sam.interceptor';

describe('SamInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SamInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SamInterceptor = TestBed.inject(SamInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
