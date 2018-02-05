export class OrderType {
    public id: number;
    public genaratedId: string;
    public orderType: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, orderType: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.orderType = orderType;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}

