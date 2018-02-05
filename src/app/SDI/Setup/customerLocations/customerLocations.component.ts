import { WebServResponce } from '../../../domain/WebServResponce';
import { CustomerLocationService } from '../../../service/customerLocation.service';
import { CustomerService } from '../../../service/customer.service';
import { CustomerContactService } from '../../../service/customerContact.service';
import { Customer } from '../../../domain/Customer';
import { CustomerContact } from '../../../domain/CustomerContact';
import { CustomerLocation } from '../../../domain/CustomerLocation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
declare let jsPDF;
@Component({
  selector: 'app-customerLocations',
  templateUrl: './customerLocations.component.html',
  styleUrls: ['./customerLocations.component.css']
})
export class CustomerLocationsComponent implements OnInit {
  selectedCustomerIdForLocation: string;
  selectedCustomerIdForContact: string;
  selectedLocationIdForContact: string;


  selectedTab: string = null;
  selectedTab1: string = 'true';
  selectedLocationid;


  public customerLocationForm: FormGroup;
  public customerContactForm: FormGroup;
  allCustomerOptions: SelectItem[];
  allLocationOptions: SelectItem[];
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;
  saveEditLocaton: CustomerLocation;
  saveEditContact: CustomerContact;
  allLocationData: CustomerLocation[];
  allCustomerData: Customer[];
  allContactData: CustomerContact[];
  allFilterdContactData: CustomerContact[];
  maxData: CustomerLocation[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selectedLocation: CustomerLocation = new CustomerLocation(0, '', null, '', '', '', '', '', null, '', '');
  selectedContact: CustomerContact = new CustomerContact(0, null, null, '', '', '', '', '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];
  constructor(
    private customerContactService: CustomerContactService,
    private customerService: CustomerService,
    private customerLocationService: CustomerLocationService,
    private _fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {

  }



  setComboValuesForLocation() {
    this.selectedCustomerIdForLocation = this.selectedLocation.customerId.toString();
  }

  setComboValuesForContact() {
    this.selectedCustomerIdForContact = this.selectedContact.customerId.toString();
    this.selectedLocationIdForContact = this.selectedContact.locationId.toString();
  }


  printLocationDetails() {
    var doc = new jsPDF();
    var col = ['Location ID', 'Customer Name', 'Location Name'];
    var rows = [];
    for (let j = 0; j < this.allLocationData.length; j++) {

      var temp =
        [

          this.allLocationData[j].genaratedId,
          this.allLocationData[j].customer.customerName,
          this.allLocationData[j].location,


        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'Customer Locations');

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
    doc.save('CustomerLocationDetails.pdf');
  }


  printContactDetails() {
    var doc = new jsPDF();
    var col = ['Customer Name', 'Location Name', 'Contact Person', 'Tel No'];
    var rows = [];
    for (let j = 0; j < this.allContactData.length; j++) {

      var temp =
        [

          this.allContactData[j].customer.customerName,
          this.allContactData[j].customerLocation.location,
          this.allContactData[j].personName,
          this.allContactData[j].contact

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'Customer Location ' + "\n" + 'Contacts');

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
    doc.save('CustomerContactDetails.pdf');
  }



  getAllLocationData() {
    let webServResponce: WebServResponce;
    this.customerLocationService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.customerLocationForm.patchValue({ id: 0 });
          this.allLocationData = <CustomerLocation[]>webServResponce.result;
          for (let location of this.allLocationData) {
            location.customerId = location.customer.id;
          }

          this.allLocationOptions = [];
          this.allLocationOptions.push({ label: 'Please Select', value: null });
          for (let location of this.allLocationData) {
            this.allLocationOptions.push({ label: location.location, value: location.id });
          }


        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAllContactData() {
    let webServResponce: WebServResponce;
    this.customerContactService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.customerLocationForm.patchValue({ id: 0 });
          this.allContactData = <CustomerContact[]>webServResponce.result;
          for (let contact of this.allContactData) {
            contact.customerId = contact.customer.id;
            contact.locationId = contact.customerLocation.id;
          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }



  getAllCustomerOptions() {
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


  getMaxData() {
    let webServResponce: WebServResponce;
    this.customerLocationService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <CustomerLocation[]>webServResponce.result;

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




  addNewLocationlData() {
    this.selectedLocation = new CustomerLocation(0, '', null, '', '', '', '', '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.customerLocationForm.reset();
    this.customerLocationForm.patchValue({ id: 0 });
    this.getMaxData();
    this.selectedCustomerIdForLocation = null;
  }


  addNewContactlData() {
    //  this.selectedTab = null;
    //   this.selectedTab1 = 'true';
    this.selectedContact = new CustomerContact(0, null, null, '', '', '', '', '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.customerContactForm.reset();
    this.customerContactForm.patchValue({ id: 0 });
    this.selectedCustomerIdForContact = null;
    this.selectedLocationIdForContact = null;
  }



  saveOrEditLocationData(data: CustomerLocation) {
    let webServResponce: WebServResponce;
    this.saveEditLocaton = new CustomerLocation(data.id, data.genaratedId, data.customerId, data.location, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, this.createdDate, this.createdBy, '');
    if (data.id == 0) {
      let b: boolean = this.isAllReadyExitsLocationDataSave(this.saveEditLocaton);
      if (b) {
        this.saveEditLocaton = data;
        this.saveEditLocaton = new CustomerLocation(data.id, data.genaratedId, data.customerId, data.location, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, this.createdDate, this.createdBy, '');
        this.customerLocationService.saveData(this.saveEditLocaton)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllLocationData();
              this.getMaxData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewLocationlData();
              this.openSnackBar('Success', 'Data Saved');
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
        this.addNewLocationlData();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }

    } else {
      let b: boolean = this.isAllReadyExitsLocationDataUpdate(this.saveEditLocaton);

      if (b) {
        this.saveEditLocaton = new CustomerLocation(data.id, data.genaratedId, data.customerId, data.location, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, this.createdDate, this.createdBy, '');
        this.customerLocationService.editData(this.saveEditLocaton)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllLocationData();
              this.getMaxData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewLocationlData();
              this.openSnackBar('Success', 'Data Updated');
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
        this.addNewLocationlData();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits Update');
      }

    }



  }



  saveOrEditContactData(data: CustomerContact) {
    let webServResponce: WebServResponce;
    this.saveEditContact = new CustomerContact(data.id, data.customerId, data.locationId, data.personName, data.post, data.contact, data.email, data.fax, this.createdDate, this.createdBy, '');
    if (data.id == 0) {
      let b: boolean = this.isAllReadyExitsContactDataSave(this.saveEditContact);
      if (b) {
        this.saveEditContact = data;
        this.saveEditContact = new CustomerContact(data.id, data.customerId, data.locationId, data.personName, data.post, data.contact, data.email, data.fax, this.createdDate, this.createdBy, '');
        this.customerContactService.saveData(this.saveEditContact)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllContactData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewContactlData();
              this.openSnackBar('Success', 'Data Saved');
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
        this.addNewLocationlData();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }

    } else {
      let b: boolean = this.isAllReadyExitsContactDataUpdate(this.saveEditContact);

      if (b) {
        this.saveEditContact = new CustomerContact(data.id, data.customerId, data.locationId, data.personName, data.post, data.contact, data.email, data.fax, this.createdDate, this.createdBy, '');
        this.customerContactService.editData(this.saveEditContact)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllContactData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewContactlData();
              this.openSnackBar('Success', 'Data Updated');
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
        this.addNewLocationlData();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits Update');
      }

    }



  }









  genarateIdNormal(oldId: string) {
    let year = (new Date()).getFullYear();
    let type = 'LOC';
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

    this.customerLocationForm.patchValue({ genaratedId: genaratedId });
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  isAllReadyExitsLocationDataSave(data: CustomerLocation): boolean {
    let obj: CustomerLocation = this.allLocationData
      .filter(CustomerLocation => (CustomerLocation.location.toLowerCase() === data.location.toLowerCase()) && (CustomerLocation.customer.id === data.customerId))
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  isAllReadyExitsLocationDataUpdate(data: CustomerLocation): boolean {
    let obj: CustomerLocation = this.allLocationData
      .filter(CustomerLocation => ((CustomerLocation.location.toLowerCase() === data.location.toLowerCase()) && (CustomerLocation.customer.id === data.customerId)) && CustomerLocation.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  isAllReadyExitsContactDataSave(data: CustomerContact): boolean {
    let obj: CustomerContact = this.allContactData
      .filter(CustomerContact => (CustomerContact.personName.toLowerCase() === data.personName.toLowerCase()) && (CustomerContact.customer.id === data.customerId) && (CustomerContact.customerLocation.id === data.locationId))
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  isAllReadyExitsContactDataUpdate(data: CustomerContact): boolean {
    let obj: CustomerContact = this.allContactData
      .filter(CustomerContact => ((CustomerContact.personName.toLowerCase() === data.personName.toLowerCase()) && (CustomerContact.customer.id === data.customerId) && (CustomerContact.customerLocation.id === data.locationId)) && CustomerContact.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }



  deleteLocationById(id: number) {
    let webServResponce: WebServResponce;
    this.customerLocationService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllLocationData();
          this.selectedLocation = new CustomerLocation(0, '', null, '', '', '', '', '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  deleteContactById(id: number) {
    let webServResponce: WebServResponce;
    this.customerContactService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllContactData();
          this.selectedContact = new CustomerContact(0, null, null, '', '', '', '', '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }


  changeDataCustomer(id) {

    if (this.selectedContact.id == 0) {
      if (id != null) {
        console.log('here is the changed value ' + id);
        //this.fiuiltercompanies(x);
        let obj: CustomerLocation[] = this.allLocationData
          .filter(CustomerLocation => CustomerLocation.customer.id === parseInt(id));
        if (obj != undefined) {
          // console.log('here is filtered option ' + Json.stringify(obj));
          this.allLocationOptions = [];
          this.allLocationOptions.push({ label: 'Please Select', value: null });
          for (let location of obj) {
            this.allLocationOptions.push({ label: location.location, value: location.id });
          }
        }

      }

    }
  }

  changeTabData(evt) {
    console.log(evt.index);
    if (evt.index == 0) {
      this.selectedTab = null;
      this.selectedTab1 = 'true';
    } else {
      this.selectedTab = 'true';
      this.selectedTab1 = null;
    }
  }

  changeDataLocationTable(evt) {
    this.selectedTab = null;
    this.selectedTab1 = 'true';
  }

  changeDataContactTable(evt) {
    if (this.selectedContact.id != 0) {
      this.selectedTab = null;
      this.selectedTab1 = 'true';
    } else {
      this.selectedTab = 'true';
      this.selectedTab1 = null;
    }
  }

  changeDataLocationid(evt) {
    this.selectedLocationid = evt;
    Observable.interval(500).subscribe(x => { this.filterContactDetails() });
  }







  filterContactDetails() {
    //  this.getAllContactData();


    if (this.selectedLocationid == 0) {
      this.allFilterdContactData = this.allContactData;
    } else {


      let obj: CustomerContact[] = this.allContactData
        .filter(CustomerContact => (CustomerContact.customerLocation.id == this.selectedLocationid));
      //  console.log(Json.stringify(obj));
      if (obj === undefined) {
        console.log("no data");
        // this.allFilterdContactData = this.allContactData;
      } else {

        this.allFilterdContactData = obj;

      }



    }



  }



  ngOnInit() {

    this.getAllLocationData();
    this.getAllCustomerOptions();
    this.getAllContactData();
    this.getMaxData();

    this.customerLocationForm = this._fb.group({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      customerId: new FormControl('', Validators.required),
      location: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)]))
    });

    this.customerContactForm = this._fb.group({
      id: new FormControl(''),
      customerId: new FormControl('', Validators.required),
      locationId: new FormControl('', Validators.required),
      personName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      post: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      contact: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      email: new FormControl('', Validators.compose([Validators.pattern('([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))'), Validators.maxLength(50)])),
      fax: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9- ]*[0-9])?$'), Validators.maxLength(10), Validators.minLength(9)]))
    });
  }
}
