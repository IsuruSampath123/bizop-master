import { Bank } from './Bank';
import { SupplierGroup } from './SupplierGroup';
export class Supplier {
    public id: number;
    public genaratedId: string;
    public supplierGroupId: number;
    public supplierName: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public contact1: string;
    public contact2: string;
    public email: string;
    public fax: string;
    public supplierGroup: SupplierGroup;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        supplierGroupId: number,
        supplierName: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        contact1: string,
        contact2: string,
        email: string,
        fax: string,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.supplierGroupId = supplierGroupId;
        this.supplierName = supplierName;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.contact1 = contact1;
        this.contact2 = contact2;
        this.email = email;
        this.fax = fax;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
