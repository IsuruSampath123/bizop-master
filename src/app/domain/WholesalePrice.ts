export class WholesalePrice {
    public id: number;
    public genaratedId: string;
    public wholesalePriceType: string;
    public startPrice: number;
    public endPrice: number;
    public wholesalePrice: number;
    public createdDate: Date;
    public createdBy: string;
    public active: string;


    constructor(id: number, genaratedId: string, wholesalePriceType: string, startPrice: number, endPrice: number, wholesalePrice: number, createdDate: Date, createdBy: string, active: string) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.wholesalePriceType = wholesalePriceType;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.wholesalePrice = wholesalePrice;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}
