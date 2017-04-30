import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentCreateUserComponent } from './fragment-create-user.component';

describe('FragmentCreateUserComponent', () => {
  let component: FragmentCreateUserComponent;
  let fixture: ComponentFixture<FragmentCreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentCreateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
