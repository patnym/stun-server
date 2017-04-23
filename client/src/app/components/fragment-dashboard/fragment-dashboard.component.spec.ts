import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentDashboardComponent } from './fragment-dashboard.component';

describe('DashboardComponent', () => {
  let component: FragmentDashboardComponent;
  let fixture: ComponentFixture<FragmentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
