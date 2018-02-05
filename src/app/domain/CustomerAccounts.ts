import { Bank } from './Bank';
import { CustomerCompany } from './CustomerCompany';
import { Customer } from './Customer';
export class CustomerAccounts {
    public id: number;
    public customerId: number;
    public companyId: Number;
    public bankId: number;
    public bankAccount: String;
    public accountNumber: string;
    public branch: string;
    public customer: Customer;
    public company: CustomerCompany;
    public bank: Bank;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        customerId: number,
        companyId: Number,
        bankId: number,
        bankAccount: String,
        accountNumber: string,
        branch: string,
        createdDate: Date,
        createdBy: string,
        active: string,
    ) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.bankId = bankId;
        this.bankAccount = bankAccount;
        this.accountNumber = accountNumber;
        this.branch = branch;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
