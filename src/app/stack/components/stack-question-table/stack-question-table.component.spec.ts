/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StackQuestionTableComponent } from './stack-question-table.component';

describe('StackQuestionTableComponent', () => {
  let component: StackQuestionTableComponent;
  let fixture: ComponentFixture<StackQuestionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackQuestionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackQuestionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
