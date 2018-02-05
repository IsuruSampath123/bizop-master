import { CustomerCompany } from './CustomerCompany';
import { Customer } from './Customer';
export class CustomerDirectors {
    public id: number;
    public customerId: number;
    public companyId: Number;
    public directorName: String;
    public directorNic: string;
    public customer: Customer;
    public company: CustomerCompany;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        customerId: number,
        companyId: Number,
        directorName: String,
        directorNic: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.customerId = customerId;
        this.companyId = companyId;
        this.directorName = directorName;
        this.directorNic = directorNic;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;

    }


}
