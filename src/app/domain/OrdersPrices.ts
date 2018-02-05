export class OrdersPrices {
    public id: number;
    public orderId: string;
    public mrpTotal: number;
    public itemDiscount: number;
    public wholesaleDiscount: number;
    public netTotal: number;
    public createdDate: Date;
    public createdBy: string;


    constructor(
        id: number,
        orderId: string,
        mrpTotal: number,
        itemDiscount: number,
        wholesaleDiscount: number,
        netTotal: number,
        createdDate: Date,
        createdBy: string
    ) {
        this.id = id;
        this.orderId = orderId;
        this.mrpTotal = mrpTotal;
        this.itemDiscount = itemDiscount;
        this.wholesaleDiscount = wholesaleDiscount;
        this.netTotal = netTotal;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
    }

}