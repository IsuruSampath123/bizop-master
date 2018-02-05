import { WebServResponce } from '../../../../domain/WebServResponce';
import { CustomerService } from '../../../../service/customer.service';
import { Ordersservice } from '../../../../service/orders.service';
import { InvoicePricesService } from '../../../../service/InvoicePrices.service';
import { InvoiceService } from '../../../../service/invoice.service';
import { ReasonService } from '../../../../service/reason.service';
import { ReasonCatagoryService } from '../../../../service/reasonCatagory.service';
import { DebitNoteService } from '../../../../service/debitNote.service';
import { Orders } from '../../../../domain/orders';
import { Customer } from '../../../../domain/Customer';
import { Invoice } from '../../../../domain/invoice';
import { InvoicePrices } from '../../../../domain/InvoicePrices';
import { Reason } from '../../../../domain/Reason';
import { ReasonCatagory } from '../../../../domain/ReasonCatagory';
import { DebitNote } from '../../../../domain/DebitNote';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
declare let jsPDF;

@Component({
  selector: 'app-debitNote',
  templateUrl: './debitNote.component.html',
  styleUrls: ['./debitNote.component.css']
})
export class DebitNoteComponent implements OnInit {

  myForm: FormGroup;
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;

  allReasonCategoryOptions: SelectItem[];
  allReasonOptions: SelectItem[];
  allInvoiceOptions: SelectItem[];

  saveEdit: DebitNote;

  allDebitNoteData: DebitNote[];
  allReasoncategoryData: ReasonCatagory[];
  allReasonData: Reason[];
  allInvoiceData: Invoice[];
  allInvoicePriceData: InvoicePrices[];
  allOrdersData: Orders[];
  allCustomer: Customer[];

