
export class TemporyOrder {
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
    public orderTypeId: number;
    public ordertypeName: string;
    public customerId: number;
    public customername: string;
    public itemMasterId: number;
    public itemcode: string;
    public total: number;
    public specialDiscount: number;
    public specialPrice: number;
    public netPrice: number;
    public itemDiscount: number;
    public rep: number;
    public company: number;
    



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
        orderTypeId: number,
        ordertypeName: string,
        customerId: number,
        customername: string,
        itemMasterId: number,
        itemcode: string,
        total: number,
        specialDiscount: number,
        specialPrice: number,
        netPrice: number,
        itemDiscount: number,
        rep: number,
        company:number


    ) {

        this.id = id;
      
        this.genaratedId = genaratedId;
        this.orderdPersonName = orderdPersonName;
        this.orderdPersonPost = orderdPersonPost;
        this.contactNumber = contactNumber;
        this.nicNumber=nicNumber;
        this.contactPersonImage = contactPersonImage;
        this.currentDate = currentDate;
        this.requiedDate = requiedDate;
        this.poNumber=poNumber;
        this.requiredQuantity = requiredQuantity;
        this.contactPersonImage = contactPersonImage;
        this.orderTypeId = orderTypeId;
        this.ordertypeName = ordertypeName;
        this.customerId = customerId;
        this.customername = customername;
        this.itemMasterId = itemMasterId;
        this.itemcode = itemcode;
        this.total = total;
        this.specialDiscount = specialDiscount;
        this.specialPrice = specialPrice;
        this.netPrice = netPrice;
        this.itemDiscount = itemDiscount;
        this.rep = rep;
        this.company=company;
    }

}
