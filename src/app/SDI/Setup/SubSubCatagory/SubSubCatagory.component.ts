import { MainCatagoryservice } from './../../../service/maincatagory.service';
import { MainCatagory } from './../../../domain/mainCatagory';
import { Component, OnInit } from '@angular/core';
import { SubSubCatagory } from "../../../domain/SubSubCatagory";
import { WebServResponce } from "../../../domain/WebServResponce";
import { SubCatagory } from "../../../domain/SubCatagory";
import { SelectItem } from "primeng/primeng";
declare let jsPDF;
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { SubCatagoryservice } from "../../../service/SubCatagory.service";
import { SubSubCatagoryservice } from "../../../service/subSubCatagory.service";
import { Companyservice } from "../../../service/Company.service";
import { Company } from "../../../domain/Company";


@Component({
  selector: 'app-SubSubCatagory',
  templateUrl: './SubSubCatagory.component.html',
  styleUrls: ['./SubSubCatagory.component.css']
})
export class SubSubCatagoryComponent implements OnInit {


  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private mainCatagoryservice: MainCatagoryservice, private companyservice: Companyservice, public snackBar: MatSnackBar, private subCatagoryservice: SubCatagoryservice, private subSubCatagoryservice: SubSubCatagoryservice) {

  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      subSubCatagoryName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z-/_ ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      subSubCatgoryImage: new FormControl(''),
      subCatagoryId: new FormControl('', Validators.required),
      mainCatagoryId: new FormControl('', Validators.required)

    });
  }
  allSubCatagories: SubCatagory[];
  allMaincatagories: MainCatagory[];
  errorMessage: string;
  successMessage: string;
  saveEdit: SubSubCatagory;
  alldata: SubSubCatagory[];
  maxData: SubSubCatagory[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: SubSubCatagory = new SubSubCatagory(0, '', '', '', null, '', null, null);
  subCatagoryId1;
  mainCatagoryId1;
  allSubCatagoryOptions: SelectItem[] = [];
  allmainCatagoryOptions: SelectItem[] = [];
  mytestvalue;
  selectedCatagory;
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
    this.subSubCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {

          this.alldata = <SubSubCatagory[]>webServResponce.result;
          for (let var1 of this.alldata) {


            if (var1.subCatagory != null) {
              var1.subCatagoryId = var1.subCatagory.id;
            } else {
              var1.subCatagoryId = 0;
            }
            if (var1.mainCatagory != null) {
              var1.mainCatagoryId = var1.mainCatagory.id;
            } else {
              var1.mainCatagoryId = 0;
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
    this.subCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allSubCatagories = <SubCatagory[]>catWebServResponce.result;
          this.allSubCatagoryOptions = [];
          this.allSubCatagoryOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allSubCatagories) {
            this.allSubCatagoryOptions.push({ label: var1.subCatagoryName, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce1: WebServResponce;
    this.mainCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce1 = resObj;
        if (catWebServResponce1.statusId == 200) {
          this.allMaincatagories = <MainCatagory[]>catWebServResponce1.result;
          this.allmainCatagoryOptions = [];
          this.allmainCatagoryOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allMaincatagories) {
            this.allmainCatagoryOptions.push({ label: var1.mainCatagoryName, value: var1.id });
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
    this.subSubCatagoryservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <SubSubCatagory[]>webServResponce.result;
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

    this.selected = new SubSubCatagory(0, '', '', '', null, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: SubSubCatagory) {

    let webServResponce: WebServResponce;
    this.saveEdit = new SubSubCatagory(

      data.id,
      data.genaratedId,
      data.subSubCatagoryName,
      data.subSubCatgoryImage,
      this.createdDate,
      this.createdby,
      data.subCatagoryId,
      data.mainCatagoryId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.subSubCatagoryservice.savedata(this.saveEdit)

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
        this.subSubCatagoryservice.editdata(this.saveEdit)

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
    this.subSubCatagoryservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new SubSubCatagory(0, '', '', '', null, '', null, null);
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
    let type = 'SSC'
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

  AllreadyExistSave(data: SubSubCatagory): boolean {
    let obj: SubSubCatagory = this.alldata
      .filter(SubSubCatagory => SubSubCatagory.subSubCatagoryName.toLowerCase() === data.subSubCatagoryName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: SubSubCatagory): boolean {

    let obj: SubSubCatagory = this.alldata
      .filter(SubSubCatagory => SubSubCatagory.subSubCatagoryName.toLowerCase() === data.subSubCatagoryName.toLowerCase() && SubSubCatagory.id != data.id)
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
    var col = ["Sub Sub Catagory ID", "Sub Sub Catagory Name", "Sub Catagory Name", "Main Catagory Name"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].subSubCatagoryName, this.alldata[j].subCatagory.subCatagoryName, this.alldata[j].subCatagory.mainCatagory.mainCatagoryName

      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(150, 20, 'All Sub sub Catagories');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);


    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(11);
    doc.text(150, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(150, 45, 'Created By   :  ' + this.createdby);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('SubsubCatagory.pdf');

    this.openSnackBar('Success', 'Print Created');

  }


  SetCombo(x, y, z) {

    this.mytestvalue = x;

    var num = new Number(y);
    let ystring = num.toString();
    this.subCatagoryId1 = ystring;

    var num2 = new Number(z);
    let zstring = num2.toString();
    this.mainCatagoryId1 = zstring;

  }


  setsub(x) {
    if (this.mytestvalue === 0) {

      this.selectedCatagory = parseInt(x);

      let obj: SubCatagory[] = this.allSubCatagories
        .filter(SubCatagory => SubCatagory.mainCatagory.id === this.selectedCatagory)

      if (obj.length == 0) {
        console.log('no filterd data');
      } else {

       this.allSubCatagories=obj;

        this.allSubCatagoryOptions = [];
        this.allSubCatagoryOptions.push({ label: 'Please Select', value: null });
        for (let var1 of this.allSubCatagories) {
          this.allSubCatagoryOptions.push({ label: var1.subCatagoryName, value: var1.id });
        }

      }

    }
    else {

    }

  }





}


















