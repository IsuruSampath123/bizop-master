export class Area {
    public id: number;
    public genaratedId: string;
    public area: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, area: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.area = area;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
