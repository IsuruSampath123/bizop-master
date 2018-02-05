import { Component, OnInit } from '@angular/core';
import { FinishGoodGRN } from "../../../../domain/FinshGoodGRN";
import { Orders } from "../../../../domain/orders";
import { WebServResponce } from "../../../../domain/WebServResponce";
import { TemporyInvoice } from "../../../../domain/TemporyInvoice";
import { CatagoryWiseFreeIssue } from "../../../../domain/CatagoryWiseFreeIssue";
import { ItemWiseFreeIssue } from "../../../../domain/ItemWiseFreeIssue";
import { Invoice } from "../../../../domain/invoice";
import { ItemMaster } from "../../../../domain/ItemMaster";
import { InvoicePrices } from "../../../../domain/InvoicePrices";
import { CustomerSpecificPrice } from "../../../../domain/CustomerSpecificPrice";
import { TemporyVolume } from "../../../../domain/TemporyVolume";
import { OrderFreeIssue } from "../../../../domain/OrderFreeIssues";
import { Customer } from "../../../../domain/Customer";
import { Jtemporywholesale } from "../../../../domain/jtemporyWholesale";
import { OrderVolumeWise } from "../../../../domain/OrderVolumeWise";
import { Jwholesale } from "../../../../domain/jwhooleSale";
import { WholesaleItem } from "../../../../domain/WholesaleItem";
import { InvoiceFreeIssue } from "../../../../domain/InvoiceFreeIssues";
import { OrderType } from "../../../../domain/OrderType";
import { VolumeWiseFreeIssue } from "../../../../domain/VolumeWiseFreeIssue";
import { SelectItem } from "primeng/primeng";
import { InvoiceItemsSave } from "../../../../domain/InvoiceFreeIssueItemsave";
import { WholesalePrice } from "../../../../domain/WholesalePrice";
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Companyservice } from "../../../../service/Company.service";
import { Company } from "../../../../domain/Company";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TemporyVolume2 } from "../../../../domain/TemporyVolume2";
import { InvoiceFreeIssueItems } from "../../../../domain/InvoiceFreeIsuuesItems";
import { RegisterRep } from "../../../../domain/RepRegister";
import { OrdersPrices } from "../../../../domain/OrdersPrices";
import { Ordersservice } from "../../../../service/orders.service";
import { InvoiceService } from "../../../../service/invoice.service";
import { OrderTypeService } from "../../../../service/orderType.service";
import { OrderFreeIssueItemservice } from "../../../../service/OrderFreeIssueItems.service";
import { FinishGoodGRNservice } from "../../../../service/FinishGoodGRN.service";
import { ItemMasterservice } from "../../../../service/ItemMaster.service";
import { CustomerService } from "../../../../service/customer.service";
import { CustomerSpecificPriceService } from "../../../../service/customerSpecificPrice.service";
import { ItemWiseFreeIssueservice } from "../../../../service/ItemWiseFreeIssue.service";
import { CatagoryWiseFreeIssueservice } from "../../../../service/CatagoryWiseFreeIssue.service";
import { VolumeWiseFreeIssueservice } from "../../../../service/VolumeWiseFreeIssue.service";
import { WholesalePriceService } from "../../../../service/wholesalePrice.service";
import { WholesaleItemService } from "../../../../service/wholesaleItem.service";
import { RegisterRepservice } from "../../../../service/RepRegister.service";
import { CustomerCompanyService } from "../../../../service/customerCompany.service";
import { OrdersPricesService } from "../../../../service/OrdersPrices.service";
import { InvoicePricesService } from "../../../../service/InvoicePrices.service";
import { InvoiceItemsSaveservice } from "../../../../service/InvoiceFreeisuuItemsSave.service";
import { TemporyVolumeservice } from "../../../../service/TemporyVolume.service";
import { OrderVolumeWiseservice } from "../../../../service/OrderVOlumeWise.service";
import { CustomerCompany } from "../../../../domain/CustomerCompany";



