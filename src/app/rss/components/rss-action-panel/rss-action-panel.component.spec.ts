/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RssActionPanelComponent } from './rss-action-panel.component';

describe('RssActionPanelComponent', () => {
  let component: RssActionPanelComponent;
  let fixture: ComponentFixture<RssActionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssActionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
