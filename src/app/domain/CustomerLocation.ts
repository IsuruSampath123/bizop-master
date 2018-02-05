import { Customer } from './Customer';
export class CustomerLocation {
    public id: number;
    public genaratedId: string;
    public customerId: number;
    public location: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public customer: Customer;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        customerId: number,
        location: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.customerId = customerId;
        this.location = location;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;

    }
}
