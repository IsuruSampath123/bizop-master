import { Receipt } from './Receipt';
import { ReasonCatagory } from './ReasonCatagory';
import { Reason } from './Reason';
export class ChequeReturn {
    public id: number;
    public genaratedId: string;
    public date: Date;
    public receiptId: number;
    public reasoncategoryId: number;
    public reasonId: number;
    public remarks: string;
    public receipt: Receipt;
    public reasonCategory: ReasonCatagory;
    public reason: Reason;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(
        id: number,
        genaratedId: string,
        date: Date,
        receiptId: number,
        reasoncategoryId: number,
        reasonId: number,
        remarks: string,
        createdDate: Date,
        createdBy: string,
        active: string

    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.date = date;
        this.receiptId = receiptId;
        this.reasoncategoryId = reasoncategoryId;
        this.reasonId = reasonId;
        this.remarks = remarks;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}
