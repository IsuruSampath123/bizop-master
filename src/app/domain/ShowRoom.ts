import { Branch } from './Branch';
import { Company } from './Company';


export class ShowRoom {
    public id: number;
    public genaratedId: string;
    public active: String;
    public showRoomName: string;
    public contactNumber: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;

    public companyId: number;
    public company: Company;

    public branchId: number;
    public branch: Branch;

    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        showRoomName: string,
        contactNumber: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        createdDate: Date,
        createdBy: string,
        companyId:number,
        branchId:number
    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.showRoomName = showRoomName;
        this.contactNumber = contactNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.companyId=companyId;
        this.branchId=branchId;

    }

}
