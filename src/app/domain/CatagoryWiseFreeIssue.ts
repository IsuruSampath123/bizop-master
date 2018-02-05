import { ItemMaster } from './ItemMaster';
import { MainCatagory } from './MainCatagory';


export class CatagoryWiseFreeIssue {

    public id: number;
    public genaratedId: string;
    public active: String;
    public itemQuantity: number;
    public freeIssueQuantity: number;
    public packSize: string;

    public selectedCatagoryId: number;
    public itemMaster2: ItemMaster;

    public freeIssueItemId: number;
    public mainCatagory: MainCatagory;

    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        itemQuantity: number,
        freeIssueQuantity: number,
        packSize: string,
        createdDate: Date,
        createdBy: string,
        selectedCatagoryId: number,
        freeIssueItemId: number,

    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.itemQuantity = itemQuantity;
        this.freeIssueQuantity = freeIssueQuantity;
        this.packSize=packSize;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.selectedCatagoryId = selectedCatagoryId;
        this.freeIssueItemId=freeIssueItemId;


    }

}
