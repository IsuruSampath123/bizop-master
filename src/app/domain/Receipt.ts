import { Customer } from "./Customer";
import { Bank } from "./Bank";
import { CustomerAccounts } from "./CustomerAccounts";

export class Receipt {
    public id: number;
    public genaratedId: string;
    public customeId: number;
    public bankId: number;
    public branch: string;
    public customerAccountId: number;
    public chequeNo: string;
    public date: Date;
    public datedDate: Date;
    public depositeDate: Date;
    public paymentTerm: string;
    public ammount: number;
    public manualReceiptNo: string;
    public total: number;
    public overPayment: number;
    public paymentStatus: string;
    public customer: Customer;
    public bank: Bank;
    public customerAccount: CustomerAccounts;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        customeId: number,
        bankId: number,
        branch: string,
        customerAccountId: number,
        chequeNo: string,
        date: Date,
        datedDate: Date,
        depositeDate: Date,
        paymentTerm: string,
        ammount: number,
        manualReceiptNo: string,
        total: number,
        overPayment: number,
        paymentStatus: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.customeId = customeId;
        this.bankId = bankId;
        this.branch = branch;
        this.customerAccountId = customerAccountId;
        this.chequeNo = chequeNo;
        this.date = date;
        this.datedDate = datedDate;
        this.depositeDate = depositeDate;
        this.paymentTerm = paymentTerm;
        this.ammount = ammount;
        this.manualReceiptNo = manualReceiptNo;
        this.total = total;
        this.overPayment = overPayment;
        this.paymentStatus = paymentStatus;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
