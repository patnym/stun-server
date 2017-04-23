import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentClientComponent } from './fragment-client.component';

describe('FragmentClientComponent', () => {
  let component: FragmentClientComponent;
  let fixture: ComponentFixture<FragmentClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FragmentClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
