import { CustomerCompany } from './CustomerCompany';
import { Customer } from './Customer';
export class CustomerTransaction {
    public id: number;
    public customerId: number;
    public companyId: Number;
    public personName: string;
    public contact: string;
    public post: string;
    public customer: Customer;
    public company: CustomerCompany;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        customerId: number,
        companyId: Number,
        personName: string,
        contact: string,
        post: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
    this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.personName = personName;
        this.contact = contact;
        this.post = post;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}

