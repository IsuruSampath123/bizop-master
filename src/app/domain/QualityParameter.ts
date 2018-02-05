export class QualityParameter {
    public id: number;
    public genaratedId:string;
    public active: String;
    public qualityParameter: string;
    public createdDate:Date;
    public createdBy:string;
    constructor(id: number,genaratedId: string, qualityParameter: string,createdDate :Date,createdBy:string) {
        this.id = id;
        this.genaratedId=genaratedId;
        this.qualityParameter = qualityParameter;
        this.createdDate=createdDate;
        this.createdBy=createdBy;
    }

}