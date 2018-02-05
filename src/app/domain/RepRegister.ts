export class RegisterRep {
    public id: number;
    public genaratedId: string;
    public active: String;
    public repName: string;
    public contactNumber: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public createdDate: Date;
    public createdBy: string;
    constructor(id: number,
        genaratedId: string,
        repName: string,
        contactNumber: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        createdDate: Date,
        createdBy: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.repName = repName;
        this.contactNumber=contactNumber;
        this.addressLine1=addressLine1;
        this.addressLine2=addressLine2;
        this.addressLine3=addressLine3;
        this.addressLine4=addressLine4;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
    }

}