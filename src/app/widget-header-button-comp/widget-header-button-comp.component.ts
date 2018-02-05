import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-widget-header-button-comp',
  templateUrl: './widget-header-button-comp.component.html',
  styleUrls: ['./widget-header-button-comp.component.css']
})
export class WidgetHeaderButtonCompComponent implements OnInit {
  // widgetIcons: Observable<Contact[]>;
  widgetIcons = [
    {'icon':'edit'},
    {'icon':'print'},
    {'icon':'add'}

]
  constructor() { }

  ngOnInit() {
  }

}
