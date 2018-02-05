import { Component, OnInit } from '@angular/core';
import { Store } from "../../../domain/Store";
import { WebServResponce } from "../../../domain/WebServResponce";
import { StoreType } from "../../../domain/StoreType";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Storetypeservice } from "../../../service/StoreType.service";
import { SelectItem } from "primeng/primeng";
import { Storeservice } from "../../../service/Store.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Company } from "../../../domain/Company";
import { Companyservice } from "../../../service/Company.service";
declare let jsPDF;

@Component({
  selector: 'app-Store',
  templateUrl: './Store.component.html',
  styleUrls: ['./Store.component.css']
})
export class StoreComponent implements OnInit {
  myForm: FormGroup;

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  constructor(private formBuilder: FormBuilder, private companyservice: Companyservice, private storetypeservice: Storetypeservice, private storeservice: Storeservice, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      storeName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      storeKeeper: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      helper1: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      helper2: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      helper3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      telephoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      contactPerson: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      contactPersonTelephone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      contactPersonImage: new FormControl(''),
      gpsLocation: new FormControl(''),
      storeTypeId: new FormControl('',Validators.required),


    });
  }
  allItemtypes: StoreType[];
  errorMessage: string;
  successMessage: string;
  saveEdit: Store;
  alldata: Store[];
  maxData: Store[];
  jacktester;
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: Store = new Store(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, '', null);
  allItemtypeOptions: SelectItem[] = [];



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
  getAll() {
    this.CompanyData();
    let webServResponce: WebServResponce;
    this.storeservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <Store[]>webServResponce.result;
          for (let var1 of this.alldata) {
            var1.storeTypeId = var1.storeType.id;
          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
    let catWebServResponce: WebServResponce;
    this.storetypeservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allItemtypes = <StoreType[]>catWebServResponce.result;
          this.allItemtypeOptions = [];
          this.allItemtypeOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allItemtypes) {
            this.allItemtypeOptions.push({ label: var1.storeType, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );




  }
  getMax() {
    let webServResponce: WebServResponce;
    this.storeservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Store[]>webServResponce.result;
          //console.log(this.maxData[0].genaratedId);

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

  addNew() {

    this.selected = new Store(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, '', null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.myForm.patchValue({ istoreTypeId: null });


    this.getMax();
  }

  saveOrEdit(data: Store) {

    var num = new Number(data.storeTypeId);
    let ystring = num.toString();

    let integervalue =parseInt(ystring);
    let webServResponce: WebServResponce;
    this.saveEdit = new Store(

      data.id,
      data.genaratedId,
      data.storeName,
      data.storeKeeper,
      data.helper1,
      data.helper2,
      data.helper3,
      data.addressLine1,
      data.addressLine2,
      data.addressLine3,
      data.addressLine4,
      data.telephoneNumber,
      data.contactPerson,
      data.contactPersonTelephone,
      data.contactPersonImage,
      data.gpsLocation,
      this.createdDate,
      this.createdby,
      data.storeTypeId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.storeservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {

              console.log('checkthis' + webServResponce.errDetail);
              this.getAll();
              this.addNew();
              console.log('saved');
              this.openSnackBar('Success', 'Data Saved');

            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );
      }
      else {


        this.openSnackBar('Worning', 'Data Already exist');
        this.addNew();
      }


    }
    else {

      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {


        console.log("update");
        this.storeservice.editdata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {


              console.log('updated');
              this.getAll();
              this.addNew();
              this.openSnackBar('Success', 'Data Updated');

            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );


      }
      else {
        this.openSnackBar('Worning', 'Store Name Already exist');
        this.addNew();

      }
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.storeservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new Store(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, '', null);
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  getdataId(id: number) {
    this.alldata
      .filter(Catagory => Catagory.id === id)
      .pop();
  }


  genarateIdNormal(oldId: string) {
    //let year = (new Date()).getFullYear();
    let type = 'STO'
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

  }

  AllreadyExistSave(data: Store): boolean {
    let obj: Store = this.alldata
      .filter(Store => Store.storeName.toLowerCase() === data.storeName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: Store): boolean {

    let obj: Store = this.alldata
      .filter(Store => Store.storeName.toLowerCase() === data.storeName.toLowerCase() && Store.id != data.id)
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  convert() {

    let companyName: string;
    let addressLine1: string;
    let addressLine2: string;
    let addressLine3: string;
    let addressLine4: string;
    let telephone: string;
    let fax: string;
    let email: string;
    for (let j = 0; j < this.allcompany.length; j++) {

      companyName = this.allcompany[j].companyName;
      addressLine1 = this.allcompany[j].addressLine1;
      addressLine2 = this.allcompany[j].addressLine2;
      addressLine3 = this.allcompany[j].addressLine3;
      addressLine4 = this.allcompany[j].addressLine4;
      telephone = this.allcompany[j].telephoneNumber;
      fax = this.allcompany[j].faxNumber;
      email = this.allcompany[j].emailAddress;
    }
    var doc = new jsPDF();
    var col = ["Store ID", "Store Name", "Address Line 1", "Address Line 2", "Contact Number"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].storeName,
      this.alldata[j].addressLine1, this.alldata[j].addressLine2, this.alldata[j].telephoneNumber

      ];
      rows.push(temp);
    }



    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Stores');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);


    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(11);
    doc.text(155, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(155, 45, 'Created By   :  ' + this.createdby);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('Store.pdf');

    this.openSnackBar('Success', 'Print Created');



  }


  SetCombo(x, y) {

    var num = new Number(y);
    let ystring = num.toString();

   this.jacktester = ystring;


  }

}







