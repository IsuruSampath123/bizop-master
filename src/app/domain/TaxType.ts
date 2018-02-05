export class TaxType {
    public id: number;
    public taxType: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;
    public genaratedId: string;
    
    constructor(id: number, taxType: string, createdDate: Date, createdBy: string, active: string, genaratedId: string) {
        this.id = id;
        this.taxType = taxType;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
        this.genaratedId=genaratedId;
    }


}
