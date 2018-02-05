import { CustomerSpecificPrice } from './../../../../domain/CustomerSpecificPrice';
import { ItemMaster } from './../../../../domain/ItemMaster';
import { CustomerCompany } from './../../../../domain/CustomerCompany';
import { Component, OnInit } from '@angular/core';
import { Jwholesale } from "../../../../domain/jwhooleSale";
import { TemporyOrder } from "../../../../domain/TemporyOrder";
import { WholesaleItem } from "../../../../domain/WholesaleItem";
import { WebServResponce } from "../../../../domain/WebServResponce";
import { Orders } from "../../../../domain/orders";
import { OrderVolumeWise } from "../../../../domain/OrderVolumeWise";
import { OrderFreeIssue } from "../../../../domain/OrderFreeIssues";
import { TemporyVolume } from "../../../../domain/TemporyVolume";
import { OrdersPrices } from "../../../../domain/OrdersPrices";
import { OrderFreeIssueItem } from "../../../../domain/OrderFreeIssueItems";
import { FinishGoodGRN } from "../../../../domain/FinshGoodGRN";
import { CatagoryWiseFreeIssue } from "../../../../domain/CatagoryWiseFreeIssue";
import { ItemWiseFreeIssue } from "../../../../domain/ItemWiseFreeIssue";
import { Customer } from "../../../../domain/Customer";
import { OrderType } from "../../../../domain/OrderType";
import { WholesalePrice } from "../../../../domain/WholesalePrice";
import { RegisterRep } from "../../../../domain/RepRegister";
import { VolumeWiseFreeIssue } from "../../../../domain/VolumeWiseFreeIssue";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from "primeng/primeng";
import { OrderTypeService } from "../../../../service/orderType.service";
import { Ordersservice } from "../../../../service/orders.service";
import { CustomerService } from "../../../../service/customer.service";
import { ItemMasterservice } from "../../../../service/ItemMaster.service";
import { FinishGoodGRNservice } from "../../../../service/FinishGoodGRN.service";
import { CustomerSpecificPriceService } from "../../../../service/customerSpecificPrice.service";
import { ItemWiseFreeIssueservice } from "../../../../service/ItemWiseFreeIssue.service";
import { CatagoryWiseFreeIssueservice } from "../../../../service/CatagoryWiseFreeIssue.service";
import { VolumeWiseFreeIssueservice } from "../../../../service/VolumeWiseFreeIssue.service";
import { WholesalePriceService } from "../../../../service/wholesalePrice.service";
import { WholesaleItemService } from "../../../../service/wholesaleItem.service";
import { RegisterRepservice } from "../../../../service/RepRegister.service";
import { OrderFreeIssueItemservice } from "../../../../service/OrderFreeIssueItems.service";
import { CustomerCompanyService } from "../../../../service/customerCompany.service";
import { OrdersPricesService } from "../../../../service/OrdersPrices.service";
import { OrderVolumeWiseservice } from "../../../../service/OrderVOlumeWise.service";
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Companyservice } from "../../../../service/Company.service";
import { Company } from "../../../../domain/Company";


