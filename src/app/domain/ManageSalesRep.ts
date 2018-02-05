import { ItemMaster } from './ItemMaster';
import { RegisterRep } from './RepRegister';

export class ManageSaleRep {
    public id: number;
    public genaratedId: string;
    public active: String;
    public month: string;
    public budget: number;
    public repId: number;
    public registerRep: RegisterRep;
    public createdDate: Date;
    public createdBy: string;
    constructor(

        id: number,
        genaratedId: string,
        month: string,
        budget: number,
        createdDate: Date,
        createdBy: string,
        repId: number,
       
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.month = month;
        this.budget = budget;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.repId = repId;

    }

}
