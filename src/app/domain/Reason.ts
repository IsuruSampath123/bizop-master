import { ReasonCatagory } from './ReasonCatagory';
export class Reason {
    public id: number;
    public genaratedId: string;
    public reasonCatagoryId: number;
    public reason: string;
    public reasonCatagory: ReasonCatagory;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(id: number, genaratedId: string, reasonCatagoryId: number, reason: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.reasonCatagoryId = reasonCatagoryId;
        this.reason = reason;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }


}

