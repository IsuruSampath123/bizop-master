import { SelectItem } from 'primeng/primeng';
import { ReasonCatagoryService } from '../../../service/reasonCatagory.service';
import { ReasonService } from '../../../service/reason.service';
import { ReasonCatagory } from '../../../domain/ReasonCatagory';
import { WebServResponce } from '../../../domain/WebServResponce';
import { Reason } from '../../../domain/Reason';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;
@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.css']
})
export class ReasonComponent implements OnInit {
  selectedReasonCategory: string;

  myForm: FormGroup;
  msgs: Message[] = [];
  allReasonCatagoryOptions: SelectItem[];
  errorMessage: string;
  successMessage: string;
  saveEdit: Reason;
  allData: Reason[];
  allReasonCatagory: ReasonCatagory[];
  maxData: Reason[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: Reason = new Reason(0, '', null, '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];

  constructor(
    private reasonService: ReasonService,
    private reasonCatagoryService: ReasonCatagoryService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) { }

  convert() {
    var doc = new jsPDF();
    var col = ['Reason ID', 'Reason Category', 'Reason'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp = [this.allData[j].genaratedId, this.allData[j].reasonCatagory.reasonCatagory, this.allData[j].reason];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Reasons');

    doc.setFontType('normal');
    doc.setFontSize(11);
    doc.text(16, 35, 'NO :420/1,Akkara-25,Moragahahena,Millewa');
    doc.text(16, 42, 'Tel:0114-950176 / 0773444725 / 0773951034');
    doc.text(16, 49, 'Fax:034-2254287,Email :uniropaints@yahoo.com');


    doc.setFontType('normal');
    doc.setFontType('bold');

    doc.setFontSize(11);
    doc.text(155, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(155, 45, 'Created By   :  ' + this.createdBy);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('Reason.pdf');
  }



  SetResonCategoryIdCombo(x, y) {
    console.log('ffff : ' + y);
    var num = new Number(y);
    let ystring = num.toString();

    this.selectedReasonCategory = ystring;
  }


  getAll() {
    let webServResponce: WebServResponce;
    this.reasonService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allData = <Reason[]>webServResponce.result;
          for (let reason of this.allData) {
            reason.reasonCatagoryId = reason.reasonCatagory.id;
          }
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce: WebServResponce;
    this.reasonCatagoryService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allReasonCatagory = <ReasonCatagory[]>catWebServResponce.result;
          this.allReasonCatagoryOptions = [];
          this.allReasonCatagoryOptions.push({ label: 'Please Select', value: null });
          for (let reasonCatagory of this.allReasonCatagory) {
            this.allReasonCatagoryOptions.push({ label: reasonCatagory.reasonCatagory, value: reasonCatagory.id });
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
    this.reasonService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Reason[]>webServResponce.result;

          if (this.maxData[0] == undefined) {
            this.genaratedId = null;
          } else {
            this.genaratedId = this.maxData[0].genaratedId;
          }
          console.log('Maxxxxxx' + this.genaratedId);
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

    this.selected = new Reason(0, '', null, '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }



  saveOrEdit(data: Reason) {
    let webServResponce: WebServResponce;
    this.saveEdit = new Reason(data.id, data.genaratedId, data.reasonCatagoryId, data.reason, data.createdDate, data.createdBy, data.active);
    let b: boolean = this.isAllReadyExitsSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        this.selected = data;
        this.saveEdit = new Reason(data.id, data.genaratedId, data.reasonCatagoryId, data.reason, data.createdDate, data.createdBy, data.active);
        this.reasonService.saveData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              this.getMax();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.openSnackBar('Success', 'Data Saved');
              console.log('Save');
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );


      } else {

        this.addNew();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }





    }
    else {

      let b: boolean = this.isAllReadyExitsUpdate(this.saveEdit);

      if (b) {
        this.saveEdit = new Reason(data.id, data.genaratedId, data.reasonCatagoryId, data.reason, data.createdDate, data.createdBy, data.active);
        this.reasonService.editData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.openSnackBar('Success', 'Data Updated');
              console.log('Update');
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );
      } else {

        this.addNew();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }


    }




  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.reasonService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new Reason(0, '', null, '', null, '', '');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  getById(id: number) {
    this.allData
      .filter(TaxType => TaxType.id === id)
      .pop();
  }


  isAllReadyExitsSave(data: Reason): boolean {
    let obj: Reason = this.allData
      .filter(Reason => (Reason.reason.toLowerCase() === data.reason.toLocaleLowerCase()) && (Reason.reasonCatagory.id == data.reasonCatagoryId))
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  isAllReadyExitsUpdate(data: Reason): boolean {
    let obj: Reason = this.allData
      .filter(Reason => ((Reason.reason.toLowerCase() === data.reason.toLocaleLowerCase()) && (Reason.reasonCatagory.id == data.reasonCatagoryId)) && Reason.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  genarateIdNormal(oldId: string) {
    let year = (new Date()).getFullYear();
    let type = 'RES';
    let id;
    let newId;
    let genaratedId;

    if (oldId == null) {
      id = '000001';
      genaratedId = type + '-' + id;

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
      genaratedId = type + '-' + newId;
    }


    this.newGenaratedId = genaratedId;
    console.log('next Id =' + genaratedId);

    this.myForm.patchValue({ genaratedId: genaratedId });
  }




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      reasonCatagoryId: new FormControl('', Validators.required),
      'reason': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-/_%().,&$!+-?:; ]*[a-zA-Z0-9%()])?$'), Validators.maxLength(50)])]
    });
  }
}
