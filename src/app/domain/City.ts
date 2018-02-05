export class City {
    public id: number;
    public genaratedId: string;
    public city: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, city: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.city = city;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
