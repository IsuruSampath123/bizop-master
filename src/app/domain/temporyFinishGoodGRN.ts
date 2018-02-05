export class TemporyFinshGoodGRN {
    public id: number;
    public itemcode: String;
    public itemId: number;

    public batchNumber: string;
    public Discription: string;

    public price: number;
    public Quantity: number;
    public discount: number;
   

    constructor(id: number,
         itemcode: string,
         itemId: number, 
         batchNumber: string,
          Discription: string,
           price: number,
           Quantity:number,
           discount:number)
           
           {
        this.id = id;
        this.itemcode = itemcode;
        this.itemId;
        this.batchNumber = batchNumber;
        this.Discription = Discription;
        this.price = price;
        this.Quantity=Quantity;
        this.discount=discount;
       
    }

}