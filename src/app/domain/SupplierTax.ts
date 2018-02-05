import { TaxType } from './TaxType';
import { Supplier } from './Supplier';

export class SupplierTax {
    public id: number;
    public supplierId: number;
    public taxTypeId: number;
    public taxNo: string;
    public supplier: Supplier;
    public taxType: TaxType;
    public createdDate: Date;
    public createdBy: string;
    public active: string;
 
    constructor(
        id: number,
        supplierId: number,
        taxTypeId: number,
        taxNo: string,
        createdDate: Date,
        createdBy: string,
        active: string,
     

    ) {
        this.id = id;
        this.supplierId = supplierId;
        this.taxTypeId = taxTypeId;
        this.taxNo = taxNo;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
