import { StoreType } from './StoreType';

export class Store {
    public id: number;
    public genaratedId:string;
    public active: String;
    public storeName: string;
    public storeKeeper: string;
    public helper1: string;
    public helper2: string;    
    public helper3: string;    
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public telephoneNumber: string;
    public contactPerson: string;
    public contactPersonTelephone: string;
    public contactPersonImage: string;
    public gpsLocation: string;
    public storeTypeId:number;
    public storeType:StoreType;
    public createdDate:Date;
    public createdBy:string;

    constructor(

        id: number,
        genaratedId: string,
        storeName: string,
        storeKeeper: string,
        helper1: string,
        helper2: string,
        helper3: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,
        addressLine4: string,
        telephoneNumber: string,
        contactPerson: string,
        contactPersonTelephone: string,
        contactPersonImage: string,
        gpsLocation: string,
          createdDate :Date,
         createdBy:string,
         storeTypeId:number

        )



        {

            this.id=id;
            this.genaratedId=genaratedId;
            this.storeName=storeName;
            this.storeKeeper=storeKeeper;
            this.helper1=helper1;
            this.helper2=helper2;
            this.helper3=helper3;
            this.addressLine1=addressLine1;
            this.addressLine2=addressLine2;
            this.addressLine3=addressLine3;
            this.addressLine4=addressLine4;
            this.telephoneNumber=telephoneNumber;
            this.contactPerson=contactPerson;
            this.contactPersonTelephone=contactPersonTelephone;
            this.contactPersonImage=contactPersonImage;
            this.gpsLocation=gpsLocation;
            this.createdDate=createdDate;
            this.createdBy=createdBy;
            this.storeTypeId=storeTypeId;


    }

}
