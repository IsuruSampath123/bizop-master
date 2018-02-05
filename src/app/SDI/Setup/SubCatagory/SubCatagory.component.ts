import { Component, OnInit } from '@angular/core';
import { SubCatagory } from "../../../domain/SubCatagory";
import { WebServResponce } from "../../../domain/WebServResponce";
import { MainCatagory } from "../../../domain/mainCatagory";
import { SelectItem } from "primeng/primeng";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { MainCatagoryservice } from "../../../service/maincatagory.service";
import { Company } from "../../../domain/Company";
import { Companyservice } from "../../../service/Company.service";
import { SubCatagoryservice } from "../../../service/SubCatagory.service";
declare let jsPDF;



@Component({
  selector: 'app-SubCatagory',
  templateUrl: './SubCatagory.component.html',
  styleUrls: ['./SubCatagory.component.css']
})
export class SubCatagoryComponent implements OnInit {


  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private companyservice: Companyservice, public snackBar: MatSnackBar, private mainCatagoryservice: MainCatagoryservice, private subCatagoryservice: SubCatagoryservice) {



  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      subCatagoryName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z-/_ ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      subCatgoryImage: new FormControl(''),
      mainCatagoryId: new FormControl('', Validators.required),


    });
  }
  allImainCatagories: MainCatagory[];
  errorMessage: string;
  successMessage: string;
  saveEdit: SubCatagory;
  alldata: SubCatagory[];
  maxData: SubCatagory[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: SubCatagory = new SubCatagory(0, '', '', '', null, '', null);
  allMainCatagoryOptions: SelectItem[] = [];
  mainCatagoryId1;

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
    this.subCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {

          this.alldata = <SubCatagory[]>webServResponce.result;
          for (let var1 of this.alldata) {


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
    this.mainCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allImainCatagories = <MainCatagory[]>catWebServResponce.result;
          this.allMainCatagoryOptions = [];
          this.allMainCatagoryOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allImainCatagories) {
            this.allMainCatagoryOptions.push({ label: var1.mainCatagoryName, value: var1.id });
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
    this.subCatagoryservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <SubCatagory[]>webServResponce.result;
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

    this.selected = new SubCatagory(0, '', '', '', null, '', null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: SubCatagory) {

    let webServResponce: WebServResponce;
    this.saveEdit = new SubCatagory(

      data.id,
      data.genaratedId,
      data.subCatagoryName,
      data.subCatgoryImage,
      this.createdDate,
      this.createdby,
      data.mainCatagoryId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (true) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.subCatagoryservice.savedata(this.saveEdit)

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

        
      }


    }
    else {

      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (true) {


        console.log("update");
        this.subCatagoryservice.editdata(this.saveEdit)

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
      
      

      }
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.subCatagoryservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new SubCatagory(0, '', '', '', null, '', null);
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
    let type = 'SBC'
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

  AllreadyExistSave(data: SubCatagory): boolean {
    let obj: SubCatagory = this.alldata
      .filter(SubCatagory => SubCatagory.subCatagoryName.toLowerCase() === data.subCatagoryName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: SubCatagory): boolean {

    let obj: SubCatagory = this.alldata
      .filter(SubCatagory => SubCatagory.subCatagoryName.toLowerCase() === data.subCatagoryName.toLowerCase() && SubCatagory.id != data.id)
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
    var col = ["Sub Catagory ID", "Sub Catagory Name", "Main Catagory Name"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].subCatagoryName, this.alldata[j].mainCatagory.mainCatagoryName

      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Sub Catagories');

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
    doc.save('SubCatagory.pdf');

    this.openSnackBar('Success', 'Print Created');

  }


  SetCombo(x, y) {

    var num = new Number(y);
    let ystring = num.toString();
    this.mainCatagoryId1 = ystring;


  }







}


















