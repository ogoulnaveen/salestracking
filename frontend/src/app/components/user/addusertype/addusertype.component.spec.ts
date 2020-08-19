import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddusertypeComponent } from './addusertype.component';

describe('AddusertypeComponent', () => {
  let component: AddusertypeComponent;
  let fixture: ComponentFixture<AddusertypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddusertypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddusertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
