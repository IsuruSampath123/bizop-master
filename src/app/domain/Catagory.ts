export class Catagory {
	public id: number;
	public active: String;
	public itemCategory: string;

	constructor(id: number, itemCategory: string) {
		this.id = id;
		this.itemCategory = itemCategory;
	}

}
