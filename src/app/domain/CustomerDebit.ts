import { Customer } from "./Customer";
import { CustomerCompany } from "./CustomerCompany";

export class CustomerDebit {
    public id: number;
    public customerId: number;
    public companyId: Number;
    public debitLimit: number;
    public debitPeriod: number;
    public customer: Customer;
    public company: CustomerCompany;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        customerId: number,
        companyId: Number,
        debitLimit: number,
        debitPeriod: number,
        createdDate: Date,
        createdBy: string,
        active: string,
    ) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.debitLimit = debitLimit;
        this.debitPeriod = debitPeriod;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
