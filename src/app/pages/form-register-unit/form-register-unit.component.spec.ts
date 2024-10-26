import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterUnitComponent } from './form-register-unit.component';

describe('FormRegisterUnitComponent', () => {
  let component: FormRegisterUnitComponent;
  let fixture: ComponentFixture<FormRegisterUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterUnitComponent]
    });
    fixture = TestBed.createComponent(FormRegisterUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
