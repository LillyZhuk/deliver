import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCafePage } from './list-cafe.page';

describe('ListCafePage', () => {
  let component: ListCafePage;
  let fixture: ComponentFixture<ListCafePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCafePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCafePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