@Component({
  selector: 'app-Order',
  templateUrl: './Order.component.html',
  styleUrls: ['./Order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns = ['itemcode', 'requiredQuantity', 'customername'
    , 'netPrice'
  ];
  displayedColumns2 = ['purchasedItemcode', 'purchasedItemQuantity', 'FreeIssueItemcode'
    , 'FreeIssueItemQuantity'
  ];

  myForm: FormGroup;
  allItemTypes: SelectItem[];
  showmenu1: boolean = true;
  showmenu2: boolean = false;

  specialDiscount = null;
  specialPrice = null;
  netTotal;
  totalPrice;
  itemDiscount;
  allcustomers: Customer[];
  alloredrtypes: OrderType[];
  allitems: ItemMaster[];
  allfgrn: FinishGoodGRN[];
  allrep: RegisterRep[];
  allCustomerSpecific: CustomerSpecificPrice[];
  allitemWiseFreeissue: ItemWiseFreeIssue[];
  allcatagorywisefreeisuue: CatagoryWiseFreeIssue[];
  allVolumeWiseFreeIssue: VolumeWiseFreeIssue[];
  allWhoilesalePrices: WholesalePrice[];
  allWholeSaleItems: WholesaleItem[];
  orderConfirm = true;
  saveConfirm = true;
  tot1 = 0;
  tot2 = 0;
  tot3 = 0;
  tot4 = 0;
  customerAvailable = false;
  itemcode1;
  discription1;
  nextid;

  netTotal2 = 0;
  mrp = 0;
  itemDiscounts = 0;
  wholesalePrice = 0;

  autoIncrement = 0;
  autoIncrement1 = 0;
  autoIncrement2 = 0;
  autoIncrement3 = 0;

  reacost = 0;
  spPrice = 0;
  spDis = 0;
  total: number = 0;
  discountprice = 0;
  netprice = 0;
  total2 = 0;
  total3 = 0;
  saveDisable = true;
  allreadyExit = false;
  deletefList = true;
  errorMessage: string;
  successMessage: string;

  saveEdit: Orders;
  saveEdit2: OrderFreeIssueItem;
  saveEdit3: OrdersPrices;
  saveEdit4: OrderVolumeWise;
  alldata: Orders[];
  alldata2: Orders[];

  allcustomercompany: CustomerCompany[];
  alltemporyorder: TemporyOrder[];
  maxData: Orders[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: Orders = new Orders(0, '', '', '', '', '', '', null, null, '', null, null, null, null, '', null, '', null, null, null, null, null);
  addData: TemporyOrder = new TemporyOrder(0, '', '', '', '', '', '', null, null, '', null, null, '', null, '', null, '', null, null, null, null, null, null, null);
  selected2: TemporyOrder = new TemporyOrder(0, '', '', '', '', '', '', null, null, '', null, null, '', null, '', null, '', null, null, null, null, null, null, null);
  addData2: OrderFreeIssue = new OrderFreeIssue(0, '', '', '', null, null, null, null);
  addData3: TemporyVolume = new TemporyVolume(0, '', null, null);

  addData4: Jwholesale = new Jwholesale(0, null, null);

  addData5: OrdersPrices = new OrdersPrices(0, '', null, null, null, null, null, '');


  allordertypeOption: SelectItem[] = [];
  allcustomerOptions: SelectItem[] = [];
  allitemMasterOptions: SelectItem[] = [];
  temporyOrder: TemporyOrder[] = [];
  orderFreeIssue: OrderFreeIssue[] = [];
  dataSource = new MatTableDataSource<TemporyOrder>(this.temporyOrder);
  dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);

  temporyVolume: TemporyVolume[] = [];
  jwholesale: Jwholesale[] = [];

  registerRepoption: SelectItem[] = [];
  companiesOptions: SelectItem[] = [];
  jOrders: Orders[] = [];


  constructor(private formBuilder: FormBuilder,
    private orderTypeService: OrderTypeService,
    private ordersservice: Ordersservice,
    private customerService: CustomerService,
    private itemMasterservice: ItemMasterservice,
    private finishGoodGRNservice: FinishGoodGRNservice,
    private customerSpecificPriceService: CustomerSpecificPriceService,
    private itemWiseFreeIssueservice: ItemWiseFreeIssueservice,
    private catagoryWiseFreeIssueservice: CatagoryWiseFreeIssueservice,
    private volumeWiseFreeIssueservice: VolumeWiseFreeIssueservice
    , private wholesalePriceService: WholesalePriceService,
    private wholesaleItemService: WholesaleItemService,
    private registerRepservice: RegisterRepservice,
    private orderFreeIssueItemservice: OrderFreeIssueItemservice,
    private customerCompanyService: CustomerCompanyService,
    private ordersPricesService: OrdersPricesService,
    private orderVolumeWiseservice: OrderVolumeWiseservice
    , public snackBar: MatSnackBar, private companyservice: Companyservice

  ) { }


  itemTypeChange(itemTypeId) {

    console.log('helloww' + itemTypeId);

    if (itemTypeId == 0) {
      this.showmenu1 = true;
      this.showmenu2 = false;

    } else if (itemTypeId == 1) {
      this.showmenu1 = false;
      this.showmenu2 = true;
    }
  }

  ngOnInit() {
    this.getAll();
    this.getMax();

    this.myForm = this.formBuilder.group({

      orderid: new FormControl(''),

      id: new FormControl(''),
      genaratedId: new FormControl(''),
      orderdPersonName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      orderdPersonPost: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      contactNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      nicNumber: new FormControl('', Validators.required),
      contactPersonImage: new FormControl('', Validators.required),
      currentDate: new FormControl('', Validators.required),
      requiedDate: new FormControl('', Validators.required),
      ponumber: new FormControl('', Validators.required),
      requiredQuantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$')])),
      pendingOrderQuantity: new FormControl(''),
      orderTypeId: new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required),
      itemMasterId: new FormControl('', Validators.required),
      wholesaleDiscount: new FormControl(''),
      totalPrice: new FormControl(''),
      discountPrice: new FormControl(''),
      repId: new FormControl('', Validators.required),
      netTotal: new FormControl(''),
      availableQuantity: new FormControl(''),
      company: new FormControl('', Validators.required),


    });
  }

  addNew2() {

    this.selected2 = new TemporyOrder(0, '', '', '', '', '', '', null, null, '', null, null, '', null, '', null, '', null, null, null, null, null, null, null);

  }


  addNew() {
    this.temporyOrder = [];
    this.orderFreeIssue = [];

    this.dataSource = new MatTableDataSource<TemporyOrder>(this.temporyOrder);
    this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
    this.selected = new Orders(0, '', '', '', '', '', '', null, null, '', null, null, null, null, '', null, '', null, null, null, null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  CompanyData() {

    let webServResponce1: WebServResponce;
    this.companyservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce1 = resObj;
        if (webServResponce1.statusId == 200) {
          this.allcompany = <Company[]>webServResponce1.result;
        } else {
          this.errorMessage = webServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


  }

  repdata() {

    let webServResponce: WebServResponce;
    this.registerRepservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allrep = <RegisterRep[]>webServResponce.result;
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }



  getAll() {
    this.CompanyData();
    this.repdata();
    this.temporyOrder = [];
    this.orderFreeIssue = [];

    this.dataSource = new MatTableDataSource<TemporyOrder>(this.temporyOrder);
    this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);


    let webServResponce: WebServResponce;
    this.ordersservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <Orders[]>webServResponce.result;

          let filterorder: Orders[] = this.alldata
            .filter(Orders => Orders.pendingOrderQuantity != 0)
          if (filterorder === undefined) {
            console.log('undifined');
          } else { }

          this.alldata = filterorder;



          for (let var1 of this.alldata) {

            if (var1.orderType != null) {
              var1.orderTypeId = var1.orderType.id;
            } else {
              var1.orderTypeId = 0;
            }
            if (var1.customer != null) {

              var1.customerId = var1.customer.id;

            } else {
              var1.customerId = 0;
            }
            if (var1.itemMaster != null) {

              var1.itemMasterId = var1.itemMaster.id;

            } else {
              var1.itemMasterId = 0;
            }
            if (var1.registerRep != null) {

              var1.repId = var1.registerRep.id;

            } else {
              var1.repId = 0;
            }
            if (var1.customerCompany != null) {

              var1.companyId = var1.customerCompany.id;

            } else {
              var1.companyId = 0;
            }



          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce: WebServResponce;
    this.orderTypeService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.alloredrtypes = <OrderType[]>catWebServResponce.result;
          this.allordertypeOption = [];
          this.allordertypeOption.push({ label: 'Please Select', value: null });
          for (let var1 of this.alloredrtypes) {
            this.allordertypeOption.push({ label: var1.orderType, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce1: WebServResponce;
    this.ordersservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce1 = resObj;
        if (catWebServResponce1.statusId == 200) {
          this.alldata2 = <Orders[]>catWebServResponce1.result;

        } else {
          this.errorMessage = catWebServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );









    let catWebServResponce2: WebServResponce;
    this.customerService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allcustomers = <Customer[]>catWebServResponce2.result;

          let obj: Customer[] = this.allcustomers
            .filter(Customer => ((Customer.blackListed.toLowerCase() === 'no')));


          if (obj != undefined) {
            this.allcustomers = obj;
          }

          this.allcustomerOptions = [];
          this.allcustomerOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allcustomers) {
            this.allcustomerOptions.push({ label: var1.customerName, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );







    let catWebServResponce3: WebServResponce;
    this.itemMasterservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce3 = resObj;
        if (catWebServResponce3.statusId == 200) {
          this.allitems = <ItemMaster[]>catWebServResponce3.result;
          this.allitemMasterOptions = [];
          this.allitemMasterOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allitems) {
            this.allitemMasterOptions.push({ label: var1.itemCode, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce4: WebServResponce;
    this.finishGoodGRNservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce4 = resObj;
        if (catWebServResponce4.statusId == 200) {
          this.allfgrn = <FinishGoodGRN[]>catWebServResponce4.result;
        } else {
          this.errorMessage = catWebServResponce4.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce5: WebServResponce;
    this.customerSpecificPriceService.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce5 = resObj;
        if (catWebServResponce5.statusId == 200) {
          this.allCustomerSpecific = <CustomerSpecificPrice[]>catWebServResponce5.result;
        } else {
          this.errorMessage = catWebServResponce5.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce6: WebServResponce;
    this.itemMasterservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce6 = resObj;
        if (catWebServResponce6.statusId == 200) {
          this.allitems = <ItemMaster[]>catWebServResponce6.result;
        } else {
          this.errorMessage = catWebServResponce6.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce7: WebServResponce;
    this.itemWiseFreeIssueservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce7 = resObj;
        if (catWebServResponce7.statusId == 200) {
          this.allitemWiseFreeissue = <ItemWiseFreeIssue[]>catWebServResponce7.result;
        } else {
          this.errorMessage = catWebServResponce7.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce18: WebServResponce;
    this.catagoryWiseFreeIssueservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce18 = resObj;
        if (catWebServResponce18.statusId == 200) {
          this.allcatagorywisefreeisuue = <CatagoryWiseFreeIssue[]>catWebServResponce18.result;
        } else {
          this.errorMessage = catWebServResponce18.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce9: WebServResponce;
    this.volumeWiseFreeIssueservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce9 = resObj;
        if (catWebServResponce9.statusId == 200) {
          this.allVolumeWiseFreeIssue = <VolumeWiseFreeIssue[]>catWebServResponce9.result;
        } else {
          this.errorMessage = catWebServResponce9.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );



    let catWebServResponce10: WebServResponce;
    this.registerRepservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce10 = resObj;
        if (catWebServResponce10.statusId == 200) {
          this.allrep = <RegisterRep[]>catWebServResponce10.result;

          this.registerRepoption = [];
          this.registerRepoption.push({ label: 'Please Select', value: null });
          for (let var1 of this.allrep) {
            this.registerRepoption.push({ label: var1.repName, value: var1.id });
          }


        } else {
          this.errorMessage = catWebServResponce10.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce11: WebServResponce;
    this.customerCompanyService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce11 = resObj;
        if (catWebServResponce11.statusId == 200) {
          this.allcustomercompany = <CustomerCompany[]>catWebServResponce11.result;

          this.companiesOptions = [];
          this.companiesOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allcustomercompany) {
            this.companiesOptions.push({ label: var1.companyName, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce11.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce12: WebServResponce;
    this.wholesalePriceService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce12 = resObj;
        if (catWebServResponce12.statusId == 200) {
          this.allWhoilesalePrices = <WholesalePrice[]>catWebServResponce12.result;
        } else {
          this.errorMessage = catWebServResponce12.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce13: WebServResponce;
    this.wholesaleItemService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce13 = resObj;
        if (catWebServResponce13.statusId == 200) {
          this.allWholeSaleItems = <WholesaleItem[]>catWebServResponce13.result;
        } else {
          this.errorMessage = catWebServResponce13.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }









  PushToArray(genaratedId, orderdPersonName, orderdPersonPost, contactNumber, nicNumber, contactPersonImage, currentDate, requiedDate, ponumber, requiredQuantity, orderId, customId, itemId, repId, company) {


    let norderId = parseInt(orderId);
    let ncustomId = parseInt(customId);
    let nitemId = parseInt(itemId);
    let nrepId = parseInt(repId);
    let ncompany = parseInt(company);




    let jckCheck: TemporyOrder[] = this.temporyOrder
      .filter(TemporyOrder => TemporyOrder.itemMasterId === nitemId)
    if (jckCheck === undefined) {
    } else {
      if (jckCheck.length == 0) {

        //console.log('nic here'  + ponumber + currentDate + contactNumber);
        let itemcode;
        let customer;
        let ordertype;
        let maincatid;
        let oripacks;
        let volume;

        let obj: ItemMaster[] = this.allitems
          .filter(ItemMaster => ItemMaster.id === nitemId)
        if (obj === undefined) {
        } else {

          itemcode = obj[0].itemCode;
          maincatid = obj[0].mainCatagory.id;
          oripacks = obj[0].packSize;
          volume = obj[0].volume;
        }
        let obj2: OrderType[] = this.alloredrtypes
          .filter(OrderType => OrderType.id === norderId)

        if (obj2 === undefined) {
        } else {
          // console.log(supi, si, i);
          ordertype = obj2[0].orderType;
        }
        let obj3: Customer[] = this.allcustomers
          .filter(Customer => Customer.id === ncustomId)

        if (obj3 === undefined) {
        } else {
          // console.log(supi, si, i);
          customer = obj3[0].customerName;
        }

        //////////////////////////here is for item

        let discount;
        let mxreprice;
        let netprice;
        let newprice;
        let itemprice: ItemMaster[] = this.allitems
          .filter(ItemMaster => ItemMaster.id === nitemId)
        if (itemprice === undefined) {
          console.log('undifined');
        } else {
          if (itemprice.length == 0) { }
          else {
            discount = itemprice[0].discount;
            mxreprice = itemprice[0].maxRetail;
            if (itemprice[0].discount == null) {
              netprice = mxreprice;
              this.itemDiscount = 0;

            }
            else {
              netprice = mxreprice - ((mxreprice * discount) / 100);
              this.itemDiscount = discount;
            }
            console.log('max retail ' + mxreprice);
            console.log('item master dis ' + discount);
            console.log('net Price ' + netprice);
          }
        }

        ///////////
        let cusSpecialPrice: CustomerSpecificPrice[] = this.allCustomerSpecific

          .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === ncustomId)
        if (cusSpecialPrice === undefined) {

          console.log('undifined');

        } else {

          if (cusSpecialPrice.length == 0) {
            console.log('no customer');
            this.customerAvailable = false;
            this.specialDiscount = 0;
            this.specialPrice = 0;
            this.totalPrice = netprice * requiredQuantity;
            this.netTotal = this.totalPrice;
            //this.openSnackBar('warn', 'Success', 'no customer');
            //here go to free issue//////////////////////////////////////////////


            let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
              .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === nitemId)
            if (itemWiseFreeIsuue === undefined) {
              console.log('undifined');
            } else {
              if (itemWiseFreeIsuue.length == 0) {
                // this.openSnackBar('warn', 'Success', ' no free issue item');
                console.log('no free issue item');


                //start catagory wise

                let catwise: CatagoryWiseFreeIssue[] = this.allcatagorywisefreeisuue
                  .filter(CatagoryWiseFreeIssue => CatagoryWiseFreeIssue.mainCatagory.id === maincatid)
                if (catwise === undefined) {
                  console.log('undifined');
                } else {

                  if (catwise.length == 0) {
                    console.log('no dataaaa');

                    this.autoIncrement2 = this.autoIncrement2 + 1;
                    this.addData3 = new TemporyVolume(
                      this.autoIncrement2,
                      genaratedId,
                      maincatid,
                      volume * requiredQuantity
                    );
                    this.temporyVolume.push(this.addData3);


                  }
                  else {

                    let packs = catwise[0].packSize;
                    let qty = catwise[0].itemQuantity;
                    let frecat = catwise[0].mainCatagory;
                    let freeissuit = catwise[0].itemMaster2.itemCode;
                    let freisqty1 = catwise[0].freeIssueQuantity;
                    let fisuitemid = catwise[0].itemMaster2.id;
                    let freisqty;
                    console.log('pack size ori' + oripacks);
                    console.log('pack size ma' + packs);

                    if ((oripacks == packs) && (qty <= requiredQuantity)) {
                      console.log('pack size and qty eqel');

                      let x = requiredQuantity / qty;
                      let y = requiredQuantity % qty
                      let z = (requiredQuantity - y) / qty;


                      if (x == 1) {
                        freisqty = freisqty1;

                      }
                      else {

                        freisqty = freisqty1 * z;

                      }
                      this.autoIncrement1 = this.autoIncrement1 + 1;
                      this.addData2 = new OrderFreeIssue(
                        this.autoIncrement1,
                        genaratedId,
                        itemcode,
                        freeissuit,
                        requiredQuantity,
                        freisqty,
                        nitemId,
                        fisuitemid
                      );
                      this.orderFreeIssue.push(this.addData2);
                      this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
                    }
                    else {
                      console.log('pack size pack size and qty not eqr');
                      this.autoIncrement2 = this.autoIncrement2 + 1;
                      this.addData3 = new TemporyVolume(
                        this.autoIncrement2,
                        genaratedId,
                        maincatid,
                        volume * requiredQuantity
                      );
                      this.temporyVolume.push(this.addData3);
                    }
                  }
                }

                //end catagorywise 

              }
              else {

                this.openSnackBar('Success', '  free issue item available');
                console.log('free issue item');

                let qty = itemWiseFreeIsuue[0].itemQuantity;

                let fqty = requiredQuantity;
                let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                let freeIssueQty;

                if (fqty >= qty) {
                  this.openSnackBar('Success', '  free issue item qty available');
                  console.log('free issue item qty available');

                  let x = fqty / qty;
                  let y = fqty % qty
                  let z = (fqty - y) / qty;

                  if (x == 1) {
                    freeIssueQty = freeIssueQty1;

                  }
                  else {

                    freeIssueQty = freeIssueQty1 * z;

                  }

                  this.autoIncrement1 = this.autoIncrement1 + 1;
                  this.addData2 = new OrderFreeIssue(
                    this.autoIncrement1,
                    genaratedId,
                    itemcode,
                    freeIssueItem,
                    requiredQuantity,
                    freeIssueQty,
                    nitemId,
                    freeIssueItemId
                  );
                  this.orderFreeIssue.push(this.addData2);

                  this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
                }
                else {
                  console.log('fucking else');

                  console.log('qty enterd is in else ' + fqty + '' + qty);


                  //////////////////////////catagory wise here//////////////////////////////////ok its done

                  let catwise: CatagoryWiseFreeIssue[] = this.allcatagorywisefreeisuue
                    .filter(CatagoryWiseFreeIssue => CatagoryWiseFreeIssue.mainCatagory.id === maincatid)
                  if (catwise === undefined) {
                    console.log('undifined');
                  } else {

                    if (catwise.length == 0) {
                      console.log('no dataaaa');

                      this.autoIncrement2 = this.autoIncrement2 + 1;
                      this.addData3 = new TemporyVolume(
                        this.autoIncrement2,
                        genaratedId,
                        maincatid,
                        volume * requiredQuantity
                      );
                      this.temporyVolume.push(this.addData3);


                    }
                    else {

                      let packs = catwise[0].packSize;
                      let qty = catwise[0].itemQuantity;
                      let frecat = catwise[0].mainCatagory;
                      let freeissuit = catwise[0].itemMaster2.itemCode;
                      let freisqty1 = catwise[0].freeIssueQuantity;
                      let fisuitemid = catwise[0].itemMaster2.id;
                      let freisqty;
                      console.log('pack size ori' + oripacks);
                      console.log('pack size ma' + packs);

                      if ((oripacks == packs) && (qty <= requiredQuantity)) {
                        console.log('pack size and qty eqel');

                        let x = requiredQuantity / qty;
                        let y = requiredQuantity % qty
                        let z = (requiredQuantity - y) / qty;


                        if (x == 1) {
                          freisqty = freisqty1;

                        }
                        else {

                          freisqty = freisqty1 * z;

                        }
                        this.autoIncrement1 = this.autoIncrement1 + 1;
                        this.addData2 = new OrderFreeIssue(
                          this.autoIncrement1,
                          genaratedId,
                          itemcode,
                          freeissuit,
                          requiredQuantity,
                          freisqty,
                          nitemId,
                          fisuitemid
                        );
                        this.orderFreeIssue.push(this.addData2);
                        this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
                      }
                      else {
                        console.log('pack size pack size and qty not eqr');
                        this.autoIncrement2 = this.autoIncrement2 + 1;
                        this.addData3 = new TemporyVolume(
                          this.autoIncrement2,
                          genaratedId,
                          maincatid,
                          volume * requiredQuantity
                        );
                        this.temporyVolume.push(this.addData3);
                      }
                    }
                  }

                }


              }

              //end of the whole free issues

            }




          }
          else {

            // this.openSnackBar('info', 'Success', ' customer available');
            console.log('customer available');
            this.customerAvailable = true;

            let cusitem;
            let cusSprice;//sp price for one itme
            let customerSpeDis;
            let realItemCost;//real item cost 
            let discountedPrice;//dicounted price

            cusitem = cusSpecialPrice[0].itemMaster.id;
            cusSprice = cusSpecialPrice[0].specialPrice;
            customerSpeDis = cusSpecialPrice[0].specialDiscount;
            this.spPrice = cusSpecialPrice[0].specialPrice;

            //////////////////////////////////////////////////////////must chek bravo8001
            let grncost: FinishGoodGRN[] = this.allfgrn
              .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === nitemId)
            if (grncost === undefined) {
              console.log('undifined');
            } else {
              if (grncost.length != 0) {
                console.log('data available');

                let buyingp = grncost[0].price;
                let byqty = grncost[0].quantity;
                let dis = grncost[0].discount;
                let realpricefor1 = buyingp / byqty;//one item cost
                let disprice = (realpricefor1 * dis) / 100;
                let finalitemcost = realpricefor1 - disprice;//final cost for one item
                this.reacost = finalitemcost;



              }
              else {
                console.log('no data available');
              }

            }
            if (cusitem === nitemId) {
              //this.openSnackBar('info', 'Success', ' item available');

              console.log('item available');
              this.customerAvailable = true;

              if (cusSprice == 0) {




                newprice = (netprice - ((netprice * customerSpeDis) / 100)) * requiredQuantity;
                this.spDis = netprice - ((netprice * customerSpeDis) / 100);


                console.log('special discount ' + customerSpeDis);
                console.log('special discount price ' + ((netprice * customerSpeDis) / 100));
                console.log('net price after special discount ' + newprice);
                this.specialDiscount = customerSpeDis;
                this.specialPrice = 0;
                this.netTotal = newprice;
                this.totalPrice = netprice * requiredQuantity;

              }
              else {

                let newpricep = netprice - cusSprice;

                console.log('special price ' + cusSprice);
                console.log('net  price after special price ' + cusSprice);
                this.specialDiscount = 0;
                this.specialPrice = cusSprice;
                this.netTotal = cusSprice * requiredQuantity;
                this.totalPrice = netprice * requiredQuantity;
              }


            }
            else {

              console.log('item not available');
              this.customerAvailable = false;

              this.specialDiscount = 0;
              this.specialPrice = 0;
              this.totalPrice = netprice * requiredQuantity;
              this.netTotal = this.totalPrice;

              //here go to free issue///////////////////////////////////////////


              let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === nitemId)
              if (itemWiseFreeIsuue === undefined) {
                console.log('undifined');
              } else {
                if (itemWiseFreeIsuue.length == 0) {
                  // this.openSnackBar('warn', 'Success', ' no free issue item');
                  console.log('no free issue item');


                  //start catagory wise

                  let catwise: CatagoryWiseFreeIssue[] = this.allcatagorywisefreeisuue
                    .filter(CatagoryWiseFreeIssue => CatagoryWiseFreeIssue.mainCatagory.id === maincatid)
                  if (catwise === undefined) {
                    console.log('undifined');
                  } else {

                    if (catwise.length == 0) {
                      console.log('no dataaaa');

                      this.autoIncrement2 = this.autoIncrement2 + 1;
                      this.addData3 = new TemporyVolume(
                        this.autoIncrement2,
                        genaratedId,
                        maincatid,
                        volume * requiredQuantity
                      );
                      this.temporyVolume.push(this.addData3);


                    }
                    else {

                      let packs = catwise[0].packSize;
                      let qty = catwise[0].itemQuantity;
                      let frecat = catwise[0].mainCatagory;
                      let freeissuit = catwise[0].itemMaster2.itemCode;
                      let freisqty1 = catwise[0].freeIssueQuantity;
                      let fisuitemid = catwise[0].itemMaster2.id;
                      let freisqty;
                      console.log('pack size ori' + oripacks);
                      console.log('pack size ma' + packs);

                      if ((oripacks == packs) && (qty <= requiredQuantity)) {
                        console.log('pack size and qty eqel');

                        let x = requiredQuantity / qty;
                        let y = requiredQuantity % qty
                        let z = (requiredQuantity - y) / qty;


                        if (x == 1) {
                          freisqty = freisqty1;

                        }
                        else {

                          freisqty = freisqty1 * z;

                        }
                        this.autoIncrement1 = this.autoIncrement1 + 1;
                        this.addData2 = new OrderFreeIssue(
                          this.autoIncrement1,
                          genaratedId,
                          itemcode,
                          freeissuit,
                          requiredQuantity,
                          freisqty,
                          nitemId,
                          fisuitemid
                        );
                        this.orderFreeIssue.push(this.addData2);
                        this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
                      }
                      else {
                        console.log('pack size pack size and qty not eqr');
                        this.autoIncrement2 = this.autoIncrement2 + 1;
                        this.addData3 = new TemporyVolume(
                          this.autoIncrement2,
                          genaratedId,
                          maincatid,
                          volume * requiredQuantity
                        );
                        this.temporyVolume.push(this.addData3);
                      }
                    }
                  }

                  //end catagorywise 

                }
                else {

                  this.openSnackBar('Success', '  free issue item available');
                  console.log('free issue item');

                  let qty = itemWiseFreeIsuue[0].itemQuantity;

                  let fqty = requiredQuantity;
                  let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                  let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                  let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                  let freeIssueQty;

                  if (fqty >= qty) {
                    this.openSnackBar('Success', '  free issue item qty available');
                    console.log('free issue item qty available');

                    let x = fqty / qty;
                    let y = fqty % qty
                    let z = (fqty - y) / qty;

                    if (x == 1) {
                      freeIssueQty = freeIssueQty1;

                    }
                    else {

                      freeIssueQty = freeIssueQty1 * z;

                    }

                    this.autoIncrement1 = this.autoIncrement1 + 1;
                    this.addData2 = new OrderFreeIssue(
                      this.autoIncrement1,
                      genaratedId,
                      itemcode,
                      freeIssueItem,
                      requiredQuantity,
                      freeIssueQty,
                      nitemId,
                      freeIssueItemId
                    );
                    this.orderFreeIssue.push(this.addData2);
                    this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
                  }
                  else {
                    console.log('fucking else');

                    console.log('qty enterd is in else ' + fqty + '' + qty);


                    //////////////////////////catagory wise here//////////////////////////////////ok its done

                    let catwise: CatagoryWiseFreeIssue[] = this.allcatagorywisefreeisuue
                      .filter(CatagoryWiseFreeIssue => CatagoryWiseFreeIssue.mainCatagory.id === maincatid)
                    if (catwise === undefined) {
                      console.log('undifined');
                    } else {

                      if (catwise.length == 0) {
                        console.log('no dataaaa');

                        this.autoIncrement2 = this.autoIncrement2 + 1;
                        this.addData3 = new TemporyVolume(
                          this.autoIncrement2,
                          genaratedId,
                          maincatid,
                          volume * requiredQuantity
                        );
                        this.temporyVolume.push(this.addData3);


                      }
                      else {

                        let packs = catwise[0].packSize;
                        let qty = catwise[0].itemQuantity;
                        let frecat = catwise[0].mainCatagory;
                        let freeissuit = catwise[0].itemMaster2.itemCode;
                        let freisqty1 = catwise[0].freeIssueQuantity;
                        let fisuitemid = catwise[0].itemMaster2.id;
                        let freisqty;
                        console.log('pack size ori' + oripacks);
                        console.log('pack size ma' + packs);

                        if ((oripacks == packs) && (qty <= requiredQuantity)) {
                          console.log('pack size and qty eqel');

                          let x = requiredQuantity / qty;
                          let y = requiredQuantity % qty
                          let z = (requiredQuantity - y) / qty;


                          if (x == 1) {
                            freisqty = freisqty1;

                          }
                          else {

                            freisqty = freisqty1 * z;

                          }
                          this.autoIncrement1 = this.autoIncrement1 + 1;
                          this.addData2 = new OrderFreeIssue(
                            this.autoIncrement1,
                            genaratedId,
                            itemcode,
                            freeissuit,
                            requiredQuantity,
                            freisqty,
                            nitemId,
                            fisuitemid
                          );
                          this.orderFreeIssue.push(this.addData2);
                          this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);
                        }
                        else {
                          console.log('pack size pack size and qty not eqr');
                          this.autoIncrement2 = this.autoIncrement2 + 1;
                          this.addData3 = new TemporyVolume(
                            this.autoIncrement2,
                            genaratedId,
                            maincatid,
                            volume * requiredQuantity
                          );
                          this.temporyVolume.push(this.addData3);
                        }
                      }
                    }

                  }
                }

              }
              //end of the whole free issues

            }
          }
        }



        let sp;
        let sdi;
        let cusSpecialPrice2: CustomerSpecificPrice[] = this.allCustomerSpecific
          .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === ncustomId)
        if (cusSpecialPrice2 === undefined) {

          console.log('undifined');

        } else {
          if (cusSpecialPrice2.length == 0) {

          }
          else {
            sp = cusSpecialPrice2[0].specialPrice;
            sdi = cusSpecialPrice2[0].specialDiscount;

          }


        }

        if (this.customerAvailable) {

          if (sp == 0) {

            if (this.spDis > this.reacost) {
              console.log('goes on first');
              this.autoIncrement = this.autoIncrement + 1;
              this.addData = new TemporyOrder(this.autoIncrement, genaratedId, orderdPersonName, orderdPersonPost, contactNumber, nicNumber, contactPersonImage, currentDate, requiedDate, ponumber, requiredQuantity, norderId, ordertype, ncustomId, customer, nitemId, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, nrepId, ncompany);
              this.temporyOrder.push(this.addData);
              this.myForm.patchValue({ itemMasterId: null });
              this.myForm.patchValue({ requiredQuantity: 0 });

            }
            else {
              this.openSnackBar('Warn!', ' Sorry Low Profit Item , please Change Special Discount');
            }


          }
          else {

            if (this.spPrice > this.reacost) {
              console.log('goes on secound');

              this.autoIncrement = this.autoIncrement + 1;
              this.addData = new TemporyOrder(this.autoIncrement, genaratedId, orderdPersonName, orderdPersonPost, contactNumber, nicNumber, contactPersonImage, currentDate, requiedDate, ponumber, requiredQuantity, norderId, ordertype, ncustomId, customer, nitemId, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, nrepId, ncompany);
              this.temporyOrder.push(this.addData);
              this.myForm.patchValue({ itemMasterId: null });
              this.myForm.patchValue({ requiredQuantity: 0 });

            }
            else {
              this.openSnackBar('Warn!', ' Sorry Low Profit Item , please Change Special Price');


            }

          }

        }
        else {
          console.log('goes on third');

          this.autoIncrement = this.autoIncrement + 1;
          this.addData = new TemporyOrder(this.autoIncrement, genaratedId, orderdPersonName, orderdPersonPost, contactNumber, nicNumber, contactPersonImage, currentDate, requiedDate, ponumber, requiredQuantity, norderId, ordertype, ncustomId, customer, nitemId, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, nrepId, ncompany);
          this.temporyOrder.push(this.addData);
          this.myForm.patchValue({ itemMasterId: null });
          this.myForm.patchValue({ requiredQuantity: 0 });


        }
        let jtotal = 0;
        let jnet = 0;
        let discounts = 0;
        for (let i = 0; i < this.temporyOrder.length; i++) {



          jtotal = jtotal + this.temporyOrder[i].total;
          jnet = jnet + this.temporyOrder[i].netPrice;
          discounts = jtotal + this.temporyOrder[i].specialDiscount;
          this.netTotal2 = jnet;


        }

        discounts = jtotal - jnet;
        this.itemDiscounts = discounts;
        this.mrp = jtotal;




        this.myForm.patchValue({ totalPrice: jtotal });
        this.myForm.patchValue({ discountPrice: discounts });
        this.myForm.patchValue({ netTotal: jnet });
        jtotal = 0;
        console.log('jack total' + jtotal);

        if (this.temporyOrder.length != 0) {
          this.orderConfirm = false;

        }
        else {

          this.orderConfirm = true;

        }


      }
      else {
        this.openSnackBar('Warning', 'Sorry You Cannot Have Add Same Item Twice');
      }
    }



    this.dataSource = new MatTableDataSource<TemporyOrder>(this.temporyOrder);

  }



  getMax() {
    let webServResponce: WebServResponce;
    this.ordersservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Orders[]>webServResponce.result;
          //console.log(this.RaxData[0].genaratedId);

          if (this.maxData[0] == undefined) {

            this.genaratedId = null;

          } else {
            this.genaratedId = this.maxData[0].genaratedId;
          }
          console.log(this.genaratedId);
          this.genarateIdNormal(this.genaratedId);
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }

      ,
      error => this.errorMessage = <any>error
      );


  }

  genarateIdNormal(oldId: string) {
    //let year = (new Date()).getFullYear();
    let type = 'ODR'
    let id;
    let newId;
    // let genaratedId;

    if (oldId == null) {
      id = '000001';
      this.genaratedId = type + '-' + id;

    } else {
      let fullid = oldId.split('-');
      id = parseInt(fullid[1]);
      id++;

      if (id > 9999) {
        newId = "0" + id;
      } else if (id > 999) {
        newId = "00" + id;
      } else if (id > 99) {
        newId = "000" + id;
      } else if (id > 9) {
        newId = "0000" + id;
      } else if (id > 0) {
        newId = "00000" + id;
      }
      this.genaratedId = type + '-' + newId;
    }


    // this.newGenaratedId = genaratedId;
    console.log('next Id =' + this.genaratedId);
    this.myForm.patchValue({ genaratedId: this.genaratedId });
    this.nextid = this.genaratedId;
    this.myForm.patchValue({ qualityparameterdiscription: '' });
    this.myForm.patchValue({ id: ' ' });
    this.myForm.patchValue({ pendingOrderQuantity: 0 });
    this.myForm.patchValue({ availableQuantity: 0 });
    this.myForm.patchValue({ wholesaleDiscount: 0 });
    this.myForm.patchValue({ discountPrice: 0 });
    this.myForm.patchValue({ totalPrice: 0 });
    this.myForm.patchValue({ netTotal: 0 });
    this.myForm.patchValue({ currentDate: this.createdDate });



    this.orderConfirm = true;
    this.saveConfirm = true;
  }
  itemChange(x) {


    if (x === undefined || x == null) {
      console.log('inside if');
      this.myForm.patchValue({ availableQuantity: 0 });
      this.myForm.patchValue({ pendingOrderQuantity: 0 });

    }
    else {
      console.log('else');
      let reqty;
      let aqty;

      let obj: Orders[] = this.alldata
        .filter(Orders => Orders.itemMaster.id === x)

      if (obj === undefined) {
        console.log('undifine');
      } else {
        console.log('ele else1');
        if (obj != null) {
          // console.log('object not  null');
          if (obj.length == 0) {

            console.log('no data found1');
            this.myForm.patchValue({ pendingOrderQuantity: 0 });

          }
          else {
            console.log('data foun1' + obj[0].pendingOrderQuantity);
            let pq = obj[0].pendingOrderQuantity;

            let tot = 0;
            for (let j = 0; j < obj.length; j++) {

              tot = tot + obj[j].pendingOrderQuantity;

            }
            this.myForm.patchValue({ pendingOrderQuantity: tot });
            tot = 0;



            //this.myForm.patchValue({ availableQuantity:obj[0].pendingOrderQuantity });
          }


        }
        else {
          console.log('object null');
        }
      }

      let obj2: FinishGoodGRN[] = this.allfgrn
        .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === x)

      if (obj2 === undefined) {
        console.log('undifine');
      } else {
        console.log('ele else2');
        if (obj2 != null) {
          // console.log('object not  null');
          if (obj2.length == 0) {

            console.log('no data found2');
            this.myForm.patchValue({ availableQuantity: 0 });

          }
          else {
            console.log('data foun2');

            // this.myForm.patchValue({ availableQuantity: obj2[0].remainingQuantity });

            let tot2 = 0;
            for (let j = 0; j < obj2.length; j++) {

              tot2 = tot2 + obj2[j].remainingQuantity;

            }
            this.myForm.patchValue({ availableQuantity: tot2 });


          }
        }
        else {
          console.log('object null');
        }
      }
    }


  }

  deleteDataFromList(data: TemporyOrder) {

    this.temporyOrder = [];
    this.orderFreeIssue = [];
    this.addNew2();
    this.myForm.patchValue({ wholesaleDiscount: 0 });
    this.myForm.patchValue({ discountPrice: 0 });
    this.myForm.patchValue({ totalPrice: 0 });
    this.myForm.patchValue({ netTotal: 0 });
    this.orderConfirm = true;
  }


  saveorEdit() {


    for (let i = 0; i < this.temporyOrder.length; i++) {


      let webServResponce: WebServResponce;
      this.saveEdit = new Orders(
        0,
        this.temporyOrder[i].genaratedId,
        this.temporyOrder[i].orderdPersonName,
        this.temporyOrder[i].orderdPersonPost,
        this.temporyOrder[i].contactNumber,
        this.temporyOrder[i].nicNumber,
        this.temporyOrder[i].contactPersonImage,
        this.temporyOrder[i].currentDate,
        this.temporyOrder[i].requiedDate,
        this.temporyOrder[i].poNumber,
        this.temporyOrder[i].requiredQuantity,
        this.temporyOrder[i].requiredQuantity,
        0,
        0,
        "Item",
        this.createdDate,
        this.createdby,
        this.temporyOrder[i].orderTypeId,
        this.temporyOrder[i].customerId,
        this.temporyOrder[i].itemMasterId,
        this.temporyOrder[i].rep,
        this.temporyOrder[i].company

      );

      console.log('save ');
      // this.selectedItemsQualityParameter = data;
      this.ordersservice.savedata(this.saveEdit)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {

            console.log('checkthis' + webServResponce.errDetail);
            this.getAll();
            this.getMax();
            this.addNew();
            console.log('saved');
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error

        );
      this.total2 = this.total2 + 1;
    }

    window.location.hash = String(this.total2);

    let combinemessage = this.total2 + ' Order Saved Saved !!';

    this.openSnackBar('Success', combinemessage);
    console.log('total is ' + combinemessage);
    this.temporyOrder = [];
    this.jwholesale = [];
    this.autoIncrement = 0;
    this.autoIncrement1 = 0;
    this.autoIncrement2 = 0;
    this.autoIncrement3 = 0;

    this.saveorEdit2();
    this.saveConfirm = true;
    this.orderConfirm = true;
    this.saveorEdit3();
    this.netTotal2 = 0;
    this.mrp = 0;
    this.itemDiscounts = 0;
    this.wholesalePrice = 0;

  }



  saveorEdit2() {


    for (let i = 0; i < this.orderFreeIssue.length; i++) {


      let webServResponce: WebServResponce;
      this.saveEdit2 = new OrderFreeIssueItem(
        0,
        this.orderFreeIssue[i].orderId,
        this.orderFreeIssue[i].purchasedItemcode,
        this.orderFreeIssue[i].FreeIssueItemcode,
        this.orderFreeIssue[i].purchasedItemQuantity,
        this.orderFreeIssue[i].FreeIssueItemQuantity,
        this.orderFreeIssue[i].purchasedItemid,
        this.orderFreeIssue[i].FreeIssueItemid,
        this.createdDate,
        this.createdby
      );

      console.log('save ');
      //this.orderFreeIssue = data;
      this.orderFreeIssueItemservice.savedata(this.saveEdit2)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {

            console.log('checkthis' + webServResponce.errDetail);
            console.log('saved');
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error

        );
      this.total3 = this.total3 + 1;
    }

    window.location.hash = String(this.total3);
    //
    let combinemessage = this.total3 + ' Free Issue Items Saved Saved !!';

    this.openSnackBar('Success', combinemessage);
    console.log('total is ' + combinemessage);
    this.orderFreeIssue = [];
    this.autoIncrement = 0;
    this.autoIncrement1 = 0;
    this.autoIncrement2 = 0; 8


  }

  saveorEdit3() {


    let webServResponce: WebServResponce;
    this.saveEdit3 = new OrdersPrices(
      0,
      this.genaratedId,
      this.mrp,
      this.itemDiscounts,
      this.wholesalePrice,
      this.netTotal2,
      this.createdDate,
      this.createdby
    );

    console.log('save ');

    this.ordersPricesService.saveData(this.saveEdit3)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {

          console.log('checkthis' + webServResponce.errDetail);
          console.log('saved');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error

      );

  }





  jack() {

    let vissuecat;
    let reqvolume;
    let issueItem;//free isuue it id
    let issueitemcode;//free isuue itemcode
    let issueqty;
    let vissuecatname;
    let itemcat;
    let itemvolume;



    for (let i = 0; i < this.allVolumeWiseFreeIssue.length; i++) {
      //console.log('volume wise issues' + this.allVolumeWiseFreeIssue[i].mainCatagory.id);

      vissuecat = this.allVolumeWiseFreeIssue[i].mainCatagory.id;
      vissuecatname = this.allVolumeWiseFreeIssue[i].mainCatagory.mainCatagoryName;
      reqvolume = this.allVolumeWiseFreeIssue[i].volume;
      issueItem = this.allVolumeWiseFreeIssue[i].itemMaster2.id;
      issueitemcode = this.allVolumeWiseFreeIssue[i].itemMaster2.itemCode;
      issueqty = this.allVolumeWiseFreeIssue[i].freeIssueQuantity;

      let totalVolume = 0;
      let filterdMyCartProduct: TemporyVolume[] = this.temporyVolume
        .filter(TemporyVolume => TemporyVolume.catagory === vissuecat)

      if (filterdMyCartProduct === undefined) {
        console.log('undifine');
      } else {
        if (filterdMyCartProduct.length == 0) {
          console.log('no selected data');

        }
        else {

          console.log('badu have');

          for (let j = 0; j < filterdMyCartProduct.length; j++) {

            totalVolume = totalVolume + filterdMyCartProduct[j].volume;

          }
          if (reqvolume <= totalVolume) {

            let givenqty;

            let x = totalVolume / reqvolume;
            let y = totalVolume % reqvolume
            let z = (totalVolume - y) / reqvolume;


            if (x == 1) {
              givenqty = issueqty;

            }
            else {

              givenqty = issueqty * z;

            }

            console.log(' engough volume');

            this.autoIncrement1 = this.autoIncrement1 + 1;
            this.addData2 = new OrderFreeIssue(
              this.autoIncrement1,
              this.genaratedId,
              vissuecatname,
              issueitemcode,
              reqvolume,
              givenqty,
              vissuecat,
              issueItem
            );
            this.orderFreeIssue.push(this.addData2);

            this.dataSource2 = new MatTableDataSource<OrderFreeIssue>(this.orderFreeIssue);

            let webServResponce: WebServResponce;
            this.saveEdit4 = new OrderVolumeWise(
              0,
              this.genaratedId,
              vissuecat,
              reqvolume,
              issueItem,
              issueqty,
              this.createdDate,
              this.createdby
            );

            console.log('save ');
            //this.orderFreeIssue = data;
            this.orderVolumeWiseservice.savedata(this.saveEdit4)
              .subscribe(
              resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {

                  console.log('checkthis' + webServResponce.errDetail);
                  console.log('saved');
                } else {
                  this.errorMessage = webServResponce.errMessage;
                }
              }
              ,
              error => this.errorMessage = <any>error

              );

          }
          else {
            console.log('not engough volume');
          }

        }
      }

    }

    this.checkWholeSale();
    this.saveConfirm = false;
    this.orderConfirm = true;
    this.openSnackBar('Success', 'Order Confirmed');
  }

  findallIds(x) {

    let obj: Orders[] = this.alldata
      .filter(Orders => Orders.genaratedId === x)
    //.pop();
    if (obj === undefined) {
    } else {

      this.jOrders = obj;

      for (let i = 0; i < this.jOrders.length; i++) {
        console.log(this.jOrders[i].id);
        this.deleteById(this.jOrders[i].id);
      }

    }

    this.openSnackBar('Success', 'Order Canceled');



  }



  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.ordersservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }


  push() {
  }


  checkWholeSale() {

    let startPrice = 0;
    let endPrice = 0;
    let discount = 0;
    let wholesaleType;
    let wholesalepriceId = 0;

    if (this.allWhoilesalePrices.length == 0) {
      console.log('emptyWholeSale');
    }
    else {

      for (let i = 0; i < this.allWhoilesalePrices.length; i++) {

        startPrice = this.allWhoilesalePrices[i].startPrice;
        endPrice = this.allWhoilesalePrices[i].endPrice;
        discount = this.allWhoilesalePrices[i].wholesalePrice;
        wholesaleType = this.allWhoilesalePrices[i].wholesalePriceType;
        wholesalepriceId = this.allWhoilesalePrices[i].id;

        //////////////////////////////////////////////////////////////////////////  

        if (this.netTotal2 > startPrice && this.netTotal2 < endPrice) {
          console.log('items in price range');

          let wholesaleItems: WholesaleItem[] = this.allWholeSaleItems
            .filter(WholesaleItem => WholesaleItem.wholesalePrice.id === wholesalepriceId)
          if (wholesaleItems === undefined) {
          } else {
            if (wholesaleItems.length == 0) {
              console.log('empty items');
            }
            else {
              console.log('not empty items');

              for (let j = 0; j < wholesaleItems.length; j++) {
                // console.log('items' + wholesaleItems[j].item.itemCode);

                let cartdata: TemporyOrder[] = this.temporyOrder
                  .filter(TemporyOrder => TemporyOrder.itemMasterId === wholesaleItems[j].item.id)
                if (cartdata === undefined) {
                } else {
                  if (cartdata.length == 0) {
                    console.log('no items founds');
                  }
                  else {
                    ////push here////////////////////////////////////////////////////////////////////////////////////////////
                    this.autoIncrement3 = this.autoIncrement3 + 1;
                    this.addData4 = new Jwholesale(this.autoIncrement3, cartdata[0].itemMasterId, cartdata[0].netPrice);
                    this.jwholesale.push(this.addData4);

                  }

                }
              }
              console.log('here is i created data ' + JSON.stringify(this.jwholesale));

              let jtot = 0;
              for (let j = 0; j < this.jwholesale.length; j++) {

                jtot = jtot + this.jwholesale[j].netPrice;
              }
              console.log('jack total ' + jtot);
              if (jtot > startPrice && jtot < endPrice) {


                let discountedprice = (jtot * discount) / 100;
                console.log('you have whole sale discount ' + discountedprice);
                this.myForm.patchValue({ wholesaleDiscount: discountedprice });
                this.myForm.patchValue({ netTotal: this.netTotal2 - discountedprice });
                this.wholesalePrice = discountedprice;

              }
              else {
                console.log('you have no whole sale discount ');


              }
            }
          }
        }
        else {

          console.log('items not in price range');

        }

      }
    }

  }


  convert() {

    if (this.saveConfirm == false)
       { 


    let companyName: string;
    let addressLine1: string;
    let addressLine2: string;
    let addressLine3: string;
    let addressLine4: string;
    let telephone: string;
    let fax: string;
    let email: string;
    let vatno: string;
    let repname;
    let customername;
    let customerId2;
    let add1;
    let add2;
    let add3;
    let add4;
    let contactNo;
    let customerVat;
    for (let j = 0; j < this.allcompany.length; j++) {

      companyName = this.allcompany[j].companyName;
      addressLine1 = this.allcompany[j].addressLine1;
      addressLine2 = this.allcompany[j].addressLine2;
      addressLine3 = this.allcompany[j].addressLine3;
      addressLine4 = this.allcompany[j].addressLine4;
      telephone = this.allcompany[j].telephoneNumber;
      fax = this.allcompany[j].faxNumber;
      email = this.allcompany[j].emailAddress;
      vatno = this.allcompany[j].vatNumber;

    }

    if (vatno === null) {
      vatno = "";
    }

    var doc = new jsPDF();
    var col = ["ITEM", " DISCRIPTION", "UNIT", "QTY", "PRICE", "DIS", "SP", "SD", "VALUE"];
    var rows = [];
    for (let j = 0; j < this.temporyOrder.length; j++) {

      let dis = 0;
      let unit;
      let discript;
      let itemMas: ItemMaster[] = this.allitems
        .filter(ItemMaster => ItemMaster.id === this.temporyOrder[j].itemMasterId)
      if (itemMas.length === 0) {
      } else {
        dis = itemMas[0].discount;
        unit = itemMas[0].volumeType;
        discript = itemMas[0].discription;
      }

      if (dis === null) {
        dis = 0;
      }

      let sp = 0;
      let sd = 0;

      let CusSpecial: CustomerSpecificPrice[] = this.allCustomerSpecific
        .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === this.temporyOrder[j].customerId && CustomerSpecificPrice.itemMaster.id === this.temporyOrder[j].itemMasterId)
      if (CusSpecial.length === 0) {
      } else {
        sp = CusSpecial[0].specialPrice;
        sd = CusSpecial[0].specialDiscount;
      }



      var temp = [this.temporyOrder[j].itemcode, discript, unit,
      this.temporyOrder[j].requiredQuantity, this.temporyOrder[j].total, dis, sp, sd, this.temporyOrder[j].netPrice
      ];
      rows.push(temp);
    }

    for (let j = 0; j < this.orderFreeIssue.length; j++) {

      let dis = 0;
      let unit;
      let discript;
      let itemMas: ItemMaster[] = this.allitems
        .filter(ItemMaster => ItemMaster.id === this.orderFreeIssue[j].FreeIssueItemid)
      if (itemMas.length === 0) {
      } else {
        unit = itemMas[0].volumeType;
        discript = itemMas[0].discription;
      }

      var temp = [this.orderFreeIssue[j].FreeIssueItemcode, discript, unit,
      this.orderFreeIssue[j].FreeIssueItemQuantity, 0, dis, 0, 0, 0
      ];
      rows.push(temp);




    }



    let ponum = this.temporyOrder[0].poNumber;
    let reqdate = this.temporyOrder[0].requiedDate.toDateString();
    let repid = this.temporyOrder[0].rep;
    let customerid = this.temporyOrder[0].customerId;
    customername = this.temporyOrder[0].customername;

    let companyId = this.temporyOrder[0].company;



    let repdata: RegisterRep[] = this.allrep
      .filter(RegisterRep => RegisterRep.id === repid)
    if (repdata.length === 0) {
    } else {

      repname = repdata[0].repName;
    }

    let customerData: Customer[] = this.allcustomers
      .filter(Customer => Customer.id === customerid)
    if (customerData.length === 0) {
    } else {

      add1 = customerData[0].addressLine1;
      add2 = customerData[0].addressLine2;
      add3 = customerData[0].addressLine3;
      add4 = customerData[0].addressLine4;
      contactNo = customerData[0].mainContact;
      customerId2 = customerData[0].genaratedId;
    }

    let customerComData: CustomerCompany[] = this.allcustomercompany
      .filter(CustomerCompany => CustomerCompany.id === companyId)
    if (customerComData.length === 0) {
    } else {

      customerVat = customerComData[0].vat;
    }
    if (customerVat === null) {
      customerVat = "";
    }

    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.setFontSize(18);
    doc.text(16, 20, companyName);
    doc.text(175, 20, 'ORDER');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);
    doc.text(16, 56, 'VAT NO :' + vatno);



    doc.setLineWidth(0.4);
    doc.line(16, 65, 105, 65);
    doc.setFontType("bold");
    doc.setFontSize(12);
    doc.text(16, 70, 'CUSTOMER ');
    doc.setLineWidth(0.4);
    doc.line(16, 72, 105, 72);


    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 77, customerId2);
    doc.text(16, 83, customername);
    doc.text(16, 88, add1 + add2);
    doc.text(16, 93, add3 + add4);
    doc.text(60, 77, 'CONTACT NO :' + contactNo);
    doc.text(60, 83, 'VAT NO     :' + customerVat);


    doc.setFontType("bold");
    doc.setFontSize(9);
    doc.text(145, 240, 'Total                             : ' + this.tot1);
    doc.text(145, 245, 'Item Discounts             : ' + this.tot2);
    doc.text(145, 250, 'Whole sale Discounts  : ' + this.tot3);
    doc.text(145, 255, 'Net Total                      : ' + this.tot4);

    doc.text(16, 272, '.........................................');
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(26, 276, 'Dilivered By');

    doc.text(76, 272, '........................................................');
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(86, 276, 'Authorized Signature');

    doc.text(136, 272, '.................................................................................');
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(146, 276, 'Recceved Goods in good Condition');


    doc.text(16, 285, 'Total Outstanding      :');
    doc.text(16, 292, 'Total PD Payments    :');

    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(9);
    doc.text(145, 35, 'CREATED DATE               :  ' + this.createdDate2);
    doc.text(145, 40, 'REQUIRED DATE             :  ' + reqdate);
    doc.text(145, 45, 'PURCHASE ORDER NO  :  ' + ponum);
    doc.text(145, 50, 'SALES EXE .                       :  ' + repname);
    doc.text(145, 55, 'CREATED BY                     :  ' + this.createdby);


    doc.autoTable(col, rows,
      {
        startY: 99
      }
    );
    doc.save('order.pdf');

    this.openSnackBar('Success', 'Print Created');

  }

else{
  this.openSnackBar('Warning', 'Please Confirm Order Before Print');

}


}
  changetot1(x) {
    this.tot1 = x;
  }
  changetot2(x) {
    this.tot2 = x;
  }
  changetot3(x) {
    this.tot3 = x;
  }
  changetot4(x) {
    this.tot4 = x;
  }
}
