import { SubSubCatagory } from './SubSubCatagory';
import { SubCatagory } from './SubCatagory';
import { MainCatagory } from './mainCatagory';


export class ItemMaster {
    public id: number;
    public genaratedId: string;
    public active: string;
    public itemCode: string;
    public secreteCode: string;
    public discription: string;
    public hsCode: string;
    public unit: number;
    public maxLevel: number;
    public minLevel: number;
    public lastPerchQuantity: number;
    public currentBalance: number;
    public maxRetail: number;
    public averageCost: number;
    public lastPerchPrice: number;
    public cashPrice: number;
    public creditPrice: number;
    public maxCreditDays: number;
    public wholeSalePrice: number;
    public discount: number;
    public reOrderLevel: number;
    public reOrderQuantity: number;
    public leadTime: number;
    public packSize: number;
    
    public distributor: string;
    public additionalInfo: string;
    public volumeType: string;
    public volume: number;
    
    public mainCatagoryId: number;
    public mainCatagory: MainCatagory;

    public subCatagoryId: number;
    public subCatagory: SubCatagory;

    public subSubCatagoryId: number;
    public subSubCatagory: SubSubCatagory;

    public createdDate: Date;
    public createdBy: string;

    constructor(

        id: number,
        genaratedId: string,
        itemCode: string,
        secreteCode: string,
        discription: string,
        hsCode: string,
        unit: number,
        maxLevel: number,
        minLevel: number,
        lastPerchQuantity: number,
        currentBalance: number,
        maxRetail: number,
        averageCost: number,
        lastPerchPrice: number,
        cashPrice: number,
        creditPrice: number,
        maxCreditDays: number,
        wholeSalePrice: number,
        discount: number,
        reOrderLevel: number,
        reOrderQuantity: number,
        leadTime: number,
        packSize:number,
        distributor: string,
        additionalInfo: string,
        volumeType:string,
        volume:number,
        createdDate: Date,
        createdBy: string,
        mainCatagoryId: number,
        subCatagoryId: number,
        subSubCatagoryId: number

    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.itemCode = itemCode;
        this.secreteCode = secreteCode;
        this.discription = discription;
        this.hsCode = hsCode;
        this.unit = unit;
        this.maxLevel = maxLevel;
        this.minLevel = minLevel;
        this.lastPerchQuantity = lastPerchQuantity;
        this.currentBalance = currentBalance;
        this.maxRetail = maxRetail;
        this.averageCost = averageCost;
        this.lastPerchPrice = lastPerchPrice;
        this.cashPrice = cashPrice;
        this.creditPrice = creditPrice;
        this.maxCreditDays = maxCreditDays;
        this.wholeSalePrice = wholeSalePrice;
        this.discount = discount;
        this.reOrderLevel = reOrderLevel;
        this.reOrderQuantity = reOrderQuantity;
        this.leadTime = leadTime;
        this.packSize=packSize;
        this.distributor = distributor;
        this.additionalInfo = additionalInfo;
        this.volumeType=volumeType;
        this.volume=volume;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.mainCatagoryId = mainCatagoryId;
        this.subCatagoryId = subCatagoryId;
        this.subSubCatagoryId = subSubCatagoryId;


    }

}
