import { ItemMaster } from './ItemMaster';
import { Reason } from './Reason';
import { ReasonCatagory } from './ReasonCatagory';
export class SalesReturn {
    public id: number;
    public genaratedId: string;
    public invoiceId: string;
    public date: Date;
    public reference1: string;
    public reference2: string;
    public reasonCategoryId: number;
    public reasonId: number;
    public batchNumber: string;
    public itemId: number;
    public qty: number;
    public cost: number;
    public profit: number;
    public soldPrice: number;
    public reasonCatagory: ReasonCatagory;
    public reason: Reason;
    public itemMaster: ItemMaster;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(
        id: number,
        genaratedId: string,
        invoiceId: string,
        date: Date,
        reference1: string,
        reference2: string,
        reasonCategoryId: number,
        reasonId: number,
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
        this.genaratedId = genaratedId;
        this.invoiceId = invoiceId;
        this.date = date;
        this.reference1 = reference1;
        this.reference2 = reference2;
        this.reasonCategoryId = reasonCategoryId;
        this.reasonId = reasonId;
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

