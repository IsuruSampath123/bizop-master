import { Supplier } from './Supplier';
import { Bank } from './Bank';
export class SupplierAccount {
    public id: number;
    public supplierId: number;
    public bankId: number;
    public branch: string;
    public accountNo: string;
    public supplier: Supplier;
    public bank: Bank;
    public createdDate: Date;
    public createdBy: string;
    public active: string;
   

    constructor(
        id: number,
        supplierId: number,
        bankId: number,
        branch: string,
        accountNo: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.supplierId = supplierId;
        this.bankId = bankId;
        this.branch = branch;
        this.accountNo = accountNo;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
