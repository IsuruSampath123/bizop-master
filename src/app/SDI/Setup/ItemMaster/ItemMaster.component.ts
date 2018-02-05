import { Component, OnInit } from '@angular/core';
import { QualityParameter } from "../../../domain/QualityParameter";
import { WebServResponce } from "../../../domain/WebServResponce";
import { ItemsQualityParameter } from "../../../domain/ItemsQualityParameter";
import { Observable } from "rxjs/Rx";
import { TemporyItemsQualityParameter } from "../../../domain/TemporyItemsQualityParameter";
import { MainCatagory } from "../../../domain/mainCatagory";
import { SubSubCatagory } from "../../../domain/SubSubCatagory";
import { SubCatagory } from "../../../domain/SubCatagory";
import { ItemMaster } from "../../../domain/ItemMaster";
import { SelectItem } from "primeng/primeng";
declare let jsPDF;
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ItemMasterservice } from "../../../service/ItemMaster.service";
import { MainCatagoryservice } from "../../../service/maincatagory.service";
import { SubCatagoryservice } from "../../../service/SubCatagory.service";
import { SubSubCatagoryservice } from "../../../service/subSubCatagory.service";
import { ItemsQualityParameterservice } from "../../../service/ItemsQualityParameter.service";
import { QualityParameterservice } from "../../../service/QualityParameter.service";
import { Companyservice } from "../../../service/Company.service";
import { Company } from "../../../domain/Company";

@Component({
  selector: 'app-ItemMaster',
  templateUrl: './ItemMaster.component.html',
  styleUrls: ['./ItemMaster.component.css']
})



export class ItemMasterComponent implements OnInit {
  displayedColumns = ['id', 'discription'];




