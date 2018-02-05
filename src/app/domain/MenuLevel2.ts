export class MenuLevel2{
  	public id: number;
  	public name: string;
  	public icon: string;
  	public url: string;
  	public sortingId:number;
  	public menuLevel1Id: number;

   	constructor(id: number, name: string, icon: string, url: string,sortingId:number,menuLevel1Id: number){
    	this.id = id;
  		this.name = name;
  		this.icon = icon;
  		this.url = url;
  		this.sortingId = sortingId;
  		this.menuLevel1Id = menuLevel1Id;
    }
}