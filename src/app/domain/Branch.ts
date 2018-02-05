import { Company } from './Company';
import { AsistanceSalesManager } from './AsistanceSalesManager';
import { SalesManager } from './SalesManager';

export class Branch {
    public id: number;
    public genaratedId: string;
    public active: String;
    public branchName: string;
    public contactNumber: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;

    public salesManagerId: number;
    public salesManager: SalesManager;

    public asistanceSalesManagerId: number;
    public asistanceSalesManager: AsistanceSalesManager;

    public companyId: number;
    public company: Company;

    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        branchName: string,
        contactNumber: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        createdDate: Date,
        createdBy: string,
        salesManagerId: number,
        asistanceSalesManagerId: number,
        companyId:number
    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.branchName = branchName;
        this.contactNumber = contactNumber;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.salesManagerId = salesManagerId;
        this.asistanceSalesManagerId = asistanceSalesManagerId;
        this.companyId=companyId;

    }

}