  customerRegist = [
    'Item master file',
    'Finished goods prices',
    'Customer specific special prices and discounts',

  ];
  myForm: FormGroup;
  myForm2: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private itemMasterservice: ItemMasterservice,
    private mainCatagoryservice: MainCatagoryservice,
    private subCatagoryservice: SubCatagoryservice,
    private subSubCatagoryservice: SubSubCatagoryservice,
    private itemsQualityParameterservice: ItemsQualityParameterservice,
    private qualityParameterservice: QualityParameterservice, public snackBar: MatSnackBar, private companyservice: Companyservice
  ) {

  }

  ngOnInit() {

    this.getAll();
    this.getMax();
    //this.getItemsQualityParmetersAll();
    this.myForm2 = this.formBuilder.group({
      id: new FormControl(''),
      qualityParameterId: new FormControl('', Validators.required),
      itemMasterId: new FormControl('', Validators.required),
      discription: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-()./:%_ ]*[a-zA-Z0-9()%])?$'), Validators.maxLength(50)]))
    });
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      itemCode: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9()./: ]*[a-zA-Z0-9()])?$'), Validators.maxLength(50)])),
      secreteCode: new FormControl('', Validators.required),
      discription: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-/_%().,&$!+-?:; ]*[a-zA-Z0-9%()])?$'), Validators.maxLength(50)])),
      hsCode: new FormControl('', Validators.required),
      unit: ['', Validators.pattern('[0-9.]{1,12}')],
      maxLevel: ['', Validators.pattern('[0-9.]{1,12}')],
      minLevel: ['', Validators.pattern('[0-9.]{1,12}')],
      lastPerchQuantity: ['', Validators.pattern('[0-9.]{1,12}')],
      currentBalance: ['', Validators.pattern('[0-9.]{1,12}')],
      maxRetail: ['', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}')])],
      averageCost: ['', Validators.pattern('[0-9.]{1,12}')],
      lastPerchPrice: ['', Validators.pattern('[0-9.]{1,12}')],
      cashPrice: ['', Validators.pattern('[0-9.]{1,12}')],
      creditPrice: ['', Validators.pattern('[0-9.]{1,12}')],
      maxCreditDays: ['', Validators.pattern('[0-9]{1,12}')],
      wholeSalePrice: ['', Validators.pattern('[0-9.]{1,12}')],
      discount: ['', Validators.pattern('[0-9.]{1,12}')],
      reOrderLevel: ['', Validators.pattern('[0-9.]{1,12}')],
      reOrderQuantity: ['', Validators.pattern('[0-9.]{1,12}')],
      leadTime: ['', Validators.pattern('[0-9]{1,12}')],
      distributor: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
      additionalInfo: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-()./: ]*[a-zA-Z0-9()])?$'), Validators.maxLength(50)])),
      volumeType: new FormControl('',Validators.required),
      volume: ['', Validators.pattern('[0-9.]{1,12}')],
      mainCatagoryId: new FormControl('', Validators.required),
      subCatagoryId: new FormControl('', Validators.required),
      subSubCatagoryId: new FormControl('', Validators.required),
      qualityparameter: new FormControl(''),
      qualityparameterdiscription: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-()./:%_ ]*[a-zA-Z0-9()%])?$'), Validators.maxLength(50)])),
      packSize: [Validators.required, Validators.pattern('[0-9.]{1,12}')]

    });
  }

  allQualityParameters: QualityParameter[];
  allmaincatagories: MainCatagory[];
  allSubCatagories: SubCatagory[];
  allSubSubCatagories: SubSubCatagory[];
  allFilteredSubCatagories: SubCatagory[];
  allFilteredSubSubCatagories: SubSubCatagory[];
  clearSubCatagory: SubSubCatagory[];
  jacktestId;
  ELEMENT_DATA: TemporyItemsQualityParameter[] = [

  ];
  qualityParameterId2;
  errorMessage: string;
  successMessage: string;
  saveEdit: ItemMaster;
  addData: TemporyItemsQualityParameter;
  alldata: ItemMaster[];
  maxData: ItemMaster[];
  allitemsqualityparameterdata: ItemsQualityParameter[];
  allFiltereditemsqualityparameterdata: ItemsQualityParameter[];
  saveEdit2: ItemsQualityParameter;
  nextid;
  autoIncrement = 0;
  jackqpId;

  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdBy = 'Admin'
  genaratedId: string;
  selectedQP: ItemsQualityParameter = new ItemsQualityParameter(null, '', null, null);
  selected: ItemMaster = new ItemMaster(0, '', '', '', '', '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '', '', '', null, null, '', null, null, null);
  allMainCatagoryOptions: SelectItem[] = [];
  selected2: TemporyItemsQualityParameter = new TemporyItemsQualityParameter(0, '', '', null, '');
  mainCatagoryId1;
  subCatagoryId1;
  subSubCatagoryId1;
  allSubCatagoryOptions: SelectItem[] = [];
  allSubSubCatagoryOptions: SelectItem[] = [];
  allQualityParameterOption: SelectItem[] = [];
  allItemCodeOption: SelectItem[] = [];
  SelectedMainCatagory: number;
  SelectedSubCatagory: number;
  Rowmetarial = true;
  FinishGood = true;
  Intermidiate = true;
  ItemsQualityParameterId;
  total = 0;
  tepmoryQualityParameters: TemporyItemsQualityParameter[] = [];
  testarray: Element[] = [];
  add2 = Element;
  addToCart = true;
  addToCart2 = true;
  CheckQualityParameter = true;
  SelectedMasterItem = 'item';
  ItemMasterId;
  ItemsQualityParameterChange = true;
  qpId;
  qpName;
  dataSource = new MatTableDataSource<TemporyItemsQualityParameter>(this.tepmoryQualityParameters);
  GetItemQp() {
    let catWebServResponce6: WebServResponce;
    this.itemsQualityParameterservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce6 = resObj;
        if (catWebServResponce6.statusId == 200) {

          this.allitemsqualityparameterdata = <ItemsQualityParameter[]>catWebServResponce6.result;
          for (let var1 of this.allitemsqualityparameterdata) {

            if (var1.qualityParameter != null) {
              var1.qualityParameterId = var1.qualityParameter.id;
            } else {
              var1.qualityParameterId = 0;
            }


          }
          console.log('data loaded');

        }
        else {
          this.errorMessage = catWebServResponce6.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
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



    //this.tepmoryQualityParameters = [];
    this.CompanyData();
    let webServResponce: WebServResponce;
    this.itemMasterservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <ItemMaster[]>webServResponce.result;

          for (let var1 of this.alldata) {

            if (var1.mainCatagory != null) {
              var1.mainCatagoryId = var1.mainCatagory.id;
            } else {
              var1.mainCatagoryId = 0;
            }
            if (var1.subCatagory != null) {
              var1.subCatagoryId = var1.subCatagory.id;
            } else {
              var1.subCatagoryId = 0;
            }
            if (var1.subSubCatagory != null) {
              var1.subSubCatagoryId = var1.subSubCatagory.id;
            } else {
              var1.subSubCatagoryId = 0;
            }

          }
          this.allItemCodeOption = [];
          this.allItemCodeOption.push({ label: 'Please Select', value: null });
          for (let var1 of this.alldata) {
            this.allItemCodeOption.push({ label: var1.genaratedId, value: var1.genaratedId });
          }



        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce: WebServResponce;
    this.mainCatagoryservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {

          this.allmaincatagories = <MainCatagory[]>catWebServResponce.result;
          this.allMainCatagoryOptions = [];
          this.allMainCatagoryOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allmaincatagories) {
            this.allMainCatagoryOptions.push({ label: var1.mainCatagoryName, value: var1.id });
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
    this.subCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {
          this.allSubCatagories = <SubCatagory[]>catWebServResponce2.result;
          this.allSubCatagoryOptions = [];
          this.allSubCatagoryOptions.push({ label: 'Please Select', value: null });

          for (let var1 of this.allSubCatagories) {

            this.allSubCatagoryOptions.push({ label: var1.subCatagoryName, value: var1.id });
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
    this.subSubCatagoryservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce3 = resObj;
        if (catWebServResponce3.statusId == 200) {
          this.allSubSubCatagories = <SubSubCatagory[]>catWebServResponce3.result;
          this.allSubSubCatagoryOptions = [];
          this.allSubSubCatagoryOptions.push({ label: 'Please Select', value: null });

          for (let var1 of this.allSubSubCatagories) {

            this.allSubSubCatagoryOptions.push({ label: var1.subSubCatagoryName, value: var1.id });
          }

        }
        else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );




    let catWebServResponce5: WebServResponce;
    this.qualityParameterservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce5 = resObj;
        if (catWebServResponce5.statusId == 200) {

          this.allQualityParameters = <QualityParameter[]>catWebServResponce5.result;
          this.allQualityParameterOption = [];
          this.allQualityParameterOption.push({ label: 'Please Select', value: null });
          for (let var1 of this.allQualityParameters) {
            this.allQualityParameterOption.push({ label: var1.qualityParameter, value: var1.id });
          }
        }
        else {
          this.errorMessage = catWebServResponce5.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    this.GetItemQp();

  }
  getMax() {
    let webServResponce: WebServResponce;
    this.itemMasterservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <ItemMaster[]>webServResponce.result;
          //console.log(this.maxData[0].genaratedId);

          if (this.maxData[0] == undefined) {

            this.genaratedId = null;

          } else {
            this.genaratedId = this.maxData[0].genaratedId;
            this.ItemsQualityParameterId = this.maxData[0].id;
            console.log("itemsqualityparameter" + this.ItemsQualityParameterId);
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
    this.addNew3();
    this.tepmoryQualityParameters = [];
    this.dataSource = new MatTableDataSource<TemporyItemsQualityParameter>(this.tepmoryQualityParameters);

    this.selected = new ItemMaster(0, '', '', '', '', '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '', '', '', null, null, '', null, null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getAll();
    this.getMax();
  }
  addNew2() {

    this.selectedQP = new ItemsQualityParameter(0, '', null, null);
    this.myForm2.reset();
    this.myForm2.patchValue({ id: 0 });
    this.SetValueToQp();


  }

  addNew4() {
    this.tepmoryQualityParameters = [];
    this.dataSource = new MatTableDataSource<TemporyItemsQualityParameter>(this.tepmoryQualityParameters);
    this.selected2 = new TemporyItemsQualityParameter(0, '', '', null, '');
  }



  SetValueToQp() {
    let obj: ItemsQualityParameter[] = this.allitemsqualityparameterdata
      .filter(ItemsQualityParameter => ItemsQualityParameter.itemMasterId === this.SelectedMasterItem)
    if (obj === undefined) {

    } else {

      this.allFiltereditemsqualityparameterdata = obj;
    }


  }




  addNew3() {

    this.selectedQP = new ItemsQualityParameter(0, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm2.reset();
    this.myForm2.patchValue({ id: 0 });
    this.SetValueToQp();
    this.ItemsQualityParameterChange = false;

  }
  saveOrEdit(data: ItemMaster) {

    this.CheckQualityParametesAdded();

    let webServResponce: WebServResponce;
    this.saveEdit = new ItemMaster(

      data.id,
      data.genaratedId,
      data.itemCode,
      data.secreteCode,
      data.discription,
      data.hsCode,
      data.unit,
      data.maxLevel,
      data.minLevel,
      data.lastPerchQuantity,
      data.currentBalance,
      data.maxRetail,
      data.averageCost,
      data.lastPerchPrice,
      data.cashPrice,
      data.creditPrice,
      data.maxCreditDays,
      data.wholeSalePrice,
      data.discount,
      data.reOrderLevel,
      data.reOrderQuantity,
      data.leadTime,
      data.packSize,
      data.distributor,
      data.additionalInfo,
      data.volumeType,
      data.volume,
      this.createdDate,
      this.createdBy,
      data.mainCatagoryId,
      data.subCatagoryId,
      data.subSubCatagoryId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);



    if (data.id == 0) {
      if (this.CheckQualityParameter == true) {
        this.openSnackBar('Worning', ' Please Add Quality Parameters');
      }
      else {

        if (b) {
          console.log('save ');
          this.selected = data;
          console.log('curent date' + this.createdDate);

          this.itemMasterservice.savedata(this.saveEdit)

            .subscribe(
            resObj => {
              webServResponce = resObj;
              if (webServResponce.statusId == 200) {

                console.log('checkthis' + webServResponce.errDetail);
                this.openSnackBar('Success', 'Data Saved');
                this.saveQualityParameter();

                this.getAll();
                this.addNew();
                console.log('saved');
                this.getMax();
              } else {
                this.errorMessage = webServResponce.errMessage;
              }
            }
            ,
            error => this.errorMessage = <any>error

            );
        }
        else {
          this.openSnackBar('Worning', ' Item Code Already exist');
          this.addNew();
        }
      }


    }


    else {
      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {
        console.log("update");
        this.itemMasterservice.editdata(this.saveEdit)
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
    this.itemMasterservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new ItemMaster(0, '', '', '', '', '', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '', '', '', null, null, '', null, null, null);
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
    let type = 'ITM'
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
    this.myForm2.patchValue({ id: 0 });
    this.myForm.patchValue({ discount: 0 });


  }


  AllreadyExistSave(data: ItemMaster): boolean {
    let obj: ItemMaster = this.alldata
      .filter(ItemMaster => ItemMaster.itemCode.toLowerCase() === data.itemCode.toLowerCase())
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }

  AllreadyExistUpdate(data: ItemMaster): boolean {
    let obj: ItemMaster = this.alldata
      .filter(ItemMaster => ItemMaster.itemCode.toLowerCase() === data.itemCode.toLowerCase() && ItemMaster.id != data.id)
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }



  MainCatagoryChange(jv) {

    if (this.jacktestId === 0) {

      if (jv != null) {


        console.log("select catagory id" + jv);
        this.SelectedMainCatagory = parseInt(jv);
        console.log("select catagory id 2 " + this.SelectedMainCatagory);
        this.ChangedMainSelection();
        this.CheckItemType();
      }
      else {
        console.log("not selected");
        this.ClearSubCatagory();
        this.ClearSubSubCatagory();
        this.Rowmetarial = true;
        this.FinishGood = true;
        this.Intermidiate = true;
      }

    }
    else { }





  }

  SubCatagoryChange(jv) {

    if (this.jacktestId === 0) {
      if (jv != null) {
        console.log("select catagory id" + jv);
        this.SelectedSubCatagory = parseInt(jv);
        console.log("select subcatagory id 2 " + this.SelectedSubCatagory);
        this.ChangedSubSelection();
      }
      else {
        console.log("not selected");
        this.ClearSubSubCatagory();
      }

    }
    else { }





  }

  ChangedMainSelection() {
    let obj: SubCatagory[] = this.allSubCatagories
      .filter(SubCatagory => SubCatagory.mainCatagory.id === this.SelectedMainCatagory)
    //.pop();
    if (obj === undefined) {
    } else {
      console.log('obj' + JSON.stringify(obj));
      this.allFilteredSubCatagories = obj;
      console.log('filtered branchers' + JSON.stringify(this.allFilteredSubCatagories));
      this.SetSubCatagories();

    }

  }
  ChangedSubSelection() {
    let obj: SubSubCatagory[] = this.allSubSubCatagories
      .filter(SubSubCatagory => SubSubCatagory.subCatagory.id === this.SelectedSubCatagory)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' + JSON.stringify(obj));
      this.allFilteredSubSubCatagories = obj;
      // console.log('filtered branchers' + JSON.stringify(this.allFilteredSubSubCatagories));
      this.SetSubSubCatagories();

    }

  }

  SetSubCatagories() {

    this.allSubCatagoryOptions = [];
    this.allSubCatagoryOptions.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubCatagories) {

      this.allSubCatagoryOptions.push({ label: var1.subCatagoryName, value: var1.id });
    }
  }
  SetSubSubCatagories() {

    this.allSubSubCatagoryOptions = [];
    this.allSubSubCatagoryOptions.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubSubCatagories) {

      this.allSubSubCatagoryOptions.push({ label: var1.subSubCatagoryName, value: var1.id });
    }
  }

  ClearSubCatagory() {

    this.allFilteredSubCatagories = [];
    console.log("this.allFilteredSubCatagories" + this.allFilteredSubCatagories);
    this.allSubCatagoryOptions = [];
    this.allSubCatagoryOptions.push({ label: 'Please Select Main Catagory', value: null });
  }
  ClearSubSubCatagory() {

    this.allFilteredSubSubCatagories = [];

    console.log("this.allFilteredSubCatagories" + this.allFilteredSubCatagories);


    this.allSubSubCatagoryOptions = [];
    this.allSubSubCatagoryOptions.push({ label: 'Please Select Sub Catagory', value: null });

    for (let var1 of this.allFilteredSubSubCatagories) {

      this.allSubSubCatagoryOptions.push({ label: var1.subSubCatagoryName, value: var1.id });
    }


  }

  CheckItemType(): boolean {
    let obj: MainCatagory = this.allmaincatagories
      .filter(MainCatagory => MainCatagory.id === this.SelectedMainCatagory)
      .pop();

    if (obj === undefined) {
      console.log('if undifuine' + JSON.stringify(obj));

      this.Intermidiate = false;
      this.FinishGood = false;
      this.Rowmetarial = false;

      return true;
    }

    else {
      console.log('have values ' + JSON.stringify(obj.itemType.id));


      let j = obj.itemType.id;
      console.log('j here ' + j);
      if (j === 2) {
        this.Intermidiate = false;
        console.log('select intermediate ' + this.Intermidiate);
        this.FinishGood = true;
        this.Rowmetarial = true;
      }


      else if (j === 3) {
        this.FinishGood = false;
        console.log('select finsh good ' + this.FinishGood);
        this.Intermidiate = true;
        this.Rowmetarial = true;

      }


      else if (j === 1) {
        this.Rowmetarial = false;
        console.log('select row metarial ' + this.Rowmetarial);
        this.Intermidiate = true;
        this.FinishGood = true;
      }

      else {
        this.Intermidiate = false;
        this.FinishGood = false;
        this.Rowmetarial = false;
      }
      return false;
    }

  }

  PushToArray(x, y) {


    //this.tepmoryQualityParameters = [];
    let newx = parseInt(x);
    this.autoIncrement = this.autoIncrement + 1;
    this.addData = new TemporyItemsQualityParameter(this.autoIncrement, y, this.qpName, newx, this.genaratedId)
    this.tepmoryQualityParameters.push(this.addData);
    this.total = 0;

    this.myForm.patchValue({ qualityparameterdiscription: '' });
    console.log(JSON.stringify(this.tepmoryQualityParameters));
    this.dataSource = new MatTableDataSource<TemporyItemsQualityParameter>(this.tepmoryQualityParameters);




  }
  jack1() {
    this.tepmoryQualityParameters = [];
  }
  jack2() {
    // this.tepmoryQualityParameters = [];

    this.addData = new TemporyItemsQualityParameter(1, '2', 'this.qpName', 2, this.genaratedId)
    this.tepmoryQualityParameters.push(this.addData);
    this.dataSource = new MatTableDataSource<TemporyItemsQualityParameter>(this.tepmoryQualityParameters);

  }




  deleteDataFromList(data: TemporyItemsQualityParameter) {

    console.log(JSON.stringify(data));
    let index = this.tepmoryQualityParameters.indexOf(data);
    if (index > -1) {
      //console.log();
      this.tepmoryQualityParameters.splice(index, 1);
    }
    this.addNew4();

  }

  saveQualityParameter() {
    console.log('saved array first');

    for (let i = 0; i < this.tepmoryQualityParameters.length; i++) {

      console.log('saved array' + this.tepmoryQualityParameters[i].discription);
      let webServResponce: WebServResponce;
      this.saveEdit2 = new ItemsQualityParameter(0, this.tepmoryQualityParameters[i].discription, this.tepmoryQualityParameters[i].qualityParameterId, this.nextid);

      console.log('save ');
      // this.selectedItemsQualityParameter = data;
      this.itemsQualityParameterservice.savedata(this.saveEdit2)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {

            console.log('checkthis' + webServResponce.errDetail);
            this.getAll();
            console.log('saved');
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error

        );
      this.total = this.total + 1;
    }

    window.location.hash = String(this.total);

    let combinemessage = this.total + ' Quality Paramer Saved !!';

    this.openSnackBar('Success', combinemessage);
    console.log('total is ' + combinemessage);
    this.tepmoryQualityParameters = [];
    this.autoIncrement = 0;
  }

  DiscriptionChange(x) {

    //console.log('DiscriptionChange'+x)

    let y = 0;
    y = x + y;

    console.log('methord called')
    if (y == 0) {
      console.log('empty values')

      this.addToCart = true;
    }
    else {
      console.log(' not empty values')

      this.addToCart = false;
    }
  }

  QualityParameterChange(x) {
    if (x == null) {
      console.log('quality parameter empty')
      this.addToCart2 = true;

    }
    else {
      console.log('quality parameter not empty')
      this.addToCart2 = false;
      this.qpId = parseInt(x);
      console.log('qqp id' + this.qpId);
      this.FindQp();

    }


  }
  CheckQualityParametesAdded() {
    console.log('qp data' + JSON.stringify(this.tepmoryQualityParameters));
    let arraytot = 0;
    for (let i = 0; i < this.tepmoryQualityParameters.length; i++) {
      arraytot = arraytot + 1;
    }


    if (arraytot == 0) {
      console.log('no data');
      this.CheckQualityParameter = true;
    }
    else {
      console.log(' data have');
      this.CheckQualityParameter = false;


    }

  }
  GenIdChange(x) {
    this.SelectedMasterItem = x;
    Observable.interval(500).subscribe(x => {
      this.SetValueToQp();
    })

  }

  FilterItemsQualityParameters() {
    console.log(this.SelectedMasterItem);


  }

  IdChange(x, y) {

    let j = parseInt(x);
    this.jackqpId = parseInt(y);


    var num3 = new Number(this.jackqpId);
    let hstring = num3.toString();
    this.qualityParameterId2 = hstring;


    if (j === 0) {

      this.ItemsQualityParameterChange = true;
    }
    else {
      console.log(' selected');
      this.ItemsQualityParameterChange = false;
    }
    //  this.ItemsQualityParameterChange=false;
    console.log('valuee' + this.ItemsQualityParameterChange);

  }

  SaveOrEdirQualityParameters(data: ItemsQualityParameter) {

    console.log('saved array first');

    let webServResponce: WebServResponce;
    if (data.id == 0) {
      this.saveEdit2 = new ItemsQualityParameter(0, data.discription, data.qualityParameterId, data.itemMasterId);
      console.log('save Quality Parameters ');
      // this.selectedItemsQualityParameter = data;
      this.itemsQualityParameterservice.savedata(this.saveEdit2)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {

            console.log('checkthis' + webServResponce.errDetail);
            this.getAll();
            console.log('saved');
            this.openSnackBar('Success', 'Data Saved');
            this.addNew3();
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error

        );
      this.total = this.total + 1;


    }
    else {
      this.saveEdit2 = new ItemsQualityParameter(data.id, data.discription, data.qualityParameterId, data.itemMasterId);
      console.log('Update Quality Parameters ');
      // this.selectedItemsQualityParameter = data;
      this.itemsQualityParameterservice.editdata(this.saveEdit2)
        .subscribe(
        resObj => {
          webServResponce = resObj;
          if (webServResponce.statusId == 200) {

            console.log('checkthis' + webServResponce.errDetail);
            console.log('Updated');
            this.GetItemQp();
            this.addNew3();

            this.openSnackBar('Success', 'Data Updated');
          } else {
            this.errorMessage = webServResponce.errMessage;
          }
        }
        ,
        error => this.errorMessage = <any>error

        );
      this.total = this.total + 1;

    }



  }
  deleteQualityParameters(id: number) {
    let webServResponce: WebServResponce;
    this.itemsQualityParameterservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.GetItemQp();
          this.addNew3();
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }


  FindQp() {
    let obj: QualityParameter[] = this.allQualityParameters
      .filter(QualityParameter => QualityParameter.id === this.qpId)
    //.pop();
    if (obj === undefined) {
    } else {

      console.log('one  ' + JSON.stringify(this.allQualityParameters));

      console.log(JSON.stringify(obj));
      this.qpName = obj[0].qualityParameter;
      console.log(this.qpName);
    }

  }


  SetCombo(x, m, s, h) {
    this.jacktestId = x;

    var num = new Number(m);
    let mstring = num.toString();
    this.mainCatagoryId1 = mstring;

    var num2 = new Number(s);
    let sstring = num2.toString();
    this.subCatagoryId1 = sstring;

    var num3 = new Number(h);
    let hstring = num3.toString();
    this.subSubCatagoryId1 = hstring;





  }


  jackk() {

    this.addData = new TemporyItemsQualityParameter(1, '2', 'this.qpName', 2, this.genaratedId)
    this.tepmoryQualityParameters.push(this.addData);
    this.dataSource = new MatTableDataSource<TemporyItemsQualityParameter>(this.tepmoryQualityParameters);
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
    var col = ["Item Master ID", "Item Code", "Discription", "Max Retail Price","Unit", "Discount", "Distributor"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].itemCode, this.alldata[j].discription,
      this.alldata[j].maxRetail,this.alldata[j].volumeType, this.alldata[j].discount, this.alldata[j].distributor
      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Items');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);


    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(11);
    doc.text(155, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(155, 45, 'Created By   :  ' + this.createdBy);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('ItemMaster.pdf');

    this.openSnackBar('Success', 'Print Created');

  }


}












