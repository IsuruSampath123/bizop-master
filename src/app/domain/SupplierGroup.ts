export class SupplierGroup {
    public id: number;
    public genaratedId: string;
    public supplierGroup: string;
    public createdDate: Date;
    public createdBy: string;
    public active: String;

    constructor(id: number, genaratedId: string, supplierGroup: string, createdDate: Date, createdBy: string, active: String) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.supplierGroup = supplierGroup;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}
