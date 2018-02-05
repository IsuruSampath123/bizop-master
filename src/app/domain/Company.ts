export class Company {
    public id: number;
    public genaratedId:string;
    public active: String;
    public companyName: string;
    public companyRegisterName: string;
    public addressLine1: string;
    public addressLine2: string;
    public addressLine3: string;
    public addressLine4: string;
    public telephoneNumber: string;
    public faxNumber: string;
    public emailAddress: string;
    public vatNumber: string;
    public svatNumber: string;
    public nbtNumber: string;
    public createdDate:Date;
    public createdBy:string;

    constructor(


        id: number,
        genaratedId: string,
        companyName: string,
        companyRegisterName: string,
        addressLine1: string,
        addressLine2: string,
        addressLine3: string,        
        addressLine4: string,   
        telephoneNumber: string,
        faxNumber: string, 
        emailAddress:string,
        vatNumber: string,
        svatNumber: string,
        nbtNumber: string,
         createdDate :Date,
         createdBy:string
    ) {
       
        this.id=id;
		this.genaratedId=genaratedId;
		this.companyName=companyName;
		this.companyRegisterName=companyRegisterName;
		this.addressLine1=addressLine1;
		this.addressLine2=addressLine2;
		this.addressLine3=addressLine3;
		this.addressLine4=addressLine4;
        this.telephoneNumber=telephoneNumber;
        this.faxNumber=faxNumber;
        this.emailAddress=emailAddress;
        this.vatNumber=vatNumber;
        this.svatNumber=svatNumber;
        this.nbtNumber=nbtNumber;
		this.createdDate=createdDate;
		this.createdBy=createdBy;





    }
 } 