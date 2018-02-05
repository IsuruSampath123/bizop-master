import { Customer } from './Customer';
import { CustomerLocation } from './CustomerLocation';
export class CustomerContact {
    public id: number;
    public customerId: number;
    public locationId: Number;
    public personName: string;
    public post: string;
    public contact: string;
    public email: string;
    public fax: string;
    public customer: Customer;
    public customerLocation: CustomerLocation;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        customerId: number,
        locationId: Number,
        personName: string,
        post: string,
        contact: string,
        email: string,
        fax: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.customerId = customerId;
        this.locationId = locationId;
        this.personName = personName;
        this.post = post;
        this.contact = contact;
        this.email = email;
        this.fax = fax;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}
