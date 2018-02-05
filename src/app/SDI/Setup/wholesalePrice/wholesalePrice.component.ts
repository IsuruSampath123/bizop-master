import { WebServResponce } from '../../../domain/WebServResponce';
import { WholesaleItemService } from '../../../service/wholesaleItem.service';
import { WholesalePriceService } from '../../../service/wholesalePrice.service';
import { ItemMasterservice } from '../../../service/ItemMaster.service';
import { WholesalePrice } from '../../../domain/WholesalePrice';
import { SelectItem } from 'primeng/primeng';
import { ItemMaster } from '../../../domain/ItemMaster';
import { WholesaleItem } from '../../../domain/WholesaleItem';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/api';
import { Observable } from 'rxjs/Observable';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;

@Component({
  selector: 'app-wholesalePrice',
  templateUrl: './wholesalePrice.component.html',
  styleUrls: ['./wholesalePrice.component.css']
})
export class WholesalePriceComponent implements OnInit {
  selectedItemId: string;
  selectedPriceId: string;

  selectedTab: string = null;
  selectedTab1: string = 'true';
  selectedLocationid;

  allFilterdContactData: WholesaleItem[];

  myForm: FormGroup;
  myForm1: FormGroup;
  allItemData: ItemMaster[];
  allWholeSaleItemData: WholesaleItem[];
  allItemOption: SelectItem[];
  allPriceOption: SelectItem[];
  msgs: Message[] = [];
  errorMessage: string;
  successMessage: string;
  saveEditPrice: WholesalePrice;
  saveEditItem: WholesaleItem;
  allPriceData: WholesalePrice[];
  maxData: WholesalePrice[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selectedPrice: WholesalePrice = new WholesalePrice(0, '', '', null, null, null, null, '', '');
  selectedItem: WholesaleItem = new WholesaleItem(0, null, null, null, '', '');
  mode = 'Observable';
  public events: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private itemMasterservice: ItemMasterservice,
    private wholesalePriceService: WholesalePriceService,
    private wholesaleItemService: WholesaleItemService,
    public snackBar: MatSnackBar
  ) {

  }


