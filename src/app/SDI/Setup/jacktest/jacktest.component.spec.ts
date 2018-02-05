/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JacktestComponent } from './jacktest.component';

describe('JacktestComponent', () => {
  let component: JacktestComponent;
  let fixture: ComponentFixture<JacktestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JacktestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JacktestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
