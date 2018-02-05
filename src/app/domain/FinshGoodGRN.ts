import { Store } from './Store';
import { ItemMaster } from './ItemMaster';
import { Supplier } from './Supplier';

export class FinishGoodGRN {
    public id: number;
    public genaratedId: string;
    public active: String;
    public batchNumber: string;
    public price: number;
    public quantity: number;
    public remainingQuantity: number;
    public returnQuantity: number;
    public returnReasonCatagory: string;
    public returnReason: string;
    public returnDate: string;
    public discount: number;
    public date: Date;

    public supplierId: number;
    public supplier: Supplier;

    public storeId: number;
    public store: Store;

    public itemMasterId: number;
    public itemMaster: ItemMaster;

    public createdDate: Date;
    public createdBy: string;
   

    constructor(

        id: number,
        genaratedId: string,
        batchNumber: string,
        price: number,
        quantity: number,
        remainingQuantity: number,
        returnQuantity: number,
        returnReasonCatagory: string,
        returnReason: string,
        returnDate: string,
        discount: number,
        date: Date,
        createdDate: Date,
        createdBy: string,
        supplierId: number,
        storeId: number,
        itemMasterId: number
        

    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.batchNumber = batchNumber;
        this.price = price;
        this.quantity = quantity;
        this.remainingQuantity = remainingQuantity;
        this.returnQuantity = returnQuantity;
        this.returnReasonCatagory = returnReasonCatagory;
        this.returnReason = returnReason;
        this.returnDate=returnDate;
        this.discount = discount;
        this.date = date;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.supplierId = supplierId;
        this.storeId = storeId;
        this.itemMasterId = itemMasterId;
       

    }

}
