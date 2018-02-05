
export class OrderFreeIssueItem {

        public id: number;
        public orderId: string;
        public purchasedItemcode: string;
        public freeIssueItemcode: string;        
        public purchasedItemid: number;
        public purchasedItemQuantity: number;
        public freeIssueItemid: number;
        public freeIssueItemQuantity: number;
        public createdDate: Date;
        public createdBy: string;

        constructor(
            id: number,
            orderId: string,
            purchasedItemcode: string,
            freeIssueItemcode: string,
            purchasedItemQuantity: number,
            freeIssueItemQuantity: number,
            purchasedItemid: number,
            freeIssueItemid: number,
            createdDate:Date,
            createdBy:string
        ) {
            this.id = id;
            this.orderId = orderId;
            this.purchasedItemcode = purchasedItemcode;
            this.freeIssueItemcode = freeIssueItemcode;
            this.purchasedItemQuantity = purchasedItemQuantity;
            this.freeIssueItemQuantity = freeIssueItemQuantity;
            this.purchasedItemid = purchasedItemid;
            this.freeIssueItemid = freeIssueItemid;
            this.createdDate=createdDate;
            this.createdBy=createdBy;
        }
    
    }
    