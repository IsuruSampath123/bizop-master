import { MainCatagory } from './mainCatagory';

export class SubCatagory {
	public id: number;
	public genaratedId: string;
	public active: String;
	public subCatagoryName: string;
	public subCatgoryImage: string;
	public mainCatagoryId: number;
	public mainCatagory: MainCatagory;
	public createdDate: Date;
	public createdBy: string;

	constructor(id: number, genaratedId: string, subCatagoryName: string, subCatgoryImage: string, createdDate: Date, createdBy: string, mainCatagoryId: number) {

		this.id = id;
		this.genaratedId = genaratedId;
		this.subCatagoryName = subCatagoryName;
		this.subCatgoryImage = subCatgoryImage;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.mainCatagoryId = mainCatagoryId;

	}

}
