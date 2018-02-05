import { Component, OnInit } from '@angular/core';
import { Branch } from "../../../domain/Branch";
import { WebServResponce } from "../../../domain/WebServResponce";
import { Company } from "../../../domain/Company";
import { AsistanceSalesManager } from "../../../domain/AsistanceSalesManager";
import { SalesManager } from "../../../domain/SalesManager";
import { SelectItem } from "primeng/primeng";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { DataTableModule } from 'primeng/datatable';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Companyservice } from "../../../service/Company.service";
import { Branchservice } from "../../../service/Branch.service";
import { SalesManagerservice } from "../../../service/SalesManagerservice";
import { AsistanceSalesManagerservice } from "../../../service/AsistanceSalesManger.service";
declare let jsPDF;


@Component({
  selector: 'app-Branch',
  templateUrl: './Branch.component.html',
  styleUrls: ['./Branch.component.css']
})
export class BranchComponent implements OnInit {
  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private companyservice: Companyservice, private branchservice: Branchservice, private salesManagerservice: SalesManagerservice, private asistanceSalesManagerservice: AsistanceSalesManagerservice) {




  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      branchName: new FormControl('', Validators.compose([Validators.required])),
      'contactNumber': ['', Validators.compose([Validators.required])],
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      salesManagerId: new FormControl('', Validators.required),
      asistanceSalesManagerId: new FormControl('', Validators.required),
      companyId: new FormControl('', Validators.required)


    });
  }
  allSalesManagers: SalesManager[];
  allAsistanceSalesManagers: AsistanceSalesManager[];
  allcompanies: Company[];


  errorMessage: string;
  successMessage: string;
  saveEdit: Branch;
  alldata: Branch[];
  maxData: Branch[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;

  selected: Branch = new Branch(0, '', '', '', '', '', '', '', null, '', null, null, null);
  allSalesManagersOptions: SelectItem[] = [];
  allAsistanceSalesManagersOptions: SelectItem[] = [];
  allCompanyOptions: SelectItem[] = [];
  companyId1;
  salesManagerId1;
  asistanceSalesManagerId1;
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
   
    let webServResponce: WebServResponce;
    this.branchservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <Branch[]>webServResponce.result;

          for (let var1 of this.alldata) {

            if (var1.salesManager != null) {
              var1.salesManagerId = var1.salesManager.id;
            } else {
              var1.salesManagerId = 0;
            }
            if (var1.asistanceSalesManager != null) {
              var1.asistanceSalesManagerId = var1.asistanceSalesManager.id;
            } else {
              var1.asistanceSalesManagerId = 0;
            }
            if (var1.company != null) {
              var1.companyId = var1.company.id;
            } else {
              var1.companyId = 0;
            }

          }


        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce: WebServResponce;
    this.salesManagerservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {

          this.allSalesManagers = <SalesManager[]>catWebServResponce.result;
          this.allSalesManagersOptions = [];
          this.allSalesManagersOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allSalesManagers) {
            this.allSalesManagersOptions.push({ label: var1.salesManagerName, value: var1.id });
          }

        }
        else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
    let catWebServResponce2: WebServResponce;
    this.asistanceSalesManagerservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {

          this.allAsistanceSalesManagers = <AsistanceSalesManager[]>catWebServResponce2.result;
          this.allAsistanceSalesManagersOptions = [];
          this.allAsistanceSalesManagersOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allAsistanceSalesManagers) {
            this.allAsistanceSalesManagersOptions.push({ label: var1.asistanceSalesManagerName, value: var1.id });
          }

        }
        else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce3: WebServResponce;
    this.companyservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce3 = resObj;
        if (catWebServResponce3.statusId == 200) {

          this.allcompanies = <Company[]>catWebServResponce3.result;
          this.allCompanyOptions = [];
          this.allCompanyOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allcompanies) {
            this.allCompanyOptions.push({ label: var1.companyName, value: var1.id });
          }

        }
        else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
    this.CompanyData();
  }
  getMax() {
    let webServResponce: WebServResponce;
    this.branchservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Branch[]>webServResponce.result;
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

    this.selected = new Branch(0, '', '', '', '', '', '', '', null, '', null, null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: Branch) {

    let webServResponce: WebServResponce;
    this.saveEdit = new Branch(

      data.id,
      data.genaratedId,
      data.branchName,
      data.contactNumber,
      data.addressLine1,
      data.addressLine2,
      data.addressLine3,
      data.addressLine4,
      this.createdDate,
      this.createdby,
      data.salesManagerId,
      data.asistanceSalesManagerId,
      data.companyId

    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {

      if (b) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.branchservice.savedata(this.saveEdit)

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
        this.openSnackBar('Worning', 'Branch Name Already exist');
        this.addNew();
      }
    }
    else {
      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {
        console.log("update");
        this.branchservice.editdata(this.saveEdit)
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
        this.openSnackBar('Worning', 'Branch Name Already exist');
        this.addNew();
      }

    }
  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.branchservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new Branch(0, '', '', '', '', '', '', '', null, '', null, null, null);
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
    let type = 'BRN'
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

  AllreadyExistSave(data: Branch): boolean {
    let obj: Branch = this.alldata
      .filter(Branch => Branch.branchName.toLowerCase() === data.branchName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: Branch): boolean {
    let obj: Branch = this.alldata
      .filter(Branch => Branch.branchName.toLowerCase() === data.branchName.toLowerCase() && Branch.id != data.id)
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
    var col = ["Branch ID", "Branch Name", "Address Line 1", "Address Line 2", "Contact Number"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].branchName,
      this.alldata[j].addressLine1, this.alldata[j].addressLine2,
      this.alldata[j].contactNumber

      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Branches');

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
    doc.save('branch.pdf');

    this.openSnackBar('Success', 'Print Created');

  }


  SetCombo(x, y, z, h) {

    var num = new Number(y);
    let ystring = num.toString();
    this.companyId1 = ystring;

    var num2 = new Number(z);
    let zstring = num2.toString();
    this.asistanceSalesManagerId1 = zstring;

    var num3 = new Number(h);
    let hstring = num3.toString();
    this.salesManagerId1 = hstring;
  }


}








