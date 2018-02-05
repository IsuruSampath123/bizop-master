import { Component, OnInit } from '@angular/core';
import { WebServResponce } from "../../../../domain/WebServResponce";
import { FinishGoodGRN } from "../../../../domain/FinshGoodGRN";
import { TemporyGRN } from "../../../../domain/temporyGRN";
import { ItemMaster } from "../../../../domain/ItemMaster";
import { Store } from "../../../../domain/Store";
import { Supplier } from "../../../../domain/Supplier";
declare let jsPDF;
import { FormBuilder, FormControl, Validator, FormGroup, Validators } from '@angular/forms';
import { FinishGoodGRNservice } from "../../../../service/FinishGoodGRN.service";
import { SupplierService } from "../../../../service/supplier.service";
import { ItemMasterservice } from "../../../../service/ItemMaster.service";
import { Storeservice } from "../../../../service/Store.service";
import { Companyservice } from "../../../../service/Company.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { SelectItem } from "primeng/primeng";
import { Company } from "../../../../domain/Company";
import { ReasonCatagory } from "../../../../domain/ReasonCatagory";
import { ReasonCatagoryService } from "../../../../service/reasonCatagory.service";
import { Reason } from "../../../../domain/Reason";
import { ReasonService } from "../../../../service/reason.service";


@Component({
  selector: 'app-FinishGoodGRN',
  templateUrl: './FinishGoodGRN.component.html',
  styleUrls: ['./FinishGoodGRN.component.css']
})
export class FinishGoodGRNComponent implements OnInit {
  displayedColumns = ['itemcode', 'batchNumber', 'totprice', 'remainingQuantity', 'discount'];

  [x: string]: any;
  myForm: FormGroup;
  myForm2: FormGroup;

  constructor(private formBuilder: FormBuilder, private finishGoodGRNservice: FinishGoodGRNservice,
    private supplierService: SupplierService,
    private itemMasterservice: ItemMasterservice, private storeservice: Storeservice, public snackBar: MatSnackBar, private companyservice: Companyservice, private reasonCatagoryService: ReasonCatagoryService, private reasonService: ReasonService
  ) { }

