import { SelectItem } from 'primeng/primeng';

import { TaxType } from '../../../domain/TaxType';
import { Bank } from '../../../domain/Bank';
import { SupplierGroup } from '../../../domain/SupplierGroup';
import { TaxTypeService } from '../../../service/taxType.service';
import { SupplierContactPersonService } from '../../../service/supplierContactPerson.service';
import { SupplierTaxService } from '../../../service/supplierTax.service';
import { SupplierService } from '../../../service/supplier.service';
import { SupplierAccountService } from '../../../service/supplierAccount.service';
import { SupplierGroupService } from '../../../service/supplierGroup.service';
import { BankService } from '../../../service/bank.service';
import { Supplier } from '../../../domain/Supplier';
import { WebServResponce } from '../../../domain/WebServResponce';
import { SupplierAccount } from '../../../domain/SupplierAccount';
import { SupplierTax } from '../../../domain/SupplierTax';
import { SupplierContactPerson } from '../../../domain/SupplierContactPerson';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  selectedSupplierIdForContactPerson: string;
  selectedTaxTypeIdForTax: string;
  selectedTaxIdForTax: string;
  selectedSupplierIdForTax: string;
  selectedBankIdForAccount: string;
  selectedSupplierIdForAccount: string;
  selectedSuplierGroupId: string;

  selectedTab0: string = 'true';
  selectedTab1: string = null;
  selectedTab2: string = null;
  selectedTab3: string = null;
  selectedSupplierid;



  myForm: FormGroup;
  supplierAccountForm: FormGroup;
  supplierTaxForm: FormGroup;
  supplierContactPersonForm: FormGroup;
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;
  allSupplierGroupOptions: SelectItem[];
  allBankOptions: SelectItem[];
  allTaxTypeOptions: SelectItem[];
  allSupplierOptions: SelectItem[];
  saveEdit: Supplier;
  saveEditAccount: SupplierAccount;
  saveEditTax: SupplierTax;
  saveEditContactPerson: SupplierContactPerson;


  allData: Supplier[];
  allSupplierGroup: SupplierGroup[];
  allBank: Bank[];
  allAccountData: SupplierAccount[];
  allTaxData: SupplierTax[];
  allContactPersonData: SupplierContactPerson[];
  allTaxtypeData: TaxType[];

  filterdAccountData: SupplierAccount[];
  filterdTxData: SupplierTax[];
  filterdContactPersondata: SupplierContactPerson[];

  maxData: Supplier[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: Supplier = new Supplier(0, '', null, '', '', '', '', '', '', '', '', '', null, '', '');
  selectedAccount: SupplierAccount = new SupplierAccount(0, null, null, '', '', null, '', '');
  selectedTax: SupplierTax = new SupplierTax(0, null, null, '', null, '', '');
  selectedContactPerson: SupplierContactPerson = new SupplierContactPerson(0, null, '', '', '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];

  constructor(
    private bankService: BankService,
    private supplierGroupService: SupplierGroupService,
    private supplierService: SupplierService,
    private supplierAccountService: SupplierAccountService,
    private taxTypeService: TaxTypeService,
    private supplierTaxService: SupplierTaxService,
    private supplierContactPersonService: SupplierContactPersonService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }





  setComboValuesForSupplier(x, y) {
    console.log('ffff : ' + y);
    var num = new Number(y);
    let ystring = num.toString();
    this.selectedSuplierGroupId = ystring;
  }


  setComboValuesForAccount() {
    this.selectedSupplierIdForAccount = this.selectedAccount.supplierId.toString();
    this.selectedBankIdForAccount = this.selectedAccount.bankId.toString();
  }

  setComboValuesForTax() {
    this.selectedSupplierIdForTax = this.selectedTax.supplierId.toString();
    this.selectedTaxTypeIdForTax = this.selectedTax.taxTypeId.toString();
  }

  setComboValuesForContactPerson() {
    this.selectedSupplierIdForContactPerson = this.selectedContactPerson.supplierId.toString();
  }



  printSupplierDetails() {
    var doc = new jsPDF();
    var col = ['Supplier ID', 'Supplier Name', 'Contact No'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp =
        [

          this.allData[j].genaratedId,
          this.allData[j].supplierName,
          this.allData[j].contact1,
       

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Suppliers');

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
    doc.save('supplierDetails.pdf');
  }




  printAccountDetails() {
    var doc = new jsPDF();
    var col = ['Supplier Name', 'Bank Name', 'Branch Name', 'Account NO'];
    var rows = [];
    for (let j = 0; j < this.allAccountData.length; j++) {

      var temp =
        [

          this.allAccountData[j].supplier.supplierName,
          this.allAccountData[j].bank.bankName,
          this.allAccountData[j].branch,
          this.allAccountData[j].accountNo,

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Supplier Tax');

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
    doc.save('supplierAccountDetails.pdf');
  }


  printTaxDetails() {
    var doc = new jsPDF();
    var col = ['Supplier Name', 'Tax Type', 'Tax No'];
    var rows = [];
    for (let j = 0; j < this.allTaxData.length; j++) {

      var temp =
        [

          this.allTaxData[j].supplier.supplierName,
          this.allTaxData[j].taxType.taxType,
          this.allTaxData[j].taxNo
        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Supplier Accounts');

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
    doc.save('supplierTaxDetails.pdf');


  }


  printContactPersonDetails() {
    var doc = new jsPDF();
    var col = ['Supplier Name', 'Contact Person Name', 'Designation', 'Tel No'];
    var rows = [];
    for (let j = 0; j < this.allContactPersonData.length; j++) {

      var temp =
        [

          this.allContactPersonData[j].supplier.supplierName,
          this.allContactPersonData[j].name,
          this.allContactPersonData[j].designation,
          this.allContactPersonData[j].telNo
        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Supplier ' + "\n" + ' Contact Persons');

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
    doc.save('supplierContactPersonsDetails.pdf');
  }








  getAllSupplierGroupOptions() {
    let catWebServResponce3: WebServResponce;
    this.supplierGroupService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce3 = resObj;
        if (catWebServResponce3.statusId == 200) {
          this.allSupplierGroup = <SupplierGroup[]>catWebServResponce3.result;
          this.allSupplierGroupOptions = [];
          this.allSupplierGroupOptions.push({ label: 'Please Select', value: null });
          for (let supplierGroup of this.allSupplierGroup) {

            this.allSupplierGroupOptions.push({ label: supplierGroup.supplierGroup, value: supplierGroup.id });
          }
        } else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }


  getAll() {


    let webServResponce: WebServResponce;
    this.supplierService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.myForm.patchValue({ id: 0 });
          this.allData = <Supplier[]>webServResponce.result;
          for (let supplier of this.allData) {
            if (supplier != null) {
              supplier.supplierGroupId = supplier.supplierGroup.id;
              console.log("reddaaaaaaaa " + supplier.supplierGroupId)

            } else {
              supplier.supplierGroupId = 0;
            }

          }
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );



    let catWebServResponce1: WebServResponce;
    this.bankService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce1 = resObj;
        if (catWebServResponce1.statusId == 200) {
          this.allBank = <Bank[]>catWebServResponce1.result;
          this.allBankOptions = [];
          this.allBankOptions.push({ label: 'Please Select', value: null });
          for (let bank of this.allBank) {

            this.allBankOptions.push({ label: bank.bankName, value: bank.id });
          }
        } else {
          this.errorMessage = catWebServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAllAccountData() {
    let webServResponce: WebServResponce;
    this.supplierAccountService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.supplierAccountForm.patchValue({ id: 0 });
          this.allAccountData = <SupplierAccount[]>webServResponce.result;
          for (let account of this.allAccountData) {

            account.supplierId = account.supplier.id;
            account.bankId = account.bank.id;



          }
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }


  getAllTaxData() {
    let webServResponce: WebServResponce;
    this.supplierTaxService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.supplierTaxForm.patchValue({ id: 0 });
          this.allTaxData = <SupplierTax[]>webServResponce.result;
          for (let tax of this.allTaxData) {

            tax.supplierId = tax.supplier.id;
            tax.taxTypeId = tax.taxType.id;



          }
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }

  getAllContactPersonData() {
    let webServResponce: WebServResponce;
    this.supplierContactPersonService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.supplierTaxForm.patchValue({ id: 0 });
          this.allContactPersonData = <SupplierContactPerson[]>webServResponce.result;
          for (let contactPerson of this.allContactPersonData) {
            contactPerson.supplierId = contactPerson.supplier.id;
          }
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }


  getAllSupplierOptions() {
    let catWebServResponce1: WebServResponce;
    this.supplierService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce1 = resObj;
        if (catWebServResponce1.statusId == 200) {
          this.allData = <Supplier[]>catWebServResponce1.result;
          this.allSupplierOptions = [];
          this.allSupplierOptions.push({ label: 'Please Select', value: null });
          for (let supplier of this.allData) {

            this.allSupplierOptions.push({ label: supplier.supplierName, value: supplier.id });
          }
        } else {
          this.errorMessage = catWebServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }

  getAllTaxTypeOptions() {
    let catWebServResponce1: WebServResponce;
    this.taxTypeService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce1 = resObj;
        if (catWebServResponce1.statusId == 200) {
          this.allTaxtypeData = <TaxType[]>catWebServResponce1.result;
          this.allTaxTypeOptions = [];
          this.allTaxTypeOptions.push({ label: 'Please Select', value: null });
          for (let taxType of this.allTaxtypeData) {

            this.allTaxTypeOptions.push({ label: taxType.taxType, value: taxType.id });
          }
        } else {
          this.errorMessage = catWebServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }





  getMax() {
    let webServResponce: WebServResponce;
    this.supplierService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Supplier[]>webServResponce.result;

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

    this.selected = new Supplier(0, '', null, '', '', '', '', '', '', '', '', '', null, '', '');
    // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
    this.selectedSuplierGroupId = null;
    //  this.selectedSuplierGroupId = null;
  }

  addNewAccount() {

    this.selectedAccount = new SupplierAccount(0, null, null, '', '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.supplierAccountForm.reset();
    this.supplierAccountForm.patchValue({ id: 0 });
    this.selectedSupplierIdForAccount = null;
    this.selectedBankIdForAccount = null;


  }


  addNewTax() {

    this.selectedTax = new SupplierTax(0, null, null, '', null, '', '');
    // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.supplierTaxForm.reset();
    this.supplierTaxForm.patchValue({ id: 0 });
    this.selectedSupplierIdForTax = null;
    this.selectedTaxTypeIdForTax = null;

  }

  addNewContactPerson() {

    this.selectedContactPerson = new SupplierContactPerson(0, null, '', '', '', null, '', '');
    // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.supplierContactPersonForm.reset();
    this.supplierContactPersonForm.patchValue({ id: 0 });
    this.selectedSupplierIdForContactPerson = null;
  }







  saveOrEdit(data: Supplier) {
    let webServResponce: WebServResponce;
    this.saveEdit = new Supplier(data.id, data.genaratedId, data.supplierGroupId, data.supplierName, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.contact1, data.contact2, data.email, data.fax, this.createdDate, this.createdBy, '');
    let b: boolean = this.isAllReadyExitsSave(this.saveEdit);

    if (data.id == 0) {
      if (b) {
        this.selected = data;
        this.saveEdit = new Supplier(data.id, data.genaratedId, data.supplierGroupId, data.supplierName, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.contact1, data.contact2, data.email, data.fax, this.createdDate, this.createdBy, '');
        this.supplierService.saveData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              this.getMax();
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.getAllSupplierOptions();
              this.openSnackBar('Success', 'Data Saved');
              console.log('Save');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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

      let b: boolean = this.isAllReadyExitsUpdate(this.saveEdit);
      if (b) {
        this.saveEdit = new Supplier(data.id, data.genaratedId, data.supplierGroupId, data.supplierName, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.contact1, data.contact2, data.email, data.fax, this.createdDate, this.createdBy, '');
        this.supplierService.editData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.getAllSupplierOptions();
              this.openSnackBar('Success', 'Data Updated');
              console.log('Update');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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


  saveOrEditAccount(data: SupplierAccount) {
    let webServResponce: WebServResponce;
    this.saveEditAccount = new SupplierAccount(data.id, data.supplierId, data.bankId, data.branch, data.accountNo, this.createdDate, this.createdBy, '');
    let b: boolean = this.isAllReadyExitsAccountSave(this.saveEditAccount);

    if (data.id == 0) {
      if (b) {
        this.selectedAccount = data;
        this.saveEditAccount = new SupplierAccount(data.id, data.supplierId, data.bankId, data.branch, data.accountNo, this.createdDate, this.createdBy, '');
        this.supplierAccountService.saveData(this.saveEditAccount)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllAccountData();

              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewAccount();
              this.openSnackBar('Success', 'Data Saved');
              console.log('Save');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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

      let b: boolean = this.isAllReadyExitsAccountUpdate(this.saveEditAccount);
      if (b) {
        this.saveEditAccount = new SupplierAccount(data.id, data.supplierId, data.bankId, data.branch, data.accountNo, this.createdDate, this.createdBy, '');
        this.supplierAccountService.editData(this.saveEditAccount)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllAccountData();
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewAccount();
              this.openSnackBar('Success', 'Data Updated');
              console.log('Update');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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



  saveOrEditTax(data: SupplierTax) {
    let webServResponce: WebServResponce;
    this.saveEditTax = new SupplierTax(data.id, data.supplierId, data.taxTypeId, data.taxNo, this.createdDate, this.createdBy, '');
    let b: boolean = this.isAllReadyExitsTaxSave(this.saveEditTax);

    if (data.id == 0) {
      if (b) {
        this.selectedTax = data;
        this.saveEditTax = new SupplierTax(data.id, data.supplierId, data.taxTypeId, data.taxNo, this.createdDate, this.createdBy, '');
        this.supplierTaxService.saveData(this.saveEditTax)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllTaxData();

              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name :'+t his.selectedCatagory.itemCategory);
              this.addNewTax();
              this.openSnackBar('Success', 'Data Saved');
              console.log('Save');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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

      let b: boolean = this.isAllReadyExitsTaxUpdate(this.saveEditTax);
      if (b) {
        this.saveEditTax = new SupplierTax(data.id, data.supplierId, data.taxTypeId, data.taxNo, this.createdDate, this.createdBy, '');
        this.supplierTaxService.editData(this.saveEditTax)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllTaxData();
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewTax();
              this.openSnackBar('Success', 'Data Updated');
              console.log('Update');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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


  saveOrEditContactPerson(data: SupplierContactPerson) {
    let webServResponce: WebServResponce;
    this.saveEditContactPerson = new SupplierContactPerson(data.id, data.supplierId, data.name, data.designation, data.telNo, this.createdDate, this.createdBy, '');
    // let b: boolean = this.isAllReadyExitsTaxSave(this.saveEditTax);
    let b: boolean = true;

    if (data.id == 0) {
      if (b) {
        this.selectedContactPerson = data;
        this.saveEditContactPerson = new SupplierContactPerson(data.id, data.supplierId, data.name, data.designation, data.telNo, this.createdDate, this.createdBy, '');
        this.supplierContactPersonService.saveData(this.saveEditContactPerson)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllContactPersonData();

              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name :'+t his.selectedCatagory.itemCategory);
              this.addNewContactPerson();
              this.openSnackBar('Success', 'Data Saved');
              console.log('Save');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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

    } else {
      let b: boolean = true;
      //  let b: boolean = this.isAllReadyExitsTaxUpdate(this.saveEditTax);
      if (b) {
        this.saveEditContactPerson = new SupplierContactPerson(data.id, data.supplierId, data.name, data.designation, data.telNo, this.createdDate, this.createdBy, '');
        this.supplierContactPersonService.editData(this.saveEditContactPerson)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllContactPersonData();
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewContactPerson();
              this.openSnackBar('Success', 'Data Updated');
              console.log('Update');
              // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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








  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.supplierService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.selected = new Supplier(0, '', null, '', '', '', '', '', '', '', '', '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  deleteAccountById(id: number) {
    let webServResponce: WebServResponce;
    this.supplierAccountService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllAccountData();
          this.addNewAccount();
          this.selectedAccount = new SupplierAccount(0, null, null, '', '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  deleteTaxById(id: number) {
    let webServResponce: WebServResponce;
    this.supplierTaxService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllTaxData();
          this.addNewTax();
          this.selectedTax = new SupplierTax(0, null, null, '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  deleteContactPersonById(id: number) {

    console.log("Delete ID: " + id);

    let webServResponce: WebServResponce;
    this.supplierContactPersonService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllContactPersonData();
          this.addNewContactPerson();
          this.selectedContactPerson = new SupplierContactPerson(0, null, '', '', '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
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
    let type = 'SUP';
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
  }


  isAllReadyExitsSave(data: Supplier): boolean {
    let obj: Supplier = this.allData
      .filter(Supplier => Supplier.supplierName.toLowerCase() === data.supplierName.toLowerCase())
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  isAllReadyExitsUpdate(data: Supplier): boolean {
    let obj: Supplier = this.allData
      .filter(Supplier => (Supplier.supplierName.toLowerCase() === data.supplierName.toLowerCase()) && Supplier.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }



  isAllReadyExitsAccountSave(data: SupplierAccount): boolean {
    let obj: SupplierAccount = this.allAccountData
      .filter(SupplierAccount => SupplierAccount.accountNo.toLowerCase() === data.accountNo.toLowerCase())
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  isAllReadyExitsAccountUpdate(data: SupplierAccount): boolean {
    let obj: SupplierAccount = this.allAccountData
      .filter(SupplierAccount => (SupplierAccount.accountNo.toLowerCase() === data.accountNo.toLowerCase()) && SupplierAccount.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  isAllReadyExitsTaxSave(data: SupplierTax): boolean {
    let obj: SupplierTax = this.allTaxData
      .filter(SupplierTax => SupplierTax.taxNo.toLowerCase() === data.taxNo.toLowerCase())
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  isAllReadyExitsTaxUpdate(data: SupplierTax): boolean {
    let obj: SupplierTax = this.allTaxData
      .filter(SupplierTax => (SupplierTax.taxNo.toLowerCase() === data.taxNo.toLowerCase()) && SupplierTax.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }





  clickSupplierTable(evt) {
    console.log("Table 1");
    this.selectedTab0 = 'true';
    this.selectedTab1 = null;
    this.selectedTab2 = null;
    this.selectedTab3 = null;


  }
  clickAccountTable(evt) {
    console.log("Table 2");
    if (this.selectedAccount.id == 0) {
      this.selectedTab0 = null;
      this.selectedTab1 = 'true';
      this.selectedTab2 = null;
      this.selectedTab3 = null;
    } else {
      this.selectedTab0 = 'true';
      this.selectedTab1 = null;
      this.selectedTab2 = null;
      this.selectedTab3 = null;
    }

  }

  clickTaxTable(evt) {
    console.log("Table 3");
    if (this.selectedTax.id == 0) {
      this.selectedTab0 = null;
      this.selectedTab1 = null;
      this.selectedTab2 = 'true';
      this.selectedTab3 = null;
    } else {
      this.selectedTab0 = 'true';
      this.selectedTab1 = null;
      this.selectedTab2 = null;
      this.selectedTab3 = null;
    }

  }

  clickContactPersonTable(evt) {
    console.log("Table 4");
    if (this.selectedContactPerson.id == 0) {
      this.selectedTab0 = null;
      this.selectedTab1 = null;
      this.selectedTab2 = null;
      this.selectedTab3 = 'true';
    } else {
      this.selectedTab0 = 'true';
      this.selectedTab1 = null;
      this.selectedTab2 = null;
      this.selectedTab3 = null;
    }

  }

  changeTabData(evt) {

    console.log(evt.index);

    if (evt.index == 1) {
      this.selectedTab0 = null;
      this.selectedTab1 = 'true';
      this.selectedTab2 = null;
      this.selectedTab3 = null;
    } if (evt.index == 2) {
      this.selectedTab0 = null;
      this.selectedTab1 = null;
      this.selectedTab2 = 'true';
      this.selectedTab3 = null;
    }
    if (evt.index == 3) {
      this.selectedTab0 = null;
      this.selectedTab1 = null;
      this.selectedTab2 = null;
      this.selectedTab3 = 'true';
    }
    if (evt.index == 0) {
      this.selectedTab0 = 'true';
      this.selectedTab1 = null;
      this.selectedTab2 = null;
      this.selectedTab3 = null;
    }

  }


  changeDataSupplierid(evt) {
    this.selectedSupplierid = evt;
    Observable.interval(500).subscribe(x => { this.filterDetails() });
  }




  filterDetails() {
    //  this.getAllContactData();


    if (this.selectedSupplierid == 0) {
      this.filterdAccountData = this.allAccountData;
      this.filterdTxData = this.allTaxData;
      this.filterdContactPersondata = this.allContactPersonData;
    } else {


      let objAccount: SupplierAccount[] = this.allAccountData
        .filter(SupplierAccount => (SupplierAccount.supplier.id == this.selectedSupplierid));
      //  console.log(Json.stringify(obj));
      if (objAccount === undefined) {
        console.log("no data");
        // this.allFilterdContactData = this.allContactData;
      } else {

        this.filterdAccountData = objAccount;

      }


      let objTax: SupplierTax[] = this.allTaxData
        .filter(SupplierTax => (SupplierTax.supplier.id == this.selectedSupplierid));
      //  console.log(Json.stringify(obj));
      if (objTax === undefined) {
        console.log("no data");
        // this.allFilterdContactData = this.allContactData;
      } else {

        this.filterdTxData = objTax;

      }


      let objContactPerson: SupplierContactPerson[] = this.allContactPersonData
        .filter(SupplierContactPerson => (SupplierContactPerson.supplier.id == this.selectedSupplierid));
      //  console.log(Json.stringify(obj));
      if (objContactPerson === undefined) {
        console.log("no data");
        // this.allFilterdContactData = this.allContactData;
      } else {

        this.filterdContactPersondata = objContactPerson;

      }


    }



  }






  ngOnInit() {
    this.getAll();
    this.getMax();
    this.getAllSupplierGroupOptions();
    this.getAllSupplierOptions();
    this.getAllAccountData();
    this.getAllTaxTypeOptions();
    this.getAllTaxData();
    this.getAllContactPersonData();

    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      supplierGroupId: new FormControl(''),
      supplierName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      contact1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      contact2: new FormControl('', Validators.compose([Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      email: new FormControl('', Validators.compose([Validators.pattern('([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))'), Validators.maxLength(50)])),
      fax: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9- ]*[0-9])?$'), Validators.maxLength(10), Validators.minLength(9)]))

      ///^([a-zA-Z0-9_-]){3,5}$/
    });


    this.supplierAccountForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      supplierId: new FormControl('', Validators.required),
      bankId: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      accountNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(25)]))
    });





    this.supplierTaxForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      supplierId: new FormControl('', Validators.required),
      taxTypeId: new FormControl('', Validators.required),
      taxNo: new FormControl('')
    });


    this.supplierContactPersonForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      supplierId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      designation: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      telNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)]))
    });

  }

}
