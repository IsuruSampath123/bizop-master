
export class InvoiceFreeIssue {
  public id: number;
    public orderId: string;
    public purchasedItemid: number;
    public purchasedItemcode: string;
    public purchasedItemQuantity: number;
    public FreeIssueItemid: number;
    public FreeIssueItemcode: string;
    public FreeIssueItemQuantity: number;


    constructor(
        id: number,
        orderId: string,
        purchasedItemcode: string,
        FreeIssueItemcode: string,
        purchasedItemQuantity: number,
        FreeIssueItemQuantity: number,
        purchasedItemid: number,
        FreeIssueItemid: number,

    ) {
        this.id = id;
        this.orderId = orderId;
        this.purchasedItemcode = purchasedItemcode;
        this.FreeIssueItemcode = FreeIssueItemcode;
        this.purchasedItemQuantity = purchasedItemQuantity;
        this.FreeIssueItemQuantity = FreeIssueItemQuantity;
        this.purchasedItemid = purchasedItemid;
        this.FreeIssueItemid = FreeIssueItemid;

    }

}
