import { Component, OnInit } from '@angular/core';
import { Branch } from "../../../domain/Branch";
import { ShowRoom } from "../../../domain/ShowRoom";
import { WebServResponce } from "../../../domain/WebServResponce";
import { Company } from "../../../domain/Company";
import { SelectItem } from "../../../../assets/primeng/primeng";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ShowRoomservice } from "../../../service/ShowRoom.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Companyservice } from "../../../service/Company.service";
import { Branchservice } from "../../../service/Branch.service";
declare let jsPDF;
@Component({
  selector: 'app-ShowRoom',
  templateUrl: './ShowRoom.component.html',
  styleUrls: ['./ShowRoom.component.css']
})
export class ShowRoomComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private showRoomservice: ShowRoomservice, private companyservice: Companyservice, private branchservice: Branchservice) { }

  ngOnInit() {

    this.getAll();
    this.getMax();

    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      showRoomName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      'contactNumber': ['', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])],
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      companyId: new FormControl('', Validators.required),
      branchId: new FormControl('', Validators.required)


    });
  }
  allBranches: Branch[];
  allcompanies: Company[];
  allfilteredbranches: Branch[];
  allcompany: Company[];
  createdby = "Admin";
  errorMessage: string;
  successMessage: string;
  saveEdit: ShowRoom;
  alldata: ShowRoom[];
  maxData: ShowRoom[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();

  genaratedId: string;
  selected: ShowRoom = new ShowRoom(0, '', '', '', '', '', '', '', null, '', null, null);
  selectedCompany: number;
  allBranchOptions: SelectItem[] = [];
  allCompaniesOptions: SelectItem[] = [];
  companyId1;
  branchId1;
  jtestId: number;
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
    this.showRoomservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <ShowRoom[]>webServResponce.result;
          this.allBranchOptions = [];
          this.allBranchOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.alldata) {

            this.allBranchOptions.push({ label: var1.branch.branchName, value: var1.branch.id });
          }


          for (let var1 of this.alldata) {

            if (var1.company != null) {
              var1.companyId = var1.company.id;
            } else {
              var1.companyId = 0;
            }
            if (var1.branch != null) {

              var1.branchId = var1.branch.id;

            } else {
              var1.branchId = 0;
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
    this.companyservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {

          this.allcompanies = <Company[]>catWebServResponce.result;
          this.allCompaniesOptions = [];
          this.allCompaniesOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allcompanies) {
            this.allCompaniesOptions.push({ label: var1.companyName, value: var1.id });
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
    this.branchservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allBranches = <Branch[]>catWebServResponce2.result;
        }
        else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }

  SetBranch() {
    console.log('inside set branch');

    this.allBranchOptions = [];
    this.allBranchOptions.push({ label: 'Please Select', value: null });

    for (let var1 of this.allfilteredbranches) {

      this.allBranchOptions.push({ label: var1.branchName, value: var1.id });
    }
  }


  getMax() {
    let webServResponce: WebServResponce;
    this.showRoomservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <ShowRoom[]>webServResponce.result;
          //console.log(this.RaxData[0].genaratedId);

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

    this.selected = new ShowRoom(0, '', '', '', '', '', '', '', null, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: ShowRoom) {

    var num = new Number(data.companyId);
    var num2 = new Number(data.branchId);

    let ystring = num.toString();
    let zstring = num2.toString();

    let comid = parseInt(ystring);
    let brId = parseInt(zstring);



    let webServResponce: WebServResponce;
    this.saveEdit = new ShowRoom(

      data.id,
      data.genaratedId,
      data.showRoomName,
      data.contactNumber,
      data.addressLine1,
      data.addressLine2,
      data.addressLine3,
      data.addressLine4,
      this.createdDate,
      this.createdby,
      data.companyId,
      data.branchId

    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);

    if (data.id == 0) {

      if (b) {
        console.log('save ');
        this.selected = data;

        console.log('curent date' + this.createdDate);

        this.showRoomservice.savedata(this.saveEdit)

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
        this.openSnackBar('Worning', 'Show Room Already exist');
        this.addNew();
      }


    }
    else {
      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {
        console.log("update");
        this.showRoomservice.editdata(this.saveEdit)


          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {


              console.log('updated');
              this.getAll();
              this.addNew();
              this.openSnackBar('Success', 'Show Room Updated');

            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );

      }
      else {
        this.openSnackBar('Worning', 'Show Room Name  Already exist');
        this.addNew();
      }
    }



  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.showRoomservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new ShowRoom(0, '', '', '', '', '', '', '', null, '', null, null);
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
    let type = 'SHR'
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

  AllreadyExistSave(data: ShowRoom): boolean {
    let obj: ShowRoom = this.alldata
      .filter(ShowRoom => ShowRoom.showRoomName.toLowerCase() === data.showRoomName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {


      return false;
    }

  }
  AllreadyExistUpdate(data: ShowRoom): boolean {
    let obj: ShowRoom = this.alldata
      .filter(ShowRoom => ShowRoom.showRoomName.toLowerCase() === data.showRoomName.toLowerCase() && ShowRoom.id != data.id)
      .pop();
    if (obj === undefined) {

      return true;
    } else {


      return false;
    }

  }
  ChangedSelection() {


  }






  CompanyChange(companyId) {

    if (companyId != null&&this.jtestId===0) {
      console.log("select company id" + companyId);
      this.selectedCompany = parseInt(companyId);

      let obj: Branch[] = this.allBranches
        .filter(Branch => Branch.company.id === this.selectedCompany)

      if (obj.length == 0) {
        console.log('no filterd data');
      } else {

        console.log('obj' + JSON.stringify(obj));
        this.allfilteredbranches = obj;
        // console.log('filtered branchers' + Json.stringify(this.allfilteredbranches));
        this.SetBranch();

      }


    }
    else {
      console.log("not selected");
      // this.allBranchOptions = [];
      // this.allBranchOptions.push({ label: 'Please Select Company First', value: null });
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
    var col = ["ShowRoom ID", "ShowRoom Name", "Branch", "Address Line 1", "Address Line 2", "Contact Number"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].showRoomName, this.alldata[j].branch.branchName,
      this.alldata[j].addressLine1, this.alldata[j].addressLine2, this.alldata[j].contactNumber

      ];
      rows.push(temp);
    }



    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Showrooms');

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
    doc.save('Showrooms.pdf');

    this.openSnackBar('Success', 'Print Created');



  }



  SetCombo(x, y, z) {
    this.jtestId = x;
    var num = new Number(y);
    let ystring = num.toString();
    this.companyId1 = ystring;


    var num3 = new Number(z);
    let hstring = num3.toString();
    this.branchId1 = hstring;
  }




}








