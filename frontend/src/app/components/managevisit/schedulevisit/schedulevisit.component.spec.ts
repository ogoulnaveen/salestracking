import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulevisitComponent } from './schedulevisit.component';

describe('SchedulevisitComponent', () => {
  let component: SchedulevisitComponent;
  let fixture: ComponentFixture<SchedulevisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulevisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
