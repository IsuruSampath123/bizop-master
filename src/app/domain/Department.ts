export class Department {
    public id: number;
    public genaratedId: string;
    public department: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, department: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.department = department;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
