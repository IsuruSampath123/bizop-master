import { ItemMaster } from './ItemMaster';
import { WholesalePrice } from './WholesalePrice';
export class WholesaleItem {
    public id: number;
    public wholesalePriceId: number;
    public itemId: Number;
    public wholesalePrice: WholesalePrice;
    public item: ItemMaster;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        wholesalePriceId: number,
        itemId: Number,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
		this.wholesalePriceId = wholesalePriceId;
		this.itemId = itemId;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.active = active;
    }

}
