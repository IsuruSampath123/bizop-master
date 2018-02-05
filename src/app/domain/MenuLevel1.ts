import { MenuLevel2 } from './menuLevel2';

export class MenuLevel1{
  	public id: number;
  	public name: string;
  	public icon: string;
  	public url: string;
  	public sortingId:number;
    public menuLevel2List:MenuLevel2[];

   	constructor(id: number, name: string, icon: string, url: string,sortingId:number){
    	this.id = id;
  		this.name = name;
  		this.icon = icon;
  		this.url = url;
  		this.sortingId = sortingId;
    }

    public setMenuLevel2List(menuLevel2List: MenuLevel2[]): void {
      this.menuLevel2List = menuLevel2List;
    }
}