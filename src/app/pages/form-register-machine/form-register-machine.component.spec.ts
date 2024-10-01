import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterMachine } from './form-register-machine.component';

describe('FormComponentComponent', () => {
  let component: FormRegisterMachine;
  let fixture: ComponentFixture<FormRegisterMachine>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterMachine]
    });
    fixture = TestBed.createComponent(FormRegisterMachine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
