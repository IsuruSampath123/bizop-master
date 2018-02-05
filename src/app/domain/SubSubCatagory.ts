import { MainCatagory } from './mainCatagory';
import { SubCatagory } from './SubCatagory';

export class SubSubCatagory {
	public id: number;
	public genaratedId: string;
	public active: String;
	public subSubCatagoryName: string;
	public subSubCatgoryImage: string;

	public subCatagoryId: number;
	public subCatagory: SubCatagory;

	public mainCatagoryId: number;
	public mainCatagory: MainCatagory;

	public createdDate: Date;
	public createdBy: string;

	constructor(id: number, genaratedId: string, subSubCatagoryName: string, subSubCatgoryImage: string, createdDate: Date, createdBy: string, subCatagoryId: number,mainCatagoryId:number) {

		this.id = id;
		this.genaratedId = genaratedId;
		this.subSubCatagoryName = subSubCatagoryName;
		this.subSubCatgoryImage = subSubCatgoryImage;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.subCatagoryId = subCatagoryId;
		this.mainCatagoryId=mainCatagoryId;

	}

}
