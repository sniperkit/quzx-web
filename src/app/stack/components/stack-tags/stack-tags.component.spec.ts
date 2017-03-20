/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StackTagsComponent } from './stack-tags.component';

describe('StackTagsComponent', () => {
  let component: StackTagsComponent;
  let fixture: ComponentFixture<StackTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
