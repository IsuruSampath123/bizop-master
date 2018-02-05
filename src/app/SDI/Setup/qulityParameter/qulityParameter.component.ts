import {QualityParameterservice} from '../../../service/QualityParameter.service';
import {WebServResponce} from '../../../domain/WebServResponce';
import {QualityParameter} from '../../../domain/QualityParameter';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;
@Component({
  selector: 'app-qulityParameter',
  templateUrl: './qulityParameter.component.html',
  styleUrls: ['./qulityParameter.component.css']
})
export class QulityParameterComponent implements OnInit {

  myForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  saveEdit: QualityParameter;
  alldata: QualityParameter[];
  maxData: QualityParameter[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdby = "Admin";
  genaratedId: string;
  selected: QualityParameter = new QualityParameter(0, '', '', null, '');
  msgs: Message[] = [];


  constructor(private formBuilder: FormBuilder, private qualityParameterservice: QualityParameterservice, public snackBar: MatSnackBar) {


  }


  ngOnInit() {
    this.getAll();
    this.getMax();

    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      'qualityParameter': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])]

    });
  }




  statusId() {
    let webServResponce: WebServResponce;

    if (webServResponce.statusId == 500) {

      console.log('Data Already Exist');

    }
    else if (webServResponce.statusId == 500) {

      console.log('Awlak na');

    }


  }



  convert() {
    var doc = new jsPDF();
    var col = ['Quality Parameter ID', 'Quality Parameter'];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].qualityParameter];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'Quality Parameters');

    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text(16, 35, 'NO :420/1,Akkara-25,Moragahahena,Millewa');
    doc.text(16, 42, 'Tel:0114-950176 / 0773444725 / 0773951034');
    doc.text(16, 49, 'Fax:034-2254287,Email :uniropaints@yahoo.com');


    doc.setFontType('normal');
    doc.setFontType('bold');

    doc.setFontSize(11);
    doc.text(155, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(155, 45, 'Created By   :  ' + this.createdby);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('QualityParameter.pdf');
  }


  getAll() {
    let webServResponce: WebServResponce;
    this.qualityParameterservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <QualityParameter[]>webServResponce.result;
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
    this.qualityParameterservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <QualityParameter[]>webServResponce.result;
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

    this.selected = new QualityParameter(0, '', '', null, '');
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }

  saveOrEdit(data: QualityParameter) {

    let webServResponce: WebServResponce;
    this.saveEdit = new QualityParameter(data.id, data.genaratedId, data.qualityParameter, this.createdDate, this.createdby);
    let b: boolean = this.AllreadyExist(this.saveEdit);
    if (b) {


      if (data.id == 0) {
        console.log('save ');
        this.selected = data;

        console.log('curent date' + this.createdDate);

        this.qualityParameterservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              this.addNew();
              console.log('saved');

              this.openSnackBar( 'Success', 'Data Saved');

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
        this.qualityParameterservice.editdata(this.saveEdit)
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
      this.openSnackBar( 'Worning', 'StoreType Already exist');
      this.addNew();

    }
  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.qualityParameterservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar( 'Success', 'Data Deleted');
          this.selected = new QualityParameter(0, '', '', null, '');
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
    let type = 'QTP'
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
  AllreadyExist(data: QualityParameter): boolean {
    let obj: QualityParameter = this.alldata
      .filter(QualityParameter => QualityParameter.qualityParameter.toLowerCase() === data.qualityParameter.toLowerCase())
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
}
