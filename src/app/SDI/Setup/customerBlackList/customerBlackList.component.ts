import { WebServResponce } from '../../../domain/WebServResponce';
import { CustomerService } from '../../../service/customer.service';
import { Customer } from '../../../domain/Customer';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;
@Component({
  selector: 'app-customerBlackList',
  templateUrl: './customerBlackList.component.html',
  styleUrls: ['./customerBlackList.component.css']
})
export class CustomerBlackListComponent implements OnInit {
  selectedCustomerId: string;

  public customerBlacklistForm: FormGroup;
  msgs: Message[] = [];
  allCustomerOptions: SelectItem[];
  allCustomerOptionsData: Customer[];
  errorMessage: string;
  successMessage: string;
  saveEdit: Customer;
  allData: Customer[];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: Customer = new Customer(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];


  constructor(private customerService: CustomerService, private _fb: FormBuilder, public snackBar: MatSnackBar) {

  }


  printBlackListDetails() {
    var doc = new jsPDF();
    var col = ['Customer Name', 'BlakListed Reason'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp =
        [

          this.allData[j].customerName,
          this.allData[j].blackListedReason

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'Blacklist Customers');

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
    doc.save('CustomerBlackListDetails.pdf');
  }




  SetCustomerIdCombo() {
    this.selectedCustomerId = this.selected.id.toString();
  }


  getAllCustomerOptions() {
    let catWebServResponce2: WebServResponce;
    this.customerService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.customerBlacklistForm.patchValue({ id: null });
          this.allData = <Customer[]>catWebServResponce2.result;
          this.customerBlacklistForm.patchValue({ blackListed: 'no' });

          this.allCustomerOptions = [];
          this.allCustomerOptions.push({ label: 'Please Select', value: null });
          for (let customer of this.allData) {
            this.allCustomerOptions.push({ label: customer.customerName, value: customer.id });
          }

          let obj1: Customer[] = this.allData
            .filter(Customer => ((Customer.blackListed.toLowerCase() === 'yes')));

          if (obj1 != undefined) {
            this.allData = obj1;
          }

        } else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  addNew() {
    this.selected = new Customer(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.customerBlacklistForm.reset();
    this.customerBlacklistForm.patchValue({ id: null });
    this.customerBlacklistForm.patchValue({ blackListed: 'no' });
    this.selectedCustomerId = null;
  }


  saveOrEdit(data: Customer) {
    let webServResponce: WebServResponce;
    this.saveEdit = new Customer(data.id, data.genaratedId, data.customerName, '', data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.mainContact, data.otherContact, data.email, data.fax, data.language, data.salesOfficer, data.salesOfficerContact, data.productionManager, data.productionManagerContact, '', '', '', '', '', data.gpslocation, data.blackListed, data.blackListedReason, this.createdDate, this.createdBy, '');
    this.selected = data;
    this.saveEdit = new Customer(data.id, data.genaratedId, data.customerName, '', data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.mainContact, data.otherContact, data.email, data.fax, data.language, data.salesOfficer, data.salesOfficerContact, data.productionManager, data.productionManagerContact, '', '', '', '', '', data.gpslocation, data.blackListed, data.blackListedReason, this.createdDate, this.createdBy, '');


    this.customerService.blacklist(this.saveEdit)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          // this.getAllPersonalDetails();
          //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
          this.addNew();
          this.getAllCustomerOptions();
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

  notification(type: string, title: string, msg: string) {
    this.msgs = [];
    this.msgs.push({ severity: type, summary: title, detail: msg });
  }


  ngOnInit() {
    this.getAllCustomerOptions();

    this.customerBlacklistForm = this._fb.group({
      id: new FormControl('', Validators.required),
      'blackListed': ['', Validators.required],
      'blackListedReason': ['', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-/_%().,&$!+-?:; ]*[a-zA-Z0-9%()])?$'), Validators.maxLength(50)])]
    });
  }

}
