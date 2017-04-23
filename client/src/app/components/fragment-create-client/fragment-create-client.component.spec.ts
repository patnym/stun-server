import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentCreateClientComponent } from './fragment-create-client.component';

describe('FragmentCreateClientComponent', () => {
  let component: FragmentCreateClientComponent;
  let fixture: ComponentFixture<FragmentCreateClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentCreateClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentCreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
