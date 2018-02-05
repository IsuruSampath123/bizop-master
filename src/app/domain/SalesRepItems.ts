import { Customer } from './Customer';
import { ItemMaster } from './ItemMaster';

export class SalesRepItem {
    public id: number;
    public salesRepCode: string;
    public itemQuantity: number;
    public price: number;

    public customerId: number;
    public customerName:string;

    public itemMasterId: number;
    public itemMaster: ItemMaster;


    constructor(
        id: number,
        salesRepCode: string,
        itemQuantity: number,
        price: number,
        itemMasterId: number,
        customerId: number,
        customerName:string
    ) {
        this.id = id;
        this.salesRepCode = salesRepCode;
        this.itemQuantity = itemQuantity;
        this.price = price;
        this.itemMasterId = itemMasterId;
        this.customerId = customerId;
        this.customerName=customerName;
    }

}