  allsuppliers: Supplier[];
  allstores: Store[];
  allitems: ItemMaster[];
  itemcode1;
  discription1;
  nextid;
  autoIncrement = 0;
  total: number = 0;
  discountprice = 0;
  netprice = 0;
  total2 = 0;
  saveDisable = true;
  allreadyExit = false;
  deletefList = true;
  errorMessage: string;
  successMessage: string;
  saveEdit2: FinishGoodGRN;
  alldata: FinishGoodGRN[];
  alldata2: FinishGoodGRN[];
  alldata3: FinishGoodGRN[];
  updateGRNData: FinishGoodGRN;
  updateQty: FinishGoodGRN;
  jackEmpty = true;
  maxData: FinishGoodGRN[];
  allResonData: Reason[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: FinishGoodGRN = new FinishGoodGRN(0, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);
  selected3: FinishGoodGRN = new FinishGoodGRN(0, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);
  allResonCategoryData: ReasonCatagory[];
  addData: TemporyGRN = new TemporyGRN(0, '', '', '', '', null, null, null, null, null, null, '', null, null, null);
  selected2: TemporyGRN = new TemporyGRN(0, '', '', '', '', null, null, null, null, null, null, '', null, null, null);
  allSuplierOptions: SelectItem[] = [];
  allstoresOptions: SelectItem[] = [];
  allitemMasterOptions: SelectItem[] = [];
  temporygrn: TemporyGRN[] = [];
  FGRN: FinishGoodGRN[] = [];
  dataSource = new MatTableDataSource<TemporyGRN>(this.temporygrn);
  allResonCategoryOptions: SelectItem[];
  allResonOptions: SelectItem[];



  ngOnInit() {

    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      batchNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9](?:[a-zA-Z0-9-._/ ]*[a-zA-Z0-9])?$'), Validators.maxLength(50)])),
      price: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      quantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      remainingQuantity: new FormControl(''),
      discount: new FormControl('', Validators.compose([Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      date: new FormControl('', Validators.required),
      total: new FormControl(''),
      discountTotal: new FormControl(''),
      netPrice: new FormControl(''),
      supplierId: new FormControl('', Validators.required),
      storeId: new FormControl('', Validators.required),
      itemMasterId: new FormControl('', Validators.required),


    });
    this.myForm2 = this.formBuilder.group({
      reasoncategoryId: new FormControl('', Validators.required),
      UpdateQTy: new FormControl('', Validators.required),
      reasonId: new FormControl('', Validators.required)



    });
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

  getAllReasonCategoryOptions() {
    let catWebServResponce: WebServResponce;
    this.reasonCatagoryService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allResonCategoryData = <ReasonCatagory[]>catWebServResponce.result;
          this.allResonCategoryOptions = [];
          this.allResonCategoryOptions.push({ label: 'Please Select', value: null });
          for (let reasonCategory of this.allResonCategoryData) {
            this.allResonCategoryOptions.push({ label: reasonCategory.reasonCatagory, value: reasonCategory.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }



  getReasonDataAll() {
    let webServResponce: WebServResponce;
    this.reasonService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allResonData = <Reason[]>webServResponce.result;

          this.allResonOptions = [];
          this.allResonOptions.push({ label: 'Please Select', value: null });
          for (let reason of this.allResonData) {
            this.allResonOptions.push({ label: reason.reason, value: reason.id });
          }


        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }


  getAll() {
    this.getReasonDataAll();
    this.CompanyData();
    this.getAllReasonCategoryOptions();

    let webServResponce: WebServResponce;
    this.finishGoodGRNservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <FinishGoodGRN[]>webServResponce.result;

          let filterdGRN: FinishGoodGRN[] = this.alldata
            .filter(FinishGoodGRN => FinishGoodGRN.remainingQuantity != 0)
          if (filterdGRN.length === 0) {

            this.alldata = filterdGRN;

          } else {



            let filterdGRN2: FinishGoodGRN[] = this.alldata
              .filter(FinishGoodGRN => FinishGoodGRN.returnQuantity != 0)
            if (filterdGRN2.length === 0) {
              console.log('no data');
            } else {
              this.alldata3 = filterdGRN2;

            }


            this.alldata = filterdGRN;
            console.log('available');

            for (let var1 of this.alldata) {

              if (var1.supplier != null) {
                var1.supplierId = var1.supplier.id;
              } else {
                var1.supplierId = 0;
              }
              if (var1.store != null) {

                var1.storeId = var1.store.id;

              } else {
                var1.storeId = 0;
              }
              if (var1.itemMaster != null) {

                var1.itemMasterId = var1.itemMaster.id;

              } else {
                var1.itemMasterId = 0;
              }
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
    this.supplierService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allsuppliers = <Supplier[]>catWebServResponce.result;
          this.allSuplierOptions = [];
          this.allSuplierOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allsuppliers) {
            this.allSuplierOptions.push({ label: var1.supplierName, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce1: WebServResponce;
    this.finishGoodGRNservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce1 = resObj;
        if (catWebServResponce1.statusId == 200) {
          this.alldata2 = <FinishGoodGRN[]>catWebServResponce1.result;

        } else {
          this.errorMessage = catWebServResponce1.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


    let catWebServResponce2: WebServResponce;
    this.storeservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allstores = <Store[]>catWebServResponce2.result;
          this.allstoresOptions = [];
          this.allstoresOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allstores) {
            this.allstoresOptions.push({ label: var1.storeName, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce3: WebServResponce;
    this.itemMasterservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce3 = resObj;
        if (catWebServResponce3.statusId == 200) {
          this.allitems = <ItemMaster[]>catWebServResponce3.result;
          this.allitemMasterOptions = [];
          this.allitemMasterOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allitems) {
            this.allitemMasterOptions.push({ label: var1.itemCode, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );



  }

  getMax() {
    let webServResponce: WebServResponce;
    this.finishGoodGRNservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <FinishGoodGRN[]>webServResponce.result;
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
    this.temporygrn = [];
    this.dataSource = new MatTableDataSource<TemporyGRN>(this.temporygrn);
    this.selected = new FinishGoodGRN(0, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);

    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });

    this.myForm.patchValue({ discount: 0 });
    this.myForm.patchValue({ total: 0 });
    this.myForm.patchValue({ discountTotal: 0 });
    this.myForm.patchValue({ netPrice: 0 });
    this.getMax();
    this.saveDisable = true;
  }


  addNew2() {

    this.selected2 = new TemporyGRN(0, '', '', '', '', null, null, null, null, null, null, '', null, null, null);
    this.myForm.reset();
    this.getMax();
    this.myForm.patchValue({ discount: 0 });
    this.myForm.patchValue({ total: 0 });
    this.myForm.patchValue({ discountTotal: 0 });
    this.myForm.patchValue({ netPrice: 0 });
  }


  addNew3() {

    this.selected3 = new FinishGoodGRN(0, '', '', null, null, 0, 0, '', '', '', null, null, null, '', null, null, null);
    this.myForm2.reset();
  }
  genarateIdNormal(oldId: string) {
    //let year = (new Date()).getFullYear();
    let type = 'FGRN'
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
    this.nextid = this.genaratedId;
    this.myForm.patchValue({ qualityparameterdiscription: '' });
    this.myForm.patchValue({ id: ' ' });
    this.myForm.patchValue({ discount: 0 });
    this.myForm.patchValue({ date: this.createdDate });


  }

  PushToArray(genaratedId, batchNumber, price, quantity, discount, date, supi, si, i) {
    let itemId = parseInt(i);
    let supid = parseInt(supi);
    let StoreId = parseInt(si);
    //console.log('hereeeeeeee' + totprice);

    console.log('data is batch  ' + batchNumber);
    console.log('data is  price' + price);
    console.log('data is qty ' + quantity);
    console.log('data is discount ' + discount);
    console.log('data is  date ' + date);



    if (this.temporygrn.length != 0) {
      this.jackEmpty = false;
      console.log(' data have');

      let obj: TemporyGRN = this.temporygrn
        .filter(TemporyGRN => TemporyGRN.itemMasterId === itemId && TemporyGRN.batchNumber === batchNumber)
        .pop();
      if (obj === undefined) {

        console.log(' data undifine');

        let obj: ItemMaster[] = this.allitems
          .filter(ItemMaster => ItemMaster.id === itemId)
        //.pop();
        if (obj === undefined) {
        } else {

          console.log(supid, StoreId, itemId);
          this.itemcode1 = obj[0].itemCode;
          console.log(this.itemcode1);
          this.discription1 = obj[0].discription;
          console.log(this.discription1);
        }
        this.autoIncrement = this.autoIncrement + 1;
        this.addData = new TemporyGRN(this.autoIncrement, this.discription1, genaratedId, this.itemcode1,
          batchNumber, price, quantity, quantity, discount, date, this.createdDate, this.createdby, supid,
          StoreId, itemId
        )

        this.temporygrn.push(this.addData);
        let a;
        this.dataSource = new MatTableDataSource<TemporyGRN>(this.temporygrn);
        for (let i = 0; i < this.temporygrn.length; i++) {
          this.total = (this.total) - (-this.temporygrn[i].totprice);
        }

        this.discountprice = this.total * (discount / 100);
        this.netprice = this.total - this.discountprice;


        this.myForm.patchValue({ total: this.total });
        this.myForm.patchValue({ netPrice: this.netprice });

        this.myForm.patchValue({ itemMasterId: null });

        this.myForm.patchValue({ price: null });
        this.myForm.patchValue({ quantity: null });
        this.myForm.patchValue({ discount: null });



        this.myForm.patchValue({ discountTotal: this.discountprice });

        this.total = 0;
        this.discountprice = 0;
        this.checkToSave();

      } else {
        console.log(obj);
        if (obj != null) {
          console.log(' match values');

          this.openSnackBar('Error', 'You Can Not Add Same Data');
          this.myForm.patchValue({ itemMasterId: null });
          this.myForm.patchValue({ batchNumber: null });


        }
        else {

          console.log('data avalble but not match values');


        }

      }

    }
    else {
      console.log("inside secound ");

      let obj: ItemMaster[] = this.allitems
        .filter(ItemMaster => ItemMaster.id === itemId)
      //.pop();
      if (obj === undefined) {
      } else {

        console.log(supid, StoreId, itemId);
        this.itemcode1 = obj[0].itemCode;
        console.log('item code' + this.itemcode1);
        this.discription1 = obj[0].discription;
        console.log('discription ' + this.discription1);
      }


      this.autoIncrement = this.autoIncrement + 1;
      this.addData = new TemporyGRN(this.autoIncrement, this.discription1, genaratedId, this.itemcode1,
        batchNumber, price, quantity, quantity, discount, date, this.createdDate, this.createdby, supid,
        StoreId, itemId
      )

      this.temporygrn.push(this.addData);

      console.log("data " + JSON.stringify(this.temporygrn));
      // let a;

      this.dataSource = new MatTableDataSource<TemporyGRN>(this.temporygrn);



      for (let i = 0; i < this.temporygrn.length; i++) {
        this.total = (this.total) - (-this.temporygrn[i].totprice);
      }

      if (this.temporygrn.length != 0) {
        this.jackEmpty = false;
      }


      this.discountprice = this.total * (discount / 100);
      this.netprice = this.total - this.discountprice;
      this.myForm.patchValue({ total: this.total });
      this.myForm.patchValue({ netPrice: this.netprice });
      this.myForm.patchValue({ itemMasterId: null });

      this.myForm.patchValue({ price: null });
      this.myForm.patchValue({ quantity: null });
      this.myForm.patchValue({ discount: null });



      this.myForm.patchValue({ discountTotal: this.discountprice });

      this.total = 0;
      this.discountprice = 0;
      this.checkToSave();




    }
    this.myForm.patchValue({ discount: 0 });
  }

  deleteDataFromList(data: TemporyGRN, dis) {

    this.temporygrn = [];
    this.dataSource = new MatTableDataSource<TemporyGRN>(this.temporygrn);


    this.addNew2();
    this.discountprice = this.total * (dis / 100);
    this.netprice = this.total - this.discountprice;
    this.myForm.patchValue({ total: this.total });
    this.myForm.patchValue({ netPrice: this.netprice });

    this.myForm.patchValue({ discountTotal: this.discountprice });

    // this.myForm.patchValue({ discount: null });
    // this.myForm.patchValue({ quantity: null });
    // this.myForm.patchValue({ price: null });
    // this.myForm.patchValue({ batchNumber: "" });
    this.total = 0;
    this.discountprice = 0;

    this.checkToSave();
    this.jackEmpty = true;
  }

  checkToSave() {

    if (this.temporygrn.length != 0) {
      this.saveDisable = false;
    }
    else {
      this.saveDisable = true;
    }
  }



  saveorEdit() {

    let availablity = false;

    for (let j = 0; j < this.temporygrn.length; j++) {

      let obj: FinishGoodGRN[] = this.alldata
        .filter(FinishGoodGRN => FinishGoodGRN.batchNumber === this.temporygrn[j].batchNumber && FinishGoodGRN.itemMaster.id === this.temporygrn[j].itemMasterId)
      //.pop();
      if (obj.length === 0) {

      } else {
        availablity = true;
      }
    }

    if (availablity === false) {
      for (let i = 0; i < this.temporygrn.length; i++) {


        let webServResponce: WebServResponce;
        this.saveEdit2 = new FinishGoodGRN(
          0,
          this.temporygrn[i].genaratedId,
          this.temporygrn[i].batchNumber,
          this.temporygrn[i].totprice,
          this.temporygrn[i].quantity,
          this.temporygrn[i].quantity,
          0,
          '',
          '',
          '',
          this.temporygrn[i].discount,
          this.temporygrn[i].date,
          this.createdDate,
          this.createdby,
          this.temporygrn[i].supplierId,
          this.temporygrn[i].storeId,
          this.temporygrn[i].itemMasterId

        );

        console.log('save ');
        // this.selectedItemsQualityParameter = data;
        this.finishGoodGRNservice.savedata(this.saveEdit2)
          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {

              console.log('checkthis' + webServResponce.errDetail);
              this.getAll();
              this.getMax();

              console.log('saved');
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );
        this.total2 = this.total2 + 1;
      }

      window.location.hash = String(this.total2);

      let combinemessage = this.total2 + ' GRN Items Saved !!';

      this.openSnackBar('Success', combinemessage);
      console.log('total is ' + combinemessage);
      this.temporygrn = [];
      this.dataSource = new MatTableDataSource<TemporyGRN>(this.temporygrn);
      this.autoIncrement = 0;
      this.saveDisable = true;
      this.addNew();

    }
    else {
      this.openSnackBar('Warning', 'Sory Some Items Already Exist');
    }




  }



  //(ngModelChange)="QualityParameterChange($event)"


  findallIds(x) {

    let obj: FinishGoodGRN[] = this.alldata
      .filter(FinishGoodGRN => FinishGoodGRN.genaratedId === x)
    //.pop();
    if (obj === undefined) {
    } else {

      this.FGRN = obj;

      for (let i = 0; i < this.FGRN.length; i++) {
        console.log(this.FGRN[i].id);
        this.deleteById(this.FGRN[i].id);
      }

    }

    this.openSnackBar('Success', 'GRN Canceled');




  }



  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.finishGoodGRNservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
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
    var col = ["GRN ID", "Item Code", "Batch Number", "Quantity", "Price", "Date"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {


      var temp = [this.alldata[j].genaratedId, this.alldata[j].itemMaster.itemCode, this.alldata[j].batchNumber,
      this.alldata[j].remainingQuantity, this.alldata[j].price, this.alldata[j].createdDate
      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All GRN Items');

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
    doc.save('Grn.pdf');

    this.openSnackBar('Success', 'Print Created');

  }

  updateReturnGRNQty(I, RC, C, R, Q) {


    let remainingQty = RC - Q;
    if (RC >= Q) {

      let webServResponce: WebServResponce;
      this.updateQty = new FinishGoodGRN(I, '', '', null, null, remainingQty, Q, C, R, this.createdDate2, null, null, null, '', null, null, null);
      console.log('save ');
      this.finishGoodGRNservice.updateGRNQTY(this.updateQty)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {
            console.log('saved jackkk');

            this.getAll();
            this.getMax();
            this.addNew3();

          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error
        );


    }
    else {
      this.openSnackBar('Warning ', 'Please Enter Lower Return Quantity ');
    }



  }


  convert2() {

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
    var col = ["GRN ID", "Item Code", "Batch Number", "Base Quantity", "Return Qty", "Reason", "Return Date"];
    var rows = [];
    for (let j = 0; j < this.alldata3.length; j++) {

      var temp = [this.alldata3[j].genaratedId, this.alldata3[j].itemMaster.itemCode, this.alldata3[j].batchNumber,
      this.alldata3[j].quantity, this.alldata3[j].returnQuantity, this.alldata3[j].returnReason, this.alldata3[j].returnDate,
      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'Return GRN Items');

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
    doc.save('ReturnGrn.pdf');

    this.openSnackBar('Success', 'Print Created');

  }


  jacktt() {

    let webServResponce: WebServResponce;
    this.updateQty = new FinishGoodGRN(2, '', '', null, null, 666, 2, 'dd', 'dd', 'dd', null, null, null, '', null, null, null);
    console.log('save ');
    this.finishGoodGRNservice.updateGRNQTY(this.updateQty)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          console.log('saved');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }

}