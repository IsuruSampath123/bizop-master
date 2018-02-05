import { Component, OnInit, state, style } from '@angular/core';
import { MenuService } from "../service/menu.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  links = [];
  links2 = [];
  selected = 0;

  select(item) {
    this.selected = item;
  };
  isActive(item) {
    return this.selected === item;
  };

  panelOpenState: boolean = false;
  constructor(private router: Router, menuSevise: MenuService) {
    this.links = menuSevise.menuItemsList;
    this.links2 = menuSevise.SalesandDebtors;

    console.log('here jack ' + this.links);


  }

  ngOnInit() {

  }

}
