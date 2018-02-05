import {RouteService} from '../../../service/route.service';

import {WebServResponce} from '../../../domain/WebServResponce';
import {Route} from '../../../domain/Route';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Message } from 'primeng/components/common/api';
declare let jsPDF;
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  myForm: FormGroup;
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;
  saveEdit: Route;
  allData: Route[];
  maxData: Route[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();  
  createdBy = 'Admin';
  selected: Route = new Route(0, '', '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];

  constructor(private routeService: RouteService, private formBuilder: FormBuilder, public snackBar: MatSnackBar) { }


  convert() {
    var doc = new jsPDF();
    var col = ['Route ID', 'Route'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp = [this.allData[j].genaratedId, this.allData[j].route];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Routes');

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
    doc.save('Route.pdf');
  }





  getAll() {
    let webServResponce: WebServResponce;
    this.routeService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allData = <Route[]>webServResponce.result;
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
    this.routeService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <Route[]>webServResponce.result;

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

    this.selected = new Route(0, '', '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }


  saveOrEdit(data: Route) {
    let webServResponce: WebServResponce;
    this.saveEdit = new Route(data.id, data.genaratedId, data.route, this.createdDate, this.createdBy, '');

    let b: boolean = this.isAllReadyExits(this.saveEdit);

    if (b) {
      if (data.id == 0) {
        this.selected = data;
        this.saveEdit = new Route(data.id, data.genaratedId, data.route, this.createdDate, this.createdBy, '');

        this.routeService.saveData(this.saveEdit)
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
      }
      else {
        this.saveEdit = new Route(data.id, data.genaratedId, data.route, this.createdDate, this.createdBy, '');
        this.routeService.editData(this.saveEdit)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAll();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNew();
              this.openSnackBar( 'Success', 'Data Updated');
              console.log('Update');
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
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
      this.openSnackBar( 'Warning', 'Data AllReadyExits');
      console.log('allReadyExits');
    }





  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.routeService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.selected = new Route(0, '', '', null, '', '');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }



  isAllReadyExits(data: Route): boolean {
    let obj: Route = this.allData
      .filter(Route => Route.route === data.route)
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
    let type = 'ROT';
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
      'route': ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9 ]*[a-zA-Z0-9])?$'), Validators.maxLength(50)])]
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
