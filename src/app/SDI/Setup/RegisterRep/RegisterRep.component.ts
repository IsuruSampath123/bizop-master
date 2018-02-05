import { Component, OnInit } from '@angular/core';
import { RegisterRep } from "../../../domain/RepRegister";
import { WebServResponce } from "../../../domain/WebServResponce";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterRepservice } from "../../../service/RepRegister.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Company } from "../../../domain/Company";
import { Companyservice } from "../../../service/Company.service";
declare let jsPDF;

@Component({
  selector: 'app-RegisterRep',
  templateUrl: './RegisterRep.component.html',
  styleUrls: ['./RegisterRep.component.css']
})
export class RegisterRepComponent implements OnInit {

  myForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private companyservice: Companyservice, private registerRepservice: RegisterRepservice, public snackBar: MatSnackBar) {



  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      repName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      // 'contactNumber': [''],
      contactNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)]))
    });
  }


  errorMessage: string;
  successMessage: string;
  saveEdit: RegisterRep;
  alldata: RegisterRep[];
  maxData: RegisterRep[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];

  createdby = "jackaaa";
  genaratedId: string;
  selected: RegisterRep = new RegisterRep(0, '', '', '', '', '', '', '', null, '');



  statusId() {
    let webServResponce: WebServResponce;

    if (webServResponce.statusId == 500) {

      console.log('Data Already Exist');

    }
    else if (webServResponce.statusId == 500) {

      console.log('Awlak na');

    }


  }

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
    this.registerRepservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <RegisterRep[]>webServResponce.result;
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
    this.registerRepservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <RegisterRep[]>webServResponce.result;
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

    this.selected = new RegisterRep(0, '', '', '', '', '', '', '', null, '');
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }

  saveOrEdit(data: RegisterRep) {

    let webServResponce: WebServResponce;
    this.saveEdit = new RegisterRep(

      data.id,
      data.genaratedId,
      data.repName,
      data.contactNumber,
      data.addressLine1,
      data.addressLine2,
      data.addressLine3,
      data.addressLine4,
      this.createdDate,
      this.createdby

    );
    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {

      if (b) {


        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.registerRepservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              this.addNew();
              console.log('saved');
              console.log('status id on  save ' + webServResponce.statusId);
              this.openSnackBar('Success', 'Data Saved');

              // this.myForm.patchValue({genaratedId: this.genaratedId});


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

        this.openSnackBar('Worning', 'Rep Name  Already exist');
        this.addNew();
      }
      //console.log('status id after save '+webServResponce.statusId);

    }
    else {

      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);

      if (b) {

        console.log("update");
        this.registerRepservice.editdata(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              // this.myForm.patchValue({genaratedId: this.genaratedId});

              console.log('updated');
              this.getAll();
              this.addNew();
              this.openSnackBar('Success', 'Data updated');

            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );
      }
      else {
        this.openSnackBar('Worning', 'Rep Name  Already exist');
        this.addNew();
      }
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.registerRepservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');

          this.selected = new RegisterRep(0, '', '', '', '', '', '', '', null, '');
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
    let type = 'REP'
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

  AllreadyExistSave(data: RegisterRep): boolean {
    let obj: RegisterRep = this.alldata
      .filter(RegisterRep => RegisterRep.repName.toLowerCase() === data.repName.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: RegisterRep): boolean {
    let obj: RegisterRep = this.alldata
      .filter(RegisterRep => RegisterRep.repName.toLowerCase() === data.repName.toLowerCase() && RegisterRep.id != data.id)
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
    var col = ["Rep ID", "Rep Name","Address Line 1","Address Line 2","Contact Number"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].repName,
    this.alldata[j].addressLine1,this.alldata[j].addressLine2,
    this.alldata[j].contactNumber
    
    ];
      rows.push(temp);
    }


     doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Sales Reps');

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
    doc.save('Rep.pdf');

    this.openSnackBar('Success', 'Print Created');



  }
}