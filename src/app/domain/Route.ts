export class Route {
    public id: number;
    public genaratedId: string;
    public route: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, route: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.route = route;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}
