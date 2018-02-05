import { Component, OnInit } from '@angular/core';
import { Company } from "../../../domain/Company";
import { WebServResponce } from "../../../domain/WebServResponce";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Companyservice } from "../../../service/Company.service";
import { Message } from "primeng/components/common/api";
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private companyservice: Companyservice, public snackBar: MatSnackBar) {




  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      genaratedId: new FormControl(''),
      id: new FormControl(''),
      companyName: new FormControl('',Validators.required ),
      companyRegisterName: new FormControl('',Validators.required ),
      // telephoneNumber: new FormControl('',Validators.required),
      telephoneNumber: new FormControl(''),
      emailAddress: new FormControl('',),
      faxNumber: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9- ]*[0-9])?$'), Validators.maxLength(10), Validators.minLength(9)])),
      vatNumber: new FormControl('', Validators.compose([ Validators.pattern('^[0-9](?:[0-9-_ ]*[0-9])?$'), Validators.maxLength(20)])),
      svatNumber: new FormControl('', Validators.compose([ Validators.pattern('^[sS](?:[0-9-_ ]*[0-9])?$'), Validators.maxLength(20)])),
      nbtNumber: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9-_]*[0-9])?$'), Validators.maxLength(20)])),
      addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
      addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)]))
    });
  }

  errorMessage: string;
  successMessage: string;
  saveEdit: Company;
  alldata: Company[];
  maxData: Company[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();

  createdby = "Admin";
  genaratedId: string;
  selected: Company = new Company(0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, '');
  msgs: Message[] = [];


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  getAll() {
    let webServResponce: WebServResponce;
    this.companyservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <Company[]>webServResponce.result;
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
    this.companyservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Company[]>webServResponce.result;
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

    this.selected = new Company(0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, '');
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.getMax();
  }

  saveOrEdit(data: Company) {



    console.log('jack save data ' + JSON.stringify(data));
    this.saveEdit = new Company(

      data.id, data.genaratedId,
      data.companyName,
      data.companyRegisterName,
      data.addressLine1,
      data.addressLine2,
      data.addressLine3,
      data.addressLine4,
      data.telephoneNumber,
      data.faxNumber,
      data.emailAddress,
      data.vatNumber,
      data.svatNumber,
      data.nbtNumber,
      this.createdDate,
      this.createdby

    );

    let webServResponce: WebServResponce;


    if (data.id == 0) {



      if (this.alldata.length === 0) {




        console.log('save ');
        this.selected = data;

        let b: boolean = this.AllreadyExistSave(this.saveEdit);
        if (true) {

          console.log('curent date' + this.createdDate);

          this.companyservice.savedata(this.saveEdit)

            .subscribe(
            resObj => {
              webServResponce = resObj;
              if (webServResponce.statusId == 200) {
                this.getAll();
                this.addNew();
                console.log('saved');
                this.openSnackBar('Success', 'Data Saved');
                // this.myForm.patchValue({genaratedId: this.genaratedId});

              } else {

                this.errorMessage = webServResponce.errMessage;
              }
            }
            ,
            error => this.errorMessage = <any>error

            );
          //errorCode => this.statusCode = errorCode;
          console.log('c1' + this.errorMessage);

        }
        else {

          // this.openSnackBar('Worning', 'Company Name Or Register Number Already exist');
          // this.addNew();
        }


      }
      else {
        this.openSnackBar('Warning', 'You can Only Add One Company');


      }




    }



    else {

      console.log("update");

      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {
        this.companyservice.editdata(this.saveEdit)
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
              console.log(this.errorMessage);
            }
          }
          ,
          error => this.errorMessage = <any>error
          );


      }
      else {

        this.openSnackBar('Worning', 'Company Name Or Register Number Already exist');
        this.addNew();

      }



    }



  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.companyservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');

          // this.selected = new Company(0,'', '','','','','','','','','','','','', null, '');
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
    let type = 'COM'
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

  AllreadyExistSave(data: Company): boolean {
    let obj: Company = this.alldata
      .filter(Company => Company.companyName.toLowerCase() === data.companyName.toLowerCase() || Company.companyRegisterName.toLowerCase() === data.companyRegisterName.toLowerCase())
      .pop();
    if (obj === undefined) {
      return true;
    } else {
      return false;
    }
  }

  AllreadyExistUpdate(data: Company): boolean {
    let obj: Company = this.alldata
      .filter(Company => (Company.companyName.toLowerCase() === data.companyName.toLowerCase() || Company.companyRegisterName.toLowerCase() === data.companyRegisterName.toLowerCase()) && Company.id != data.id)
      .pop();
    if (obj === undefined) {

      return true;

    }
    else {

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
    for (let j = 0; j < this.alldata.length; j++) {

      companyName = this.alldata[j].companyName;
      addressLine1 = this.alldata[j].addressLine1;
      addressLine2 = this.alldata[j].addressLine2;
      addressLine3 = this.alldata[j].addressLine3;
      addressLine4 = this.alldata[j].addressLine4;
      telephone = this.alldata[j].telephoneNumber;
      fax = this.alldata[j].faxNumber;
      email = this.alldata[j].emailAddress;
    }


    var doc = new jsPDF();
    var col = ["Company ID", "Company Register No", "Company Name", "Contact Number"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].companyRegisterName, this.alldata[j].companyName, this.alldata[j].telephoneNumber];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'Company Details');

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
    doc.save('company.pdf');
    this.openSnackBar('Success', 'Print Created');




  }



}
