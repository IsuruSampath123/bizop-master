"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LeftMenuComponent = (function () {
    function LeftMenuComponent() {
        this.links = ["sampath", "Tocha", "sampathW", "jayruwan"];
        this.panelOpenState = false;
        this.wasClicked = false;
    }
    LeftMenuComponent.prototype.onClick = function () {
        this.links.wasClicked = !this.wasClicked;
    };
    LeftMenuComponent.prototype.ngOnInit = function () {
    };
    return LeftMenuComponent;
}());
LeftMenuComponent = __decorate([
    core_1.Component({
        selector: 'app-left-menu',
        templateUrl: './left-menu.component.html',
        styleUrls: ['./left-menu.component.css']
    })
], LeftMenuComponent);
exports.LeftMenuComponent = LeftMenuComponent;
