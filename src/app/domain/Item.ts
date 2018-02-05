import { Catagory } from './Catagory';
import { SubCatagory } from './SubCatagory'
import { SubSubCatagory } from './SubSubCatagory'

export class Item {
    public itemCode: string;
    public secretCode: string;
    public description: string;
    public hsCode: string;
    public itemCategory: Catagory;
    public itemSubCategory: SubCatagory;
    public itemSubSubCategory: SubSubCatagory;
    public categoryId: number;
    public subCategoryId: number;
    public subSubCategoryId: string;
    public selectedSubSubCategoryId:number;
    public unit: number;
    public minsellingPrice: number;
    public maxDiscount: number;
    public maxCreditDays: number;
    public cost: number;
    public itemType: number;
    public recipeUnit: number;
    public noOfSubUnitsForMainUnit: number;
    public yield: number;
    public department: number;
    public roq: number;
    public rol: number;
    public maxLevel: number;
    public leadTime: number;
    public packSize: number;
    public miniLevel: number;
    public lastPurchQty: number;
    public storeLocation: number;
    public createdBy: number;
    public createdTime: Date;
    public active: string;
    public maxRetailPrice: number;
    public lastPurchPrice: number;
    public currentBalance: number;
    public discount: number;
    public creditPrice: number;
    public cashPrice: number;
    public wholesalePrice: number;
    public distributor: string;
    public additional: string;
    public qltyParameter: string;

    constructor(itemCode: string, secretCode: string, description: string, hsCode: string, itemSubSubCategory: SubSubCatagory, itemCategory: Catagory, itemSubCategory: SubCatagory, unit: number, 
        minsellingPrice: number, maxDiscount: number, maxCreditDays: number, cost: number, itemType: number, recipeUnit: number, noOfSubUnitsForMainUnit: number, yieldItm: number, department: number, 
        roq: number, rol: number, maxLevel: number, leadTime: number,packSize:number, miniLevel: number,currentBalance: number, lastPurchQty: number, storeLocation: number, createdBy: number, createdTime: Date, active: string,
        maxRetailPrice: number, lastPurchPrice: number, discount: number, creditPrice: number, cashPrice: number, wholesalePrice: number, distributor: string, additional: string, 
        qltyParameter: string) {
        this.itemCode = itemCode;
        this.secretCode = secretCode;
        this.description = description;
        this.hsCode = hsCode;
        this.itemSubSubCategory = itemSubSubCategory;
        this.itemCategory = itemCategory;
        this.itemSubCategory = itemSubCategory;
        this.unit = unit;
        this.minsellingPrice = minsellingPrice;
        this.maxDiscount = maxDiscount;
        this.maxCreditDays = maxCreditDays;
        this.cost = cost;
        this.itemType = itemType;
        this.recipeUnit = recipeUnit;
        this.noOfSubUnitsForMainUnit = noOfSubUnitsForMainUnit;
        this.yield = yieldItm;
        this.department = department;
        this.roq = roq;
        this.rol = rol;
        this.maxLevel = maxLevel;
        this.leadTime = leadTime;
        this.packSize=packSize;
        this.miniLevel = miniLevel;
        this.lastPurchQty = lastPurchQty;
        this.createdBy = createdBy;
        this.createdTime = createdTime;
        this.active = active;

        this.currentBalance = currentBalance;
        this.maxRetailPrice = maxRetailPrice;
        this.lastPurchPrice = lastPurchPrice;
        this.discount = discount;
        this.creditPrice = creditPrice;
        this.cashPrice = cashPrice;
        this.wholesalePrice = wholesalePrice;
        this.distributor = distributor;
        this.additional = additional;
        this.qltyParameter = qltyParameter;
    }



}