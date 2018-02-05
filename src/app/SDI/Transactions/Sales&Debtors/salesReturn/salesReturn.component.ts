import { SelectItem } from 'primeng/primeng';
import { ReturnItemsService } from '../../../../service/returnItems.service';
import { CustomerService } from '../../../../service/customer.service';
import { Ordersservice } from '../../../../service/orders.service';
import { InvoicePricesService } from '../../../../service/InvoicePrices.service';
import { InvoiceService } from '../../../../service/invoice.service';
import { ReasonService } from '../../../../service/reason.service';
import { ReasonCatagoryService } from '../../../../service/reasonCatagory.service';
import { SalesReturnService } from '../../../../service/salesReturn.service';
import { InvoicePrices } from '../../../../domain/InvoicePrices';
import { Reason } from '../../../../domain/Reason';
import { ReasonCatagory } from '../../../../domain/ReasonCatagory';
import { WebServResponce } from '../../../../domain/WebServResponce';
import { SalesReturn } from '../../../../domain/SalesReturn';
import { Invoice } from '../../../../domain/invoice';
import { Orders } from '../../../../domain/orders';
import { Customer } from '../../../../domain/Customer';
import { SalesReturnTemp } from '../../../../domain/SalesReturnTemp';
import { ReturnItems } from '../../../../domain/ReturnItems';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
declare let jsPDF;
@Component({
  selector: 'app-salesReturn',
  templateUrl: './salesReturn.component.html',
  styleUrls: ['./salesReturn.component.css']
})
export class SalesReturnComponent implements OnInit {
  displayedColumns = ['itemCode', 'batchNumber', 'quantity', 'soldPrice', 'cost', 'profit'
  ];

  length: number;

  myForm: FormGroup;
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;
  // saveEdit: Area;
  // allData: Area[];
  salesReturnItemsList: SalesReturnTemp[] = [];


  allReasonCategoryOptions: SelectItem[];
  allReasonOptions: SelectItem[];
  allInvoiceOptions: SelectItem[];


  allSalesReturnData: SalesReturn[];
  allReasoncategoryData: ReasonCatagory[];
  allReasonData: Reason[];
  allInvoiceData: Invoice[];
  allInvoicePriceData: InvoicePrices[];
  allOrdersData: Orders[];
  allCustomer: Customer[];
  filteredInvoiceData: Invoice[];
  filteredSalesReturnData: SalesReturn[];

  dataSource = new MatTableDataSource<SalesReturnTemp>(this.salesReturnItemsList);


