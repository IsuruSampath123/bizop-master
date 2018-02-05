export class TemporyGRN {
    public id: number;
    public genaratedId: string;
    public itemcode: String;
    public itemMasterId: number;
    public discription: string;

    public supplierId: number;
    public storeId: number;
    public batchNumber: string;
    public totprice: number;
    public quantity: number;
    public remainingQuantity: number;
    public discount: number;
    public date: Date;
    public createdDate: Date;
    public createdBy: string;


    constructor(
        id: number,
        discription:string,
        genaratedId: string,
        itemcode: string,
        batchNumber: string,
        totprice: number,
        quantity: number,
        remainingQuantity: number,
        discount: number,
        date: Date,
        createdDate: Date,
        createdBy: string,
        supplierId: number,
        storeId: number,
        itemMasterId: number,
    ) {
        this.id = id;
        this.discription=discription;
        this.genaratedId = genaratedId;
        this.itemcode = itemcode;
        this.batchNumber = batchNumber;
        this.totprice = totprice;
        this.quantity = quantity;
        this.remainingQuantity = remainingQuantity;
        this.discount = discount;
        this.date = date;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.supplierId = supplierId;
        this.storeId = storeId;
        this.itemMasterId = itemMasterId;

    }

}