@Component({
  selector: 'app-Invoice',
  templateUrl: './Invoice.component.html',
  styleUrls: ['./Invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  displayedColumns = [ 'itemcode'
    , 'requiredQuantity', 'requiedDate', 'itemDiscount', 'total', 'specialDiscount', 'specialPrice', 'netPrice'
  ];
  displayedColumns2 = ['purchasedItemcode', 'purchasedItemQuantity', 'FreeIssueItemcode'
    , 'FreeIssueItemQuantity'
  ];

  myForm: FormGroup;
  allItemTypes: SelectItem[];
  invoicetypes: SelectItem[];
  orderId;
  jread = true;
  itemMasterId3;
  printConfirm = true;
  additional = true;
  saveEdit: Invoice;
  saveVolume: TemporyVolume2;
  alltemporyVolumes: TemporyVolume2[];
  saveEdit3: InvoicePrices;
  saveEdit4: InvoiceFreeIssueItems;
  saveData: InvoiceItemsSave;
  updateQty: FinishGoodGRN;
  updateOrder: Orders;
  alldata: Invoice[];
  partordersellingQty = 0;
  allorderVolumeWises: OrderVolumeWise[];
  allorderTypedata: OrderType[];
  allordersdata: Orders[];
  allordersdata2: Orders[];
  allinvoiveprices: InvoicePrices[];
  allinvoiceFreeissues: InvoiceFreeIssueItems[];
  invoicePass = false;
  checkItemAvailability = false;
  allfreeIsuueItems: InvoiceItemsSave[];
  allordersdataWithoutDuplicate: Orders[];
  orderGenaratedId;
  allcompanies: Company[];
  nextid;
  activemanualAdd = true;
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
  allOrderFreeIssues: OrderFreeIssue[];
  referenceNumber;
  allCustomerSpecific: CustomerSpecificPrice[];
  allitemWiseFreeissue: ItemWiseFreeIssue[];
  allcatagorywisefreeisuue: CatagoryWiseFreeIssue[];
  allVolumeWiseFreeIssue: VolumeWiseFreeIssue[];
  allWhoilesalePrices: WholesalePrice[];
  allWholeSaleItems: WholesaleItem[];
  orderConfirm = true;
  saveConfirm = true;
  saveConfirm2 = true;
  saveConfirm3 = true;
  tot1 = 0;
  tot2 = 0;
  tot3 = 0;
  tot4 = 0;
  allcustomercompany: CustomerCompany[];
  customerAvailable = false;
  itemcode1;
  discription1;
  confirmPassInvoice = false;
  visiblePartOrder = true;
  jgenaratedId;
  jorderdPersonName;
  jorderdPersonPost;
  jcontactNumber;
  jnicNumber;
  jreduceqty;
  jcontactPersonImage;
  jcurrentDate;
  jrequiedDate;
  jpoNumber;
  jorderTypeid;
  jorderType;
  jcustomerid;
  jitemMasterid;
  jregisterRepid;
  jcustomerCompanyid;
  freeIssuePartsale = false;
  freeIssueAvailability = 0;
  finalinvoice = false;
  InvoiceItemsSave
  netTotal2 = 0;
  mrp = 0;
  itemDiscounts = 0;
  wholesalePrice = 0;
  autoIncrement = 0;
  autoIncrement1 = 0;
  autoIncrement2 = 0;
  autoIncrement3 = 0;
  autoIncrement4 = 0;
  jvalue = 0;
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


  maxData: Invoice[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: Invoice = new Invoice(0, '', '', '', null, null, null, null, '', '', null, '', null);
  addData: TemporyInvoice = new TemporyInvoice(0, '', '', '', '', '', '', null, null, '', null, null, '', null, '', null, '', null, null, null, null, null, null, null, '');
  selected2: TemporyInvoice = new TemporyInvoice(0, '', '', '', '', '', '', null, null, '', null, null, '', null, '', null, '', null, null, null, null, null, null, null, '');
  addData2: InvoiceFreeIssue = new InvoiceFreeIssue(0, '', '', '', null, null, null, null);
  addData3: TemporyVolume = new TemporyVolume(0, '', null, null);
  addData4: Jwholesale = new Jwholesale(0, null, null);

  addData6: Jtemporywholesale = new Jtemporywholesale(0, null, null);
  addData5: OrdersPrices = new OrdersPrices(0, '', null, null, null, null, null, '');




  allordersOption: SelectItem[] = [];
  allorderTypeOptions: SelectItem[] = [];
  allitemMasterOptions: SelectItem[] = [];
  temporyInvoice: TemporyInvoice[] = [];
  invoiceFreeIssue: InvoiceFreeIssue[] = [];
  temporyVolume: TemporyVolume[] = [];
  jwholesale: Jwholesale[] = [];
  jtemporywholesale: Jtemporywholesale[] = [];

  registerRepoption: SelectItem[] = [];
  companiesOptions: SelectItem[] = [];
  jOrders: Orders[] = [];

  dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
  dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);


  constructor(private formBuilder: FormBuilder, private ordersservice: Ordersservice,
    private invoiceService: InvoiceService,
    private orderTypeService: OrderTypeService,
    private companyservice: Companyservice,
    private orderFreeIssueItemservice: OrderFreeIssueItemservice,
    private finishGoodGRNservice: FinishGoodGRNservice,
    private itemMasterservice: ItemMasterservice,
    private customerService: CustomerService,
    private customerSpecificPriceService: CustomerSpecificPriceService,
    private itemWiseFreeIssueservice: ItemWiseFreeIssueservice,
    private catagoryWiseFreeIssueservice: CatagoryWiseFreeIssueservice,
    private volumeWiseFreeIssueservice: VolumeWiseFreeIssueservice
    , private wholesalePriceService: WholesalePriceService,
    private wholesaleItemService: WholesaleItemService,
    private registerRepservice: RegisterRepservice,
    private customerCompanyService: CustomerCompanyService,
    private ordersPricesService: OrdersPricesService,
    private invoicePricesService: InvoicePricesService,
    private invoiceItemsSaveservice: InvoiceItemsSaveservice,
    private temporyVolumeservice: TemporyVolumeservice,
    private orderVolumeWiseservice: OrderVolumeWiseservice
    , public snackBar: MatSnackBar


  ) { }



  ngOnInit() {

    this.getAll();
    this.getMax();

    this.myForm = this.formBuilder.group({
      totalPrice: new FormControl(''),
      discountPrice: new FormControl(''),
      netTotal: new FormControl(''),
      wholesaleDiscount: new FormControl(''),
      referenceNo: new FormControl(''),
      itemMasterId: new FormControl(''),
      availableQuantity: new FormControl(''),
      pendingOrderQuantity: new FormControl(''),
      requiredQuantity: new FormControl(''),
      id: new FormControl(''),
      passInvoice: new FormControl(''),
      genaratedId: new FormControl(''),
      orderid: new FormControl(''),
      ordernumber: new FormControl(''),
      refeno: new FormControl(''),
      nbt: new FormControl(''),
      nbtprice: new FormControl(''),
      vatprice: new FormControl(''),
      totprice: new FormControl(''),
      vat: new FormControl(''),
      qtydis: new FormControl(''),
      distributedis: new FormControl(''),
      specialdis: new FormControl(''),
      otherdis: new FormControl(''),
      invoicenumber: new FormControl(''),
      customer: new FormControl(''),
      blackListed: new FormControl(''),
      customertax1: new FormControl(''),
      customertax2: new FormControl(''),
      orderperson: new FormControl(''),
      post: new FormControl(''),
      contactnumber: new FormControl(''),
      nic: new FormControl(''),
      currentdate: new FormControl(''),
      requireddate: new FormControl(''),
      ponumber: new FormControl(''),
      ordertype: new FormControl(''),
      'itemType': ['', Validators.required],
      maincat: new FormControl(''),
      subcat: new FormControl(''),
      subsubcat: new FormControl(''),
      itemcode: new FormControl(''),
      availableqty: new FormControl(''),
      pendingorderqty: new FormControl(''),
      requestqty: new FormControl(''),
      mrptotal: new FormControl(''),
      discounttotal: new FormControl(''),
      nettotal: new FormControl(''),
      rep: new FormControl(''),
      invoicetype: new FormControl(''),
      vatregno: new FormControl(''),
      nbtno: new FormControl(''),
      companyVat: new FormControl(''),
      companyNbt: new FormControl('')


    });
  }


  addNew() {
    this.printConfirm = true;

    this.saveConfirm = true;
    this.saveConfirm2 = true;
    this.saveConfirm3 = true;
    this.temporyVolume = [];
    this.visiblePartOrder = true;
    this.invoicePass = false;
    this.selected = new Invoice(0, '', '', '', null, null, null, null, '', '', null, '', null);
    console.log('got the addNew');
    this.orderConfirm = true;
    this.referenceNumber = null;
    this.temporyInvoice = [];
    this.invoiceFreeIssue = [];
    this.orderId = null;
    this.myForm.patchValue({ ordernumber: null });
    this.myForm.patchValue({ customer: null });
    this.myForm.patchValue({ vat: null });
    this.myForm.patchValue({ nbt: null });
    this.myForm.patchValue({ orderperson: null });
    this.myForm.patchValue({ post: null });
    this.myForm.patchValue({ nic: null });
    this.myForm.patchValue({ contactnumber: null });
    this.myForm.patchValue({ requireddate: null });
    this.myForm.patchValue({ ponumber: null });
    this.myForm.patchValue({ ordertype: null });
    this.myForm.patchValue({ currentdate: null });
    this.temporyInvoice = [];
    this.invoiceFreeIssue = [];
    this.myForm.patchValue({ totalPrice: null });
    this.myForm.patchValue({ discountPrice: null });
    this.myForm.patchValue({ netTotal: null });
    this.myForm.patchValue({ wholesaleDiscount: null });
    this.jgenaratedId = null;
    this.jorderdPersonName = null;
    this.jorderdPersonPost = null;
    this.jcontactNumber = null;
    this.jnicNumber = null;
    this.jcontactPersonImage = null;
    this.jcurrentDate = null;
    this.jrequiedDate = null;
    this.jpoNumber = null;
    this.jorderTypeid = null;
    this.jcustomerid = null;
    this.jitemMasterid = null;
    this.jregisterRepid = null;
    this.jcustomerCompanyid = null;
    this.activemanualAdd = true;

    this.getAll();

    this.saveConfirm = true;
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


  customerCompany() {


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
    this.repdata();
    this.CompanyData();
    this.customerCompany();
    let webServResponce5: WebServResponce;
    this.temporyVolumeservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce5 = resObj;
        if (webServResponce5.statusId == 200) {
          this.alltemporyVolumes = <TemporyVolume2[]>webServResponce5.result;
        } else {
          this.errorMessage = webServResponce5.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let webServResponce51: WebServResponce;
    this.orderVolumeWiseservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce51 = resObj;
        if (webServResponce51.statusId == 200) {
          this.allorderVolumeWises = <OrderVolumeWise[]>webServResponce51.result;
        } else {
          this.errorMessage = webServResponce51.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );



    let webServResponce: WebServResponce;
    this.invoiceService.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <Invoice[]>webServResponce.result;
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let webServResponce2: WebServResponce;
    this.invoicePricesService.getAllData()
      .subscribe(
      resObj => {
        webServResponce2 = resObj;
        if (webServResponce2.statusId == 200) {
          this.allinvoiveprices = <InvoicePrices[]>webServResponce2.result;
        } else {
          this.errorMessage = webServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );




    let webServResponce1: WebServResponce;
    this.invoiceItemsSaveservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce1 = resObj;
        if (webServResponce1.statusId == 200) {
          this.allfreeIsuueItems = <InvoiceItemsSave[]>webServResponce1.result;


        } else {
          this.errorMessage = webServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce2: WebServResponce;
    this.ordersservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allordersdata = <Orders[]>catWebServResponce2.result;

          let filterorder: Orders[] = this.allordersdata
            .filter(Orders => Orders.pendingOrderQuantity != 0)
          if (filterorder === undefined) {
            console.log('undifined');
          } else { }
          this.allordersdata = filterorder
        } else {
          this.errorMessage = catWebServResponce2.errMessage;
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
          this.allordersdata2 = <Orders[]>catWebServResponce1.result;
        } else {
          this.errorMessage = catWebServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );





    let catWebServResponce28: WebServResponce;
    this.ordersservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce28 = resObj;
        if (catWebServResponce28.statusId == 200) {
          this.allordersdataWithoutDuplicate = <Orders[]>catWebServResponce28.result;

          let filterorder2: Orders[] = this.allordersdataWithoutDuplicate
            .filter(Orders => Orders.pendingOrderQuantity != 0)
          if (filterorder2 === undefined) {
            console.log('undifined');
          } else { }



          this.allordersOption = [];
          this.allordersOption.push({ label: 'Please Select', value: null });
          this.allordersdataWithoutDuplicate = filterorder2

          for (let j = 0; j < this.allordersdataWithoutDuplicate.length; j++) {


            let firstOderNumber = this.allordersdataWithoutDuplicate[j].genaratedId;
            let firstOderId = this.allordersdataWithoutDuplicate[j].id;

            let jackChek: SelectItem[] = this.allordersOption
              .filter(SelectItem => SelectItem.label === firstOderNumber)
            if (jackChek === undefined) {
              console.log('undifined');
            } else {
              if (jackChek.length == 0) {
                this.allordersOption.push({ label: firstOderNumber, value: firstOderId });

              }
              else {

              }

            }




          }



        } else {
          this.errorMessage = catWebServResponce28.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );






    let catWebServResponce21: WebServResponce;
    this.companyservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce21 = resObj;
        if (catWebServResponce21.statusId == 200) {
          this.allcompanies = <Company[]>catWebServResponce21.result;
        } else {
          this.errorMessage = catWebServResponce21.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce22: WebServResponce;
    this.orderFreeIssueItemservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce22 = resObj;
        if (catWebServResponce22.statusId == 200) {
          this.allOrderFreeIssues = <OrderFreeIssue[]>catWebServResponce22.result;
        } else {
          this.errorMessage = catWebServResponce22.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce23: WebServResponce;
    this.finishGoodGRNservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce23 = resObj;
        if (catWebServResponce23.statusId == 200) {
          this.allfgrn = <FinishGoodGRN[]>catWebServResponce23.result;



        } else {
          this.errorMessage = catWebServResponce23.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce24: WebServResponce;
    this.itemMasterservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce24 = resObj;
        if (catWebServResponce24.statusId == 200) {
          this.allitems = <ItemMaster[]>catWebServResponce24.result;

          this.allitemMasterOptions = [];
          this.allitemMasterOptions.push({ label: 'Please Select', value: 0 });
          for (let var1 of this.allitems) {
            this.allitemMasterOptions.push({ label: var1.itemCode, value: var1.id });
          }



        } else {
          this.errorMessage = catWebServResponce24.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );



    let catWebServResponce25: WebServResponce;
    this.customerService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce25 = resObj;
        if (catWebServResponce25.statusId == 200) {
          this.allcustomers = <Customer[]>catWebServResponce25.result;

          let obj: Customer[] = this.allcustomers
            .filter(Customer => ((Customer.blackListed.toLowerCase() === 'no')));


          if (obj != undefined) {
            this.allcustomers = obj;
          }


        } else {
          this.errorMessage = catWebServResponce25.errMessage;
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

    let catWebServResponce14: WebServResponce;
    this.orderTypeService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce14 = resObj;
        if (catWebServResponce14.statusId == 200) {
          this.allorderTypedata = <OrderType[]>catWebServResponce14.result;
        } else {
          this.errorMessage = catWebServResponce14.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


  }




  getMax() {
    let webServResponce: WebServResponce;
    this.invoiceService.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Invoice[]>webServResponce.result;
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
    let type = 'INV'
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
    this.myForm.patchValue({ id: ' ' });
    this.myForm.patchValue({ companyNbt: this.allcompanies[0].nbtNumber });
    this.myForm.patchValue({ companyVat: this.allcompanies[0].vatNumber });
    this.myForm.patchValue({ passInvoice: 0 });
    this.myForm.patchValue({ ordernumber: null });
    this.myForm.patchValue({ itemMasterId: null });
    this.myForm.patchValue({ currentdate: this.createdDate });



  }

  OrderChange(x) {
    console.log('first x ' + x);

    let jackx = parseInt(x);

    this.finalinvoice = false;
    this.invoicePass = false;
    this.temporyInvoice = [];
    this.invoiceFreeIssue = [];
    this.orderId = null;

    console.log('after convert' + jackx);
    if (x === null) {
      this.orderConfirm = true;
      this.myForm.patchValue({ customer: null });
      this.myForm.patchValue({ vat: null });
      this.myForm.patchValue({ nbt: null });
      this.myForm.patchValue({ orderperson: null });
      this.myForm.patchValue({ post: null });
      this.myForm.patchValue({ nic: null });
      this.myForm.patchValue({ contactnumber: null });
      this.myForm.patchValue({ requireddate: null });
      this.myForm.patchValue({ ponumber: null });
      this.myForm.patchValue({ ordertype: null });
      this.myForm.patchValue({ currentdate: null });
      this.temporyInvoice = [];
      this.invoiceFreeIssue = [];
      this.myForm.patchValue({ totalPrice: null });
      this.myForm.patchValue({ discountPrice: null });
      this.myForm.patchValue({ netTotal: null });
      this.myForm.patchValue({ wholesaleDiscount: null });

      this.jgenaratedId = null;
      this.jorderdPersonName = null;
      this.jorderdPersonPost = null;
      this.jcontactNumber = null;
      this.jnicNumber = null;
      this.jcontactPersonImage = null;
      this.jcurrentDate = null;
      this.jrequiedDate = null;
      this.jpoNumber = null;
      this.jorderTypeid = null;
      this.jcustomerid = null;
      this.jitemMasterid = null;
      this.jregisterRepid = null;
      this.jcustomerCompanyid = null;
      this.activemanualAdd = true;
    }


    else {

      console.log('inside ');
      let orderdata1: Orders[] = this.allordersdata
        .filter(Orders => Orders.id === jackx)
      if (orderdata1.length === 0) {
        console.log('no data');
      } else {
        let orderdata2: Orders[] = this.allordersdata
          .filter(Orders => Orders.genaratedId === orderdata1[0].genaratedId)
        if (orderdata2 === undefined) {
          console.log('undifined');
        } else {
          if (orderdata2.length == 0) {
            console.log('items not available');
          }
          else {


            for (let j = 0; j < orderdata2.length; j++) {

              let reqty = orderdata2[j].pendingOrderQuantity;
              let itemStatus = orderdata2[j].itemStatus;
              let jitemid = orderdata2[j].itemMaster.id;

              let total = 0;
              let finishgoods: FinishGoodGRN[] = this.allfgrn
                .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === orderdata2[j].itemMaster.id && FinishGoodGRN.remainingQuantity != 0)
              if (finishgoods === undefined) {
                console.log('undifined');
              } else {
                console.log('finish goods ' + JSON.stringify(finishgoods));


                if (finishgoods.length == 0) {
                  this.checkItemAvailability = false;
                }
                else {
                  for (let j = 0; j < finishgoods.length; j++) {
                    total = total + finishgoods[j].remainingQuantity;

                  }
                  console.log('j total is ' + total);
                  console.log('req qty ' + reqty);
                  this.partordersellingQty = total;

                  if (total >= reqty) {


                  } else {
                    this.invoicePass = true;
                    this.visiblePartOrder = false;
                  }
                }
              }


              let duplicates: Orders[] = this.allordersdata
                .filter(Orders => Orders.itemMaster.id === jitemid)
              if (duplicates.length === 0) {
                console.log('undifined');


              } else if (duplicates.length > 1) {


                let jduptot = 0;
                for (let i = 0; i < duplicates.length; i++) {

                  jduptot = jduptot + duplicates[i].pendingOrderQuantity;
                }

                if (jduptot <= total) { }
                else {
                  this.invoicePass = true;
                  this.visiblePartOrder = false;

                }
              }
            }
          }
        }

      }




      if (this.checkItemAvailability === true) {

        this.openSnackBar('Warning', '  Some Items Not available in the Stok ');
      }
      else {

        if (this.invoicePass === false) {

          let orderdata: Orders[] = this.allordersdata
            .filter(Orders => Orders.id === jackx)
          if (orderdata === undefined) {
            console.log('undifined');
          } else {
            if (orderdata.length == 0) {
              console.log('no data');
            }
            else {

              this.orderId = orderdata[0].genaratedId;

              console.log('customwr name' + orderdata[0].customer.customerName);
              this.myForm.patchValue({ customer: orderdata[0].customer.customerName });
              this.myForm.patchValue({ vat: orderdata[0].customerCompany.vat });
              this.myForm.patchValue({ nbt: orderdata[0].customerCompany.nbt });
              this.myForm.patchValue({ orderperson: orderdata[0].orderdPersonName });
              this.myForm.patchValue({ post: orderdata[0].orderdPersonPost });
              this.myForm.patchValue({ contactnumber: orderdata[0].contactNumber });
              this.myForm.patchValue({ nic: orderdata[0].nicNumber });
              this.myForm.patchValue({ currentdate: orderdata[0].currentDate });
              this.myForm.patchValue({ requireddate: orderdata[0].requiedDate });
              this.myForm.patchValue({ ponumber: orderdata[0].poNumber });
              this.myForm.patchValue({ ordertype: orderdata[0].orderType.orderType });

              this.jreduceqty = orderdata[0].reduceFreeIssueQuantity;
              this.jgenaratedId = orderdata[0].genaratedId;
              this.jorderdPersonName = orderdata[0].orderdPersonName;
              this.jorderdPersonPost = orderdata[0].orderdPersonPost;
              this.jcontactNumber = orderdata[0].contactNumber;
              this.jnicNumber = orderdata[0].nicNumber;
              this.jcontactPersonImage = orderdata[0].contactPersonImage;
              this.jcurrentDate = orderdata[0].currentDate;
              this.jrequiedDate = orderdata[0].requiedDate;
              this.jpoNumber = orderdata[0].poNumber;
              this.jorderTypeid = orderdata[0].orderType.id;
              this.jorderType = orderdata[0].orderType.orderType;
              this.jcustomerid = orderdata[0].customer.id;
              this.jitemMasterid = orderdata[0].itemMaster.id;
              this.jregisterRepid = orderdata[0].registerRep.id;
              this.jcustomerCompanyid = orderdata[0].customerCompany.id;
              this.activemanualAdd = false;
              this.orderConfirm = false;

              console.log(
                'jack contact number ' + this.jcontactNumber
              );

              let orderdata2: Orders[] = this.allordersdata
                .filter(Orders => Orders.genaratedId === orderdata[0].genaratedId)
              if (orderdata2 === undefined) {
                console.log('undifined');
              } else {
                if (orderdata2.length == 0) {
                  console.log('items not available');
                }
                else {

                  for (let j = 0; j < orderdata2.length; j++) {

                    let reqty = orderdata2[j].pendingOrderQuantity;
                    let pendingFreeisuueQty = orderdata2[j].pendingFreeIssueQuantity;
                    let purchaseItemQty = pendingFreeisuueQty + reqty;

                    console.log('total free isuue ' + purchaseItemQty);
                    console.log('total free isuue qty ' + purchaseItemQty);



                    let finishgoods: FinishGoodGRN[] = this.allfgrn
                      .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === orderdata2[j].itemMaster.id && FinishGoodGRN.remainingQuantity != 0)
                    if (finishgoods === undefined) {
                      console.log('undifined');
                    } else {
                      if (finishgoods.length == 0) {
                        this.openSnackBar('Warning', '  This Item Not available in the Stok ');

                      }
                      else {
                        let total1 = 0;
                        let total = 0;
                        let averageCost = 0;
                        let price = 0;
                        let discount;
                        let netprice = 0;

                        for (let j = 0; j < finishgoods.length; j++) {

                          total1 = total1 + 1;
                          total = total + finishgoods[j].remainingQuantity;
                          discount = finishgoods[j].discount;
                          price = price + ((finishgoods[j].price) / finishgoods[j].remainingQuantity) - ((finishgoods[j].price) / finishgoods[j].remainingQuantity) * discount / 100;

                        }
                        averageCost = price / total1;
                        console.log('average cost for 1 item  ' + averageCost);

                        if (total >= reqty) {




                          //console.log('nic here'  + ponumber + currentDate + contactNumber);
                          let itemcode;
                          let customer;
                          let ordertype;
                          let maincatid;
                          let oripacks;
                          let volume;
                          let itemid;



                          let obj: ItemMaster[] = this.allitems
                            .filter(ItemMaster => ItemMaster.id === orderdata2[j].itemMaster.id)
                          if (obj === undefined) {
                          } else {
                            itemid = obj[0].id;
                            itemcode = obj[0].itemCode;
                            maincatid = obj[0].mainCatagory.id;
                            oripacks = obj[0].packSize;
                            volume = obj[0].volume;
                          }
                          let obj2: OrderType[] = this.allorderTypedata
                            .filter(OrderType => OrderType.id === orderdata2[j].orderType.id)

                          if (obj2 === undefined) {
                          } else {
                            // console.log(supi, si, i);
                            ordertype = obj2[0].orderType;
                          }
                          let obj3: Customer[] = this.allcustomers
                            .filter(Customer => Customer.id === orderdata2[j].customer.id)

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
                            .filter(ItemMaster => ItemMaster.id === orderdata2[j].itemMaster.id)
                          if (itemprice === undefined) {
                            console.log('undifined');
                          } else {
                            if (itemprice.length == 0) { }
                            else {
                              discount = itemprice[0].discount;
                              mxreprice = itemprice[0].maxRetail;
                              if (itemprice[0].discount == null || itemprice[0].discount === 0) {
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

                          ///////////customer specialPrice
                          let cusSpecialPrice: CustomerSpecificPrice[] = this.allCustomerSpecific
                            .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === orderdata2[j].customer.id)
                          if (cusSpecialPrice === undefined) {

                            console.log('undifined');

                          } else {

                            if (cusSpecialPrice.length == 0) {
                              console.log('no customer');
                              this.customerAvailable = false;
                              this.specialDiscount = 0;
                              this.specialPrice = 0;
                              this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;
                              this.netTotal = this.totalPrice;



                              if (orderdata2[j].itemStatus != "FreeIssue") {



                                //here go to free issue//////////////////////////////////////////////
                                let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                                  .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === orderdata2[j].itemMaster.id)
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
                                          orderdata2[j].genaratedId,
                                          maincatid,
                                          volume * purchaseItemQty
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

                                        if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                          console.log('pack size and qty eqel');

                                          let x = purchaseItemQty / qty;
                                          let y = purchaseItemQty % qty
                                          let z = (purchaseItemQty - y) / qty;


                                          if (x == 1) {
                                            freisqty = freisqty1;

                                          }
                                          else {

                                            freisqty = freisqty1 * z;

                                          }
                                          this.autoIncrement1 = this.autoIncrement1 + 1;
                                          this.addData2 = new InvoiceFreeIssue(
                                            this.autoIncrement1,
                                            orderdata2[j].genaratedId,
                                            itemcode,
                                            freeissuit,
                                            orderdata2[j].requiredQuantity,
                                            freisqty,
                                            orderdata2[j].itemMaster.id,
                                            fisuitemid
                                          );
                                          this.invoiceFreeIssue.push(this.addData2);
                                          this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);

                                        }
                                        else {
                                          console.log('pack size pack size and qty not eqr');
                                          this.autoIncrement2 = this.autoIncrement2 + 1;
                                          this.addData3 = new TemporyVolume(
                                            this.autoIncrement2,
                                            orderdata2[j].genaratedId,
                                            maincatid,
                                            volume * purchaseItemQty
                                          );
                                          this.temporyVolume.push(this.addData3);
                                        }
                                      }
                                    }

                                    //end catagorywise 

                                  }
                                  else {

                                    // this.openSnackBar('info', 'Success', '  free issue item available');
                                    console.log('free issue item');

                                    let qty = itemWiseFreeIsuue[0].itemQuantity;

                                    let fqty = orderdata2[j].requiredQuantity;
                                    let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                                    let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                                    let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                                    let freeIssueQty;

                                    if (purchaseItemQty >= qty) {
                                      // this.openSnackBar('info', 'Success', '  free issue item qty available');
                                      console.log('free issue item qty available');

                                      let x = purchaseItemQty / qty;
                                      let y = purchaseItemQty % qty
                                      let z = (purchaseItemQty - y) / qty;

                                      if (x == 1) {
                                        freeIssueQty = freeIssueQty1;
                                      }
                                      else {

                                        freeIssueQty = freeIssueQty1 * z;

                                      }

                                      this.autoIncrement1 = this.autoIncrement1 + 1;
                                      this.addData2 = new InvoiceFreeIssue(
                                        this.autoIncrement1,
                                        orderdata2[j].genaratedId,
                                        itemcode,
                                        freeIssueItem,
                                        orderdata2[j].requiredQuantity,
                                        freeIssueQty,
                                        orderdata2[j].itemMaster.id,
                                        freeIssueItemId
                                      );
                                      this.invoiceFreeIssue.push(this.addData2);
                                      this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                    }
                                    else {

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
                                            orderdata2[j].genaratedId,
                                            maincatid,
                                            volume * purchaseItemQty
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

                                          if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                            console.log('pack size and qty eqel');

                                            let x = purchaseItemQty / qty;
                                            let y = purchaseItemQty % qty
                                            let z = (purchaseItemQty - y) / qty;


                                            if (x == 1) {
                                              freisqty = freisqty1;

                                            }
                                            else {

                                              freisqty = freisqty1 * z;

                                            }
                                            this.autoIncrement1 = this.autoIncrement1 + 1;
                                            this.addData2 = new InvoiceFreeIssue(
                                              this.autoIncrement1,
                                              orderdata2[j].genaratedId,
                                              itemcode,
                                              freeissuit,
                                              orderdata2[j].requiredQuantity,
                                              freisqty,
                                              orderdata2[j].itemMaster.id,
                                              fisuitemid
                                            );
                                            this.invoiceFreeIssue.push(this.addData2);
                                            this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                          }
                                          else {
                                            console.log('pack size pack size and qty not eqr');
                                            this.autoIncrement2 = this.autoIncrement2 + 1;
                                            this.addData3 = new TemporyVolume(
                                              this.autoIncrement2,
                                              orderdata2[j].genaratedId,
                                              maincatid,
                                              volume * purchaseItemQty
                                            );
                                            this.temporyVolume.push(this.addData3);
                                          }
                                        }
                                      }

                                    }
                                  }

                                }

                              }
                              else {
                                console.log('no freeissue for freeIssue');

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
                                .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === orderdata2[j].itemMaster.id && FinishGoodGRN.remainingQuantity != 0)
                              if (grncost === undefined) {
                                console.log('undifined');
                              } else {
                                if (grncost.length != 0) {
                                  console.log('data available');

                                  let buyingp = grncost[0].price;///////////////////////////////////////
                                  let byqty = grncost[0].quantity;
                                  let dis = grncost[0].discount;
                                  let realpricefor1 = buyingp / byqty;//one item cost
                                  let disprice = (realpricefor1 * dis) / 100;
                                  let finalitemcost = realpricefor1 - disprice;//final cost for one item


                                  this.reacost = averageCost;



                                }
                                else {
                                  console.log('no data available');
                                }

                              }
                              if (cusitem === orderdata2[j].itemMaster.id) {
                                //this.openSnackBar('info', 'Success', ' item available');

                                console.log('item available');
                                this.customerAvailable = true;

                                if (cusSprice == 0) {




                                  newprice = (netprice - ((netprice * customerSpeDis) / 100)) * orderdata2[j].pendingOrderQuantity;
                                  this.spDis = netprice - ((netprice * customerSpeDis) / 100);


                                  console.log('special discount ' + customerSpeDis);
                                  console.log('special discount price ' + ((netprice * customerSpeDis) / 100));
                                  console.log('net price after special discount ' + newprice);
                                  this.specialDiscount = customerSpeDis;
                                  this.specialPrice = 0;
                                  this.netTotal = newprice;
                                  this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;

                                }
                                else {

                                  let newpricep = netprice - cusSprice;

                                  console.log('special price ' + cusSprice);
                                  console.log('net  price after special price ' + cusSprice);
                                  this.specialDiscount = 0;
                                  this.specialPrice = cusSprice;
                                  this.netTotal = cusSprice * orderdata2[j].pendingOrderQuantity;
                                  this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;
                                }


                              }
                              else {

                                console.log('item not available');
                                this.customerAvailable = false;

                                this.specialDiscount = 0;
                                this.specialPrice = 0;
                                this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;

                                this.netTotal = this.totalPrice;

                                //here go to free issue///////////////////////////////////////////

                                if (orderdata2[j].itemStatus != "FreeIssue") {

                                  let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                                    .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === orderdata2[j].itemMaster.id)
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
                                            orderdata2[j].genaratedId,
                                            maincatid,
                                            volume * purchaseItemQty
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

                                          if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                            console.log('pack size and qty eqel');

                                            let x = purchaseItemQty / qty;
                                            let y = purchaseItemQty % qty
                                            let z = (purchaseItemQty - y) / qty;


                                            if (x == 1) {
                                              freisqty = freisqty1;

                                            }
                                            else {

                                              freisqty = freisqty1 * z;

                                            }
                                            this.autoIncrement1 = this.autoIncrement1 + 1;
                                            this.addData2 = new InvoiceFreeIssue(
                                              this.autoIncrement1,
                                              orderdata2[j].genaratedId,
                                              itemcode,
                                              freeissuit,
                                              orderdata2[j].requiredQuantity,
                                              freisqty,
                                              orderdata2[j].itemMaster.id,
                                              fisuitemid
                                            );
                                            this.invoiceFreeIssue.push(this.addData2);
                                            this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                          }
                                          else {
                                            console.log('pack size pack size and qty not eqr');
                                            this.autoIncrement2 = this.autoIncrement2 + 1;
                                            this.addData3 = new TemporyVolume(
                                              this.autoIncrement2,
                                              orderdata2[j].genaratedId,
                                              maincatid,
                                              volume * purchaseItemQty
                                            );
                                            this.temporyVolume.push(this.addData3);
                                          }
                                        }
                                      }

                                      //end catagorywise 

                                    }
                                    else {

                                      // this.openSnackBar('info', 'Success', '  free issue item available');
                                      console.log('free issue item');

                                      let qty = itemWiseFreeIsuue[0].itemQuantity;

                                      let fqty = orderdata2[j].requiredQuantity;
                                      let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                                      let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                                      let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                                      let freeIssueQty;

                                      if (purchaseItemQty >= qty) {
                                        // this.openSnackBar('info', 'Success', '  free issue item qty available');
                                        console.log('free issue item qty available');

                                        let x = purchaseItemQty / qty;
                                        let y = purchaseItemQty % qty
                                        let z = (purchaseItemQty - y) / qty;

                                        if (x == 1) {
                                          freeIssueQty = freeIssueQty1;

                                        }
                                        else {

                                          freeIssueQty = freeIssueQty1 * z;

                                        }

                                        this.autoIncrement1 = this.autoIncrement1 + 1;
                                        this.addData2 = new InvoiceFreeIssue(
                                          this.autoIncrement1,
                                          orderdata2[j].genaratedId,
                                          itemcode,
                                          freeIssueItem,
                                          orderdata2[j].requiredQuantity,
                                          freeIssueQty,
                                          orderdata2[j].itemMaster.id,
                                          freeIssueItemId
                                        );
                                        this.invoiceFreeIssue.push(this.addData2);
                                      }
                                      else {

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
                                              orderdata2[j].genaratedId,
                                              maincatid,
                                              volume * purchaseItemQty
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

                                            if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                              console.log('pack size and qty eqel');

                                              let x = purchaseItemQty / qty;
                                              let y = purchaseItemQty % qty
                                              let z = (purchaseItemQty - y) / qty;


                                              if (x == 1) {
                                                freisqty = freisqty1;

                                              }
                                              else {

                                                freisqty = freisqty1 * z;

                                              }
                                              this.autoIncrement1 = this.autoIncrement1 + 1;
                                              this.addData2 = new InvoiceFreeIssue(
                                                this.autoIncrement1,
                                                orderdata2[j].genaratedId,
                                                itemcode,
                                                freeissuit,
                                                orderdata2[j].requiredQuantity,
                                                freisqty,
                                                orderdata2[j].itemMaster.id,
                                                fisuitemid
                                              );
                                              this.invoiceFreeIssue.push(this.addData2);

                                            }
                                            else {
                                              console.log('pack size pack size and qty not eqr');
                                              this.autoIncrement2 = this.autoIncrement2 + 1;
                                              this.addData3 = new TemporyVolume(
                                                this.autoIncrement2,
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * purchaseItemQty
                                              );
                                              this.temporyVolume.push(this.addData3);
                                            }
                                          }
                                        }

                                      }
                                    }

                                  }



                                }
                                else {
                                  console.log('no free Issue Items For free Issuea');
                                }


                                //end of the whole free issues

                              }
                            }
                          }



                          let sp;
                          let sdi;
                          let cusSpecialPrice2: CustomerSpecificPrice[] = this.allCustomerSpecific
                            .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === orderdata2[j].customer.id)
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
                                //this.openSnackBar('warn', 'Warn!', 'j1');

                                this.autoIncrement = this.autoIncrement + 1;
                                this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, orderdata2[j].pendingOrderQuantity, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                this.temporyInvoice.push(this.addData);
                                this.myForm.patchValue({ itemMasterId: null });
                                this.myForm.patchValue({ requiredQuantity: 0 });
                                this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);


                              }
                              else {

                                let item = orderdata2[j].itemMaster.itemCode;
                                let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Discount';

                                this.openSnackBar('Warning!', msg1);
                                this.addNew();/////////////////////if has some errror 
                              }


                            }
                            else {

                              if (this.spPrice > this.reacost) {
                                console.log('goes on secound');
                                // this.openSnackBar('warn', 'Warn!', 'j2');
                                this.autoIncrement = this.autoIncrement + 1;
                                this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, orderdata2[j].pendingOrderQuantity, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                this.temporyInvoice.push(this.addData);
                                this.myForm.patchValue({ itemMasterId: null });
                                this.myForm.patchValue({ requiredQuantity: 0 });
                                this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                              }
                              else {
                                let item = orderdata2[j].itemMaster.itemCode;
                                let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Price';

                                this.openSnackBar('Warning!', msg1);
                                this.addNew();/////////////////////if has some errror 

                              }

                            }

                          }
                          else {
                            console.log('goes on third');
                            //this.openSnackBar('warn', 'Warn!', 'j3');
                            this.autoIncrement = this.autoIncrement + 1;
                            this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, orderdata2[j].pendingOrderQuantity, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                            this.temporyInvoice.push(this.addData);
                            this.myForm.patchValue({ itemMasterId: null });
                            this.myForm.patchValue({ requiredQuantity: 0 });
                            this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);

                          }
                          let jtotal = 0;
                          let jnet = 0;
                          let discounts = 0;
                          for (let i = 0; i < this.temporyInvoice.length; i++) {



                            jtotal = jtotal + this.temporyInvoice[i].total;
                            jnet = jnet + this.temporyInvoice[i].netPrice;
                            discounts = jtotal + this.temporyInvoice[i].specialDiscount;
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

                          if (this.temporyInvoice.length != 0) {
                            this.orderConfirm = false;

                          }
                          else {

                            this.orderConfirm = true;

                          }


                        }//////////end of the qty available invoice
                        else {
                          this.openSnackBar('Warning', '  Not Enough Items In The Stok ');
                        }

                      }
                    }
                  }//end of the order list

                }

              }

            }

          }
        }//here the end first invoice

        else {


          if (this.confirmPassInvoice === false) {
            this.myForm.patchValue({ ordernumber: null });

            this.openSnackBar('Warning', 'You Dont have Enough Quantity');
            this.openSnackBar('Confirm', 'Do You want to Continue Click Part Orders Option');

          }
          else {
            this.openSnackBar('Success', 'Item Added To Cart');

            let orderdata: Orders[] = this.allordersdata
              .filter(Orders => Orders.id === jackx)
            if (orderdata === undefined) {
              console.log('undifined');
            } else {
              if (orderdata.length == 0) {
                console.log('no data');
              }
              else {

                this.orderId = orderdata[0].genaratedId;

                console.log('customwr name' + orderdata[0].customer.customerName);
                this.myForm.patchValue({ customer: orderdata[0].customer.customerName });
                this.myForm.patchValue({ vat: orderdata[0].customerCompany.vat });
                this.myForm.patchValue({ nbt: orderdata[0].customerCompany.nbt });
                this.myForm.patchValue({ orderperson: orderdata[0].orderdPersonName });
                this.myForm.patchValue({ post: orderdata[0].orderdPersonPost });
                this.myForm.patchValue({ contactnumber: orderdata[0].contactNumber });
                this.myForm.patchValue({ nic: orderdata[0].nicNumber });
                this.myForm.patchValue({ currentdate: orderdata[0].currentDate });
                this.myForm.patchValue({ requireddate: orderdata[0].requiedDate });
                this.myForm.patchValue({ ponumber: orderdata[0].poNumber });
                this.myForm.patchValue({ ordertype: orderdata[0].orderType.orderType });


                this.jgenaratedId = orderdata[0].genaratedId;
                this.jorderdPersonName = orderdata[0].orderdPersonName;
                this.jorderdPersonPost = orderdata[0].orderdPersonPost;
                this.jcontactNumber = orderdata[0].contactNumber;
                this.jnicNumber = orderdata[0].nicNumber;
                this.jcontactPersonImage = orderdata[0].contactPersonImage;
                this.jcurrentDate = orderdata[0].currentDate;
                this.jrequiedDate = orderdata[0].requiedDate;
                this.jpoNumber = orderdata[0].poNumber;
                this.jorderTypeid = orderdata[0].orderType.id;
                this.jorderType = orderdata[0].orderType.orderType;
                this.jcustomerid = orderdata[0].customer.id;
                this.jitemMasterid = orderdata[0].itemMaster.id;
                this.jregisterRepid = orderdata[0].registerRep.id;
                this.jcustomerCompanyid = orderdata[0].customerCompany.id;
                this.activemanualAdd = false;
                this.orderConfirm = false;



                let orderdata2: Orders[] = this.allordersdata
                  .filter(Orders => Orders.genaratedId === orderdata[0].genaratedId)
                if (orderdata2 === undefined) {
                  console.log('undifined');
                } else {
                  if (orderdata2.length == 0) {
                    console.log('items not available');
                  }
                  else {

                    console.log('jack  ' + orderdata2.length);

                    for (let j = 0; j < orderdata2.length; j++) {


                      let reqty = orderdata2[j].pendingOrderQuantity;
                      let pendingFreeisuueQty = orderdata2[j].pendingFreeIssueQuantity;
                      let purchaseItemQty = pendingFreeisuueQty + reqty;
                      console.log('jack qty ' + reqty);

                      let jPurQty = 0;
                      let temporyIn: TemporyInvoice[] = this.temporyInvoice
                        .filter(TemporyInvoice => TemporyInvoice.itemMasterId === orderdata2[j].itemMaster.id)
                      if (temporyIn.length === 0) {
                        console.log('undifined');
                        jPurQty = 0;
                        //this.openSnackBar('warn', 'Warn', '  emptyinvoice ');

                      } else {

                        for (let j = 0; j < temporyIn.length; j++) {

                          jPurQty = jPurQty + temporyIn[j].requiredQuantity;
                        }
                      }






                      let finishgoods: FinishGoodGRN[] = this.allfgrn
                        .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === orderdata2[j].itemMaster.id && FinishGoodGRN.remainingQuantity != 0)
                      if (finishgoods === undefined) {
                        console.log('undifined');
                      } else {
                        if (finishgoods.length == 0) {
                          this.openSnackBar('Warn', '  This Item Not available in the Stok ');

                        }
                        else {
                          let total1 = 0;
                          let total = 0;
                          let averageCost = 0;
                          let price = 0;
                          let discount;
                          let netprice = 0;

                          for (let j = 0; j < finishgoods.length; j++) {

                            total1 = total1 + 1;
                            total = total + finishgoods[j].remainingQuantity;
                            discount = finishgoods[j].discount;
                            price = price + ((finishgoods[j].price) / finishgoods[j].remainingQuantity) - ((finishgoods[j].price) / finishgoods[j].remainingQuantity) * discount / 100;
                          }

                          // total=total+orderdata2[j].pendingFreeIssueQuantity;
                          averageCost = price / total1;
                          console.log('average cost for 1 item  ' + averageCost);


                          total = total - jPurQty;

                          if (total === 0 || total < 0) {

                          }
                          else {
                            if (total <= reqty) {



                              ////////////////////here begann
                              //console.log('nic here'  + ponumber + currentDate + contactNumber);
                              let itemcode;
                              let customer;
                              let ordertype;
                              let maincatid;
                              let oripacks;
                              let volume;



                              let obj: ItemMaster[] = this.allitems
                                .filter(ItemMaster => ItemMaster.id === orderdata2[j].itemMaster.id)
                              if (obj === undefined) {
                              } else {

                                itemcode = obj[0].itemCode;
                                maincatid = obj[0].mainCatagory.id;
                                oripacks = obj[0].packSize;
                                volume = obj[0].volume;
                              }
                              let obj2: OrderType[] = this.allorderTypedata
                                .filter(OrderType => OrderType.id === orderdata2[j].orderType.id)

                              if (obj2 === undefined) {
                              } else {
                                // console.log(supi, si, i);
                                ordertype = obj2[0].orderType;
                              }
                              let obj3: Customer[] = this.allcustomers
                                .filter(Customer => Customer.id === orderdata2[j].customer.id)

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
                                .filter(ItemMaster => ItemMaster.id === orderdata2[j].itemMaster.id)
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

                              ///////////customer specialPrice
                              let cusSpecialPrice: CustomerSpecificPrice[] = this.allCustomerSpecific
                                .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === orderdata2[j].customer.id)
                              if (cusSpecialPrice === undefined) {

                                console.log('undifined');

                              } else {

                                if (cusSpecialPrice.length == 0) {
                                  console.log('no customer');
                                  this.customerAvailable = false;
                                  this.specialDiscount = 0;
                                  this.specialPrice = 0;
                                  this.totalPrice = netprice * total;
                                  this.netTotal = this.totalPrice;
                                  //this.openSnackBar('warn', 'Success', 'no customer');
                                  //here go to free issue//////////////////////////////////////////////


                                  if (orderdata2[j].itemStatus != "FreeIssue") {




                                    let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                                      .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === orderdata2[j].itemMaster.id)
                                    if (itemWiseFreeIsuue === undefined) {
                                      console.log('undifined');
                                    } else {
                                      if (itemWiseFreeIsuue.length == 0) {

                                        console.log('no free issue item');


                                        //start catagory wise

                                        let catwise: CatagoryWiseFreeIssue[] = this.allcatagorywisefreeisuue
                                          .filter(CatagoryWiseFreeIssue => CatagoryWiseFreeIssue.mainCatagory.id === maincatid)
                                        if (catwise === undefined) {
                                          console.log('undifined');
                                        } else {

                                          if (catwise.length == 0) {

                                            console.log('no dataaaa');


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



                                            if ((oripacks == packs) && (qty <= total + pendingFreeisuueQty)) {
                                              console.log('pack size and qty eqel');


                                              let x = total + pendingFreeisuueQty / qty;
                                              let y = total + pendingFreeisuueQty % qty
                                              let z = (total + pendingFreeisuueQty - y) / qty;


                                              if (x == 1) {
                                                freisqty = freisqty1;

                                              }
                                              else {

                                                freisqty = freisqty1 * z;

                                              }
                                              this.autoIncrement1 = this.autoIncrement1 + 1;
                                              this.addData2 = new InvoiceFreeIssue(
                                                this.autoIncrement1,
                                                orderdata2[j].genaratedId,
                                                itemcode,
                                                freeissuit,
                                                total,
                                                freisqty,
                                                orderdata2[j].itemMaster.id,
                                                fisuitemid
                                              );
                                              this.invoiceFreeIssue.push(this.addData2);
                                              this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                              let webServResponce3: WebServResponce;
                                              this.updateOrder = new Orders(orderdata2[j].id, '', '', '', '', '', '', null, null, '', null, orderdata2[j].pendingOrderQuantity, orderdata2[j].pendingFreeIssueQuantity, qty * z, 'Item', null, '', null, null, null, null, null);
                                              console.log('save ');
                                              this.ordersservice.updateQty(this.updateOrder)
                                                .subscribe(
                                                resObj => {
                                                  webServResponce3 = resObj;
                                                  if (webServResponce3.statusId == 200) {
                                                    console.log('saved');
                                                    this.getAll();
                                                  } else {
                                                    this.errorMessage = webServResponce3.errMessage;
                                                  }
                                                }
                                                ,
                                                error => this.errorMessage = <any>error
                                                );

                                              this.getAll();

                                            }
                                            else {
                                              console.log('pack size pack size and qty not eqr');
                                              this.autoIncrement2 = this.autoIncrement2 + 1;
                                              this.addData3 = new TemporyVolume(
                                                this.autoIncrement2,
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * total
                                              );
                                              this.temporyVolume.push(this.addData3);
                                            }




                                          }
                                        }

                                        //end catagorywise 

                                      }
                                      else {

                                        // this.openSnackBar('info', 'Success', '  free issue item available');
                                        console.log('free issue item');

                                        let qty = itemWiseFreeIsuue[0].itemQuantity;

                                        let fqty = total + pendingFreeisuueQty;
                                        let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                                        let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                                        let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                                        let freeIssueQty;

                                        if (fqty >= qty) {


                                          //this.openSnackBar('info', 'Success', '  free issue item qty available');
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
                                          this.addData2 = new InvoiceFreeIssue(
                                            this.autoIncrement1,
                                            orderdata2[j].genaratedId,
                                            itemcode,
                                            freeIssueItem,
                                            total,
                                            freeIssueQty,
                                            orderdata2[j].itemMaster.id,
                                            freeIssueItemId
                                          );
                                          this.invoiceFreeIssue.push(this.addData2);
                                          this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);


                                          let webServResponce3: WebServResponce;
                                          this.updateOrder = new Orders(orderdata2[j].id, '', '', '', '', '', '', null, null, '', null, orderdata2[j].pendingOrderQuantity, orderdata2[j].pendingFreeIssueQuantity, qty * z, 'Item', null, '', null, null, null, null, null);
                                          console.log('save ');
                                          this.ordersservice.updateQty(this.updateOrder)
                                            .subscribe(
                                            resObj => {
                                              webServResponce3 = resObj;
                                              if (webServResponce3.statusId == 200) {
                                                this.getAll();
                                              } else {
                                                this.errorMessage = webServResponce3.errMessage;
                                              }
                                            }
                                            ,
                                            error => this.errorMessage = <any>error
                                            );





                                        }
                                        else {

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
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * total
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



                                              if ((oripacks == packs) && (qty <= total + pendingFreeisuueQty)) {
                                                console.log('pack size and qty eqel');

                                                let x = total + pendingFreeisuueQty / qty;
                                                let y = total + pendingFreeisuueQty % qty
                                                let z = (total + pendingFreeisuueQty - y) / qty;


                                                if (x == 1) {
                                                  freisqty = freisqty1;

                                                }
                                                else {

                                                  freisqty = freisqty1 * z;

                                                }
                                                this.autoIncrement1 = this.autoIncrement1 + 1;
                                                this.addData2 = new InvoiceFreeIssue(
                                                  this.autoIncrement1,
                                                  orderdata2[j].genaratedId,
                                                  itemcode,
                                                  freeissuit,
                                                  total,
                                                  freisqty,
                                                  orderdata2[j].itemMaster.id,
                                                  fisuitemid
                                                );
                                                this.invoiceFreeIssue.push(this.addData2);
                                                this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);


                                                let webServResponce3: WebServResponce;
                                                this.updateOrder = new Orders(orderdata2[j].id, '', '', '', '', '', '', null, null, '', null, orderdata2[j].pendingOrderQuantity, orderdata2[j].pendingFreeIssueQuantity, qty * z, 'Item', null, '', null, null, null, null, null);
                                                console.log('save ');
                                                this.ordersservice.updateQty(this.updateOrder)
                                                  .subscribe(
                                                  resObj => {
                                                    webServResponce3 = resObj;
                                                    if (webServResponce3.statusId == 200) {
                                                      this.getAll();
                                                    } else {
                                                      this.errorMessage = webServResponce3.errMessage;
                                                    }
                                                  }
                                                  ,
                                                  error => this.errorMessage = <any>error
                                                  );







                                              }
                                              else {
                                                console.log('pack size pack size and qty not eqr');
                                                this.autoIncrement2 = this.autoIncrement2 + 1;
                                                this.addData3 = new TemporyVolume(
                                                  this.autoIncrement2,
                                                  orderdata2[j].genaratedId,
                                                  maincatid,
                                                  volume * total
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
                                    console.log('No free issue For Free Issue');

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
                                    .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === orderdata2[j].itemMaster.id)
                                  if (grncost === undefined) {
                                    console.log('undifined');
                                  } else {
                                    if (grncost.length != 0) {
                                      console.log('data available');

                                      let buyingp = grncost[0].price;///////////////////////////////////////
                                      let byqty = grncost[0].quantity;
                                      let dis = grncost[0].discount;
                                      let realpricefor1 = buyingp / byqty;//one item cost
                                      let disprice = (realpricefor1 * dis) / 100;
                                      let finalitemcost = realpricefor1 - disprice;//final cost for one item


                                      this.reacost = averageCost;//////////////////////////////item real cost hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee



                                    }
                                    else {
                                      console.log('no data available');
                                    }

                                  }
                                  if (cusitem === orderdata2[j].itemMaster.id) {
                                    //this.openSnackBar('info', 'Success', ' item available');

                                    console.log('item available');
                                    this.customerAvailable = true;

                                    if (cusSprice == 0) {




                                      newprice = (netprice - ((netprice * customerSpeDis) / 100)) * total;
                                      this.spDis = netprice - ((netprice * customerSpeDis) / 100);


                                      console.log('special discount ' + customerSpeDis);
                                      console.log('special discount price ' + ((netprice * customerSpeDis) / 100));
                                      console.log('net price after special discount ' + newprice);
                                      this.specialDiscount = customerSpeDis;
                                      this.specialPrice = 0;
                                      this.netTotal = newprice;
                                      this.totalPrice = netprice * total;

                                    }
                                    else {

                                      let newpricep = netprice - cusSprice;

                                      console.log('special price ' + cusSprice);
                                      console.log('net  price after special price ' + cusSprice);
                                      this.specialDiscount = 0;
                                      this.specialPrice = cusSprice;
                                      this.netTotal = cusSprice * total;
                                      this.totalPrice = netprice * total;
                                    }


                                  }
                                  else {

                                    console.log('item not available');
                                    this.customerAvailable = false;

                                    this.specialDiscount = 0;
                                    this.specialPrice = 0;
                                    this.totalPrice = netprice * total;
                                    this.netTotal = this.totalPrice;

                                    //here go to free issue///////////////////////////////////////////


                                    if (orderdata2[j].itemStatus != "FreeIssue") {




                                      let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                                        .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === orderdata2[j].itemMaster.id)
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
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * total
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

                                              if ((oripacks == packs) && (qty <= total + pendingFreeisuueQty)) {
                                                console.log('pack size and qty eqel');


                                                let x = total + pendingFreeisuueQty / qty;
                                                let y = total + pendingFreeisuueQty % qty
                                                let z = (total + pendingFreeisuueQty - y) / qty;


                                                if (x == 1) {
                                                  freisqty = freisqty1;

                                                }
                                                else {

                                                  freisqty = freisqty1 * z;

                                                }
                                                this.autoIncrement1 = this.autoIncrement1 + 1;
                                                this.addData2 = new InvoiceFreeIssue(
                                                  this.autoIncrement1,
                                                  orderdata2[j].genaratedId,
                                                  itemcode,
                                                  freeissuit,
                                                  total,
                                                  freisqty,
                                                  orderdata2[j].itemMaster.id,
                                                  fisuitemid
                                                );
                                                this.invoiceFreeIssue.push(this.addData2);
                                                this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                                let webServResponce3: WebServResponce;
                                                this.updateOrder = new Orders(orderdata2[j].id, '', '', '', '', '', '', null, null, '', null, orderdata2[j].pendingOrderQuantity, orderdata2[j].pendingFreeIssueQuantity, qty * z, 'Item', null, '', null, null, null, null, null);
                                                console.log('save ');
                                                this.ordersservice.updateQty(this.updateOrder)
                                                  .subscribe(
                                                  resObj => {
                                                    webServResponce3 = resObj;
                                                    if (webServResponce3.statusId == 200) {
                                                      this.getAll();
                                                    } else {
                                                      this.errorMessage = webServResponce3.errMessage;
                                                    }
                                                  }
                                                  ,
                                                  error => this.errorMessage = <any>error
                                                  );





                                              }
                                              else {
                                                console.log('pack size pack size and qty not eqr');
                                                this.autoIncrement2 = this.autoIncrement2 + 1;
                                                this.addData3 = new TemporyVolume(
                                                  this.autoIncrement2,
                                                  orderdata2[j].genaratedId,
                                                  maincatid,
                                                  volume * total
                                                );
                                                this.temporyVolume.push(this.addData3);
                                              }
                                            }
                                          }

                                          //end catagorywise 

                                        }
                                        else {

                                          // this.openSnackBar('info', 'Success', '  free issue item available');
                                          console.log('free issue item');

                                          let qty = itemWiseFreeIsuue[0].itemQuantity;

                                          let fqty = total + pendingFreeisuueQty;
                                          let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                                          let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                                          let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                                          let freeIssueQty;

                                          if (fqty >= qty) {


                                            //this.openSnackBar('info', 'Success', '  free issue item qty available');
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
                                            this.addData2 = new InvoiceFreeIssue(
                                              this.autoIncrement1,
                                              orderdata2[j].genaratedId,
                                              itemcode,
                                              freeIssueItem,
                                              total,
                                              freeIssueQty,
                                              orderdata2[j].itemMaster.id,
                                              freeIssueItemId
                                            );
                                            this.invoiceFreeIssue.push(this.addData2);

                                            this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                            let webServResponce3: WebServResponce;
                                            this.updateOrder = new Orders(orderdata2[j].id, '', '', '', '', '', '', null, null, '', null, orderdata2[j].pendingOrderQuantity, orderdata2[j].pendingFreeIssueQuantity, qty * z, 'Item', null, '', null, null, null, null, null);
                                            console.log('save ');
                                            this.ordersservice.updateQty(this.updateOrder)
                                              .subscribe(
                                              resObj => {
                                                webServResponce3 = resObj;
                                                if (webServResponce3.statusId == 200) {
                                                  this.getAll();
                                                } else {
                                                  this.errorMessage = webServResponce3.errMessage;
                                                }
                                              }
                                              ,
                                              error => this.errorMessage = <any>error
                                              );




                                          }
                                          else {

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
                                                  orderdata2[j].genaratedId,
                                                  maincatid,
                                                  volume * total
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

                                                if ((oripacks == packs) && (qty <= total + pendingFreeisuueQty)) {
                                                  console.log('pack size and qty eqel');

                                                  let x = total + pendingFreeisuueQty / qty;
                                                  let y = total + pendingFreeisuueQty % qty
                                                  let z = (total + pendingFreeisuueQty - y) / qty;


                                                  if (x == 1) {
                                                    freisqty = freisqty1;

                                                  }
                                                  else {

                                                    freisqty = freisqty1 * z;

                                                  }
                                                  this.autoIncrement1 = this.autoIncrement1 + 1;
                                                  this.addData2 = new InvoiceFreeIssue(
                                                    this.autoIncrement1,
                                                    orderdata2[j].genaratedId,
                                                    itemcode,
                                                    freeissuit,
                                                    total,
                                                    freisqty,
                                                    orderdata2[j].itemMaster.id,
                                                    fisuitemid
                                                  );
                                                  this.invoiceFreeIssue.push(this.addData2);
                                                  this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);

                                                  let webServResponce3: WebServResponce;
                                                  this.updateOrder = new Orders(orderdata2[j].id, '', '', '', '', '', '', null, null, '', null, orderdata2[j].pendingOrderQuantity, orderdata2[j].pendingFreeIssueQuantity, qty * z, 'Item', null, '', null, null, null, null, null);
                                                  console.log('save ');
                                                  this.ordersservice.updateQty(this.updateOrder)
                                                    .subscribe(
                                                    resObj => {
                                                      webServResponce3 = resObj;
                                                      if (webServResponce3.statusId == 200) {
                                                        this.getAll();
                                                      } else {
                                                        this.errorMessage = webServResponce3.errMessage;
                                                      }
                                                    }
                                                    ,
                                                    error => this.errorMessage = <any>error
                                                    );



                                                }
                                                else {
                                                  console.log('pack size pack size and qty not eqr');

                                                }
                                              }
                                            }

                                          }


                                        }

                                        //end of the whole free issues

                                      }



                                    }

                                    else {
                                      console.log('No free issue For Free Issue');
                                    }
                                  }
                                }
                              }



                              let sp;
                              let sdi;
                              let cusSpecialPrice2: CustomerSpecificPrice[] = this.allCustomerSpecific
                                .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === orderdata2[j].customer.id)
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

                                    //this.openSnackBar('warn', 'Warn!', 'jack1');

                                    console.log('goes on first');
                                    this.autoIncrement = this.autoIncrement + 1;
                                    this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, total, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                    this.temporyInvoice.push(this.addData);
                                    this.myForm.patchValue({ itemMasterId: null });
                                    this.myForm.patchValue({ requiredQuantity: 0 });
                                    this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                                  }
                                  else {

                                    let item = orderdata2[j].itemMaster.itemCode;
                                    let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Discount';

                                    this.openSnackBar('Warn!', msg1);
                                    this.addNew();/////////////////////if has some errror 
                                  }


                                }
                                else {

                                  if (this.spPrice > this.reacost) {
                                    console.log('goes on secound');
                                    //this.openSnackBar('warn', 'Warn!', 'jack2');

                                    this.autoIncrement = this.autoIncrement + 1;
                                    this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, total, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                    this.temporyInvoice.push(this.addData);
                                    this.myForm.patchValue({ itemMasterId: null });
                                    this.myForm.patchValue({ requiredQuantity: 0 });
                                    this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                                  }
                                  else {
                                    let item = orderdata2[j].itemMaster.itemCode;
                                    let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Price';

                                    this.openSnackBar('Warning!', msg1);
                                    this.addNew();/////////////////////if has some errror 

                                  }

                                }

                              }
                              else {
                                console.log('goes on third');
                                // this.openSnackBar('warn', 'Warn!', 'jack3');

                                this.autoIncrement = this.autoIncrement + 1;
                                this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, total, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                this.temporyInvoice.push(this.addData);
                                this.myForm.patchValue({ itemMasterId: null });
                                this.myForm.patchValue({ requiredQuantity: 0 });
                                this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                              }
                              let jtotal = 0;
                              let jnet = 0;
                              let discounts = 0;
                              for (let i = 0; i < this.temporyInvoice.length; i++) {



                                jtotal = jtotal + this.temporyInvoice[i].total;
                                jnet = jnet + this.temporyInvoice[i].netPrice;
                                discounts = jtotal + this.temporyInvoice[i].specialDiscount;
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

                              if (this.temporyInvoice.length != 0) {
                                this.orderConfirm = false;

                              }
                              else {

                                this.orderConfirm = true;

                              }


                            }//////////end of the qty available invoice
                            else {




                              //console.log('nic here'  + ponumber + currentDate + contactNumber);
                              let itemcode;
                              let customer;
                              let ordertype;
                              let maincatid;
                              let oripacks;
                              let volume;
                              let itemid;



                              let obj: ItemMaster[] = this.allitems
                                .filter(ItemMaster => ItemMaster.id === orderdata2[j].itemMaster.id)
                              if (obj === undefined) {
                              } else {
                                itemid = obj[0].id;
                                itemcode = obj[0].itemCode;
                                maincatid = obj[0].mainCatagory.id;
                                oripacks = obj[0].packSize;
                                volume = obj[0].volume;
                              }
                              let obj2: OrderType[] = this.allorderTypedata
                                .filter(OrderType => OrderType.id === orderdata2[j].orderType.id)

                              if (obj2 === undefined) {
                              } else {
                                // console.log(supi, si, i);
                                ordertype = obj2[0].orderType;
                              }
                              let obj3: Customer[] = this.allcustomers
                                .filter(Customer => Customer.id === orderdata2[j].customer.id)

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
                                .filter(ItemMaster => ItemMaster.id === orderdata2[j].itemMaster.id)
                              if (itemprice === undefined) {
                                console.log('undifined');
                              } else {
                                if (itemprice.length == 0) { }
                                else {
                                  discount = itemprice[0].discount;
                                  mxreprice = itemprice[0].maxRetail;
                                  if (itemprice[0].discount == null || itemprice[0].discount === 0) {
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

                              ///////////customer specialPrice
                              let cusSpecialPrice: CustomerSpecificPrice[] = this.allCustomerSpecific
                                .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === orderdata2[j].customer.id)
                              if (cusSpecialPrice === undefined) {

                                console.log('undifined');

                              } else {

                                if (cusSpecialPrice.length == 0) {
                                  console.log('no customer');
                                  this.customerAvailable = false;
                                  this.specialDiscount = 0;
                                  this.specialPrice = 0;
                                  this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;
                                  this.netTotal = this.totalPrice;



                                  if (orderdata2[j].itemStatus != "FreeIssue") {



                                    //here go to free issue//////////////////////////////////////////////
                                    let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                                      .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === orderdata2[j].itemMaster.id)
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
                                              orderdata2[j].genaratedId,
                                              maincatid,
                                              volume * purchaseItemQty
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

                                            if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                              console.log('pack size and qty eqel');

                                              let x = purchaseItemQty / qty;
                                              let y = purchaseItemQty % qty
                                              let z = (purchaseItemQty - y) / qty;


                                              if (x == 1) {
                                                freisqty = freisqty1;

                                              }
                                              else {

                                                freisqty = freisqty1 * z;

                                              }
                                              this.autoIncrement1 = this.autoIncrement1 + 1;
                                              this.addData2 = new InvoiceFreeIssue(
                                                this.autoIncrement1,
                                                orderdata2[j].genaratedId,
                                                itemcode,
                                                freeissuit,
                                                orderdata2[j].requiredQuantity,
                                                freisqty,
                                                orderdata2[j].itemMaster.id,
                                                fisuitemid
                                              );
                                              this.invoiceFreeIssue.push(this.addData2);
                                              this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                            }
                                            else {
                                              console.log('pack size pack size and qty not eqr');
                                              this.autoIncrement2 = this.autoIncrement2 + 1;
                                              this.addData3 = new TemporyVolume(
                                                this.autoIncrement2,
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * purchaseItemQty
                                              );
                                              this.temporyVolume.push(this.addData3);
                                            }
                                          }
                                        }

                                        //end catagorywise 

                                      }
                                      else {

                                        // this.openSnackBar('info', 'Success', '  free issue item available');
                                        console.log('free issue item');

                                        let qty = itemWiseFreeIsuue[0].itemQuantity;

                                        let fqty = orderdata2[j].requiredQuantity;
                                        let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                                        let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                                        let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                                        let freeIssueQty;

                                        if (purchaseItemQty >= qty) {
                                          // this.openSnackBar('info', 'Success', '  free issue item qty available');
                                          console.log('free issue item qty available');

                                          let x = purchaseItemQty / qty;
                                          let y = purchaseItemQty % qty
                                          let z = (purchaseItemQty - y) / qty;

                                          if (x == 1) {
                                            freeIssueQty = freeIssueQty1;
                                          }
                                          else {

                                            freeIssueQty = freeIssueQty1 * z;

                                          }

                                          this.autoIncrement1 = this.autoIncrement1 + 1;
                                          this.addData2 = new InvoiceFreeIssue(
                                            this.autoIncrement1,
                                            orderdata2[j].genaratedId,
                                            itemcode,
                                            freeIssueItem,
                                            orderdata2[j].requiredQuantity,
                                            freeIssueQty,
                                            orderdata2[j].itemMaster.id,
                                            freeIssueItemId
                                          );
                                          this.invoiceFreeIssue.push(this.addData2);
                                          this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                        }
                                        else {

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
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * purchaseItemQty
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

                                              if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                                console.log('pack size and qty eqel');

                                                let x = purchaseItemQty / qty;
                                                let y = purchaseItemQty % qty
                                                let z = (purchaseItemQty - y) / qty;


                                                if (x == 1) {
                                                  freisqty = freisqty1;

                                                }
                                                else {

                                                  freisqty = freisqty1 * z;

                                                }
                                                this.autoIncrement1 = this.autoIncrement1 + 1;
                                                this.addData2 = new InvoiceFreeIssue(
                                                  this.autoIncrement1,
                                                  orderdata2[j].genaratedId,
                                                  itemcode,
                                                  freeissuit,
                                                  orderdata2[j].requiredQuantity,
                                                  freisqty,
                                                  orderdata2[j].itemMaster.id,
                                                  fisuitemid
                                                );
                                                this.invoiceFreeIssue.push(this.addData2);
                                                this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                              }
                                              else {
                                                console.log('pack size pack size and qty not eqr');
                                                this.autoIncrement2 = this.autoIncrement2 + 1;
                                                this.addData3 = new TemporyVolume(
                                                  this.autoIncrement2,
                                                  orderdata2[j].genaratedId,
                                                  maincatid,
                                                  volume * purchaseItemQty
                                                );
                                                this.temporyVolume.push(this.addData3);
                                              }
                                            }
                                          }

                                        }
                                      }

                                    }

                                  }
                                  else {
                                    console.log('no freeissue for freeIssue');

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
                                    .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === orderdata2[j].itemMaster.id && FinishGoodGRN.remainingQuantity != 0)
                                  if (grncost === undefined) {
                                    console.log('undifined');
                                  } else {
                                    if (grncost.length != 0) {
                                      console.log('data available');

                                      let buyingp = grncost[0].price;///////////////////////////////////////
                                      let byqty = grncost[0].quantity;
                                      let dis = grncost[0].discount;
                                      let realpricefor1 = buyingp / byqty;//one item cost
                                      let disprice = (realpricefor1 * dis) / 100;
                                      let finalitemcost = realpricefor1 - disprice;//final cost for one item


                                      this.reacost = averageCost;



                                    }
                                    else {
                                      console.log('no data available');
                                    }

                                  }
                                  if (cusitem === orderdata2[j].itemMaster.id) {
                                    //this.openSnackBar('info', 'Success', ' item available');

                                    console.log('item available');
                                    this.customerAvailable = true;

                                    if (cusSprice == 0) {




                                      newprice = (netprice - ((netprice * customerSpeDis) / 100)) * orderdata2[j].pendingOrderQuantity;
                                      this.spDis = netprice - ((netprice * customerSpeDis) / 100);


                                      console.log('special discount ' + customerSpeDis);
                                      console.log('special discount price ' + ((netprice * customerSpeDis) / 100));
                                      console.log('net price after special discount ' + newprice);
                                      this.specialDiscount = customerSpeDis;
                                      this.specialPrice = 0;
                                      this.netTotal = newprice;
                                      this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;

                                    }
                                    else {

                                      let newpricep = netprice - cusSprice;

                                      console.log('special price ' + cusSprice);
                                      console.log('net  price after special price ' + cusSprice);
                                      this.specialDiscount = 0;
                                      this.specialPrice = cusSprice;
                                      this.netTotal = cusSprice * orderdata2[j].pendingOrderQuantity;
                                      this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;
                                    }


                                  }
                                  else {

                                    console.log('item not available');
                                    this.customerAvailable = false;

                                    this.specialDiscount = 0;
                                    this.specialPrice = 0;
                                    this.totalPrice = netprice * orderdata2[j].pendingOrderQuantity;

                                    this.netTotal = this.totalPrice;

                                    //here go to free issue///////////////////////////////////////////

                                    if (orderdata2[j].itemStatus != "FreeIssue") {

                                      let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                                        .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === orderdata2[j].itemMaster.id)
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
                                                orderdata2[j].genaratedId,
                                                maincatid,
                                                volume * purchaseItemQty
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

                                              if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                                console.log('pack size and qty eqel');

                                                let x = purchaseItemQty / qty;
                                                let y = purchaseItemQty % qty
                                                let z = (purchaseItemQty - y) / qty;


                                                if (x == 1) {
                                                  freisqty = freisqty1;

                                                }
                                                else {

                                                  freisqty = freisqty1 * z;

                                                }
                                                this.autoIncrement1 = this.autoIncrement1 + 1;
                                                this.addData2 = new InvoiceFreeIssue(
                                                  this.autoIncrement1,
                                                  orderdata2[j].genaratedId,
                                                  itemcode,
                                                  freeissuit,
                                                  orderdata2[j].requiredQuantity,
                                                  freisqty,
                                                  orderdata2[j].itemMaster.id,
                                                  fisuitemid
                                                );
                                                this.invoiceFreeIssue.push(this.addData2);
                                                this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                              }
                                              else {
                                                console.log('pack size pack size and qty not eqr');
                                                this.autoIncrement2 = this.autoIncrement2 + 1;
                                                this.addData3 = new TemporyVolume(
                                                  this.autoIncrement2,
                                                  orderdata2[j].genaratedId,
                                                  maincatid,
                                                  volume * purchaseItemQty
                                                );
                                                this.temporyVolume.push(this.addData3);
                                              }
                                            }
                                          }

                                          //end catagorywise 

                                        }
                                        else {

                                          // this.openSnackBar('info', 'Success', '  free issue item available');
                                          console.log('free issue item');

                                          let qty = itemWiseFreeIsuue[0].itemQuantity;

                                          let fqty = orderdata2[j].requiredQuantity;
                                          let freeIssueItem = itemWiseFreeIsuue[0].itemMaster2.itemCode;
                                          let freeIssueQty1 = itemWiseFreeIsuue[0].freeIssueQuantity;
                                          let freeIssueItemId = itemWiseFreeIsuue[0].itemMaster2.id;
                                          let freeIssueQty;

                                          if (purchaseItemQty >= qty) {
                                            // this.openSnackBar('info', 'Success', '  free issue item qty available');
                                            console.log('free issue item qty available');

                                            let x = purchaseItemQty / qty;
                                            let y = purchaseItemQty % qty
                                            let z = (purchaseItemQty - y) / qty;

                                            if (x == 1) {
                                              freeIssueQty = freeIssueQty1;

                                            }
                                            else {

                                              freeIssueQty = freeIssueQty1 * z;

                                            }

                                            this.autoIncrement1 = this.autoIncrement1 + 1;
                                            this.addData2 = new InvoiceFreeIssue(
                                              this.autoIncrement1,
                                              orderdata2[j].genaratedId,
                                              itemcode,
                                              freeIssueItem,
                                              orderdata2[j].requiredQuantity,
                                              freeIssueQty,
                                              orderdata2[j].itemMaster.id,
                                              freeIssueItemId
                                            );
                                            this.invoiceFreeIssue.push(this.addData2);
                                            this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                          }
                                          else {

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
                                                  orderdata2[j].genaratedId,
                                                  maincatid,
                                                  volume * purchaseItemQty
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

                                                if ((oripacks == packs) && (qty <= purchaseItemQty)) {
                                                  console.log('pack size and qty eqel');

                                                  let x = purchaseItemQty / qty;
                                                  let y = purchaseItemQty % qty
                                                  let z = (purchaseItemQty - y) / qty;


                                                  if (x == 1) {
                                                    freisqty = freisqty1;

                                                  }
                                                  else {

                                                    freisqty = freisqty1 * z;

                                                  }
                                                  this.autoIncrement1 = this.autoIncrement1 + 1;
                                                  this.addData2 = new InvoiceFreeIssue(
                                                    this.autoIncrement1,
                                                    orderdata2[j].genaratedId,
                                                    itemcode,
                                                    freeissuit,
                                                    orderdata2[j].requiredQuantity,
                                                    freisqty,
                                                    orderdata2[j].itemMaster.id,
                                                    fisuitemid
                                                  );
                                                  this.invoiceFreeIssue.push(this.addData2);
                                                  this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                                                }
                                                else {
                                                  console.log('pack size pack size and qty not eqr');
                                                  this.autoIncrement2 = this.autoIncrement2 + 1;
                                                  this.addData3 = new TemporyVolume(
                                                    this.autoIncrement2,
                                                    orderdata2[j].genaratedId,
                                                    maincatid,
                                                    volume * purchaseItemQty
                                                  );
                                                  this.temporyVolume.push(this.addData3);
                                                }
                                              }
                                            }

                                          }
                                        }

                                      }



                                    }
                                    else {
                                      console.log('no free Issue Items For free Issuea');
                                    }


                                    //end of the whole free issues

                                  }
                                }
                              }



                              let sp;
                              let sdi;
                              let cusSpecialPrice2: CustomerSpecificPrice[] = this.allCustomerSpecific
                                .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === orderdata2[j].customer.id)
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
                                    //this.openSnackBar('warn', 'Warn!', 'j1');

                                    this.autoIncrement = this.autoIncrement + 1;
                                    this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, orderdata2[j].pendingOrderQuantity, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                    this.temporyInvoice.push(this.addData);
                                    this.myForm.patchValue({ itemMasterId: null });
                                    this.myForm.patchValue({ requiredQuantity: 0 });
                                    this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                                  }
                                  else {

                                    let item = orderdata2[j].itemMaster.itemCode;
                                    let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Discount';

                                    this.openSnackBar('Warning!', msg1);
                                    this.addNew();/////////////////////if has some errror 
                                  }


                                }
                                else {

                                  if (this.spPrice > this.reacost) {
                                    console.log('goes on secound');
                                    // this.openSnackBar('warn', 'Warn!', 'j2');
                                    this.autoIncrement = this.autoIncrement + 1;
                                    this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, orderdata2[j].pendingOrderQuantity, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                    this.temporyInvoice.push(this.addData);
                                    this.myForm.patchValue({ itemMasterId: null });
                                    this.myForm.patchValue({ requiredQuantity: 0 });
                                    this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                                  }
                                  else {
                                    let item = orderdata2[j].itemMaster.itemCode;
                                    let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Price';

                                    this.openSnackBar('Warning!', msg1);
                                    this.addNew();/////////////////////if has some errror 

                                  }

                                }

                              }
                              else {
                                console.log('goes on third');
                                //this.openSnackBar('warn', 'Warn!', 'j3');
                                this.autoIncrement = this.autoIncrement + 1;
                                this.addData = new TemporyInvoice(this.autoIncrement, orderdata2[j].genaratedId, orderdata2[j].orderdPersonName, orderdata2[j].orderdPersonPost, orderdata2[j].contactNumber, orderdata2[j].nicNumber, orderdata2[j].contactPersonImage, orderdata2[j].currentDate, orderdata2[j].requiedDate, orderdata2[j].poNumber, orderdata2[j].pendingOrderQuantity, orderdata2[j].orderType.id, ordertype, orderdata2[j].customer.id, customer, orderdata2[j].itemMaster.id, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, orderdata2[j].registerRep.id, orderdata2[j].customerCompany.id, orderdata2[j].itemStatus);
                                this.temporyInvoice.push(this.addData);
                                this.myForm.patchValue({ itemMasterId: null });
                                this.myForm.patchValue({ requiredQuantity: 0 });
                                this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);

                              }
                              let jtotal = 0;
                              let jnet = 0;
                              let discounts = 0;
                              for (let i = 0; i < this.temporyInvoice.length; i++) {



                                jtotal = jtotal + this.temporyInvoice[i].total;
                                jnet = jnet + this.temporyInvoice[i].netPrice;
                                discounts = jtotal + this.temporyInvoice[i].specialDiscount;
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

                              if (this.temporyInvoice.length != 0) {
                                this.orderConfirm = false;

                              }
                              else {

                                this.orderConfirm = true;

                              }


                            }//////////end of the qty available invoice



                          }





                        }
                      }
                    }//end of the order list

                  }

                }

              }

            }

            this.getAll();
          }
        }
      }
      this.checkj();
    }










  }

  FilterOrderItems() {

  }



  checkWholeSale(jnetPrice) {

    console.log('mama hoyanawa ' + jnetPrice);


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

        if (jnetPrice > startPrice && jnetPrice < endPrice) {
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
                // console.log('items' + wholesaleItems[j].item.itemCode);     here must be changeeeee

                let cartdata: Jtemporywholesale[] = this.jtemporywholesale
                  .filter(Jtemporywholesale => Jtemporywholesale.itemMasterId === wholesaleItems[j].item.id)
                if (cartdata === undefined) {
                } else {
                  if (cartdata.length == 0) {
                    console.log('no items founds');
                  }
                  else {

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

  jack() {


    if (this.finalinvoice === false) {
      this.openSnackBar('Success! ', 'OrderComplete');

      let OrderVolume: OrderVolumeWise[] = this.allorderVolumeWises
        .filter(OrderVolumeWise => OrderVolumeWise.orderId === this.jgenaratedId)
      if (OrderVolume === undefined) {
      } else {
        if (OrderVolume.length == 0) {

        }
        else {
          for (let i = 0; i < OrderVolume.length; i++) {

            let catagory;
            let freeIssue;

            let itemmaster: ItemMaster[] = this.allitems
              .filter(ItemMaster => ItemMaster.mainCatagory.id === OrderVolume[i].purchasedItemid)
            if (itemmaster === undefined) {
            } else {
              catagory = itemmaster[0].mainCatagory.mainCatagoryName;
            }

            let itemmaster2: ItemMaster[] = this.allitems
              .filter(ItemMaster => ItemMaster.id === OrderVolume[i].freeIssueItemid)
            if (itemmaster2 === undefined) {
            } else {
              freeIssue = itemmaster2[0].itemCode;
            }
            this.autoIncrement1 = this.autoIncrement1 + 1;
            this.addData2 = new OrderFreeIssue(
              this.autoIncrement1,
              this.genaratedId,
              catagory,
              freeIssue,
              OrderVolume[i].purchasedItemQuantity,
              OrderVolume[i].freeIssueItemQuantity,
              OrderVolume[i].purchasedItemid,
              OrderVolume[i].freeIssueItemid
            );
            this.invoiceFreeIssue.push(this.addData2);
            this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
          }
        }
      }

      let netTotal = 0;
      let jackInvoice: Invoice[] = this.alldata
        .filter(Invoice => Invoice.orderId === this.jgenaratedId && Invoice.itemStatus === "Item")
      if (jackInvoice === undefined) {
      } else {
        if (jackInvoice.length == 0) {

        }
        else {

          let netPrice = 0;

          for (let i = 0; i < jackInvoice.length; i++) {

            this.autoIncrement4 = this.autoIncrement4 + 1;
            this.addData6 = new Jtemporywholesale(this.autoIncrement4, jackInvoice[i].itemMaster.id, jackInvoice[i].soldPrice);
            this.jtemporywholesale.push(this.addData6);

          }

          for (let j = 0; j < this.temporyInvoice.length; j++) {

            this.autoIncrement4 = this.autoIncrement4 + 1;
            this.addData6 = new Jtemporywholesale(this.autoIncrement4, this.temporyInvoice[j].itemMasterId, this.temporyInvoice[j].netPrice);
            this.jtemporywholesale.push(this.addData6);

          }


          for (let j = 0; j < this.jtemporywholesale.length; j++) {

            netTotal = netTotal + this.jtemporywholesale[j].netPrice;

          }



          console.log(' strjjj  ' + JSON.stringify(this.jtemporywholesale));

        }



      }


      console.log('total is ' + netTotal);
      this.checkWholeSale(netTotal);
    }
    else {

    }




    if (this.invoiceFreeIssue.length == 0) {
      this.saveConfirm = false;
      this.orderConfirm = true;
    }
    else {

      for (let j = 0; j < this.invoiceFreeIssue.length; j++) {

        let freeissueItem;
        let freeissueItemQuantity = 0;
        let temporyInvoiceqty = 0;
        let grnQty = 0;
        freeissueItem = this.invoiceFreeIssue[j].FreeIssueItemid;
        freeissueItemQuantity = this.invoiceFreeIssue[j].FreeIssueItemQuantity;

        let obj: TemporyInvoice[] = this.temporyInvoice
          .filter(TemporyInvoice => TemporyInvoice.itemMasterId === freeissueItem)

        if (obj === undefined) {
          console.log('undifine');
        } else {
          if (obj.length == 0) {
            freeissueItemQuantity = freeissueItemQuantity;
          }
          else {
            temporyInvoiceqty = obj[0].requiredQuantity;
            freeissueItemQuantity = freeissueItemQuantity + temporyInvoiceqty;
          }
        }

        let obj2: FinishGoodGRN[] = this.allfgrn
          .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === freeissueItem && FinishGoodGRN.remainingQuantity != 0)

        if (obj2 === undefined) {
          console.log('undifine');
        } else {
          if (obj2.length == 0) {
            console.log('no item found');
            let msg = this.invoiceFreeIssue[j].FreeIssueItemcode + ' Free Issue Item  Not Available In Current Sotck !';
            this.openSnackBar('Warning', msg);
            this.saveConfirm = false;
            this.orderConfirm = true;
            this.freeIssuePartsale = true;


          }
          else {

            for (let i = 0; i < obj2.length; i++) {
              grnQty = grnQty + obj2[i].remainingQuantity;
            }

            if (grnQty >= freeissueItemQuantity) {
              this.saveConfirm = false;
              this.orderConfirm = true;
              this.openSnackBar('Success', 'Invoice Confirmed');
              this.freeIssueAvailability = grnQty - temporyInvoiceqty;
              console.log('valusess ' + this.freeIssueAvailability);


            }
            else {

              this.saveConfirm = false;
              this.orderConfirm = true;
              this.freeIssueAvailability = grnQty - temporyInvoiceqty;
              let msg = this.invoiceFreeIssue[j].FreeIssueItemcode + ' Free Issue Item Quantity Not Engouh For Sale !' + this.freeIssueAvailability;

              this.openSnackBar('Warn', msg);

            }
          }
        }

      }

    }


    if (this.invoiceFreeIssue.length == 0) {
      this.openSnackBar('Sorry ', 'You have No any FreeItems Receved');
    }
    else {

      let jtotal = 0;
      for (let j = 0; j < this.invoiceFreeIssue.length; j++) {

        jtotal = jtotal + this.invoiceFreeIssue[j].FreeIssueItemQuantity;

      }
      let msg = 'You Have ' + jtotal + ' Free Issue Items';
      this.openSnackBar('Congradulations! ', msg);


    }



    this.saveConfirm = false;
    this.orderConfirm = true;
    this.printConfirm = false;

  }

  itemChange(x1) {

    let x = parseInt(x1);
    console.log('x value ' + x);

    if (x === null || x === 0) {
      this.jread = true;
      console.log('inside if');
      this.myForm.patchValue({ availableQuantity: 0 });
      this.myForm.patchValue({ pendingOrderQuantity: 0 });

    }
    else {

      this.jread = false;

      console.log('else');
      let reqty;
      let aqty;

      let obj: Orders[] = this.allordersdata
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


  PushToArray(itemid1, reqty) {

   

    let itemid = parseInt(itemid1);



    let jckCheck: TemporyInvoice[] = this.temporyInvoice
      .filter(TemporyInvoice => TemporyInvoice.itemMasterId === itemid)
    if (jckCheck === undefined) {
    } else {
      if (jckCheck.length == 0) {

        let finishgoods: FinishGoodGRN[] = this.allfgrn
          .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid)
        if (finishgoods === undefined) {
          console.log('undifined');
        } else {
          // console.log('here is the grn items' + JSON.stringify(finishgoods));
          if (finishgoods.length == 0) {
            this.openSnackBar('Warn', '  This Item Not available in the Stok ');
          }
          else {
            let total1 = 0;
            let total = 0;
            let averageCost = 0;
            let price = 0;
            let discount;
            let netprice = 0;

            for (let j = 0; j < finishgoods.length; j++) {

              total1 = total1 + 1;
              total = total + finishgoods[j].remainingQuantity;
              discount = finishgoods[j].discount;

              price = price + ((finishgoods[j].price) / finishgoods[j].remainingQuantity) - ((finishgoods[j].price) / finishgoods[j].remainingQuantity) * discount / 100;

            }
            averageCost = price / total1;
            console.log('average cost for 1 item  ' + averageCost);

            if (total >= reqty) {

              ///start

              let itemcode;
              let customer;
              let ordertype;
              let maincatid;
              let oripacks;
              let volume;

              console.log('inside itemm ');


              let obj: ItemMaster[] = this.allitems
                .filter(ItemMaster => ItemMaster.id === itemid)
              if (obj === undefined) {
              } else {

                itemcode = obj[0].itemCode;
                maincatid = obj[0].mainCatagory.id;
                oripacks = obj[0].packSize;
                volume = obj[0].volume;
              }
              console.log('near order type ');



              /*  let obj2: OrderType[] = this.allorderTypedata
                  .filter(OrderType => OrderType.id === this.jorderTypeid)
      
                if (obj2 === undefined) {
                } else {
                  // console.log(supi, si, i);
                  ordertype = obj2[0].orderType;
                }*/


              let obj3: Customer[] = this.allcustomers
                .filter(Customer => Customer.id === this.jcustomerid)

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
                .filter(ItemMaster => ItemMaster.id === itemid)
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

                .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === this.jcustomerid)
              if (cusSpecialPrice === undefined) {

                console.log('undifined');

              } else {

                if (cusSpecialPrice.length == 0) {
                  console.log('no customer');
                  this.customerAvailable = false;
                  this.specialDiscount = 0;
                  this.specialPrice = 0;
                  this.totalPrice = netprice * reqty;
                  this.netTotal = this.totalPrice;
                  //this.openSnackBar('warn', 'Success', 'no customer');
                  //here go to free issue//////////////////////////////////////////////


                  let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                    .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === itemid)
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
                            this.jgenaratedId,
                            maincatid,
                            volume
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

                          if ((oripacks == packs) && (qty <= reqty)) {
                            console.log('pack size and qty eqel');

                            let x = reqty / qty;
                            let y = reqty % qty
                            let z = (reqty - y) / qty;


                            if (x == 1) {
                              freisqty = freisqty1;

                            }
                            else {

                              freisqty = freisqty1 * z;

                            }
                            this.autoIncrement1 = this.autoIncrement1 + 1;
                            this.addData2 = new OrderFreeIssue(
                              this.autoIncrement1,
                              this.jgenaratedId,
                              itemcode,
                              freeissuit,
                              reqty,
                              freisqty,
                              itemid,
                              fisuitemid
                            );
                            this.invoiceFreeIssue.push(this.addData2);
                            this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                          }
                          else {
                            console.log('pack size pack size and qty not eqr');
                            this.autoIncrement2 = this.autoIncrement2 + 1;
                            this.addData3 = new TemporyVolume(
                              this.autoIncrement2,
                              this.jgenaratedId,
                              maincatid,
                              volume
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

                      let fqty = reqty;
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
                          this.jgenaratedId,
                          itemcode,
                          freeIssueItem,
                          reqty,
                          freeIssueQty,
                          itemid,
                          freeIssueItemId
                        );
                        this.invoiceFreeIssue.push(this.addData2);
                        this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
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
                              this.jgenaratedId,
                              maincatid,
                              volume
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

                            if ((oripacks == packs) && (qty <= reqty)) {
                              console.log('pack size and qty eqel');

                              let x = reqty / qty;
                              let y = reqty % qty
                              let z = (reqty - y) / qty;


                              if (x == 1) {
                                freisqty = freisqty1;

                              }
                              else {

                                freisqty = freisqty1 * z;

                              }
                              this.autoIncrement1 = this.autoIncrement1 + 1;
                              this.addData2 = new OrderFreeIssue(
                                this.autoIncrement1,
                                this.jgenaratedId,
                                itemcode,
                                freeissuit,
                                reqty,
                                freisqty,
                                itemid,
                                fisuitemid
                              );
                              this.invoiceFreeIssue.push(this.addData2);
                              this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                            }
                            else {
                              console.log('pack size pack size and qty not eqr');
                              this.autoIncrement2 = this.autoIncrement2 + 1;
                              this.addData3 = new TemporyVolume(
                                this.autoIncrement2,
                                this.jgenaratedId,
                                maincatid,
                                volume
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
                    .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid)
                  if (grncost === undefined) {
                    console.log('undifined');
                  } else {
                    if (grncost.length != 0) {
                      console.log('data available');

                      let buyingp = grncost[0].price;///////////////////////////////////////
                      let byqty = grncost[0].quantity;
                      let dis = grncost[0].discount;
                      let realpricefor1 = buyingp / byqty;//one item cost
                      let disprice = (realpricefor1 * dis) / 100;
                      let finalitemcost = realpricefor1 - disprice;//final cost for one item


                      this.reacost = averageCost;//////////////////////////////item real cost hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee



                    }
                    else {
                      console.log('no data available');
                    }

                  }
                  if (cusitem === itemid) {
                    //this.openSnackBar('info', 'Success', ' item available');

                    console.log('item available');
                    this.customerAvailable = true;

                    if (cusSprice == 0) {




                      newprice = (netprice - ((netprice * customerSpeDis) / 100)) * reqty;
                      this.spDis = netprice - ((netprice * customerSpeDis) / 100);


                      console.log('special discount ' + customerSpeDis);
                      console.log('special discount price ' + ((netprice * customerSpeDis) / 100));
                      console.log('net price after special discount ' + newprice);
                      this.specialDiscount = customerSpeDis;
                      this.specialPrice = 0;
                      this.netTotal = newprice;
                      this.totalPrice = netprice * reqty;

                    }
                    else {

                      let newpricep = netprice - cusSprice;

                      console.log('special price ' + cusSprice);
                      console.log('net  price after special price ' + cusSprice);
                      this.specialDiscount = 0;
                      this.specialPrice = cusSprice;
                      this.netTotal = cusSprice * reqty;
                      this.totalPrice = netprice * reqty;
                    }


                  }
                  else {

                    console.log('item not available');
                    this.customerAvailable = false;

                    this.specialDiscount = 0;
                    this.specialPrice = 0;
                    this.totalPrice = netprice * reqty;
                    this.netTotal = this.totalPrice;

                    //here go to free issue///////////////////////////////////////////


                    let itemWiseFreeIsuue: ItemWiseFreeIssue[] = this.allitemWiseFreeissue
                      .filter(ItemWiseFreeIssue => ItemWiseFreeIssue.itemMaster.id === itemid)
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
                              this.jgenaratedId,
                              maincatid,
                              volume
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

                            if ((oripacks == packs) && (qty <= reqty)) {
                              console.log('pack size and qty eqel');

                              let x = reqty / qty;
                              let y = reqty % qty
                              let z = (reqty - y) / qty;


                              if (x == 1) {
                                freisqty = freisqty1;

                              }
                              else {

                                freisqty = freisqty1 * z;

                              }
                              this.autoIncrement1 = this.autoIncrement1 + 1;
                              this.addData2 = new OrderFreeIssue(
                                this.autoIncrement1,
                                this.jgenaratedId,
                                itemcode,
                                freeissuit,
                                reqty,
                                freisqty,
                                itemid,
                                fisuitemid
                              );
                              this.invoiceFreeIssue.push(this.addData2);
                              this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                            }
                            else {
                              console.log('pack size pack size and qty not eqr');
                              this.autoIncrement2 = this.autoIncrement2 + 1;
                              this.addData3 = new TemporyVolume(
                                this.autoIncrement2,
                                this.jgenaratedId,
                                maincatid,
                                volume
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

                        let fqty = reqty;
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
                            this.jgenaratedId,
                            itemcode,
                            freeIssueItem,
                            reqty,
                            freeIssueQty,
                            itemid,
                            freeIssueItemId
                          );
                          this.invoiceFreeIssue.push(this.addData2);
                          this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
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
                                this.jgenaratedId,
                                maincatid,
                                volume
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

                              if ((oripacks == packs) && (qty <= reqty)) {
                                console.log('pack size and qty eqel');

                                let x = reqty / qty;
                                let y = reqty % qty
                                let z = (reqty - y) / qty;


                                if (x == 1) {
                                  freisqty = freisqty1;

                                }
                                else {

                                  freisqty = freisqty1 * z;

                                }
                                this.autoIncrement1 = this.autoIncrement1 + 1;
                                this.addData2 = new OrderFreeIssue(
                                  this.autoIncrement1,
                                  this.jgenaratedId,
                                  itemcode,
                                  freeissuit,
                                  reqty,
                                  freisqty,
                                  itemid,
                                  fisuitemid
                                );
                                this.invoiceFreeIssue.push(this.addData2);
                                this.dataSource2 = new MatTableDataSource<InvoiceFreeIssue>(this.invoiceFreeIssue);
                              }
                              else {
                                console.log('pack size pack size and qty not eqr');
                                this.autoIncrement2 = this.autoIncrement2 + 1;
                                this.addData3 = new TemporyVolume(
                                  this.autoIncrement2,
                                  this.jgenaratedId,
                                  maincatid,
                                  volume
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
                .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === this.jcustomerid)
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
                    this.addData = new TemporyInvoice(this.autoIncrement, this.jgenaratedId, this.jorderdPersonName, this.jorderdPersonPost, this.jcontactNumber, this.jnicNumber, this.jcontactPersonImage, this.jcurrentDate, this.jrequiedDate, this.jpoNumber, reqty, this.jorderTypeid, this.jorderType, this.jcustomerCompanyid, customer, itemid, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, this.jregisterRepid, this.jcustomerCompanyid, "Item");
                    this.temporyInvoice.push(this.addData);
                    this.myForm.patchValue({ itemMasterId: null });
                    this.myForm.patchValue({ requiredQuantity: 0 });
                    this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                  }
                  else {

                    let item = itemid;
                    let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Discount';

                    this.openSnackBar('Warning!', msg1);
                  }


                }
                else {

                  if (this.spPrice > this.reacost) {
                    console.log('goes on secound');

                    this.autoIncrement = this.autoIncrement + 1;
                    this.addData = new TemporyInvoice(this.autoIncrement, this.jgenaratedId, this.jorderdPersonName, this.jorderdPersonPost, this.jcontactNumber, this.jnicNumber, this.jcontactPersonImage, this.jcurrentDate, this.jrequiedDate, this.jpoNumber, reqty, this.jorderTypeid, this.jorderType, this.jcustomerCompanyid, customer, itemid, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, this.jregisterRepid, this.jcustomerCompanyid, "Item");
                    this.temporyInvoice.push(this.addData);
                    this.myForm.patchValue({ itemMasterId: null });
                    this.myForm.patchValue({ requiredQuantity: 0 });
                    this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);
                  }
                  else {
                    let item = itemid;
                    let msg1 = ' Sorry Low Profit Item , please Change Item  ' + item + ' Special Price';

                    this.openSnackBar('Warning!', msg1);


                  }

                }

              }
              else {
                console.log('goes on third');

                this.autoIncrement = this.autoIncrement + 1;
                this.addData = new TemporyInvoice(this.autoIncrement, this.jgenaratedId, this.jorderdPersonName, this.jorderdPersonPost, this.jcontactNumber, this.jnicNumber, this.jcontactPersonImage, this.jcurrentDate, this.jrequiedDate, this.jpoNumber, reqty, this.jorderTypeid, this.jorderType, this.jcustomerCompanyid, customer, itemid, itemcode, this.totalPrice, this.specialDiscount, this.specialPrice, this.netTotal, this.itemDiscount, this.jregisterRepid, this.jcustomerCompanyid, "Item");
                this.temporyInvoice.push(this.addData);
                this.myForm.patchValue({ itemMasterId: null });
                this.myForm.patchValue({ requiredQuantity: 0 });
                this.dataSource = new MatTableDataSource<TemporyInvoice>(this.temporyInvoice);

              }
              let jtotal = 0;
              let jnet = 0;
              let discounts = 0;
              for (let i = 0; i < this.temporyInvoice.length; i++) {



                jtotal = jtotal + this.temporyInvoice[i].total;
                jnet = jnet + this.temporyInvoice[i].netPrice;
                discounts = jtotal + this.temporyInvoice[i].specialDiscount;
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

              if (this.temporyInvoice.length != 0) {
                this.orderConfirm = false;

              }
              else {

                this.orderConfirm = true;

              }

              //////end
            }
            else {
              this.openSnackBar('Warning', '  Not Enough Items In The Stok ');
            }
          }
        }



      }
      else {
        this.openSnackBar('Warning!', ' You Added Item Already Exist Please Try Add Another Item');

      }

    }



  
  
}

  saveorEdit3() {

    let webServResponce: WebServResponce;
    this.saveEdit3 = new InvoicePrices(
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

    this.invoicePricesService.saveData(this.saveEdit3)
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

  saveFreeIssues() {

    for (let j = 0; j < this.invoiceFreeIssue.length; j++) {
      let netprice;
      let itemid = this.invoiceFreeIssue[j].FreeIssueItemid;
      let reitemqty = this.invoiceFreeIssue[j].FreeIssueItemQuantity;


      if (this.invoiceFreeIssue.length === 0) {
        console.log('no free isssue items');

      }
      else {



        let itmMaster: ItemMaster[] = this.allitems
          .filter(ItemMaster => ItemMaster.id === itemid)
        if (itmMaster === undefined) {
          console.log('undifined');
        }
        else {

          console.log('item Mster a');

          netprice = itmMaster[0].maxRetail;
          let discount = itmMaster[0].discount;
          if (itmMaster[0].discount == 0 || itmMaster[0].discount == null) {
            netprice = netprice;
          }
          else {
            netprice = netprice - (netprice * discount / 100);
          }

        }
        console.log('before GRN filter');

        let grnitem: FinishGoodGRN[] = this.allfgrn
          .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid && FinishGoodGRN.remainingQuantity != 0)
        if (grnitem === undefined) {
          console.log('undifined');
        } else {


          let jacktot = 0;

          for (let k = 0; k < grnitem.length; k++) {
            jacktot = jacktot + grnitem[k].remainingQuantity;

          }

          if (grnitem.length == 0) {
            console.log('grn no items for sale free issues');
            let webServResponce: WebServResponce;
            this.updateOrder = new Orders(
              0,
              this.jgenaratedId,
              this.jorderdPersonName,
              this.jorderdPersonPost,
              this.jcontactNumber,
              this.jnicNumber,
              this.jcontactPersonImage,
              this.jcurrentDate,
              this.jrequiedDate,
              this.jpoNumber,
              reitemqty,
              reitemqty,
              0,
              0,
              "FreeIssue",
              this.createdDate,
              this.createdby,
              this.jorderTypeid,
              this.jcustomerid,
              itemid,
              this.jregisterRepid,
              this.jcustomerCompanyid
            );

            console.log('save ');
            // this.selectedItemsQualityParameter = data;
            this.ordersservice.savedata(this.updateOrder)
              .subscribe(
              resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {

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

            let itemqty = 0;
            let grnitemqty = 0;
            let batchno;
            let newreqty = reitemqty;

            for (let i = 0; i < grnitem.length; i++) {

              //|| grnitem[i].remainingQuantity === 0

              if (newreqty === 0 || grnitem[i].remainingQuantity === 0) {
                console.log('ok  boss ,all items saved');
              }
              else {
                grnitemqty = grnitem[i].remainingQuantity;
                //grnitemqty = this.freeIssueAvailability;

                batchno = grnitem[i].batchNumber;
                let price = (grnitem[i].price) / grnitemqty;
                let dis = grnitem[i].discount;
                let realcost = price - ((price * dis) / 100);

                if (newreqty <= grnitemqty) {


                  let updatedQty = grnitemqty - newreqty;
                  let webServResponce: WebServResponce;
                  this.updateQty = new FinishGoodGRN(grnitem[i].id, '', '', null, null, updatedQty, 0, '', '', '', null, null, null, '', null, null, null);
                  console.log('save ');
                  this.finishGoodGRNservice.updateQty(this.updateQty)
                    .subscribe(
                    resObj => {
                      webServResponce = resObj;
                      if (webServResponce.statusId == 200) {
                        console.log('saved');
                      } else {
                        this.errorMessage = webServResponce.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );

                  let webServResponce2: WebServResponce;
                  this.saveEdit = new Invoice(
                    0,
                    this.genaratedId,
                    this.referenceNumber,
                    grnitem[i].batchNumber,
                    newreqty,
                    0,
                    realcost,
                    0,
                    this.orderId,
                    "FreeIssue",
                    this.createdDate,
                    this.createdby,
                    itemid
                  );
                  console.log('save ');
                  this.invoiceService.savedata(this.saveEdit)
                    .subscribe(
                    resObj => {
                      webServResponce2 = resObj;
                      if (webServResponce2.statusId == 200) {
                        console.log('saved invoice 1');
                        this.getAll();
                      } else {
                        this.errorMessage = webServResponce2.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
                  console.log('got the first');
                  newreqty = 0;



                  let webServResponcej: WebServResponce;
                  this.saveData = new InvoiceItemsSave(
                    0,
                    this.genaratedId,
                    this.invoiceFreeIssue[j].purchasedItemid,
                    this.invoiceFreeIssue[j].purchasedItemQuantity,
                    this.invoiceFreeIssue[j].FreeIssueItemid,
                    this.invoiceFreeIssue[j].FreeIssueItemQuantity,
                    this.createdDate,
                    this.createdby
                  );
                  console.log(' inside freeeee save invoooooo ');
                  this.invoiceItemsSaveservice.savedata(this.saveData)
                    .subscribe(
                    resObj => {
                      webServResponcej = resObj;
                      if (webServResponcej.statusId == 200) {

                        this.openSnackBar('success!', 'Free Issue Items Saved ');
                      } else {
                        this.errorMessage = webServResponcej.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );


                }
                else {


                  console.log('go tosecound');

                  newreqty = newreqty - grnitemqty;

                  let webServResponce: WebServResponce;
                  this.updateQty = new FinishGoodGRN(grnitem[i].id, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);
                  console.log('save ');
                  this.finishGoodGRNservice.updateQty(this.updateQty)
                    .subscribe(
                    resObj => {
                      webServResponce = resObj;
                      if (webServResponce.statusId == 200) {
                        console.log('saved');
                      } else {
                        this.errorMessage = webServResponce.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );





                  let webServResponcej: WebServResponce;
                  this.saveData = new InvoiceItemsSave(
                    0,
                    this.genaratedId,
                    this.invoiceFreeIssue[j].purchasedItemid,
                    this.invoiceFreeIssue[j].purchasedItemQuantity,
                    this.invoiceFreeIssue[j].FreeIssueItemid,
                    this.invoiceFreeIssue[j].FreeIssueItemQuantity,
                    this.createdDate,
                    this.createdby
                  );
                  console.log('save invoooooo ');
                  this.invoiceItemsSaveservice.savedata(this.saveData)
                    .subscribe(
                    resObj => {
                      webServResponcej = resObj;
                      if (webServResponcej.statusId == 200) {

                        this.openSnackBar('success!', 'Free Issue Items Saved ');
                      } else {
                        this.errorMessage = webServResponcej.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );





                  let webServResponce3: WebServResponce;
                  this.saveEdit = new Invoice(
                    0,
                    this.genaratedId,
                    this.referenceNumber,
                    grnitem[i].batchNumber,
                    grnitemqty,
                    0,
                    realcost,
                    0,
                    this.orderId,
                    "FreeIssue",
                    this.createdDate,
                    this.createdby,
                    itemid

                  );
                  console.log('save ');
                  this.invoiceService.savedata(this.saveEdit)
                    .subscribe(
                    resObj => {
                      webServResponce3 = resObj;
                      if (webServResponce3.statusId == 200) {
                        console.log('saved invoice');
                        this.getAll();
                      } else {
                        this.errorMessage = webServResponce3.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );


                  if (reitemqty <= jacktot) {
                    console.log('jack');
                  }
                  else {
                    let webServResponce4: WebServResponce;
                    this.updateOrder = new Orders(
                      0,
                      this.jgenaratedId,
                      this.jorderdPersonName,
                      this.jorderdPersonPost,
                      this.jcontactNumber,
                      this.jnicNumber,
                      this.jcontactPersonImage,
                      this.jcurrentDate,
                      this.jrequiedDate,
                      this.jpoNumber,
                      newreqty,
                      newreqty,
                      0,
                      0,
                      "FreeIssue",
                      this.createdDate,
                      this.createdby,
                      this.jorderTypeid,
                      this.jcustomerid,
                      itemid,
                      this.jregisterRepid,
                      this.jcustomerCompanyid
                    );

                    console.log('save ');
                    // this.selectedItemsQualityParameter = data;
                    this.ordersservice.savedata(this.updateOrder)
                      .subscribe(
                      resObj => {
                        webServResponce4 = resObj;
                        if (webServResponce4.statusId == 200) {
                          console.log('checkthis' + webServResponce4.errDetail);
                          console.log('saved');
                        } else {
                          this.errorMessage = webServResponce4.errMessage;
                        }
                      }
                      ,
                      error => this.errorMessage = <any>error

                      );


                  }

                }
              }

            }//end of the loop

          }
        }

      }


    }

  }



  saveInvoice(refno) {

    this.referenceNumber = refno;
    this.invoiceSave();
    this.saveorEdit3();
    this.saveConfirm = true;
    this.saveConfirm2 = false;
  }

  getFgrn() {
    let catWebServResponce90: WebServResponce;
    this.finishGoodGRNservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce90 = resObj;
        if (catWebServResponce90.statusId == 200) {
          this.allfgrn = <FinishGoodGRN[]>catWebServResponce90.result;

          this.jackt();
        } else {
          this.errorMessage = catWebServResponce90.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }
  getFgrn2() {
    let catWebServResponce2: WebServResponce;
    this.finishGoodGRNservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allfgrn = <FinishGoodGRN[]>catWebServResponce2.result;

          this.SellingFreeIsues();
        } else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }

  invoiceSave() {
    this.ItemsSelling();
  }







  saveIvvoiceFreeIssueItems()//free issue items
  {

    if (this.invoiceFreeIssue.length === 0) {
      console.log('secounvd methord no free issues');

    }
    else {

      for (let j = 0; j < this.invoiceFreeIssue.length; j++) {

      }


    }

  }

  cancelInvoice(invoiceNumber) {

    let jackInvoice: Invoice[] = this.alldata
      .filter(Invoice => Invoice.genaratedId === invoiceNumber)
    if (jackInvoice === undefined) {
      console.log('undifined');
    } else {
      if (jackInvoice.length == 0) {
        console.log('no data boss');
      }
      else {

        for (let j = 0; j < jackInvoice.length; j++) {

          let invoiceId = jackInvoice[j].id;
          let batch = jackInvoice[j].batchNumber;
          let qty = jackInvoice[j].quantity;
          let itemid = jackInvoice[j].itemMaster.id;
          let oredrNumber = jackInvoice[j].orderId;


          let jackInvoice2: Invoice[] = this.alldata
            .filter(Invoice => Invoice.genaratedId === invoiceNumber && Invoice.itemMaster.id === itemid && Invoice.batchNumber === batch)
          if (jackInvoice2.length === 0) {


          }
          else if (jackInvoice2.length === 1) {
            let jGRN: FinishGoodGRN[] = this.allfgrn
              .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid && FinishGoodGRN.batchNumber === batch)
            if (jGRN.length === 0) {
              this.openSnackBar('Warning !', 'Sorry You Cannot Restore This Invoice Item');

            } else {

              if (jGRN.length == 0) {
                console.log('no grn item to delete');
              }
              else {


                for (let j = 0; j < jGRN.length; j++) {

                  let grnitemidtoUp = jGRN[j].id;
                  let grnitemqty = jGRN[j].remainingQuantity;
                  let updatedqty = grnitemqty + qty;

                  let webServResponce: WebServResponce;
                  this.updateQty = new FinishGoodGRN(grnitemidtoUp, '', '', null, null, updatedqty, 0, '', '', '', null, null, null, '', null, null, null);
                  console.log('save ');
                  this.finishGoodGRNservice.updateQty(this.updateQty)
                    .subscribe(
                    resObj => {
                      webServResponce = resObj;
                      if (webServResponce.statusId == 200) {
                        console.log('saved');
                      } else {
                        this.errorMessage = webServResponce.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
                }



              }
            }



            let jOrder: Orders[] = this.allordersdata2
              .filter(Orders => Orders.genaratedId === oredrNumber && Orders.itemMaster.id === itemid && Orders.itemStatus === "Item")
            if (jOrder === undefined) {
              console.log('undifined');
            } else {
              if (jOrder.length == 0) {
                console.log('no orders data at delete');
              }
              else {
                let orderitemidtoUp = jOrder[0].id;
                let orderitemqty = jOrder[0].requiredQuantity;
                let webServResponce4: WebServResponce;
                this.updateOrder = new Orders(orderitemidtoUp, '', '', '', '', '', '', null, null, '', null, orderitemqty, 0, 0, 'Item', null, '', null, null, null, null, null);
                console.log('save ');
                this.ordersservice.updateQty(this.updateOrder)
                  .subscribe(
                  resObj => {
                    webServResponce4 = resObj;
                    if (webServResponce4.statusId == 200) {
                      console.log('saved');
                      this.getAll();
                    } else {
                      this.errorMessage = webServResponce4.errMessage;
                    }
                  }
                  ,
                  error => this.errorMessage = <any>error
                  );
              }
            }





            let jOrder2: Orders[] = this.allordersdata2
              .filter(Orders => Orders.genaratedId === oredrNumber && Orders.itemStatus === "FreeIssue")
            if (jOrder2 === undefined) {
              console.log('undifined');
            } else {
              if (jOrder2.length == 0) {
                console.log('no orders data at delete');
              }
              else {
                let orderitemidtoUp = jOrder2[0].id;
                let orderitemqty = jOrder2[0].requiredQuantity;
                let webServResponce5: WebServResponce;
                this.updateOrder = new Orders(orderitemidtoUp, '', '', '', '', '', '', null, null, '', null, 0, 0, 0, 'FreeIssue', null, '', null, null, null, null, null);
                console.log('save ');
                this.ordersservice.updateQty(this.updateOrder)
                  .subscribe(
                  resObj => {
                    webServResponce5 = resObj;
                    if (webServResponce5.statusId == 200) {
                      console.log('saved');
                      this.getAll();
                    } else {
                      this.errorMessage = webServResponce5.errMessage;
                    }
                  }
                  ,
                  error => this.errorMessage = <any>error
                  );
              }
            }

            this.InvoiceCancel(invoiceId);



          } else if (jackInvoice2.length > 1) {
            let tot = 0;
            for (let k = 0; k < jackInvoice2.length; k++) {
              tot = tot + jackInvoice2[k].quantity;
            }



            let jGRN: FinishGoodGRN[] = this.allfgrn
              .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid && FinishGoodGRN.batchNumber === batch)
            if (jGRN.length === 0) {
              this.openSnackBar('Warning !', 'Sorry You Cannot Restore This Invoice Item');

            } else {

              if (jGRN.length == 0) {
                console.log('no grn item to delete');
              }
              else {


                for (let j = 0; j < jGRN.length; j++) {

                  let grnitemidtoUp = jGRN[j].id;
                  let grnitemqty = jGRN[j].remainingQuantity;
                  let updatedqty = grnitemqty + tot;

                  let webServResponce: WebServResponce;
                  this.updateQty = new FinishGoodGRN(grnitemidtoUp, '', '', null, null, updatedqty, 0, '', '', '', null, null, null, '', null, null, null);
                  console.log('save ');
                  this.finishGoodGRNservice.updateQty(this.updateQty)
                    .subscribe(
                    resObj => {
                      webServResponce = resObj;
                      if (webServResponce.statusId == 200) {
                        console.log('saved');
                      } else {
                        this.errorMessage = webServResponce.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
                }



              }
            }



            let jOrder: Orders[] = this.allordersdata2
              .filter(Orders => Orders.genaratedId === oredrNumber && Orders.itemMaster.id === itemid && Orders.itemStatus === "Item")
            if (jOrder === undefined) {
              console.log('undifined');
            } else {
              if (jOrder.length == 0) {
                console.log('no orders data at delete');
              }
              else {
                let orderitemidtoUp = jOrder[0].id;
                let orderitemqty = jOrder[0].requiredQuantity;
                let webServResponce4: WebServResponce;
                this.updateOrder = new Orders(orderitemidtoUp, '', '', '', '', '', '', null, null, '', null, orderitemqty, 0, 0, 'Item', null, '', null, null, null, null, null);
                console.log('save ');
                this.ordersservice.updateQty(this.updateOrder)
                  .subscribe(
                  resObj => {
                    webServResponce4 = resObj;
                    if (webServResponce4.statusId == 200) {
                      console.log('saved');
                      this.getAll();
                    } else {
                      this.errorMessage = webServResponce4.errMessage;
                    }
                  }
                  ,
                  error => this.errorMessage = <any>error
                  );
              }
            }





            let jOrder2: Orders[] = this.allordersdata2
              .filter(Orders => Orders.genaratedId === oredrNumber && Orders.itemStatus === "FreeIssue")
            if (jOrder2 === undefined) {
              console.log('undifined');
            } else {
              if (jOrder2.length == 0) {
                console.log('no orders data at delete');
              }
              else {
                let orderitemidtoUp = jOrder2[0].id;
                let orderitemqty = jOrder2[0].requiredQuantity;
                let webServResponce5: WebServResponce;
                this.updateOrder = new Orders(orderitemidtoUp, '', '', '', '', '', '', null, null, '', null, 0, 0, 0, 'FreeIssue', null, '', null, null, null, null, null);
                console.log('save ');
                this.ordersservice.updateQty(this.updateOrder)
                  .subscribe(
                  resObj => {
                    webServResponce5 = resObj;
                    if (webServResponce5.statusId == 200) {
                      console.log('saved');
                      this.getAll();
                    } else {
                      this.errorMessage = webServResponce5.errMessage;
                    }
                  }
                  ,
                  error => this.errorMessage = <any>error
                  );
              }
            }

            this.InvoiceCancel(invoiceId);







          }





        }


      }


    }
  }

  InvoiceCancel(id: number) {
    let webServResponce: WebServResponce;
    this.invoiceService.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('success!', 'Successfully Removed Your Invoice ');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  DicisionChange(x) {
    if (x == 0) {
      console.log('x  is 0' + x);
      this.confirmPassInvoice = false;
    }
    else {
      console.log('x  is 1' + x);
      this.confirmPassInvoice = true;


    }
  }




  jackt() {
    //this.openSnackBar('info', 'Success ', 'inside jackk');
    this.saveFreeIssues();
    //this.saveIvvoiceFreeIssueItems();
    this.addNew();

  }

  checkj() {
    this.getAll();

    let jOrder2: Orders[] = this.allordersdata2
      .filter(Orders => Orders.genaratedId === this.jgenaratedId && Orders.itemStatus === "Item" && Orders.pendingOrderQuantity != 0)
    if (jOrder2 === undefined) {
      console.log('undifined');
    } else {
      if (jOrder2.length == 0) {
        console.log('no data');

      }
      else {
        //  console.log('jdata ' + JSON.stringify(jOrder2));

        for (let j = 0; j < jOrder2.length; j++) {

          let oderQty = jOrder2[j].pendingOrderQuantity;
          let itemid = jOrder2[j].itemMaster.id;

          let jGRN: FinishGoodGRN[] = this.allfgrn
            .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid && FinishGoodGRN.remainingQuantity != 0)
          if (jGRN === undefined) {
            console.log('undifined');
          } else {
            if (jGRN.length == 0) {
              console.log('no grn items');
              this.finalinvoice = true;
            }
            else {
              let jtot = 0;
              for (let j = 0; j < jGRN.length; j++) {

                jtot = jtot + jGRN[j].remainingQuantity;

              }
              if (jtot >= oderQty) {

              }
              else {
                this.finalinvoice = true;

              }

            }

          }
        }

      }

    }
    this.getAll();
  }


  SellingFreeIsues() {
    // this.openSnackBar('info', 'Success ', '2');

    let filterFreeissue: TemporyInvoice[] = this.temporyInvoice
      .filter(TemporyInvoice => TemporyInvoice.itemStatus === "FreeIssue")
    if (filterFreeissue.length == 0) {
      console.log('no free issue items');
    }
    else {

      for (let j = 0; j < filterFreeissue.length; j++) {


        let itemid = filterFreeissue[j].itemMasterId;
        let reitemqty = filterFreeissue[j].requiredQuantity;
        let ItemStatus = filterFreeissue[j].itemStatus;
        let qtyAvailble = 0;


        let grnitem: FinishGoodGRN[] = this.allfgrn
          .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid)
        if (grnitem === undefined) {
          console.log('undifined');
        } else {
          if (grnitem.length == 0) {
            console.log('items not available');
          }
          else {
            console.log('items not available');
            let itemqty = 0;
            let grnitemqty = 0;
            let batchno;
            let newreqty = reitemqty;

            for (let i = 0; i < grnitem.length; i++) {

              if (newreqty == 0 || grnitem[i].remainingQuantity == 0) {
                console.log('ok  boss ,all items saved');
              }
              else {
                grnitemqty = grnitem[i].remainingQuantity;
                batchno = grnitem[i].batchNumber;
                let price = (grnitem[i].price) / grnitem[i].quantity;
                let dis = grnitem[i].discount;
                let realcost = price - ((price * dis) / 100);

                if (newreqty <= grnitemqty) {

                  // this.openSnackBar('info', 'Success ', '1');

                  let updatedQty = grnitemqty - newreqty;
                  let webServResponce: WebServResponce;
                  this.updateQty = new FinishGoodGRN(grnitem[i].id, '', '', null, null, updatedQty, 0, '', '', '', null, null, null, '', null, null, null);
                  console.log('save ');
                  this.finishGoodGRNservice.updateQty(this.updateQty)
                    .subscribe(
                    resObj => {
                      webServResponce = resObj;
                      if (webServResponce.statusId == 200) {
                        console.log('saved');
                        this.getAll();
                      } else {
                        this.errorMessage = webServResponce.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );

                  let webServResponce2: WebServResponce;
                  this.saveEdit = new Invoice(
                    0,
                    this.genaratedId,
                    this.referenceNumber,
                    grnitem[i].batchNumber,
                    newreqty,
                    0,
                    realcost,
                    0,
                    filterFreeissue[j].genaratedId,
                    ItemStatus,
                    this.createdDate,
                    this.createdby,
                    itemid
                  );
                  console.log('save ');
                  this.invoiceService.savedata(this.saveEdit)
                    .subscribe(
                    resObj => {
                      webServResponce2 = resObj;
                      if (webServResponce2.statusId == 200) {
                        console.log('saved invoice 1');
                        this.getAll();
                      } else {
                        this.errorMessage = webServResponce2.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );




                  let soldqty = 0;
                  let pendingFreissue = 0;
                  let pendingFreeIssues = 0;
                  let reduceQty = 0;
                  let forFindOrderId: Orders[] = this.allordersdata
                    .filter(Orders => Orders.genaratedId === filterFreeissue[j].genaratedId && Orders.itemMaster.id === itemid)
                  if (forFindOrderId === undefined) {
                    console.log('undifined');
                  } else {
                    if (forFindOrderId.length == 0) { }
                    else {
                      pendingFreeIssues = forFindOrderId[0].pendingFreeIssueQuantity;
                      soldqty = (forFindOrderId[0].requiredQuantity) - (reitemqty + pendingFreeIssues);

                      reduceQty = forFindOrderId[0].reduceFreeIssueQuantity;
                      pendingFreissue = (pendingFreeIssues + reitemqty) - reduceQty;

                      console.log();
                    }
                  }

                  let webServResponce3: WebServResponce;
                  this.updateOrder = new Orders(forFindOrderId[0].id, '', '', '', '', '', '', null, null, '', null, soldqty, pendingFreissue, reduceQty, 'Item', null, '', null, null, null, null, null);
                  console.log('save ');
                  this.ordersservice.updateQty(this.updateOrder)
                    .subscribe(
                    resObj => {
                      webServResponce3 = resObj;
                      if (webServResponce3.statusId == 200) {
                        console.log('saved');
                      } else {
                        this.errorMessage = webServResponce3.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
                  console.log('got the first');
                  newreqty = 0;

                }
                else {
                  console.log('go tosecound');
                  //  this.openSnackBar('info', 'Success ', '2');

                  newreqty = newreqty - grnitemqty;

                  let webServResponce: WebServResponce;
                  this.updateQty = new FinishGoodGRN(grnitem[i].id, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);
                  console.log('save ');
                  this.finishGoodGRNservice.updateQty(this.updateQty)
                    .subscribe(
                    resObj => {
                      webServResponce = resObj;
                      if (webServResponce.statusId == 200) {
                        console.log('saved');
                      } else {
                        this.errorMessage = webServResponce.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );

                  let webServResponce3: WebServResponce;
                  this.saveEdit = new Invoice(
                    0,
                    this.genaratedId,
                    this.referenceNumber,
                    grnitem[i].batchNumber,
                    grnitemqty,
                    0,
                    realcost,
                    0,
                    filterFreeissue[j].genaratedId,
                    ItemStatus,
                    this.createdDate,
                    this.createdby,
                    itemid

                  );
                  console.log('save ');
                  this.invoiceService.savedata(this.saveEdit)
                    .subscribe(
                    resObj => {
                      webServResponce3 = resObj;
                      if (webServResponce3.statusId == 200) {
                        console.log('saved invoice');
                        this.getAll();
                      } else {
                        this.errorMessage = webServResponce3.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );

                  let soldqty = 0;
                  let pendingFreissue = 0;
                  let pendingFreeIssues = 0;
                  let reduceQty = 0;
                  let forFindOrderId: Orders[] = this.allordersdata
                    .filter(Orders => Orders.genaratedId === filterFreeissue[j].genaratedId && Orders.itemMaster.id === itemid)
                  if (forFindOrderId === undefined) {
                    console.log('undifined');
                  } else {

                    if (forFindOrderId.length == 0) { }
                    else {


                      pendingFreeIssues = forFindOrderId[0].pendingFreeIssueQuantity;
                      soldqty = (forFindOrderId[0].requiredQuantity) - (reitemqty + pendingFreeIssues);
                      reduceQty = forFindOrderId[0].reduceFreeIssueQuantity;
                      pendingFreissue = (pendingFreeIssues + reitemqty) - reduceQty;
                    }

                  }
                  let webServResponce4: WebServResponce;
                  this.updateOrder = new Orders(forFindOrderId[0].id, '', '', '', '', '', '', null, null, '', null, soldqty, pendingFreissue, reduceQty, 'Item', null, '', null, null, null, null, null);
                  console.log('save ');
                  this.ordersservice.updateQty(this.updateOrder)
                    .subscribe(
                    resObj => {
                      webServResponce4 = resObj;
                      if (webServResponce4.statusId == 200) {
                        console.log('saved');

                      } else {
                        this.errorMessage = webServResponce4.errMessage;
                      }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );

                }
              }

            }//end of the loop
          }
        }

      }
    }

    this.saveConfirm = true;
    this.saveConfirm2 = true;
    this.saveConfirm3 = false;

  }


  ItemsSelling() {

    let filterItems: TemporyInvoice[] = this.temporyInvoice
      .filter(TemporyInvoice => TemporyInvoice.itemStatus === "Item")
    if (filterItems.length == 0) {
      console.log('undifined');
    } else {

      for (let j = 0; j < filterItems.length; j++) {


        let itemid = filterItems[j].itemMasterId;
        let reitemqty = filterItems[j].requiredQuantity;
        let ItemStatus = filterItems[j].itemStatus;
        let qtyAvailble = 0;


        if (ItemStatus === "Item") {
          let grnitem: FinishGoodGRN[] = this.allfgrn
            .filter(FinishGoodGRN => FinishGoodGRN.itemMaster.id === itemid)
          if (grnitem === undefined) {
            console.log('undifined');
          } else {
            if (grnitem.length == 0) {
              console.log('items not available');
            }
            else {

              console.log('items not available');
              let itemqty = 0;
              let grnitemqty = 0;
              let batchno;
              let newreqty = reitemqty;

              for (let i = 0; i < grnitem.length; i++) {



                if (newreqty == 0 || grnitem[i].remainingQuantity == 0) {
                  console.log('ok  boss ,all items saved');
                }
                else {
                  qtyAvailble = qtyAvailble + grnitem[i].remainingQuantity;
                  grnitemqty = grnitem[i].remainingQuantity;
                  batchno = grnitem[i].batchNumber;
                  let price = (grnitem[i].price) / grnitem[i].quantity;
                  let dis = grnitem[i].discount;
                  let realcost = price - ((price * dis) / 100);




                  if (qtyAvailble > reitemqty) {
                    qtyAvailble = reitemqty;
                  }

                  if (newreqty <= grnitemqty) {

                    //this.openSnackBar('info', 'Success ', '1');

                    let updatedQty = grnitemqty - newreqty;
                    let webServResponce: WebServResponce;
                    this.updateQty = new FinishGoodGRN(grnitem[i].id, '', '', null, null, updatedQty, 0, '', '', '', null, null, null, '', null, null, null);
                    console.log('save ');
                    this.finishGoodGRNservice.updateQty(this.updateQty)
                      .subscribe(
                      resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                          console.log('saved');
                          this.getAll();
                        } else {
                          this.errorMessage = webServResponce.errMessage;
                        }
                      }
                      ,
                      error => this.errorMessage = <any>error
                      );

                    let webServResponce2: WebServResponce;
                    this.saveEdit = new Invoice(
                      0,
                      this.genaratedId,
                      this.referenceNumber,
                      grnitem[i].batchNumber,
                      newreqty,
                      filterItems[j].netPrice,
                      realcost * newreqty,
                      (filterItems[j].netPrice) - realcost,
                      filterItems[j].genaratedId,
                      ItemStatus,
                      this.createdDate,
                      this.createdby,
                      itemid
                    );
                    console.log('save ');
                    this.invoiceService.savedata(this.saveEdit)
                      .subscribe(
                      resObj => {
                        webServResponce2 = resObj;
                        if (webServResponce2.statusId == 200) {
                          console.log('saved invoice 1');
                          this.getAll();
                        } else {
                          this.errorMessage = webServResponce2.errMessage;
                        }
                      }
                      ,
                      error => this.errorMessage = <any>error
                      );




                    let soldqty;
                    let pendingFreissue;
                    let pendingFreeIssues;
                    let reduceQty;


                    let forFindOrderId: Orders[] = this.allordersdata
                      .filter(Orders => Orders.genaratedId === filterItems[j].genaratedId && Orders.itemMaster.id === itemid && Orders.itemStatus === ItemStatus)
                    if (forFindOrderId === undefined) {
                      console.log('undifined');
                    } else {
                      if (forFindOrderId.length == 0)
                      { }
                      else {

                        pendingFreeIssues = forFindOrderId[0].pendingFreeIssueQuantity;
                        // soldqty = (forFindOrderId[0].requiredQuantity) - (reitemqty + pendingFreeIssues);
                        soldqty = (forFindOrderId[0].pendingOrderQuantity) - qtyAvailble;

                        reduceQty = forFindOrderId[0].reduceFreeIssueQuantity;
                        pendingFreissue = (pendingFreeIssues + reitemqty) - reduceQty;


                        let webServResponce3: WebServResponce;
                        this.updateOrder = new Orders(forFindOrderId[0].id, '', '', '', '', '', '', null, null, '', null, soldqty, pendingFreissue, reduceQty, 'Item', null, '', null, null, null, null, null);
                        console.log('save ');
                        this.ordersservice.updateQty(this.updateOrder)
                          .subscribe(
                          resObj => {
                            webServResponce3 = resObj;
                            if (webServResponce3.statusId == 200) {
                              console.log('saved');
                            } else {
                              this.errorMessage = webServResponce3.errMessage;
                            }
                          }
                          ,
                          error => this.errorMessage = <any>error
                          );
                        console.log('got the first');




                      }
                    }


                    newreqty = 0;

                  }
                  else {

                    console.log('go tosecound');


                    // this.openSnackBar('info', 'Success ', '2');

                    newreqty = newreqty - grnitemqty;

                    let webServResponce: WebServResponce;
                    this.updateQty = new FinishGoodGRN(grnitem[i].id, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);
                    console.log('save ');
                    this.finishGoodGRNservice.updateQty(this.updateQty)
                      .subscribe(
                      resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                          console.log('saved');
                        } else {
                          this.errorMessage = webServResponce.errMessage;
                        }
                      }
                      ,
                      error => this.errorMessage = <any>error
                      );

                    let webServResponce3: WebServResponce;
                    this.saveEdit = new Invoice(
                      0,
                      this.genaratedId,
                      this.referenceNumber,
                      grnitem[i].batchNumber,
                      grnitemqty,
                      filterItems[j].netPrice,
                      realcost * grnitemqty,
                      (filterItems[j].netPrice) - realcost,
                      filterItems[j].genaratedId,
                      ItemStatus,
                      this.createdDate,
                      this.createdby,
                      itemid

                    );
                    console.log('save ');
                    this.invoiceService.savedata(this.saveEdit)
                      .subscribe(
                      resObj => {
                        webServResponce3 = resObj;
                        if (webServResponce3.statusId == 200) {
                          console.log('saved invoice');
                          this.getAll();
                        } else {
                          this.errorMessage = webServResponce3.errMessage;
                        }
                      }
                      ,
                      error => this.errorMessage = <any>error
                      );

                    let soldqty;
                    let pendingFreissue;
                    let pendingFreeIssues;
                    let reduceQty;
                    let forFindOrderId: Orders[] = this.allordersdata
                      .filter(Orders => Orders.genaratedId === this.temporyInvoice[j].genaratedId && Orders.itemMaster.id === itemid && Orders.itemStatus === ItemStatus)
                    if (forFindOrderId === undefined) {
                      console.log('undifined');
                    } else {

                      if (forFindOrderId.length == 0) { }
                      else {


                        pendingFreeIssues = forFindOrderId[0].pendingFreeIssueQuantity;
                        soldqty = (forFindOrderId[0].pendingOrderQuantity) - qtyAvailble;
                        reduceQty = forFindOrderId[0].reduceFreeIssueQuantity;
                        pendingFreissue = (pendingFreeIssues + reitemqty) - reduceQty;

                        //this.openSnackBar('info', 'Success ', 'place 22222');

                        let webServResponce4: WebServResponce;
                        this.updateOrder = new Orders(forFindOrderId[0].id, '', '', '', '', '', '', null, null, '', null, soldqty, pendingFreissue, reduceQty, 'Item', null, '', null, null, null, null, null);
                        console.log('save ');
                        this.ordersservice.updateQty(this.updateOrder)
                          .subscribe(
                          resObj => {
                            webServResponce4 = resObj;
                            if (webServResponce4.statusId == 200) {
                              console.log('saved');

                            } else {
                              this.errorMessage = webServResponce4.errMessage;
                            }
                          }
                          ,
                          error => this.errorMessage = <any>error
                          );



                      }

                    }


                  }
                }

              }//end of the loop
            }
          }




        }








      }




    }






  }



  jackmethord() {

    for (let j = 0; j < 1200000000; j++) {
    }
    this.meth1();
  }


  meth1() {
    console.log('inside methord');
  }
  meth2() {
    console.log('222222');

  }

  jackmethord2() {
    console.log('inside ');
    let orderdata1: Orders[] = this.allordersdata
      .filter(Orders => Orders.id === 1)
    if (orderdata1.length === 0) {
      console.log('no data');
    } else {
      console.log('data is ' + JSON.stringify(orderdata1));

    }

  }



  convert() {

    if (this.printConfirm === false) {






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
      for (let j = 0; j < this.temporyInvoice.length; j++) {

        let dis = 0;
        let unit;
        let discript;
        let itemMas: ItemMaster[] = this.allitems
          .filter(ItemMaster => ItemMaster.id === this.temporyInvoice[j].itemMasterId)
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
          .filter(CustomerSpecificPrice => CustomerSpecificPrice.customer.id === this.temporyInvoice[j].customerId && CustomerSpecificPrice.itemMaster.id === this.temporyInvoice[j].itemMasterId)
        if (CusSpecial.length === 0) {
        } else {
          sp = CusSpecial[0].specialPrice;
          sd = CusSpecial[0].specialDiscount;
        }



        var temp = [this.temporyInvoice[j].itemcode, discript, unit,
        this.temporyInvoice[j].requiredQuantity, this.temporyInvoice[j].total, dis, sp, sd, this.temporyInvoice[j].netPrice
        ];
        rows.push(temp);
      }

      for (let j = 0; j < this.invoiceFreeIssue.length; j++) {

        let dis = 0;
        let unit;
        let discript;
        let itemMas: ItemMaster[] = this.allitems
          .filter(ItemMaster => ItemMaster.id === this.invoiceFreeIssue[j].FreeIssueItemid)
        if (itemMas.length === 0) {
        } else {
          unit = itemMas[0].volumeType;
          discript = itemMas[0].discription;
        }

        var temp = [this.invoiceFreeIssue[j].FreeIssueItemcode, discript, unit,
        this.invoiceFreeIssue[j].FreeIssueItemQuantity, 0, dis, 0, 0, 0
        ];
        rows.push(temp);




      }



      let ponum = this.temporyInvoice[0].poNumber;
      let reqdate = this.temporyInvoice[0].requiedDate;
      let repid = this.temporyInvoice[0].rep;
      let customerid = this.temporyInvoice[0].customerId;
      customername = this.temporyInvoice[0].customername;

      let companyId = this.temporyInvoice[0].company;



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
      doc.text(175, 20, 'INVOICE');

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

      doc.text(16, 272, '.............................................................');
      doc.setFontType("normal");
      doc.setFontSize(9);
      doc.text(26, 276, 'Dilivered By');

      doc.text(76, 272, '.....................................................................');
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
      doc.save('Invoice.pdf');

      this.openSnackBar('Success', 'Print Created');


    }
    else {
      this.openSnackBar('Warning', 'Please Confirm Invoice Before Print');
    }

  }

  changetot1(x) {
    this.tot1 = x;

    if (this.tot1 === null) {
      this.tot1 = 0;
    }


  }
  changetot2(x) {
    this.tot2 = x;

    if (this.tot2 === null) {
      this.tot2 = 0;
    }

  }
  changetot3(x) {
    this.tot3 = x;
    if (this.tot3 === null) {
      this.tot3 = 0;
    }

  }
  changetot4(x) {
    this.tot4 = x;
    if (this.tot4 === null) {
      this.tot4 = 0;
    }

  }

  qtyChange(x) {
    if (x != 0) {
      this.additional = false;
    }
    else {
      this.additional = true;

    }

  }


}
