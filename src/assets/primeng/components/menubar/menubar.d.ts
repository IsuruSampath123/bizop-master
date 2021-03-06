import { ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
export declare class MenubarSub implements OnDestroy {
    domHandler: DomHandler;
    renderer: Renderer2;
    item: MenuItem;
    root: boolean;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    documentClickListener: any;
    menuClick: boolean;
    menuHoverActive: boolean;
    activeItem: any;
    hideTimeout: any;
    constructor(domHandler: DomHandler, renderer: Renderer2);
    onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    bindEventListener(): void;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    onItemMouseLeave(event: Event): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class Menubar {
    el: ElementRef;
    domHandler: DomHandler;
    renderer: Renderer2;
    model: MenuItem[];
    style: any;
    styleClass: string;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    constructor(el: ElementRef, domHandler: DomHandler, renderer: Renderer2);
}
export declare class MenubarModule {
}
