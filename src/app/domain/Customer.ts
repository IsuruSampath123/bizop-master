
export class Customer {
    public id: number;
    public genaratedId: string;
    public customerName: string;
    public nic: String;
    public addressLine1: String;
    public addressLine2: String;
    public addressLine3: String;
    public addressLine4: String;
    public mainContact: string;
    public otherContact: string;
    public email: string;
    public fax: string;
    public language: string;
    public salesOfficer: string;
    public salesOfficerContact: string;
    public productionManager: string;
    public productionManagerContact: string;
    public ownerImage: string;
    public productionManagerImage: string;
    public shopImage1: string;
    public shopImage2: string;
    public shopImage3: string;
    public gpslocation: string;
    public blackListed: string;
    public blackListedReason: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        customerName: string,
        nic: String,
        addressLine1: String,
        addressLine2: String,
        addressLine3: String,
        addressLine4: String,
        mainContact: string,
        otherContact: string,
        email: string,
        fax: string,
        language: string,
        salesOfficer: string,
        salesOfficerContact: string,
        productionManager: string,
        productionManagerContact: string,
        ownerImage: string,
        productionManagerImage: string,
        shopImage1: string,
        shopImage2: string,
        shopImage3: string,
        gpslocation: string,
        blackListed: string,
        blackListedReason: string,
        createdDate: Date,
        createdBy: string,
        active: string,

    ) {


        this.id = id;
        this.genaratedId = genaratedId;
        this.customerName = customerName;
        this.nic = nic;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.mainContact = mainContact;
        this.otherContact = otherContact;
        this.email = email;
        this.fax = fax;
        this.language = language;
        this.salesOfficer = salesOfficer;
        this.salesOfficerContact = salesOfficerContact;
        this.productionManager = productionManager;
        this.productionManagerContact = productionManagerContact;
        this.ownerImage = ownerImage;
        this.productionManagerImage = productionManagerImage;
        this.shopImage1 = shopImage1;
        this.shopImage2 = shopImage2;
        this.shopImage3 = shopImage3;
        this.gpslocation = gpslocation;
        this.blackListed = blackListed;
        this.blackListedReason = blackListedReason;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}







