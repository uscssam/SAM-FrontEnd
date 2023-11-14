import { TestBed } from '@angular/core/testing';

import { FormRegisterUserService } from './form-register-user.service';

describe('FormRegisterUserService', () => {
  let service: FormRegisterUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormRegisterUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
