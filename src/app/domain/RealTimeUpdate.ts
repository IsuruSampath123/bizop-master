export class RealTimeUpdate {
    public id2: number;
    public id: number;
    
    public active: String;
    public updateStatus: string;

    constructor(id2: number,id: number,updateStatus: string) {
        this.id2 = id2;
        this.id = id;
        this.updateStatus=updateStatus;
    }

}