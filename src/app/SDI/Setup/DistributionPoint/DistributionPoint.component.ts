import { Component, OnInit } from '@angular/core';
import { DistributionPoint } from "../../../domain/DistributionPoint";
import { WebServResponce } from "../../../domain/WebServResponce";
import { RegisterRep } from "../../../domain/RepRegister";
import { SelectItem } from "primeng/primeng";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { RegisterRepservice } from "../../../service/RepRegister.service";
import { DistributionPointservice } from "../../../service/DistributionPoint.service";
import { Company } from "../../../domain/Company";
import { Companyservice } from "../../../service/Company.service";

@Component({
  selector: 'app-DistributionPoint',
  templateUrl: './DistributionPoint.component.html',
  styleUrls: ['./DistributionPoint.component.css']
})
export class DistributionPointComponent implements OnInit {


  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private companyservice: Companyservice, private registerRepservice: RegisterRepservice, private distributionPointservice: DistributionPointservice, public snackBar: MatSnackBar) {


  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      distributionPointName: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      contactNumber: new FormControl('', Validators.compose([Validators.required])),
      emailAddress: new FormControl(''),
      faxNumber: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9- ]*[0-9])?$'), Validators.maxLength(10), Validators.minLength(9)])),
      repId: new FormControl('', Validators.required),


    });
  }
  allRep: RegisterRep[];

  errorMessage: string;
  successMessage: string;
  saveEdit: DistributionPoint;
  alldata: DistributionPoint[];
  maxData: DistributionPoint[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: DistributionPoint = new DistributionPoint(0, '', '', '', '', '', '', '', null, '', null);
  allRepOptions: SelectItem[] = [];
  repId1;
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
    this.distributionPointservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <DistributionPoint[]>webServResponce.result;
          for (let var1 of this.alldata) {
            var1.repId = var1.registerRep.id;
          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
    let catWebServResponce: WebServResponce;
    this.registerRepservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allRep = <RegisterRep[]>catWebServResponce.result;
          this.allRepOptions = [];
          this.allRepOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allRep) {
            this.allRepOptions.push({ label: var1.repName, value: var1.id });
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
    this.distributionPointservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <DistributionPoint[]>webServResponce.result;
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

    this.selected = new DistributionPoint(0, '', '', '', '', '', '', '', null, '', null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: DistributionPoint) {

    let webServResponce: WebServResponce;
    this.saveEdit = new DistributionPoint(

      data.id,
      data.genaratedId,
      data.distributionPointName,
      data.contactNumber,
      data.addressLine1,
      data.addressLine2,
      data.addressLine3,
      data.addressLine4,
      this.createdDate,
      this.createdby,
      data.repId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {


        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.distributionPointservice.savedata(this.saveEdit)

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
        this.openSnackBar('Worning', 'Distribution Point Name Already exist');
        this.addNew();
      }


    }
    else {
      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {
        console.log("update");
        this.distributionPointservice.editdata(this.saveEdit)


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
        this.openSnackBar('Worning', 'Distribution Point Name Already exist');
        this.addNew();
      }
    }






  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.distributionPointservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new DistributionPoint(0, '', '', '', '', '', '', '', null, '', null);
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
    let type = 'DiS'
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

  AllreadyExistSave(data: DistributionPoint): boolean {
    let obj: DistributionPoint = this.alldata
      .filter(DistributionPoint => DistributionPoint.distributionPointName.toLowerCase() === data.distributionPointName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: DistributionPoint): boolean {
    let obj: DistributionPoint = this.alldata
      .filter(DistributionPoint => DistributionPoint.distributionPointName.toLowerCase() === data.distributionPointName.toLowerCase() && DistributionPoint.id != data.id)
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
    var col = ["Distributionpoint ID", " Name", "Address Line 1", "Address Line 2", "Contact Number"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].distributionPointName,
      this.alldata[j].addressLine1, this.alldata[j].addressLine2, this.alldata[j].contactNumber

      ];
      rows.push(temp);
    }



    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'Distribution Points');

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
    doc.save('Distributionpoint.pdf');

    this.openSnackBar('Success', 'Print Created');



  }


  SetCombo(x, y) {

    var num = new Number(y);
    let ystring = num.toString();
    this.repId1 = ystring;


  }
}








