export class AccountType {
    public id: number;
    public genaratedId: string;
    public accountType: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, accountType: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.accountType = accountType;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
