import { ItemType } from './itemtype';

export class MainCatagory {
    public id: number;
    public genaratedId: string;
    public active: String;
    public mainCatagoryName: string;
    public mainCatgoryImage: string;
    public itemTypeId: number;
    public itemType: ItemType;
    public createdDate: Date;
    public createdBy: string;

    constructor(id: number, genaratedId: string, mainCatagoryName: string, mainCatgoryImage: string, createdDate: Date, createdBy: string, itemTypeId: number) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.mainCatagoryName = mainCatagoryName;
        this.mainCatgoryImage = mainCatgoryImage;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.itemTypeId = itemTypeId;

    }

}
