import { CustomerCompany } from './CustomerCompany';
import { ItemMaster } from './ItemMaster';
import { Customer } from './Customer';
import { OrderType } from './OrderType';
import { RegisterRep } from './RepRegister';

export class Orders {
    public id: number;
    public genaratedId: string;
    public active: String;
    public orderdPersonName: string;
    public orderdPersonPost: string;
    public contactNumber: string;
    public nicNumber: string;

    public contactPersonImage: string;
    public currentDate: Date;
    public requiedDate: Date;

    public poNumber: string;


    public requiredQuantity: number;
    public pendingOrderQuantity: number;
    public pendingFreeIssueQuantity: number;
    public reduceFreeIssueQuantity: number;

    public itemStatus: string;

    public orderTypeId: number;
    public orderType: OrderType;

    public customerId: number;
    public customer: Customer;

    public itemMasterId: number;
    public itemMaster: ItemMaster;

    public repId: number;
    public registerRep: RegisterRep;

    public companyId: number;
    public customerCompany: CustomerCompany;

    public createdDate: Date;
    public createdBy: string;





    constructor(

        id: number,
        genaratedId: string,
        orderdPersonName: string,
        orderdPersonPost: string,
        contactNumber: string,
        nicNumber: string,
        contactPersonImage: string,
        currentDate: Date,
        requiedDate: Date,
        poNumber: string,
        requiredQuantity: number,
        pendingOrderQuantity: number,
        pendingFreeIssueQuantity: number,
        reduceFreeIssueQuantity:number,
        itemStatus: string,
        createdDate: Date,
        createdBy: string,
        orderTypeId: number,
        customerId: number,
        itemMasterId: number,
        repId: number,
        companyId: number


    ) {

        this.id = id;
        this.genaratedId = genaratedId;
        this.orderdPersonName = orderdPersonName;
        this.orderdPersonPost = orderdPersonPost;
        this.contactNumber = contactNumber;
        this.nicNumber = nicNumber;
        this.contactPersonImage = contactPersonImage;
        this.currentDate = currentDate;
        this.requiedDate = requiedDate;
        this.poNumber = poNumber;
        this.requiredQuantity = requiredQuantity;
        this.contactPersonImage = contactPersonImage;
        this.pendingOrderQuantity = pendingOrderQuantity;
        this.pendingFreeIssueQuantity = pendingFreeIssueQuantity;
        this.reduceFreeIssueQuantity=reduceFreeIssueQuantity;
        this.itemStatus = itemStatus;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.orderTypeId = orderTypeId;
        this.customerId = customerId;
        this.itemMasterId = itemMasterId;
        this.repId = repId;
        this.companyId = companyId;

    }

}