  maxData: DebitNote[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();

  createdBy = 'Admin';
  selected: DebitNote = new DebitNote(0, '', null, null, 0, null, null, '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private debitNoteService: DebitNoteService,
    private reasonCatagoryService: ReasonCatagoryService,
    private reasonService: ReasonService,
    private invoiceService: InvoiceService,
    private InvoicePricesService: InvoicePricesService,
    private ordersservice: Ordersservice,
    private customerService: CustomerService,
    public snackBar: MatSnackBar

  ) { }



  printDebitNoteDetails() {
    var doc = new jsPDF();
    var col = ['Debit Note No', 'Invoice No','Ammount'];
    var rows = [];
    for (let j = 0; j < this.allDebitNoteData.length; j++) {

      var temp =
        [

          this.allDebitNoteData[j].genaratedId,
          this.allDebitNoteData[j].invoiceNo,
          this.allDebitNoteData[j].ammount
       

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'Debit Note Details');

    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text(16, 35, 'NO :420/1,Akkara-25,Moragahahena,Millewa');
    doc.text(16, 42, 'Tel:0114-950176 / 0773444725 / 0773951034');
    doc.text(16, 49, 'Fax:034-2254287,Email :uniropaints@yahoo.com');


    doc.setFontType('normal');
    doc.setFontType('bold');

    doc.setFontSize(11);
    doc.text(155, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(155, 45, 'Created By   :  ' + this.createdBy);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('DebitNoteDetails.pdf');
  }



  getAllDebitNoteData() {
    let webServResponce: WebServResponce;
    this.debitNoteService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.myForm.patchValue({ id: 0 });
          this.allDebitNoteData = <DebitNote[]>webServResponce.result;
          for (let debitNote of this.allDebitNoteData) {



            if (debitNote.reason != null) {
              debitNote.reasonCategoryId = debitNote.reason.reasonCatagory.id;
              debitNote.reasonId = debitNote.reason.id;
            } else {
              debitNote.reasonCategoryId = 0;
              debitNote.reasonId = 0;
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



  getMax() {
    let webServResponce: WebServResponce;
    this.debitNoteService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <DebitNote[]>webServResponce.result;

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
    let type = 'DEN';
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


  addNew() {

    this.selected = new DebitNote(0, '', null, null, 0, null, null, '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }






  saveOrEdit(data: DebitNote) {
    let webServResponce: WebServResponce;
    this.saveEdit = new DebitNote(data.id, data.genaratedId, data.date, data.invoiceNo, data.ammount, data.reasonCategoryId, data.reasonCategoryId, data.remark, this.createdDate, this.createdBy, '');

    let b: boolean = this.isAllReadyExitsSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        this.selected = data;
        this.saveEdit = new DebitNote(data.id, data.genaratedId, data.date, data.invoiceNo, data.ammount, data.reasonCategoryId, data.reasonCategoryId, data.remark, this.createdDate, this.createdBy, '');

        this.debitNoteService.saveData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;

            if (webServResponce.statusId == 200) {
              this.getAllDebitNoteData();
              this.getMax();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.openSnackBar( 'Success', 'Data Saved');
              console.log('Save');

              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
            } else {
              this.errorMessage = webServResponce.errMessage;

            }


          }
          ,
          error => this.errorMessage = <any>error
          );
      } else {
        this.addNew();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }

    }
    else {

      this.saveEdit = new DebitNote(data.id, data.genaratedId, data.date, data.invoiceNo, data.ammount, data.reasonCategoryId, data.reasonCategoryId, data.remark, this.createdDate, this.createdBy, '');
      let b: boolean = this.isAllReadyExitsEdit(this.saveEdit);

      if (b) {
        this.debitNoteService.editData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllDebitNoteData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.openSnackBar( 'Success', 'Data Updated');
              console.log('Update');
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );
      } else {
        this.addNew();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }


    }

  }


  isAllReadyExitsSave(data: DebitNote): boolean {
    // console.log("Loooow" + data.bankName.toLocaleLowerCase());
    let obj: DebitNote = this.allDebitNoteData
      .filter(DebitNote => (DebitNote.invoiceNo.toLowerCase() === data.invoiceNo.toLowerCase()))
      .pop();



    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      //  console.log(Json.stringify(obj));
      return false;

    }

  }

  isAllReadyExitsEdit(data: DebitNote): boolean {
    let obj: DebitNote = this.allDebitNoteData
      .filter(DebitNote => (DebitNote.invoiceNo.toLowerCase() === data.invoiceNo.toLowerCase()) && DebitNote.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.debitNoteService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllDebitNoteData();
          this.addNew();
          this.selected = new DebitNote(0, '', null, null, 0, null, null, '', null, '', '');
          this.openSnackBar( 'Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
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


  changeDataInvoice(id) {

    console.log('here is the changed value ' + id);
    if (id != null) {

      let orderId;
      let customerId;
      let invoiceDate;

     
      //this.fiuiltercompanies(x);
      let objInvoice: Invoice[] = this.allInvoiceData
        .filter(Invoice => Invoice.genaratedId === id);
      if (objInvoice != undefined) {
        // console.log('here is filtered option ' + Json.stringify(obj));
        for (let invoice of objInvoice) {
          orderId = invoice.orderId;
          invoiceDate = invoice.createdDate;
        }

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
            this.myForm.patchValue({ customer: objCustomer.customerName });
            this.myForm.patchValue({ invoiceDate: invoiceDate });

          }
        }
      }

    } 
      
    if(id==''){
      this.myForm.patchValue({ customer: '' });
      this.myForm.patchValue({ invoiceDate: '' });
    }
    
    

  }




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.getAllInvoiceOptions();
    this.getAllDebitNoteData();
    this.getAllReasonCategoryOptions();
    this.getAllReasonData();
    this.getMax();


    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({

      id: new FormControl(''),
      genaratedId: new FormControl(''),
      date: new FormControl('', Validators.required),
      invoiceNo: new FormControl('', Validators.required),
      ammount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
      customer: new FormControl(''),
      invoiceDate: new FormControl(''),
      remark: new FormControl('', Validators.maxLength(60)),
      reasonCategoryId: new FormControl('', Validators.required),
      reasonId: new FormControl('', Validators.required)
    });
  }
}
