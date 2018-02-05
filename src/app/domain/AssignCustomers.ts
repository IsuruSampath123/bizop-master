import { Customer } from './Customer';
import { RegisterRep } from './RepRegister';

export class AssignCustomer {
    public id: number;
    public genaratedId: string;
    public active: String;

    public repId: number;
    public registerRep: RegisterRep;

    public customerId: number;
    public customer: Customer;

    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        createdDate: Date,
        createdBy: string,
        repId:number,
        customerId: number

    ) {

        this.id = id;
        this.genaratedId=genaratedId;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.repId = repId;
        this.customerId=customerId;


    }

}
