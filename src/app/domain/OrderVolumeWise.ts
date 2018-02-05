
export class OrderVolumeWise {

    public id: number;
    public orderId: string;
    public purchasedItemid: number;
    public purchasedItemQuantity: number;
    public freeIssueItemid: number;
    public freeIssueItemQuantity: number;
    public createdDate: Date;
    public createdBy: string;

    constructor(
        id: number,
        orderId: string,
        purchasedItemid: number,
        purchasedItemQuantity: number,
        freeIssueItemid: number,
        freeIssueItemQuantity: number,
        createdDate: Date,
        createdBy: string,

    ) {
        this.id = id;
        this.orderId = orderId;
        this.purchasedItemid = purchasedItemid;
        this.purchasedItemQuantity = purchasedItemQuantity;
        this.freeIssueItemid = freeIssueItemid;
        this.freeIssueItemQuantity = freeIssueItemQuantity;
        this.createdDate = createdDate;
        this.createdBy = createdBy;

    }

}
