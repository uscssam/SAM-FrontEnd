import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMachinesComponent } from './list-machines.component';

describe('ListMachinesComponent', () => {
  let component: ListMachinesComponent;
  let fixture: ComponentFixture<ListMachinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMachinesComponent]
    });
    fixture = TestBed.createComponent(ListMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
