import { ItemMaster } from './ItemMaster';

export class ItemWiseFreeIssue {

    public id: number;
    public genaratedId: string;
    public active: String;
    public itemQuantity: number;
    public freeIssueQuantity: number;
    public selectedItemId: number;
    public freeIssueItemId: number;
    public itemMaster: ItemMaster;
    public itemMaster2: ItemMaster;
    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        itemQuantity: number,
        freeIssueQuantity: number,
        createdDate: Date,
        createdBy: string,
        selectedItemId: number,
        freeIssueItemId: number,

    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.itemQuantity = itemQuantity;
        this.freeIssueQuantity = freeIssueQuantity;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.selectedItemId = selectedItemId;
        this.freeIssueItemId=freeIssueItemId;


    }

}
