/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RssFeedTableComponent } from './rss-feed-table.component';

describe('RssFeedTableComponent', () => {
  let component: RssFeedTableComponent;
  let fixture: ComponentFixture<RssFeedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssFeedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssFeedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
