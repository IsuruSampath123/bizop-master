import { ItemMaster } from './ItemMaster';
import { Orders } from './orders';
import { OrderType } from './OrderType';
ItemMaster


export class Invoice {
    public id: number;
    public genaratedId: string;
    public referenceNo: string;

    public batchNumber: string;
    public quantity: number;
    public soldPrice: number;
    public cost: number;
    public profit: number;
    public orderId: string;
    public itemStatus: string;
    public itemMasterId: number;
    public itemMaster: ItemMaster;
    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        referenceNo: string,
        batchNumber: string,
        quantity: number,
        soldPrice: number,
        cost: number,
        profit: number,
        orderId: string,
        itemStatus:string,
        createdDate: Date,
        createdBy: string,
        itemMasterId: number



    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.referenceNo = referenceNo;
        this.batchNumber = batchNumber;
        this.quantity = quantity;
        this.soldPrice = soldPrice;
        this.cost = cost;
        this.profit = profit;
        this.orderId = orderId;
        this.itemStatus=itemStatus;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.itemMasterId = itemMasterId;



    }

}
