import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegisterServiceOrderComponent } from './form-register-service-order.component';

describe('FormRegisterServiceOrderComponent', () => {
  let component: FormRegisterServiceOrderComponent;
  let fixture: ComponentFixture<FormRegisterServiceOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormRegisterServiceOrderComponent]
    });
    fixture = TestBed.createComponent(FormRegisterServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
