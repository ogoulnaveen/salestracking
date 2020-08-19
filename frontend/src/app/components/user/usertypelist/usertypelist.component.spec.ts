import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertypelistComponent } from './usertypelist.component';

describe('UsertypelistComponent', () => {
  let component: UsertypelistComponent;
  let fixture: ComponentFixture<UsertypelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsertypelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsertypelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
