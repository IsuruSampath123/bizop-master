import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHeaderButtonCompComponent } from './widget-header-button-comp.component';

describe('WidgetHeaderButtonCompComponent', () => {
  let component: WidgetHeaderButtonCompComponent;
  let fixture: ComponentFixture<WidgetHeaderButtonCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHeaderButtonCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHeaderButtonCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
