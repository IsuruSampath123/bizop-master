
export class InvoiceFreeIssueItems {
    public id: number;
    public invoiceId: string;
    public purchasedItemid: number;
    public purchasedItemQuantity: number;
    public FreeIssueItemid: number;
    public FreeIssueItemQuantity: number;


    constructor(
        id: number,
        invoiceId: string,
        purchasedItemid: number,
        purchasedItemQuantity: number,
        FreeIssueItemid: number,
        FreeIssueItemQuantity: number

    ) {
        this.id = id;
        this.invoiceId = invoiceId;
        this.purchasedItemid = purchasedItemid;
        this.purchasedItemQuantity = purchasedItemQuantity;
        this.FreeIssueItemid = FreeIssueItemid;
        this.FreeIssueItemQuantity = FreeIssueItemQuantity;

    }

}
