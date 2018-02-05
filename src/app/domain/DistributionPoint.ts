import { RegisterRep } from './RepRegister';

export class DistributionPoint {
    public id: number;
    public genaratedId:string;
    public active: String;
    public distributionPointName: string;
    public contactNumber:string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public registerRep:RegisterRep;
    public repId :number;
    public createdDate:Date;
    public createdBy:string;

    constructor(

        id: number,
        genaratedId: string,
        distributionPointName: string,
        contactNumber:string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        createdDate :Date,
        createdBy:string,
        repId:number

        )


        {

            this.id=id;
            this.genaratedId=genaratedId;
            this.distributionPointName=distributionPointName;
            this.contactNumber=contactNumber;
            this.addressLine1=addressLine1;
            this.addressLine2=addressLine2;
            this.addressLine3=addressLine3;
            this.addressLine4=addressLine4;
            this.createdDate=createdDate;
            this.createdBy=createdBy;
            this.repId=repId;


    }

}
