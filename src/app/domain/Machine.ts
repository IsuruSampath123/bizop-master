import { MachineType } from "./MachineType";

export class Machine {
    public id: number;
    public genaratedId: string;
    public machineTypeId: number;
    public machineName: string;
    public machineCapacity: number;
    public capacityType: string;
    public fuelType: string;
    public electricType: string;
    public horsePower: number;
    public rpm: number;
    public machineType: MachineType;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        machineTypeId: number,
        machineName: string,
        machineCapacity: number,
        capacityType: string,
        fuelType: string,
        electricType: string,
        horsePower: number,
        rpm: number,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.machineTypeId = machineTypeId;
        this.machineName = machineName;
        this.machineCapacity = machineCapacity;
        this.capacityType = capacityType;
        this.fuelType = fuelType;
        this.electricType = electricType;
        this.horsePower = horsePower;
        this.rpm = rpm;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;

    }
}
