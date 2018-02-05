
export class TemporySalesRepData {
    public id: number;
    public item: string;
    public itemid:number;
    public quantity:number;
    public price:number;
    public customerId:number;
    public customerName:string;

    constructor(
        id: number,
        item: string,
        itemid:number,
        quantity:number,
        price:number,
        customerId:number,
        customerName:string,
        )

        {
            this.id=id;
            this.item=item;
            this.itemid=itemid;
            this.quantity=quantity;
            this.price=price;
            this.customerId=customerId;
            this.customerName=customerName;
    }

}
