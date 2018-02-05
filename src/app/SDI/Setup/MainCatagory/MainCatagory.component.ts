import { Component, OnInit } from '@angular/core';
import { MainCatagory } from "../../../domain/mainCatagory";
import { WebServResponce } from "../../../domain/WebServResponce";
import { ItemType } from "../../../domain/ItemType";
import { SelectItem } from "primeng/primeng";
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MainCatagoryservice } from "../../../service/maincatagory.service";
import { ItemTypeservice } from "../../../service/itemtype.service";
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Company } from "../../../domain/Company";
import { Companyservice } from "../../../service/Company.service";

@Component({
  selector: 'app-MainCatagory',
  templateUrl: './MainCatagory.component.html',
  styleUrls: ['./MainCatagory.component.css']
})
export class MainCatagoryComponent implements OnInit {
  [x: string]: any;

 constructor(private formBuilder: FormBuilder, private mainCatagoryservice: MainCatagoryservice, private itemTypeservice: ItemTypeservice, public snackBar: MatSnackBar, private companyservice: Companyservice) {

   

  }
  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      mainCatagoryName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z-/_ ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      mainCatgoryImage: new FormControl(''),

      itemTypeId: new FormControl('', Validators.required),


    });
  }
  allItemtypes: ItemType[];
  errorMessage: string;
  successMessage: string;
  saveEdit: MainCatagory;
  alldata: MainCatagory[];
  maxData: MainCatagory[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
   createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdBy = 'Admin'
  genaratedId: string;
  itemTypeId1;
  selected: MainCatagory = new MainCatagory(0, '', '', '', null, '', null);
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
    this.mainCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {

          this.alldata = <MainCatagory[]>webServResponce.result;
          for (let var1 of this.alldata) {


            if (var1.itemType != null) {
              var1.itemTypeId = var1.itemType.id;
            } else {
              var1.itemTypeId = 0;
            }

            // var1.itemTypeId = var1.itemType.id;
          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
    let catWebServResponce: WebServResponce;
    this.itemTypeservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allItemtypes = <ItemType[]>catWebServResponce.result;
          this.allItemtypeOptions = [];
          this.allItemtypeOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allItemtypes) {
            this.allItemtypeOptions.push({ label: var1.itemType, value: var1.id });
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
    this.mainCatagoryservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <MainCatagory[]>webServResponce.result;
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
    this.selected = new MainCatagory(0, '', '', '', null, '', null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: MainCatagory) {

    let webServResponce: WebServResponce;
    this.saveEdit = new MainCatagory(

      data.id,
      data.genaratedId,
      data.mainCatagoryName,
      data.mainCatgoryImage,
      this.createdDate,
      this.createdBy,
      data.itemTypeId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.mainCatagoryservice.savedata(this.saveEdit)

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
        this.mainCatagoryservice.editdata(this.saveEdit)

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
        this.openSnackBar('Worning', 'MainCatagory Name Already exist');
        this.addNew();

      }
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.mainCatagoryservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new MainCatagory(0, '', '', '', null, '', null);
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
    let type = 'MC'
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

  AllreadyExistSave(data: MainCatagory): boolean {
    let obj: MainCatagory = this.alldata
      .filter(MainCatagory => MainCatagory.mainCatagoryName.toLowerCase() === data.mainCatagoryName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: MainCatagory): boolean {

    let obj: MainCatagory = this.alldata
      .filter(MainCatagory => MainCatagory.mainCatagoryName.toLowerCase() === data.mainCatagoryName.toLowerCase() && MainCatagory.id != data.id)
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
    var col = ["main Catagory ID", "mainCatagory Name", "Item Type"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].mainCatagoryName, this.alldata[j].itemType.itemType

      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Main Catagories');

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
    doc.save('MainCatagory.pdf');

    this.openSnackBar('Success', 'Print Created');

  }


  SetCombo(x, y) {

    var num = new Number(y);
    let ystring = num.toString();
    this.itemTypeId1 = ystring;

   
  }

}


















