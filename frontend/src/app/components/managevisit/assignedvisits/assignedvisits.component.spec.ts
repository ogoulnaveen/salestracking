import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedvisitsComponent } from './assignedvisits.component';

describe('AssignedvisitsComponent', () => {
  let component: AssignedvisitsComponent;
  let fixture: ComponentFixture<AssignedvisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedvisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedvisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