  maxData: SalesReturn[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: SalesReturn = new SalesReturn(0, '', '', null, '', '', null, null, '', null, null, 0, 0, 0, null, '', '');
  selectedSealseReturnItemsInList = new SalesReturnTemp(0, '', '', null, '', '', null, null, '', null, '', null, 0, 0, 0, null, '', '');
  selectedInvoice: Invoice = new Invoice(0, '', '', '', null, null, null, null, '', '', null, '', null);
  mode = 'Observable';
  public events: any[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private salesReturnService: SalesReturnService,
    private reasonCatagoryService: ReasonCatagoryService,
    private reasonService: ReasonService,
    private invoiceService: InvoiceService,
    private InvoicePricesService: InvoicePricesService,
    private ordersservice: Ordersservice,
    private customerService: CustomerService,
    private returnItemsService: ReturnItemsService,
    public snackBar: MatSnackBar

  ) { }


  getAllData() {
    let webServResponce: WebServResponce;
    this.salesReturnService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.myForm.patchValue({ id: 0 });
          this.allSalesReturnData = <SalesReturn[]>webServResponce.result;
          // console.log("data" + Json.stringify(this.allDebitNoteData))
          for (let salesReturn of this.allSalesReturnData) {

            if (salesReturn.reason != null) {
              salesReturn.reasonCategoryId = salesReturn.reason.reasonCatagory.id;
              salesReturn.reasonId = salesReturn.reason.id;
            } else {
              salesReturn.reasonCategoryId = 0;
              salesReturn.reasonId = 0;
            }

            if (salesReturn.itemMaster != null) {
              salesReturn.itemId = salesReturn.itemMaster.id;
            } else {
              salesReturn.itemId = 0;
            }

          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let webServResponce1: WebServResponce;
    this.invoiceService.getAlldata()
      .subscribe(
      resObj => {
        webServResponce1 = resObj;
        if (webServResponce1.statusId == 200) {
          this.allInvoiceData = <Invoice[]>webServResponce1.result;

          for (let invoice of this.allInvoiceData) {
            invoice.itemMasterId = invoice.itemMaster.id;

          }

        } else {
          this.errorMessage = webServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let webServResponce2: WebServResponce;
    this.ordersservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce2 = resObj;
        if (webServResponce2.statusId == 200) {
          this.allOrdersData = <Orders[]>webServResponce2.result;
        } else {
          this.errorMessage = webServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let webServResponce3: WebServResponce;
    this.customerService.getAllData()
      .subscribe(
      resObj => {
        webServResponce3 = resObj;
        if (webServResponce3.statusId == 200) {
          this.allCustomer = <Customer[]>webServResponce3.result;
        } else {
          this.errorMessage = webServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );




  }


  getAllInvoiceOptions() {
    let webServResponce: WebServResponce;
    this.InvoicePricesService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allInvoicePriceData = <InvoicePrices[]>webServResponce.result;
          this.allInvoiceOptions = [];
          this.allInvoiceOptions.push({ label: 'Please Select', value: null });
          for (let invoice of this.allInvoicePriceData) {
            this.allInvoiceOptions.push({ label: invoice.invoiceId, value: invoice.invoiceId });
          }



        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAllReasonData() {
    let webServResponce: WebServResponce;
    this.reasonService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allReasonData = <Reason[]>webServResponce.result;


        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAllReasonCategoryOptions() {
    let webServResponce: WebServResponce;
    this.reasonCatagoryService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allReasoncategoryData = <ReasonCatagory[]>webServResponce.result;
          this.allReasonCategoryOptions = [];
          this.allReasonCategoryOptions.push({ label: 'Please Select', value: null });
          for (let resonCategory of this.allReasoncategoryData) {
            this.allReasonCategoryOptions.push({ label: resonCategory.reasonCatagory, value: resonCategory.id });
          }



        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }

  addNewInvoice() {
    this.selectedInvoice = new Invoice(0, '', '', '', null, null, null, null, '', '', null, '', null);
  }


  addNewSalesItemList() {
    this.selectedSealseReturnItemsInList = new SalesReturnTemp(0, '', '', null, '', '', null, null, '', null, '', null, 0, 0, 0, null, '', '');
  }


  getMax() {
    let webServResponce: WebServResponce;
    this.salesReturnService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <SalesReturn[]>webServResponce.result;

          if (this.maxData[0] == undefined) {
            this.genaratedId = null;
          } else {
            this.genaratedId = this.maxData[0].genaratedId;
          }
          console.log('Maxxxxxx' + this.genaratedId);
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
    let year = (new Date()).getFullYear();
    let type = 'IRN';
    let id;
    let newId;
    let genaratedId;

    if (oldId == null) {
      id = '000001';
      genaratedId = type + '-' + id;

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
      genaratedId = type + '-' + newId;
    }


    this.newGenaratedId = genaratedId;
    console.log('next Id =' + genaratedId);

    this.myForm.patchValue({ genaratedId: genaratedId });
    this.myForm.patchValue({ date: this.createdDate });

  }

  changeDataReasonCategory(id) {
    if (id != null) {
      console.log('here is the changed value ' + id);
      //this.fiuiltercompanies(x);
      let obj: Reason[] = this.allReasonData
        .filter(Reason => Reason.reasonCatagory.id === parseInt(id));
      if (obj != undefined) {
        // console.log('here is filtered option ' + Json.stringify(obj));


        this.allReasonOptions = [];
        this.allReasonOptions.push({ label: 'Please Select', value: null });
        for (let reason of obj) {
          this.allReasonOptions.push({ label: reason.reason, value: reason.id });
        }
      }

    } else {
      console.log('not selected');
      this.allReasonOptions = [];
      this.allReasonOptions.push({ label: 'Please Select', value: null });
    }
  }





  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }




  changeDataInvoice(id) {
    if (id != null) {
      this.filteredInvoiceData = this.allInvoiceData;
      let orderId;
      let customerId;
      let invoiceDate;





      let objSalesReturn: SalesReturn[] = this.allSalesReturnData
        .filter(objSalesReturn => objSalesReturn.invoiceId === id);
      if (objSalesReturn != undefined) {
        this.filteredSalesReturnData = objSalesReturn;
        for (let salesReturn of objSalesReturn) {
          console.log('here is filtered option ' + salesReturn.itemId);
        }
      } else {


      }


      console.log('here is the changed value ' + id);
      //this.fiuiltercompanies(x);
      let objInvoice: Invoice[] = this.allInvoiceData
        .filter(Invoice => Invoice.genaratedId === id);
      if (objInvoice != undefined) {

        // console.log('here is filtered option ' + Json.stringify(obj));
        for (let invoice of objInvoice) {
          orderId = invoice.orderId;
          invoiceDate = invoice.createdDate;
          for (let salesReturn of objSalesReturn) {
            if (invoice.batchNumber == salesReturn.batchNumber && invoice.itemMaster.id == salesReturn.itemMaster.id) {
              invoice.quantity = (invoice.quantity - salesReturn.qty);
              invoice.cost = (invoice.cost - salesReturn.cost);
              invoice.profit = (invoice.profit - salesReturn.profit);
              invoice.soldPrice = (invoice.soldPrice - salesReturn.soldPrice);
            }
          }
        }

        this.filteredInvoiceData = objInvoice;
        this.getAllData();


        console.log('here is the Order Id ' + orderId);
        let objOrder: Orders[] = this.allOrdersData
          .filter(Orders => Orders.genaratedId === orderId);
        if (objOrder != undefined) {
          // console.log('here is filtered option ' + Json.stringify(obj));
          for (let order of objOrder) {
            customerId = order.customer.id;
          }

          console.log('here is the Customer Id ' + customerId);

          let objCustomer: Customer = this.allCustomer
            .filter(Customer => Customer.id === customerId).pop();
          if (objCustomer != undefined) {
            // console.log('here is filtered option ' + Json.stringify(objCustomer));
            this.myForm.patchValue({ customer: objCustomer.customerName });
            this.myForm.patchValue({ invoiceDate: invoiceDate });

          }
        }
      }

    } else {
      this.myForm.patchValue({ customer: '' });
      this.myForm.patchValue({ invoiceDate: '' });
      this.filteredInvoiceData = [];
    }

  }

  addSalesReturnItemsToList(data: SalesReturn) {

    let obj: SalesReturnTemp = this.salesReturnItemsList
      .filter(SalesReturnTemp => SalesReturnTemp.batchNumber === this.selectedInvoice.batchNumber && SalesReturnTemp.itemId == this.selectedInvoice.itemMaster.id).pop();
    if (obj != undefined) {
      this.openSnackBar('Warning', 'Item AllReadyExits');
    } else {

      if (this.selectedInvoice.quantity >= data.qty) {
        let cost = (this.selectedInvoice.cost / this.selectedInvoice.quantity) * data.qty;
        let profit = (this.selectedInvoice.profit / this.selectedInvoice.quantity) * data.qty;
        let soldPrice = (this.selectedInvoice.soldPrice / this.selectedInvoice.quantity) * data.qty;
        //   console.log(Json.stringify(this.selectedInvoice));
        let salesReturnItemListObj = new SalesReturnTemp(
          1,
          data.genaratedId,
          data.invoiceId,
          data.date,
          data.reference1,
          data.reference2, data.reasonCategoryId,
          data.reasonId,
          this.selectedInvoice.batchNumber,
          this.selectedInvoice.itemMaster.id,
          this.selectedInvoice.itemMaster.itemCode,
          data.qty,
          cost,
          profit,
          soldPrice,
          this.createdDate, this.createdBy,
          '');

        this.salesReturnItemsList.push(salesReturnItemListObj);
        this.dataSource = new MatTableDataSource<SalesReturnTemp>(this.salesReturnItemsList);

        this.openSnackBar('Warning', 'Invalid Quantity');
      }

    }

    this.length = this.salesReturnItemsList.length;

    this.myForm.patchValue({ qty: '' });
  }

  addNew() {
    this.myForm.reset();
    this.getAllData();
    this.getMax();
    this.salesReturnItemsList = [];

    this.dataSource = new MatTableDataSource<SalesReturnTemp>(this.salesReturnItemsList);
  }

  deleteSalesReturnItemsFromList(data: SalesReturnTemp) {
   // let index = this.salesReturnItemsList.indexOf(data);
   // if (index > -1) {
    //  this.salesReturnItemsList.splice(index, 1);
   // }
    console.log();
   // this.selectedSealseReturnItemsInList = new SalesReturnTemp(0, '', '', null, '', '', null, null, '', null, '', null, 0, 0, 0, null, '', '');
   // this.length = this.salesReturnItemsList.length;

   this.salesReturnItemsList = [];

   this.dataSource = new MatTableDataSource<SalesReturnTemp>(this.salesReturnItemsList);

  }


  saveSalesReturnItems() {


    let webServResponce: WebServResponce;
    for (let data of this.salesReturnItemsList) {

      let salesReturnItemsObj: SalesReturn = new SalesReturn(
        0,
        data.genaratedId,
        data.invoiceId,
        data.date,
        data.reference1,
        data.reference2,
        data.reasonCategoryId,
        data.reasonId,
        data.batchNumber,
        data.itemId,
        data.qty,
        data.cost,
        data.profit,
        data.soldPrice,
        this.createdDate,
        this.createdBy,
        ''
      );

      let returnItemsObj: ReturnItems = new ReturnItems(
        0,
        data.batchNumber,
        data.itemId,
        data.qty,
        data.cost,
        data.profit,
        data.soldPrice,
        this.createdDate,
        this.createdBy,
        ''
      );


      this.salesReturnService.saveData(salesReturnItemsObj)
        .subscribe(
        resObj => {
          webServResponce = resObj;

          if (webServResponce.statusId == 200) {
            this.addNew();


          } else {
            this.errorMessage = webServResponce.errMessage;

          }


        }
        ,
        error => this.errorMessage = <any>error
        );




      this.returnItemsService.saveData(returnItemsObj)
        .subscribe(
        resObj => {
          webServResponce = resObj;

          if (webServResponce.statusId == 200) {



          } else {
            this.errorMessage = webServResponce.errMessage;

          }


        }
        ,
        error => this.errorMessage = <any>error
        );

    }
    this.openSnackBar('Success', 'Data Saved');
    //  this.salesReturnItemsList = [];

  }









  ngOnInit() {
    this.getAllData();
    this.getAllReasonData();
    this.getAllInvoiceOptions();
    this.getAllReasonCategoryOptions();
    this.getMax();
    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      invoiceId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      invoiceDate: new FormControl(''),
      reference1: new FormControl(''),
      reference2: new FormControl(''),
      reasonCategoryId: new FormControl('', Validators.required),
      reasonId: new FormControl('', Validators.required),
      customer: new FormControl(''),
      qty: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]{1,12}'), Validators.maxLength(15)]))


      //  'store': ['', Validators.required]
    });




  }
}
