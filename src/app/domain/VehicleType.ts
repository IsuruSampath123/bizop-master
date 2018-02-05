export class VehicleType {
    public id: number;
    public genaratedId: string;
    public vehicleType: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, vehicleType: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.vehicleType = vehicleType;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }

}
