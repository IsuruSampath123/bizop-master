import { CustomerCompany } from './CustomerCompany';
import { Customer } from './Customer';
export class CustomerRequestDebit {
    public id: number;
    public customerId: number;
    public companyId: Number;
    public requestDebitLimit: number;
    public requestDebitPeriod: number;
    public aprovedDebitLimit: number;
    public aprovedDebitPeriod: number;
    public customer: Customer;
    public company: CustomerCompany;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        customerId: number,
        companyId: Number,
        requestDebitLimit: number,
        requestDebitPeriod: number,
        aprovedDebitLimit: number,
        aprovedDebitPeriod: number,
        createdDate: Date,
        createdBy: string,
        active: string) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.requestDebitLimit = requestDebitLimit;
        this.requestDebitPeriod = requestDebitPeriod;
        this.aprovedDebitLimit = aprovedDebitLimit;
        this.aprovedDebitPeriod = aprovedDebitPeriod;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
