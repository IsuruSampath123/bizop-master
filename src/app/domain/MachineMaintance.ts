import { Machine } from './Machine';
export class MachineMaintance {
    public id: number;
    public genaratedId: string;
    public machineId: number;
    public issue: string;
    public description: string;
    public maintanceDate: Date;
    public cost: number;
    public machine: Machine;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(
        id: number,
        genaratedId: string,
        machineId: number,
        issue: string,
        description: string,
        maintanceDate: Date,
        cost: number,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.machineId = machineId;
        this.issue = issue;
        this.description = description;
        this.maintanceDate=maintanceDate;
        this.cost = cost;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }


}
