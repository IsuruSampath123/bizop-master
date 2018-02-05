export class ItemPrice {
	public id : number;
	public itemId : string;
	public fromValue : number;
	public toValue : number;
	public applyFrom : number;
	public price : number;

    constructor(id: number, itemId : string, fromValue: number, toValue: number, applyFrom: number,price: number) {
		this.id = id;
		this.itemId = itemId;
		this.fromValue = fromValue;
		this.toValue = toValue;
		this.applyFrom = applyFrom;
		this.price = price;
	}
}