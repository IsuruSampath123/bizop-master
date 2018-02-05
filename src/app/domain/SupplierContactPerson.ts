import { Supplier } from './Supplier';
export class SupplierContactPerson {
    public id: number;
    public supplierId: number;
    public name: string;
    public designation: string;
    public telNo: string;
    public supplier: Supplier;
    public createdDate: Date;
    public createdBy: string;
    public active: string;
  

    constructor(
        id: number,
        supplierId: number,
        name: string,
        designation: string,
        telNo: string,
        createdDate: Date,
        createdBy: string,
        active: string,
     

    ) {
        this.id = id;
        this.supplierId = supplierId;
        this.name = name;
        this.designation = designation;
        this.telNo = telNo;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
