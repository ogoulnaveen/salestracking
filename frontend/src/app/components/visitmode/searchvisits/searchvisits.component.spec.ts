import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchvisitsComponent } from './searchvisits.component';

describe('SearchvisitsComponent', () => {
  let component: SearchvisitsComponent;
  let fixture: ComponentFixture<SearchvisitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchvisitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchvisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
