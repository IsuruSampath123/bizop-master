export class Bank {
    public id: number;
    public genaratedId: string;
    public bankName: string;
    public bankCode: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, bankName: string, bankCode: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.bankName = bankName;
        this.bankCode = bankCode;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
