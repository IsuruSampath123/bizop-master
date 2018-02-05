import { Component, OnInit } from '@angular/core';
import { ItemType } from "../../../domain/ItemType";
import { WebServResponce } from "../../../domain/WebServResponce";
import { RealTimeUpdate } from "../../../domain/RealTimeUpdate";
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Company } from "../../../domain/Company";
import { Companyservice } from "../../../service/Company.service";
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ItemTypeservice } from "../../../service/itemtype.service";
import { RealTimeUpdateservice } from "../../../service/RealTimeUpdate.service";



@Component({
  selector: 'app-ItemType',
  templateUrl: './ItemType.component.html',
  styleUrls: ['./ItemType.component.css']
})
export class ItemTypeComponent implements OnInit {

   myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private itemTypeservice: ItemTypeservice, public snackBar: MatSnackBar, private companyservice: Companyservice) {
  /*  Observable.interval(100).subscribe(x => {
      this.realTimeUpdateservice.getRealTimeUpdate();
      this.CheckTable();

      if (this.realTimeUpdateservice.total == 0) {
        //console.log('no changes');
      }
      else {
        if (this.currentTable === 'ITT') {
          // console.log(' changes applied');
          this.getAll();
          this.getMax();
          this.realTimeUpdateservice.deleteRealTimeUpdate();

        }


      }
    })*/


  }


  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      'itemType': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])]

    });

  }


  errorMessage: string;
  successMessage: string;
  saveEdit: ItemType;
  setDefault: ItemType;
  alldata: ItemType[];
  maxData: ItemType[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
   createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdBy = 'Admin'
  genaratedId;
  Maxid;
  selected: ItemType = new ItemType(0, '', '', null, '');
  checkvalue: boolean;
  nextid: string;
  currentTable;


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
    this.itemTypeservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <ItemType[]>webServResponce.result;
          if (this.alldata[0] == undefined) {
            this.checkvalue = true;
            console.log('first check ' + this.checkvalue);

            this.SetDefaltitemtypes();

          } else {
            this.checkvalue = false;
            console.log('first check else part ' + this.checkvalue);
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
    this.itemTypeservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <ItemType[]>webServResponce.result;
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
    this.selected = new ItemType(0, '', '', null, '');
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    //this.myForm.patchValue({genaratedId:this.genaratedId});
    this.getMax();
  }


  SetDefaltitemtypes() {
    this.meth1();
  }

  meth1() {
    console.log('methord1');

    let webServResponce: WebServResponce;
    this.saveEdit = new ItemType(null, 'ITT-000001', 'Rowmetarial', this.createdDate, this.createdBy);
    this.itemTypeservice.savedata(this.saveEdit)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          console.log('saved');

          this.openSnackBar( 'Success', ' Defalt Item Types Are SuccessFully Added');
          this.meth2();
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
  meth2() {
    console.log('methord2');
    let webServResponce: WebServResponce;
    this.saveEdit = new ItemType(null, 'ITT-000002', 'Intermidiate Product', this.createdDate, this.createdBy);
    this.itemTypeservice.savedata(this.saveEdit)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          console.log('saved');

          this.openSnackBar( 'Success', ' Defalt Item Types Are SuccessFully Added');
          this.meth3();
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
  meth3() {
    console.log('methord3');
    let webServResponce: WebServResponce;
    this.saveEdit = new ItemType(null, 'ITT-000003', 'FinishGood', this.createdDate, this.createdBy);
    this.itemTypeservice.savedata(this.saveEdit)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          console.log('saved');

          this.openSnackBar( 'Success', ' Defalt Item Types Are SuccessFully Added');

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



  saveOrEdit(data: ItemType) {

    let webServResponce: WebServResponce;
    this.saveEdit = new ItemType(data.id, data.genaratedId, data.itemType, this.createdDate, this.createdBy);
    let b: boolean = this.AllreadyExist(this.saveEdit);
    if (b) {


      if (data.id == 0) {
        console.log('save ');
        this.selected = data;

        console.log('curent date' + this.createdDate);

        this.itemTypeservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
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
        this.itemTypeservice.editdata(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              // this.myForm.patchValue({genaratedId: this.genaratedId});

              console.log('updated');
              this.getAll();
              this.addNew();
              this.openSnackBar( 'Success', 'Data Updated');

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
      this.openSnackBar( 'Worning', 'ItemType Already exist');
      this.addNew();

    }
  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.itemTypeservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar( 'Success', 'Data Deleted');
          this.selected = new ItemType(0, '', '', null, '');
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
    let type = 'ITT'
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
    console.log('new next id' + this.nextid);

  }
  AllreadyExist(data: ItemType): boolean {
    let obj: ItemType = this.alldata
      .filter(ItemType => ItemType.itemType.toLowerCase() === data.itemType.toLowerCase())
      .pop();
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
    var col = ["Item Type ID", "Item Type"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].itemType

      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Item Types');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);


    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(11);
    doc.text(155, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(155, 45, 'Created By   :  ' + this.createdBy);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('ItemTypes.pdf');

    this.openSnackBar('Success', 'Print Created');

  }




}

