import { WebServResponce } from '../../../../domain/WebServResponce';
import { CustomerRequestDebitService } from '../../../../service/customerRequestDebit.service';
import { CustomerDirectorsService } from '../../../../service/customerDirectors.service';
import { CustomerPromisessService } from '../../../../service/customerPromisess.service';
import { CustomerTransactionService } from '../../../../service/customerTranaction.service';
import { CustomerDebitService } from '../../../../service/customerDebit.service';
import { CustomerCompanyService } from '../../../../service/customerCompany.service';
import { BankService } from '../../../../service/bank.service';
import { CustomerAccountsService } from '../../../../service/customerAccounts.service';
import { CustomerService } from '../../../../service/customer.service';
import { ReceiptService } from '../../../../service/receipt.service';
import { CustomerPromisess } from '../../../../domain/CustomerPromisess';
import { CustomerTransaction } from '../../../../domain/CustomerTransaction';
import { CustomerRequestDebit } from '../../../../domain/CustomerRequestDebit';
import { CustomerDebit } from '../../../../domain/CustomerDebit';
import { CustomerDirectors } from '../../../../domain/CustomerDirectors';
import { CustomerCompany } from '../../../../domain/CustomerCompany';
import { Customer } from '../../../../domain/Customer';
import { CustomerAccounts } from '../../../../domain/CustomerAccounts';
import { Bank } from '../../../../domain/Bank';
import { Receipt } from '../../../../domain/Receipt';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  selectedCustomerId: any;
  total: any;
  cus: boolean;
  myForm: FormGroup;
  allCustomerOptions: SelectItem[];
  allCustomerAccoiuntOptions: SelectItem[];
  allbankOptions: SelectItem[];
  msgs: Message[] = [];
  hide: boolean = true;
  errorMessage: string;
  successMessage: string;
  saveEdit: Receipt;
  allBankData: Bank[];
  allData: Receipt[];
  allCustomerData: Customer[];
  allCustomerAccountData: CustomerAccounts[];
  receptAmmount: number;
  oldOverPaimentAmmount: number;
  overPaimentAmmount: number;
  maxData: Receipt[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: Receipt = new Receipt(0, '', null, null, '', null, '', null, null, null, '', 0, '', 0, 0, '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];


  allCompanyData: CustomerCompany[];
  allDirectorsData: CustomerDirectors[];
  allAccountsData: CustomerAccounts[];
  allDebitData: CustomerDebit[];
  allRequestDebitData: CustomerRequestDebit[];
  allTransactionData: CustomerTransaction[];
  allPromisessData: CustomerPromisess[];
  FilterdCustomerList: Customer[];




  constructor(
    private formBuilder: FormBuilder,
    private receiptService: ReceiptService,
    private customerService: CustomerService,
    private customerAccoutService: CustomerAccountsService,
    private bankService: BankService,
    private CustomerCompanyService: CustomerCompanyService,
    private customerCompanyService: CustomerCompanyService,
    private customerDebitService: CustomerDebitService,
    private customerTransactionService: CustomerTransactionService,
    private customerPromisessService: CustomerPromisessService,
    private customerDirectorsService: CustomerDirectorsService,
    private customerRequestDebitService: CustomerRequestDebitService,
    public snackBar: MatSnackBar
  ) {


  }

  printReceptDetails() {
    var doc = new jsPDF();
    var col = ['Receipt No', 'Customer Name', 'Ammount'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp = [this.allData[j].genaratedId, this.allData[j].customer.customerName, this.allData[j].ammount];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Receipts');

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
    doc.save('Receipts.pdf');
  }




  getAll() {
    let webServResponce: WebServResponce;
    this.receiptService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.myForm.patchValue({ id: 0 });
        
          this.allData = <Receipt[]>webServResponce.result;
          for (let receipt of this.allData) {

            receipt.customeId = receipt.customer.id;
            receipt.bankId = receipt.bank.id;
            receipt.customerAccountId = receipt.customerAccount.id;

          }
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }




  getOldOverPaymentAmmount(customerId) {

    console.log("fgfgfg " + this.selectedCustomerId);
    /* this.myForm.patchValue({ overPayment: 0 });
     if (customerId != null) {
       let obj: Receipt = this.allData
         .filter(Receipt => Receipt.paymentStatus === 'yes' && Receipt.customer.id == customerId)
         .pop();
       this.oldOverPaimentAmmount = obj.overPayment;
       console.log(Json.stringify(obj));
       if (obj == null) {
         this.myForm.patchValue({ overPayment: 0 });
       } else {
         this.myForm.patchValue({ overPayment: this.oldOverPaimentAmmount });
       }
 
     }
     
     */
    this.myForm.patchValue({ overPayment: 0 });
    if (customerId != null) {
      this.selectedCustomerId = customerId;

      console.log("fgfgfg " + this.selectedCustomerId);





      let overPayment: number = 0;

      for (let receipt of this.allData) {
        if (receipt.customer.id === parseInt(customerId)) {
          overPayment = receipt.overPayment;
          break;
        }
      }
      this.oldOverPaimentAmmount = overPayment;
      this.myForm.patchValue({ overPayment: this.oldOverPaimentAmmount });
    } else {
      console.log('not selected');
      this.allCustomerAccoiuntOptions = [];
      this.allCustomerAccoiuntOptions.push({ label: 'Please Select', value: null });
      this.myForm.patchValue({ customerAccountId: null });




      this.selectedCustomerId = 0;
    }
  }







  getAllCustomerAccountData() {
    let webServResponce: WebServResponce;
    this.customerAccoutService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.myForm.patchValue({ id: 0 });
          this.allCustomerAccountData = <CustomerAccounts[]>webServResponce.result;
          for (let account of this.allCustomerAccountData) {

            account.customerId = account.customer.id;
            account.bankId = account.bank.id;
            account.companyId = account.company.id;

          }

          this.allCustomerAccoiuntOptions = [];
          this.allCustomerAccoiuntOptions.push({ label: 'Please Select', value: null });
          for (let account of this.allCustomerAccountData) {
            this.allCustomerAccoiuntOptions.push({ label: account.accountNumber, value: account.id });
          }


        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  /*getAllCustomerOptions() {
    let catWebServResponce2: WebServResponce;
    this.customerService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allCustomerData = <Customer[]>catWebServResponce2.result;

          let obj: Customer[] = this.allCustomerData
            .filter(Customer => ((Customer.blackListed.toLowerCase() === 'no')));


          if (obj != undefined) {
            this.allCustomerData = obj;
          }




          this.allCustomerOptions = [];
          this.allCustomerOptions.push({ label: 'Please Select', value: null });
          for (let customer of this.allCustomerData) {


            //  console.log("customers :" + Json.stringify(customer.id));




            this.allCustomerOptions.push({ label: customer.customerName, value: customer.id });
          }
        } else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
}
*/


  getAllCustomerOPtions() {

    console.log("Inside   getAllCustomer:");

    let webServResponce: WebServResponce;
    this.customerService.getValidData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allCustomerData = <Customer[]>webServResponce.result;


          this.allCustomerOptions = [];
          this.allCustomerOptions.push({ label: 'Please Select', value: null });
          for (let customer of this.allCustomerData) {

            this.allCustomerOptions.push({ label: customer.customerName, value: customer.id });

          }



        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );



  }

  getAllBankOptions() {
    let catWebServResponce: WebServResponce;
    this.bankService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allBankData = <Bank[]>catWebServResponce.result;
          this.allbankOptions = [];
          this.allbankOptions.push({ label: 'Please Select', value: null });
          for (let bank of this.allBankData) {
            this.allbankOptions.push({ label: bank.bankName, value: bank.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }




  changeDataBank(id) {
    if (id != null) {
      console.log('here is the changed value ' + this.selectedCustomerId);
      //this.fiuiltercompanies(x);
      let obj: CustomerAccounts[] = this.allCustomerAccountData
        .filter(CustomerAccounts => CustomerAccounts.bank.id === parseInt(id) && CustomerAccounts.customer.id === parseInt(this.selectedCustomerId));
      if (obj != undefined) {


        this.allCustomerAccoiuntOptions = [];
        this.allCustomerAccoiuntOptions.push({ label: 'Please Select', value: null });
        for (let account of obj) {
          this.allCustomerAccoiuntOptions.push({ label: account.accountNumber, value: account.id });
        }
      }

    } else {
      console.log('not selected');
      this.allCustomerAccoiuntOptions = [];
      this.allCustomerAccoiuntOptions.push({ label: 'Please Select', value: null });
    }

  }


  changeReceptAmmount(value) {
    if (value != 0) {
      this.receptAmmount = value;
      //    this.hide = false;
      this.myForm.patchValue({ total: 0 });
    }


  }


  changePayAmmount(value) {

    this.myForm.patchValue({ useOverPayment: null });
    if (value == 0) {
      this.hide = true;
    }

    if (value != 0) {

      this.total = value;

      let overPaymentAmmount = (value - this.receptAmmount);


      if (this.oldOverPaimentAmmount == 0) {
        this.hide = true;
      } else {
        this.hide = false;
      }


      if (overPaymentAmmount >= 0) {

        this.hide = true;


        this.myForm.patchValue({ overPayment: overPaymentAmmount + this.oldOverPaimentAmmount });
      } else {
        //  this.hide = false;
        this.myForm.patchValue({ overPayment: this.oldOverPaimentAmmount });
      }
    }

  }

  chekBox(id) {
    console.log("ID :" + id);
  }


  changeUseOverPayment(value) {
    console.log("radio Select" + value);


    if (value == 'yes') {

      let newOverpaiyment = this.oldOverPaimentAmmount - (this.receptAmmount - this.total)
      this.myForm.patchValue({ overPayment: newOverpaiyment });
    } else {
      this.myForm.patchValue({ overPayment: this.oldOverPaimentAmmount });
    }

  }


  getMax() {
    let webServResponce: WebServResponce;
    this.receiptService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
         
          this.maxData = <Receipt[]>webServResponce.result;

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





  addNew() {

    this.selected = new Receipt(0, '', null, null, '', null, '', null, null, null, '', 0, '', 0, 0, '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.myForm.patchValue({ overPayment: 0 });
    this.getMax();

  }



  saveOrEdit(data: Receipt) {
    let webServResponce: WebServResponce;
    let paymentStatus: string = 'no';
    if (data.overPayment > 0) {
      paymentStatus = 'yes';
    }
    this.saveEdit = new Receipt(data.id, data.genaratedId, data.customeId, data.bankId, data.branch, data.customerAccountId, data.chequeNo, data.date, data.datedDate, data.depositeDate, data.paymentTerm, data.ammount, data.manualReceiptNo, data.total, data.overPayment, paymentStatus, this.createdDate, this.createdBy, '');

    if (data.id == 0) {

      this.selected = data;
      // tslint:disable-next-line:max-line-length
      this.saveEdit = new Receipt(data.id, data.genaratedId, data.customeId, data.bankId, data.branch, data.customerAccountId, data.chequeNo, data.date, data.datedDate, data.depositeDate, data.paymentTerm, data.ammount, data.manualReceiptNo, data.total, data.overPayment, paymentStatus, this.createdDate, this.createdBy, '');

      this.receiptService.saveData(this.saveEdit)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {
            this.getAll();
            this.getMax();
            //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
            this.addNew();
            this.notification('info', 'Success', 'Data Saved');
            console.log('Save');
            //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error
        );


    }
    else {



      this.saveEdit = new Receipt(data.id, data.genaratedId, data.customeId, data.bankId, data.branch, data.customerAccountId, data.chequeNo, data.date, data.datedDate, data.depositeDate, data.paymentTerm, data.ammount, data.manualReceiptNo, data.total, data.overPayment, paymentStatus, this.createdDate, this.createdBy, '');
      this.receiptService.editData(this.saveEdit)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {
            this.getAll();
            //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
            this.addNew();
            this.notification('info', 'Success', 'Data Updated');
            console.log('Update');
            //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error
        );



    }



  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.receiptService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.selected = new Receipt(0, '', null, null, '', null, '', null, null, null, '', 0, '', 0, 0, '', null, '', '');
          this.notification('error', 'Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  getById(id: number) {
    this.allData
      .filter(TaxType => TaxType.id === id)
      .pop();
  }


  genarateIdNormal(oldId: string) {
    let year = (new Date()).getFullYear();
    let type = 'REC';
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

    //  this.getAllUnBackListCustomers();
    this.newGenaratedId = genaratedId;
    console.log('next Id =' + genaratedId);
    this.myForm.patchValue({ genaratedId: genaratedId });
    this.myForm.patchValue({ date: this.createdDate });

    // this.getAllCustomerOPtions();


  }


  notification(type: string, title: string, msg: string) {
    this.msgs = [];
    this.msgs.push({ severity: type, summary: title, detail: msg });
  }




  ngOnInit() {
    this.getAll();
    this.getAllCustomerOPtions();
    this.getAllCustomerAccountData();
    this.getAllBankOptions();
    // this.CustomerRelatedMthods();
    this.getMax();





    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      customeId: new FormControl(''),
      bankId: new FormControl(''),
      branch: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-_./ ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      customerAccountId: new FormControl(''),
      chequeNo: new FormControl(''),
      date: new FormControl(''),
      datedDate: new FormControl(''),
      depositeDate: new FormControl(''),
      paymentTerm: new FormControl(''),
      ammount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
      manualReceiptNo: new FormControl(''),
      total: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
      overPayment: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
      useOverPayment: new FormControl('')
    });
  }

}
