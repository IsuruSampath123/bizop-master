import {ItemMaster} from './ItemMaster';
export class ReturnItems {
    public id: number;
    public batchNumber: string;
    public itemId: number;
    public qty: number;
    public cost: number;
    public profit: number;
    public soldPrice: number;
    public itemMaster: ItemMaster;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(
        id: number,
        batchNumber: string,
        itemId: number,
        qty: number,
        cost: number,
        profit: number,
        soldPrice: number,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.batchNumber = batchNumber;
        this.itemId = itemId;
        this.qty = qty;
        this.cost = cost;
        this.profit = profit;
        this.soldPrice = soldPrice;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
