import { WebServResponce } from '../../../domain/WebServResponce';
import { City } from '../../../domain/City';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CityService } from '../../../service/city.service';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  myForm: FormGroup;
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;
  saveEdit: City;
  allData: City[];
  maxData: City[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: City = new City(0, '', '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];
  constructor(private cityService: CityService, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {



  }


  convert() {
    var doc = new jsPDF();
    var col = ['City ID', 'City'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp = [this.allData[j].genaratedId, this.allData[j].city];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Cities');

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
    doc.save('City.pdf');

  }



  getAll() {
    let webServResponce: WebServResponce;
    this.cityService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allData = <City[]>webServResponce.result;
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
    this.cityService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <City[]>webServResponce.result;

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

    this.selected = new City(0, '', '', null, '', '');
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }


  saveOrEdit(data: City) {
    let webServResponce: WebServResponce;
    this.saveEdit = new City(data.id, data.genaratedId, data.city, this.createdDate, this.createdBy, '');

    let b: boolean = this.isAllReadyExits(this.saveEdit);

    if (b) {
      if (data.id == 0) {
        this.selected = data;
        this.saveEdit = new City(data.id, data.genaratedId, data.city, this.createdDate, this.createdBy, '');

        this.cityService.saveData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;

            if (webServResponce.statusId == 200) {
              this.getAll();
              this.getMax();
              this.addNew();
              this.openSnackBar('Success', 'Data Saved');
              console.log('Save');

            } else {
              this.errorMessage = webServResponce.errMessage;

            }


          }
          ,
          error => this.errorMessage = <any>error
          );
      } else {
        this.saveEdit = new City(data.id, data.genaratedId, data.city, this.createdDate, this.createdBy, '');
        this.cityService.editData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              this.addNew();
              this.openSnackBar('Success', 'Data Updated');
              console.log('Update');
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );
      }
    } else {
      this.addNew();
      this.openSnackBar('Warning', 'Data AllReadyExits');
      console.log('allReadyExits');
    }





  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.cityService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.selected = new City(0, '', '', null, '', '');
          this.openSnackBar( 'Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }



  isAllReadyExits(data: City): boolean {
    let obj: City = this.allData
      .filter(City => City.city.toLowerCase() === data.city.toLowerCase())
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
    let type = 'CIT';
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


 



  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      // tslint:disable-next-line:max-line-length
      'city': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])]
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }



}


