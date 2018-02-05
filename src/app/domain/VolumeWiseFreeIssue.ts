import { ItemMaster } from './ItemMaster';
import { MainCatagory } from './MainCatagory';


export class VolumeWiseFreeIssue {

    public id: number;
    public genaratedId: string;
    public active: String;
    public volume: number;
    
    public volumeType: string;
    public freeIssueQuantity: number;

    public selectedCatagoryId: number;
    public itemMaster2: ItemMaster;

    public freeIssueItemId: number;
    public mainCatagory: MainCatagory;

    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        volume: number,
        freeIssueQuantity: number,
        volumeType: string,
        createdDate: Date,
        createdBy: string,
        selectedCatagoryId: number,
        freeIssueItemId: number,

    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.volume=volume;
        this.freeIssueQuantity = freeIssueQuantity;
        this.volumeType=volumeType;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.selectedCatagoryId = selectedCatagoryId;
        this.freeIssueItemId=freeIssueItemId;


    }

}