  printPriceDetails() {
    var doc = new jsPDF();
    var col = ['Price Type', 'Start Price', 'End Price', 'Discount Price'];
    var rows = [];
    for (let j = 0; j < this.allPriceData.length; j++) {

      var temp =
        [

          this.allPriceData[j].wholesalePrice,
          this.allPriceData[j].startPrice,
          this.allPriceData[j].endPrice,
          this.allPriceData[j].wholesalePrice

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Wholesale Prices');

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
    doc.save('wholesalePriceDetails.pdf');
  }



  setComboValues() {
    this.selectedPriceId = this.selectedItem.wholesalePriceId.toString();
    this.selectedItemId = this.selectedItem.itemId.toString();
  }



  printItemDetails() {
    var doc = new jsPDF();
    var col = ['Wholesale Price Type', 'Item Code'];
    var rows = [];
    for (let j = 0; j < this.allWholeSaleItemData.length; j++) {

      var temp =
        [

          this.allWholeSaleItemData[j].wholesalePrice.wholesalePriceType,
          this.allWholeSaleItemData[j].item.itemCode,

        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'All Wholesale Items');

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
    doc.save('wholesalItemDetails.pdf');
  }



 


  getAllItemOptions() {
    let catWebServResponce: WebServResponce;
    this.itemMasterservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allItemData = <ItemMaster[]>catWebServResponce.result;
          this.allItemOption = [];
          this.allItemOption.push({ label: 'Please Select', value: null });
          for (let item of this.allItemData) {
            this.allItemOption.push({ label: item.itemCode, value: item.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAllPriceOptions() {
    let catWebServResponce: WebServResponce;
    this.wholesalePriceService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allPriceData = <WholesalePrice[]>catWebServResponce.result;
          this.allPriceOption = [];
          this.allPriceOption.push({ label: 'Please Select', value: null });
          for (let price of this.allPriceData) {
            this.allPriceOption.push({ label: price.wholesalePriceType, value: price.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }









  getAllPriceData() {
    let webServResponce: WebServResponce;
    this.wholesalePriceService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allPriceData = <WholesalePrice[]>webServResponce.result;
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAllWholesaleItemData() {
    let webServResponce: WebServResponce;
    this.wholesaleItemService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.myForm1.patchValue({ id: 0 });
          this.allWholeSaleItemData = <WholesaleItem[]>webServResponce.result;
          for (let WholeItem of this.allWholeSaleItemData) {
            WholeItem.wholesalePriceId = WholeItem.wholesalePrice.id;
            WholeItem.itemId = WholeItem.item.id;
          }
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
    this.wholesalePriceService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <WholesalePrice[]>webServResponce.result;

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





  addNewPrice() {

    this.selectedPrice = new WholesalePrice(0, '', '', null, null, null, null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }


  addNewItem() {

    this.selectedItem = new WholesaleItem(0, null, null, null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm1.reset();
    this.myForm1.patchValue({ id: 0 });
    this.selectedPriceId = null;
    this.selectedItemId = null;

  }






  saveOrEditPrice(data: WholesalePrice) {
    let webServResponce: WebServResponce;
    this.saveEditPrice = new WholesalePrice(data.id, data.genaratedId, data.wholesalePriceType, data.startPrice, data.endPrice, data.wholesalePrice, data.createdDate, data.createdBy, data.active);


    console.log('dataaa :' + data.wholesalePriceType);

    let b: boolean = this.isAllReadyExitsSave(this.saveEditPrice);
    if (data.id == 0) {
      if (b) {
        this.selectedPrice = data;
        this.saveEditPrice = new WholesalePrice(data.id, data.genaratedId, data.wholesalePriceType, data.startPrice, data.endPrice, data.wholesalePrice, data.createdDate, data.createdBy, data.active);
        this.wholesalePriceService.saveData(this.saveEditPrice)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllPriceData();
              this.getMax();
              this.getAllPriceOptions();

              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewPrice();
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
        this.addNewPrice();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }

    } else {

      let b: boolean = this.isAllReadyExitsUpdate(this.saveEditPrice);
      if (b) {
        this.saveEditPrice = new WholesalePrice(data.id, data.genaratedId, data.wholesalePriceType, data.startPrice, data.endPrice, data.wholesalePrice, data.createdDate, data.createdBy, data.active);
        this.wholesalePriceService.editData(this.saveEditPrice)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllPriceData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewPrice();
              this.getAllPriceOptions();

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
        this.addNewPrice();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }


    }
  }



  saveOrEditItem(data: WholesaleItem) {
    let webServResponce: WebServResponce;
    this.saveEditItem = new WholesaleItem(data.id, data.wholesalePriceId, data.itemId, data.createdDate, data.createdBy, data.active);

    let b: boolean = this.isAllReadyExitsItemSave(this.saveEditItem);
    if (data.id == 0) {
      if (b) {
        this.saveEditItem = data;
        this.saveEditItem = new WholesaleItem(data.id, data.wholesalePriceId, data.itemId, data.createdDate, data.createdBy, data.active);
        this.wholesaleItemService.saveData(this.saveEditItem)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllWholesaleItemData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewItem();
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
        this.addNewItem();
        this.openSnackBar( 'Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }

    } else {

      let b: boolean = this.isAllReadyExitsItemUpdate(this.saveEditItem);
      if (b) {
        this.saveEditItem = new WholesaleItem(data.id, data.wholesalePriceId, data.itemId, data.createdDate, data.createdBy, data.active);
        this.wholesaleItemService.editData(this.saveEditItem)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              this.getAllWholesaleItemData();
              //console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
              this.addNewItem();
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
        this.addNewItem();
        this.openSnackBar('Warning', 'Data AllReadyExits');
        console.log('allReadyExits');
      }


    }
  }





  deletePriceById(id: number) {
    let webServResponce: WebServResponce;
    this.wholesalePriceService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllPriceData();
          this.addNewPrice();
          this.selectedPrice = new WholesalePrice(0, '', '', null, null, null, null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }


  deleteItemById(id: number) {
    let webServResponce: WebServResponce;
    this.wholesaleItemService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllWholesaleItemData();
          this.addNewItem();
          this.selectedItem = new WholesaleItem(0, null, null, null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }


  getById(id: number) {
    this.allPriceData
      .filter(TaxType => TaxType.id === id)
      .pop();
  }


  genarateIdNormal(oldId: string) {
    let year = (new Date()).getFullYear();
    let type = 'WSP';
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


  isAllReadyExitsSave(data: WholesalePrice): boolean {
    let obj: WholesalePrice = this.allPriceData
      .filter(WholesalePrice => WholesalePrice.wholesalePriceType.toLowerCase() === data.wholesalePriceType.toLowerCase())
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  isAllReadyExitsUpdate(data: WholesalePrice): boolean {
    let obj: WholesalePrice = this.allPriceData
      .filter(WholesalePrice => (WholesalePrice.wholesalePriceType.toLowerCase() === data.wholesalePriceType.toLowerCase()) && WholesalePrice.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  isAllReadyExitsItemSave(data: WholesaleItem): boolean {
    let obj: WholesaleItem = this.allWholeSaleItemData
      .filter(WholesaleItem => WholesaleItem.wholesalePrice.id === data.wholesalePriceId && WholesaleItem.item.id === data.itemId)
      .pop();

    // console.log(Json.stringify(obj));

    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  isAllReadyExitsItemUpdate(data: WholesaleItem): boolean {
    let obj: WholesaleItem = this.allWholeSaleItemData
      .filter(WholesaleItem => (WholesaleItem.wholesalePrice.id === data.wholesalePriceId && WholesaleItem.item.id === data.itemId) && WholesaleItem.id != data.id)
      .pop();

    // console.log(Json.stringify(obj));

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

  changeTabData(evt) {
    console.log(evt.index);
    if (evt.index == 0) {
      this.selectedTab = null;
      this.selectedTab1 = 'true';
    } else {
      this.selectedTab = 'true';
      this.selectedTab1 = null;
    }
  }



  changeDataLocationTable(evt) {
    this.selectedTab = null;
    this.selectedTab1 = 'true';
  }

  changeDataContactTable(evt) {
    if (this.selectedItem.id != 0) {
      this.selectedTab = null;
      this.selectedTab1 = 'true';
    } else {
      this.selectedTab = 'true';
      this.selectedTab1 = null;
    }
  }







  changeDataLocationid(evt) {
    this.selectedLocationid = evt;
    Observable.interval(500).subscribe(x => { this.filterContactDetails() });
  }

  filterContactDetails() {
    //  this.getAllContactData();


    if (this.selectedLocationid == 0) {
      this.allFilterdContactData = this.allWholeSaleItemData;
    } else {


      let obj: WholesaleItem[] = this.allWholeSaleItemData
        .filter(WholesaleItem => (WholesaleItem.wholesalePrice.id == this.selectedLocationid));

      if (obj === undefined) {
        console.log("no data");
        // this.allFilterdContactData = this.allContactData;
      } else {

        this.allFilterdContactData = obj;
      }
    }
  }








  ngOnInit() {
    this.getAllItemOptions();
    this.getAllPriceData();
    this.getMax();
    this.getAllPriceOptions();
    this.getAllWholesaleItemData();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      wholesalePriceType: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      startPrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
      endPrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
      wholesalePrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')]))
    });


    this.myForm1 = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      wholesalePriceId: new FormControl('', Validators.required),
      itemId: new FormControl('', Validators.required)
    });
  }

}
