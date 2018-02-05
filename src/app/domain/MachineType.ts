export class MachineType {
    public id: number;
    public genaratedId: string;
    public machineType: string;
    public createdDate: Date;
    public createdBy: string;
    public active: string;



    constructor(id: number, genaratedId: string, machineType: string, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.machineType = machineType;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }



}
