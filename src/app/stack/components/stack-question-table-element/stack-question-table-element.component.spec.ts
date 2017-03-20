/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StackQuestionTableElementComponent } from './stack-question-table-element.component';

describe('StackQuestionTableElementComponent', () => {
  let component: StackQuestionTableElementComponent;
  let fixture: ComponentFixture<StackQuestionTableElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackQuestionTableElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackQuestionTableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
