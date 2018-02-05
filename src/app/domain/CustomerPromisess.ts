import { CustomerCompany } from './CustomerCompany';
import { Customer } from './Customer';
export class CustomerPromisess {
    public id: number;
    public customerId: number;
    public companyId: Number;
    public dipositPrice: number;
    public bankPromisess: number;
    public bankPromisessNumber: string;
    public customer: Customer;
    public company: CustomerCompany;
    public createdDate: Date;
    public createdBy: string;
    public active: string;
    constructor(
        id: number,
        customerId: number,
        companyId: Number,
        dipositPrice: number,
        bankPromisess: number,
        bankPromisessNumber: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.dipositPrice = dipositPrice;
        this.bankPromisess = bankPromisess;
        this.bankPromisessNumber = bankPromisessNumber;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
