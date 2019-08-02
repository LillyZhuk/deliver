import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RessetPassComponent } from './reset-pass.component';

describe('RessetPassComponent', () => {
  let component: RessetPassComponent;
  let fixture: ComponentFixture<RessetPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RessetPassComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RessetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
