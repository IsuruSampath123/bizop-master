/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QulityParameterComponent } from './qulityParameter.component';

describe('QulityParameterComponent', () => {
  let component: QulityParameterComponent;
  let fixture: ComponentFixture<QulityParameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QulityParameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QulityParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
