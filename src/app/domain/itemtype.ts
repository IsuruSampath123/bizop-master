export class ItemType {
    public id: number;
    public genaratedId:string;
    public active: String;
    public itemType: string;
    public createdDate:Date;
    public createdBy:string;
    constructor(id: number,genaratedId: string, itemType: string,createdDate :Date,createdBy:string) {
        this.id = id;
        this.genaratedId=genaratedId;
        this.itemType = itemType;
        this.createdDate=createdDate;
        this.createdBy=createdBy;
    }

}