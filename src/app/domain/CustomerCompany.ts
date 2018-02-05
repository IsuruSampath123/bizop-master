import { Customer } from './Customer';
export class CustomerCompany {
    public id: number;
    public genaratedId: string;
    public customerId: number;
    public companyName: string;
    public companyRegNo: string;
    public mainContact: string;
    public otherContact: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public email: string;
    public fax: string;
    public ownerName: string;
    public ownerNic: string;
    public ownerContact: string;
    public ownerAddressLine1: string;
    public ownerAddressLine2: string;
    public ownerAddressLine3: string;
    public ownerAddressLine4: string;
    public vat: string;
    public nbt: string;
    public customer: Customer;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        customerId: number,
        companyName: string,
        companyRegNo: string,
        mainContact: string,
        otherContact: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        email: string,
        fax: string,
        ownerName: string,
        ownerNic: string,
        ownerContact: string,
        ownerAddressLine1: string,
        ownerAddressLine2: string,
        ownerAddressLine3: string,
        ownerAddressLine4: string,
        vat: string,
        nbt: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.customerId = customerId;
        this.companyName = companyName;
        this.companyRegNo = companyRegNo;
        this.mainContact = mainContact;
        this.otherContact = otherContact;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.email = email;
        this.fax = fax;
        this.ownerName = ownerName;
        this.ownerNic = ownerNic;
        this.ownerContact = ownerContact;
        this.ownerAddressLine1 = ownerAddressLine1;
        this.ownerAddressLine2 = ownerAddressLine2;
        this.ownerAddressLine3 = ownerAddressLine3;
        this.ownerAddressLine4 = ownerAddressLine4;
        this.vat=vat;
        this.nbt=nbt;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}
