export class ReasonCatagory {
    public id: number;
    public genaratedId: string;
    public reasonCatagory: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(id: number, genaratedId: string, reasonCatagory: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.reasonCatagory = reasonCatagory;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
