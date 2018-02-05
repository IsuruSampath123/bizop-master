import { ItemMaster } from './ItemMaster';
import { Customer } from './Customer';

export class CustomerSpecificPrice {
	public id: number;
	public genaratedId: string;
	public active: String;
	public specialPrice: number;
	public specialDiscount: number;
	public creditDays: number;
	public cash: number;

	public customerId: number;
	public customer: Customer;

	public itemMasterId: number;
	public itemMaster: ItemMaster;

	public createdDate: Date;
	public createdBy: string;

	constructor(

		id: number,
		genaratedId: string,
		specialPrice: number,
		specialDiscount: number,
		creditDays: number,
		cash: number,
		createdDate: Date,
		createdBy: string,
		customerId: number,
		itemMasterId: number

	) {

		this.id = id;
		this.genaratedId = genaratedId;
		this.specialPrice = specialPrice;
		this.specialDiscount = specialDiscount;
		this.creditDays = creditDays;
		this.cash = cash;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.customerId = customerId;
		this.itemMasterId = itemMasterId;


	}

}
