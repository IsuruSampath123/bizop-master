import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { StoreType } from "../../../domain/StoreType";
import { WebServResponce } from "../../../domain/WebServResponce";
import { Message } from 'primeng/components/common/api';
import { Storetypeservice } from "../../../service/StoreType.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Companyservice } from "../../../service/Company.service";
import { Company } from "../../../domain/Company";
declare let jsPDF;



@Component({
  selector: 'app-StoreType',
  templateUrl: './StoreType.component.html',
  styleUrls: ['./StoreType.component.css']
})
export class StoreTypesComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private companyservice: Companyservice, private storetypeservice: Storetypeservice, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      'storeType': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])]
      //'^[A-z]+$'
      // ^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$
      ///^[ A-Za-z0-9_@./#&+-]*$/
    });
  }


  errorMessage: string;
  successMessage: string;
  saveEdit: StoreType;
  alldata: StoreType[];
  alldata2: StoreType[];
  maxData: StoreType[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate2 = new Date().toDateString();
  createdDate: Date = new Date();

  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: StoreType = new StoreType(0, '', '', null, '');
  msgs: Message[] = [];
  statusChange = false;

  statusId() {
    let webServResponce: WebServResponce;

    if (webServResponce.statusId == 500) {

      console.log('Data Already Exist');

    }
    else if (webServResponce.statusId == 500) {

      console.log('Awlak na');

    }


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
    this.storetypeservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <StoreType[]>webServResponce.result;
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }
  getAll2() {
    let webServResponce: WebServResponce;
    this.storetypeservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata2 = <StoreType[]>webServResponce.result;
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
    this.storetypeservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <StoreType[]>webServResponce.result;
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

    this.selected = new StoreType(0, '', '', null, '');
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }

  saveOrEdit(data: StoreType) {

    let webServResponce: WebServResponce;
    this.saveEdit = new StoreType(data.id, data.genaratedId, data.storeType, this.createdDate, this.createdby);
    let b: boolean = this.AllreadyExist(this.saveEdit);
    if (b) {


      if (data.id == 0) {
        console.log('save ');
        this.selected = data;

        console.log('curent date' + this.createdDate);

        this.storetypeservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {

              this.statusChange = true;
              this.getAll();
              this.addNew();
              console.log('saved');

              this.openSnackBar('Success', 'Data Saved');
            }
            if (webServResponce.statusId == 500) {


              console.log('status id after save ' + webServResponce.statusId);

            }

            else {
              this.errorMessage = webServResponce.errMessage;
            }

          }
          ,
          error => this.errorMessage = <any>error
          );


      }
      else {
        console.log("update");
        this.storetypeservice.editdata(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              // this.myForm.patchValue({genaratedId: this.genaratedId});

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
    }
    else {

      console.log("already Exist");
      this.openSnackBar('Warning ', 'Data Already Exist');
      this.addNew();

    }
  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.storetypeservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {

          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new StoreType(0, '', '', null, '');
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
    let type = 'STY'
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
  AllreadyExist(data: StoreType): boolean {
    let obj: StoreType = this.alldata
      .filter(StoreType => StoreType.storeType.toLowerCase() === data.storeType.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  setstatus() {
    this.statusChange = false;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
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
    var col = ["Store Type ID", "Store Type Name"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].storeType];
      rows.push(temp);
    }

    //  doc.setFont("courier");

     doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Store Types');

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
    doc.save('storeTypes.pdf');


    this.openSnackBar('Success', 'Print Created');


  }



}
