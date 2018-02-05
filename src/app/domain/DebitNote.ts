import { Reason } from './Reason';
import { ReasonCatagory } from './ReasonCatagory';
export class DebitNote {
    public id: number;
    public genaratedId: string;
    public date: Date;
    public invoiceNo: string;
    public ammount: number;
    public reasonCategoryId: number;
    public reasonId: number;
    public remark: string;
    public reasoncatagory: ReasonCatagory;
    public reason: Reason;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(
        id: number, genaratedId: string,
        date: Date,
        invoiceNo: string,
        ammount: number,
        reasonCategoryId: number,
        reasonId: number,
        remark: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.date = date;
        this.invoiceNo = invoiceNo;
        this.ammount = ammount;
        this.reasonCategoryId = reasonCategoryId;
        this.reasonId = reasonId;
        this.remark = remark;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
