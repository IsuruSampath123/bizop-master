import { Component, OnInit } from '@angular/core';
import { VolumeWiseFreeIssue } from "../../../domain/VolumeWiseFreeIssue";
import { WebServResponce } from "../../../domain/WebServResponce";
import { ItemMaster } from "../../../domain/ItemMaster";
import { SubSubCatagory } from "../../../domain/SubSubCatagory";
import { SubCatagory } from "../../../domain/SubCatagory";
import { CatagoryWiseFreeIssue } from "../../../domain/CatagoryWiseFreeIssue";
import { MainCatagory } from "../../../domain/mainCatagory";
import { ItemWiseFreeIssue } from "../../../domain/ItemWiseFreeIssue";
import { SelectItem } from "primeng/primeng";
import { ItemMasterservice } from "../../../service/ItemMaster.service";
import { ItemWiseFreeIssueservice } from "../../../service/ItemWiseFreeIssue.service";
import { SubCatagoryservice } from "../../../service/SubCatagory.service";
import { SubSubCatagoryservice } from "../../../service/subSubCatagory.service";
import { MainCatagoryservice } from "../../../service/maincatagory.service";
import { CatagoryWiseFreeIssueservice } from "../../../service/CatagoryWiseFreeIssue.service";
import { VolumeWiseFreeIssueservice } from "../../../service/VolumeWiseFreeIssue.service";
declare let jsPDF;
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Companyservice } from "../../../service/Company.service";
import { Company } from "../../../domain/Company";

@Component({
  selector: 'app-FreeIssue',
  templateUrl: './FreeIssue.component.html',
  styleUrls: ['./FreeIssue.component.css']
})
export class FreeIssueComponent implements OnInit {
  myForm: FormGroup;
  myForm2: FormGroup;
  myForm3: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private itemMasterservice: ItemMasterservice,
    private itemWiseFreeIssueservice: ItemWiseFreeIssueservice,
    private subCatagoryservice: SubCatagoryservice,
    private subSubCatagoryservice: SubSubCatagoryservice,
    private mainCatagoryservice: MainCatagoryservice,
    private catagoryWiseFreeIssueservice: CatagoryWiseFreeIssueservice,
    private volumeWiseFreeIssueservice: VolumeWiseFreeIssueservice, private companyservice: Companyservice
    , public snackBar: MatSnackBar

  ) { }


  CatagoryChange = true;
  CatagoryChange2 = true;
  CatagoryChange3 = true;
  CatagoryChange4 = true;
  selectedItemId1;
  freeIssueItemId1;
  selectedCatagoryId1;
  freeIssueItemId2;
  selectedCatagoryId3;
  freeIssueItemId3;
  saveEdit: ItemWiseFreeIssue;
  alldata: ItemWiseFreeIssue[];
  maxData: ItemWiseFreeIssue[];
  selectedItemy;
  saveEdit2: CatagoryWiseFreeIssue;
  alldata2: CatagoryWiseFreeIssue[];
  maxData2: CatagoryWiseFreeIssue[];
  myItem1: number = 0;
  mycat1: number = 0;
  mycat2: number = 0;

  saveEdit3: VolumeWiseFreeIssue;
  alldata3: VolumeWiseFreeIssue[];
  maxData3: VolumeWiseFreeIssue[];

  allmaincatagories: MainCatagory[];
  allSubCatagories: SubCatagory[];
  allSubSubCatagories: SubSubCatagory[];
  allFilteredSubCatagories: SubCatagory[];
  allFilteredSubSubCatagories: SubSubCatagory[];



  allmaincatagories2: MainCatagory[];
  allSubCatagories2: SubCatagory[];
  allSubSubCatagories2: SubSubCatagory[];
  allFilteredSubCatagories2: SubCatagory[];
  allFilteredSubSubCatagories2: SubSubCatagory[];

  allmaincatagories3: MainCatagory[];
  allSubCatagories3: SubCatagory[];
  allSubSubCatagories3: SubSubCatagory[];
  allFilteredSubCatagories3: SubCatagory[];
  allFilteredSubSubCatagories3: SubSubCatagory[];

  allmaincatagories4: MainCatagory[];
  allSubCatagories4: SubCatagory[];
  allSubSubCatagories4: SubSubCatagory[];
  allFilteredSubCatagories4: SubCatagory[];
  allFilteredSubSubCatagories4: SubSubCatagory[];

  errorMessage: string;
  successMessage: string;

  allitems: ItemMaster[];
  allitems2: ItemMaster[];
  allitems3: ItemMaster[];
  allitems4: ItemMaster[];

  allFilterdItems: ItemMaster[];
  allFilterdItems2: ItemMaster[];
  allFilterdItems3: ItemMaster[];
  allFilterdItems4: ItemMaster[];

  allItemsOptions: SelectItem[] = [];
  allItemsOptions2: SelectItem[] = [];
  allItemsOptions3: SelectItem[] = [];
  allItemsOptions4: SelectItem[] = [];



  allMainCatagoryOptions: SelectItem[] = [];
  allSubCatagoryOptions: SelectItem[] = [];
  allSubSubCatagoryOptions: SelectItem[] = [];

  allSalesRepCodes: SelectItem[] = [];
  SelectedMainCatagory: number;
  SelectedSubCatagory: number;
  SelectedSubsubCatagory: number;

  selected: ItemWiseFreeIssue = new ItemWiseFreeIssue(0, '', null, null, null, '', null, null);
  selected2: CatagoryWiseFreeIssue = new CatagoryWiseFreeIssue(0, '', null, null, '', null, '', null, null);
  selected3: VolumeWiseFreeIssue = new VolumeWiseFreeIssue(0, '', null, null, '', null, '', null, null);



  allMainCatagoryOptions2: SelectItem[] = [];
  allSubCatagoryOptions2: SelectItem[] = [];
  allSubSubCatagoryOptions2: SelectItem[] = [];
  allSalesRepCodes2: SelectItem[] = [];
  SelectedMainCatagory2: number;
  SelectedSubCatagory2: number;
  SelectedSubsubCatagory2: number;

  allMainCatagoryOptions3: SelectItem[] = [];
  allSubCatagoryOptions3: SelectItem[] = [];
  allSubSubCatagoryOptions3: SelectItem[] = [];
  allSalesRepCodes3: SelectItem[] = [];
  SelectedMainCatagory3: number;
  SelectedSubCatagory3: number;
  SelectedSubsubCatagory3: number;

  allMainCatagoryOptions4: SelectItem[] = [];
  allSubCatagoryOptions4: SelectItem[] = [];
  allSubSubCatagoryOptions4: SelectItem[] = [];
  allSalesRepCodes4: SelectItem[] = [];
  SelectedMainCatagory4: number;
  SelectedSubCatagory4: number;
  SelectedSubsubCatagory4: number;

  genaratedId: string;
  genaratedId2: string;
  genaratedId3: string;

  autoIncrement = 0;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";

  ngOnInit() {
    this.AllItems();
    this.getAllItemWiseFreeIssue();
    this.getMax();
    this.getAllCatagoryWiseFreeIssue();
    this.getMaxCatagoryWise();
    this.getAllVolumeWiseFreeIssue();
    this.getMaxVolumeWise();

    this.myForm = this.formBuilder.group({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      mainCatagoryId: new FormControl(''),
      subCatagoryId: new FormControl(''),
      subSubCatagoryId: new FormControl(''),
      manuchange: new FormControl(''),
      manuchange2: new FormControl(''),
      selectedItemId: new FormControl('', Validators.required),
      freeIssueItemId: new FormControl('', Validators.required),
      freeIssueQuantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      itemQuantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)]))
    });

    this.myForm2 = this.formBuilder.group({

      id: new FormControl(''),
      genaratedId: new FormControl(''),
      mainCatagoryId: new FormControl(''),
      subCatagoryId: new FormControl(''),
      selectedCatagoryId: new FormControl('', Validators.required),
      subSubCatagoryId: new FormControl(''),
      packSize: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      manuchange: new FormControl(''),
      manuchange3: new FormControl(''),
      selectedItemId: new FormControl(''),
      freeIssueItemId: new FormControl('', Validators.required),
      freeIssueQuantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      itemQuantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)]))
    });

    this.myForm3 = this.formBuilder.group({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      mainCatagoryId: new FormControl(''),
      subCatagoryId: new FormControl(''),
      selectedCatagoryId: new FormControl('', Validators.required),
      subSubCatagoryId: new FormControl(''),
      volume: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      manuchange: new FormControl(''),
      manuchange4: new FormControl(''),
      selectedItemId: new FormControl(''),
      freeIssueItemId: new FormControl('', Validators.required),
      freeIssueQuantity: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      volumeType: new FormControl('', Validators.required)
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


  getAllItemWiseFreeIssue() {
    this.CompanyData();
    let webServResponce: WebServResponce;
    this.itemWiseFreeIssueservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <ItemWiseFreeIssue[]>webServResponce.result;
          this.myForm.patchValue({ id: 0 });
          this.myForm.patchValue({ manuchange: 1 });
          this.myForm.patchValue({ manuchange2: 1 });

          for (let var1 of this.alldata) {

            if (var1.itemMaster != null) {
              var1.selectedItemId = var1.itemMaster.id;
            } else {
              var1.selectedItemId = 0;
            }
            if (var1.itemMaster2 != null) {
              var1.freeIssueItemId = var1.itemMaster2.id;
            } else {
              var1.freeIssueItemId = 0;
            }
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
    this.itemWiseFreeIssueservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <ItemWiseFreeIssue[]>webServResponce.result;
          //console.log(this.maxData[0].genaratedId);

          if (this.maxData[0] == undefined) {

            this.genaratedId = null;

          } else {
            this.genaratedId = this.maxData[0].genaratedId;
          }
          console.log('genarated id is ' + this.genaratedId);
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
    this.getAllItemWiseFreeIssue();
    this.getMax();
    this.selected = new ItemWiseFreeIssue(0, '', null, null, null, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }



  saveOrEdit(data: ItemWiseFreeIssue) {
    console.log('enterd to the save option');


    let webServResponce: WebServResponce;
    this.saveEdit = new ItemWiseFreeIssue(

      data.id,
      data.genaratedId,
      data.itemQuantity,
      data.freeIssueQuantity,
      this.createdDate,
      this.createdby,
      data.selectedItemId,
      data.freeIssueItemId
    );



    if (data.id == 0) {

      let b: boolean = this.AllreadyExistSave(this.saveEdit);


      if (b) {



        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.itemWiseFreeIssueservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              console.log('checkthis' + webServResponce.errDetail);
              this.addNew();
              console.log('saved');
              this.openSnackBar('Success', 'Data Saved');
              this.getAllItemWiseFreeIssue();
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );
      }
      else {
        this.openSnackBar('Success', 'Data already Exist');

      }

    }
    else {

      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {

        console.log('got to update part');
        console.log('curent date' + this.createdDate);

        this.itemWiseFreeIssueservice.editdata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              console.log('checkthis' + webServResponce.errDetail);
              this.addNew();
              console.log('updated');
              this.openSnackBar('Success', 'Data Edited');
              this.getAllItemWiseFreeIssue();
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );

      }

      else {

        this.openSnackBar('Worning', 'data Already exist');
        this.addNew();
      }

    }



  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.itemWiseFreeIssueservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllItemWiseFreeIssue();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');

          this.selected = new ItemWiseFreeIssue(0, '', null, null, null, '', null, null);
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
    let type = 'IFI'
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

  AllreadyExistSave(data: ItemWiseFreeIssue): boolean {
    let obj: ItemWiseFreeIssue = this.alldata
      .filter(ItemWiseFreeIssue => (ItemWiseFreeIssue.itemMaster.id === this.myItem1))
      .pop();
    if (obj === undefined) {
      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: ItemWiseFreeIssue): boolean {
    let obj: ItemWiseFreeIssue = this.alldata
      .filter(ItemWiseFreeIssue => (ItemWiseFreeIssue.itemMaster.id === this.myItem1) && (ItemWiseFreeIssue.id != data.id))
      .pop();
    if (obj === undefined) {
      return true;
    } else {
      return false;
    }

  }


  AllItems() {

    let catWebServResponce: WebServResponce;
    this.itemMasterservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {

          this.allitems = <ItemMaster[]>catWebServResponce.result;
          this.allItemsOptions = [];
          this.allItemsOptions2 = [];
          this.allItemsOptions3 = [];
          this.allItemsOptions4 = [];

          for (let var1 of this.allitems) {

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
          this.allItemsOptions.push({ label: 'Please Select', value: null });
          this.allItemsOptions2.push({ label: 'Please Select', value: null });
          this.allItemsOptions3.push({ label: 'Please Select', value: null });
          this.allItemsOptions4.push({ label: 'Please Select', value: null });

          for (let var1 of this.allitems) {
            this.allItemsOptions.push({ label: var1.itemCode, value: var1.id });
            this.allItemsOptions2.push({ label: var1.itemCode, value: var1.id });
            this.allItemsOptions3.push({ label: var1.itemCode, value: var1.id });
            this.allItemsOptions4.push({ label: var1.itemCode, value: var1.id });

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
    this.mainCatagoryservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {

          this.allmaincatagories = <MainCatagory[]>catWebServResponce2.result;
          this.allMainCatagoryOptions = [];
          this.allMainCatagoryOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allmaincatagories) {
            this.allMainCatagoryOptions.push({ label: var1.mainCatagoryName, value: var1.id });
          }
        }
        else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce4: WebServResponce;
    this.subCatagoryservice.getAlldata()
      .subscribe(
      resObj => {
        catWebServResponce4 = resObj;
        if (catWebServResponce4.statusId == 200) {
          this.allSubCatagories = <SubCatagory[]>catWebServResponce4.result;
        }
        else {
          this.errorMessage = catWebServResponce4.errMessage;
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
        }
        else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

  }

  MainCatagoryChange(jv1) {

    let jv = parseInt(jv1);

    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedMainCatagory = jv;
      console.log("select catagory id 2 " + this.SelectedMainCatagory);
      this.ChangedMainSelection();
    }
    else {
      this.allItemsOptions = [];
      this.AllItems();
      this.ClearSubCatagory();
      this.ClearSubSubCatagory();

    }
  }

  SubCatagoryChange(jv1) {
    let jv = parseInt(jv1);
    if (jv != null) {
      console.log("select sub catagory id" + jv);
      this.SelectedSubCatagory = jv;
      console.log("select subcatagory id  " + this.SelectedSubCatagory);
      this.ChangedSubSelection();
    }
    else {
      console.log("not selected sub");
      this.ClearSubSubCatagory();
      this.allItemsOptions = [];
      this.AllItems();
    }
  }

  SubSubCatagoryChange(jv1) {
    let jv = parseInt(jv1);
    if (jv != null) {
      console.log("selected  sub sub catagory id" + jv);
      this.SelectedSubsubCatagory = jv;
      console.log("select subcatagory id  " + this.SelectedSubsubCatagory);
      this.ChangedSubSubSelection();
    }
    else {
      this.allItemsOptions = [];
      console.log("not selected");
      this.AllItems();
    }
  }
  ChangedMainSelection() {
    let obj: SubCatagory[] = this.allSubCatagories
      .filter(SubCatagory => SubCatagory.mainCatagory.id === this.SelectedMainCatagory)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubCatagories = obj;
      //  console.log('filtered branchers' +JSON.stringify(this.allFilteredSubCatagories));
      this.SetSubCatagories();

    }

  }
  ChangedSubSelection() {
    let obj: SubSubCatagory[] = this.allSubSubCatagories
      .filter(SubSubCatagory => SubSubCatagory.subCatagory.id === this.SelectedSubCatagory)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubSubCatagories = obj;
      // console.log('filtered branchers' +JSON.stringify(this.allFilteredSubSubCatagories));
      this.SetSubSubCatagories();

    }

  }
  ChangedSubSubSelection() {

    console.log('ok done');
    let obj: ItemMaster[] = this.allitems
      .filter(ItemMaster => ItemMaster.subSubCatagory.id === this.SelectedSubsubCatagory)

    if (obj === undefined) {
      console.log('obj if ' + JSON.stringify(obj));
      this.AllItems();
    } else {

      console.log('obj  else ' + JSON.stringify(obj));
      this.allFilterdItems = obj;
      this.allItemsOptions = [];
      this.allItemsOptions.push({ label: 'Please Select', value: null });
      for (let var1 of this.allFilterdItems) {
        this.allItemsOptions.push({ label: var1.itemCode, value: var1.id });
      }
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

  OptionChange(x) {


    if (x == 1) {
      console.log("changed " + x);
      this.CatagoryChange = true;
    }
    if (x == 0) {
      console.log("changed 2 " + x);

      this.CatagoryChange = false;

    }

  }

  OptionChange2(x) {
    if (x == 1) {
      console.log("changed " + x);
      this.CatagoryChange2 = true;
    }
    if (x == 0) {
      console.log("changed 2 " + x);

      this.CatagoryChange2 = false;

    }

  }

  OptionChange3(x) {
    if (x == 1) {
      console.log("changed " + x);
      this.CatagoryChange3 = true;
    }
    if (x == 0) {
      console.log("changed 2 " + x);

      this.CatagoryChange3 = false;

    }

  }
  OptionChange4(x) {
    if (x == 1) {
      console.log("changed " + x);
      this.CatagoryChange4 = true;
    }
    if (x == 0) {
      console.log("changed 2 " + x);

      this.CatagoryChange4 = false;

    }

  }
  MainCatagoryChange2(jv1) {
    let jv = parseInt(jv1);
    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedMainCatagory2 = jv;
      console.log("select catagory id 2 " + this.SelectedMainCatagory2);
      this.ChangedMainSelection2();
    }
    else {
      console.log("not selected");
      this.ClearSubCatagory2();
      this.ClearSubSubCatagory2();
      this.allItemsOptions = [];
      this.AllItems();
    }
  }

  SubCatagoryChange2(jv1) {
    let jv = parseInt(jv1);
    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedSubCatagory2 = jv;
      console.log("select subcatagory id 2 " + this.SelectedSubCatagory2);
      this.ChangedSubSelection2();
      this.allItemsOptions = [];
      this.AllItems();
    }
    else {
      console.log("not selected");
      this.ClearSubSubCatagory2();
      this.allItemsOptions = [];
      this.AllItems();
    }
  }

  SubSubCatagoryChange2(jv1) {
    let jv = parseInt(jv1);
    if (jv != null) {
      console.log("selected  sub sub catagory id" + jv);
      this.SelectedSubsubCatagory2 = jv;
      console.log("select subcatagory id  " + this.SelectedSubsubCatagory2);
      this.ChangedSubSubSelection2();
    }
    else {
      this.allItemsOptions = [];
      console.log("not selected");
      this.AllItems();
    }
  }
  ChangedMainSelection2() {
    let obj: SubCatagory[] = this.allSubCatagories
      .filter(SubCatagory => SubCatagory.mainCatagory.id === this.SelectedMainCatagory2)
    //.pop();
    if (obj === undefined) {
    } else {
      console.log('obj' + JSON.stringify(obj));
      this.allFilteredSubCatagories2 = obj;
      console.log('filtered ' + JSON.stringify(this.allFilteredSubCatagories2));
      this.SetSubCatagories2();

    }

  }
  ChangedSubSelection2() {
    let obj: SubSubCatagory[] = this.allSubSubCatagories
      .filter(SubSubCatagory => SubSubCatagory.subCatagory.id === this.SelectedSubCatagory2)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubSubCatagories2 = obj;
      // console.log('filtered branchers' +JSON.stringify(this.allFilteredSubSubCatagories));
      this.SetSubSubCatagories2();

    }

  }
  ChangedSubSubSelection2() {
    let obj: ItemMaster[] = this.allitems
      .filter(ItemMaster => ItemMaster.subSubCatagory.id === this.SelectedSubsubCatagory2)

    if (obj === undefined) {
      console.log('obj if ' + JSON.stringify(obj));
      this.AllItems();
    } else {

      console.log('obj  else ' + JSON.stringify(obj));
      this.allFilterdItems2 = obj;
      this.allItemsOptions2 = [];
      this.allItemsOptions2.push({ label: 'Please Select', value: null });
      for (let var1 of this.allFilterdItems2) {
        this.allItemsOptions2.push({ label: var1.itemCode, value: var1.id });
      }
    }

  }
  SetSubCatagories2() {

    this.allSubCatagoryOptions2 = [];
    this.allSubCatagoryOptions2.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubCatagories2) {

      this.allSubCatagoryOptions2.push({ label: var1.subCatagoryName, value: var1.id });
    }
  }
  SetSubSubCatagories2() {

    this.allSubSubCatagoryOptions2 = [];
    this.allSubSubCatagoryOptions2.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubSubCatagories2) {

      this.allSubSubCatagoryOptions2.push({ label: var1.subSubCatagoryName, value: var1.id });
    }
  }

  ClearSubCatagory2() {

    this.allFilteredSubCatagories2 = [];
    console.log("this.allFilteredSubCatagories" + this.allFilteredSubCatagories2);
    this.allSubCatagoryOptions2 = [];
    this.allSubCatagoryOptions2.push({ label: 'Please Select Main Catagory', value: null });
  }
  ClearSubSubCatagory2() {

    this.allFilteredSubSubCatagories2 = [];

    console.log("this.allFilteredSubCatagories" + this.allFilteredSubCatagories2);


    this.allSubSubCatagoryOptions2 = [];
    this.allSubSubCatagoryOptions2.push({ label: 'Please Select Sub Catagory', value: null });

    for (let var1 of this.allFilteredSubSubCatagories2) {

      this.allSubSubCatagoryOptions2.push({ label: var1.subSubCatagoryName, value: var1.id });
    }


  }












  MainCatagoryChange3(jv1) {
    let jv = parseInt(jv1);
    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedMainCatagory3 = jv;
      console.log("select catagory id  " + this.SelectedMainCatagory3);
      this.ChangedMainSelection3();
    }
    else {
      this.allItemsOptions3 = [];
      this.AllItems();
      this.ClearSubCatagory3();
      this.ClearSubSubCatagory3();

    }
  }

  SubCatagoryChange3(jv1) {
    let jv = parseInt(jv1);

    if (jv != null) {
      console.log("select sub catagory id" + jv);
      this.SelectedSubCatagory3 = jv;
      console.log("select subcatagory id  " + this.SelectedSubCatagory3);
      this.ChangedSubSelection3();
    }
    else {
      console.log("not selected sub");
      this.ClearSubSubCatagory3();
      this.allItemsOptions3 = [];
      this.AllItems();
    }
  }

  SubSubCatagoryChange3(jv1) {
    let jv = parseInt(jv1);

    if (jv != null) {
      console.log("selected  sub sub catagory id" + jv);
      this.SelectedSubsubCatagory3 = jv;
      console.log("select subcatagory id  " + this.SelectedSubsubCatagory3);
      this.ChangedSubSubSelection3();
    }
    else {
      this.allItemsOptions3 = [];
      console.log("not selected");
      this.AllItems();
    }
  }
  ChangedMainSelection3() {
    let obj: SubCatagory[] = this.allSubCatagories
      .filter(SubCatagory => SubCatagory.mainCatagory.id === this.SelectedMainCatagory3)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubCatagories3 = obj;
      //  console.log('filtered branchers' +JSON.stringify(this.allFilteredSubCatagories));
      this.SetSubCatagories3();

    }

  }
  ChangedSubSelection3() {
    let obj: SubSubCatagory[] = this.allSubSubCatagories
      .filter(SubSubCatagory => SubSubCatagory.subCatagory.id === this.SelectedSubCatagory3)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubSubCatagories3 = obj;
      // console.log('filtered branchers' +JSON.stringify(this.allFilteredSubSubCatagories));
      this.SetSubSubCatagories3();

    }

  }
  ChangedSubSubSelection3() {

    console.log('ok done');
    let obj: ItemMaster[] = this.allitems
      .filter(ItemMaster => ItemMaster.subSubCatagory.id === this.SelectedSubsubCatagory3)

    if (obj === undefined) {
      console.log('obj if ' + JSON.stringify(obj));
      this.AllItems();
    } else {

      console.log('obj  else ' + JSON.stringify(obj));
      this.allFilterdItems3 = obj;
      this.allItemsOptions3 = [];
      this.allItemsOptions3.push({ label: 'Please Select', value: null });
      for (let var1 of this.allFilterdItems3) {
        this.allItemsOptions3.push({ label: var1.itemCode, value: var1.id });
      }
    }

  }
  SetSubCatagories3() {

    this.allSubCatagoryOptions3 = [];
    this.allSubCatagoryOptions3.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubCatagories3) {

      this.allSubCatagoryOptions3.push({ label: var1.subCatagoryName, value: var1.id });
    }
  }
  SetSubSubCatagories3() {

    this.allSubSubCatagoryOptions3 = [];
    this.allSubSubCatagoryOptions3.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubSubCatagories3) {

      this.allSubSubCatagoryOptions3.push({ label: var1.subSubCatagoryName, value: var1.id });
    }
  }

  ClearSubCatagory3() {
    this.allFilteredSubCatagories3 = [];
    this.allSubCatagoryOptions3 = [];
    this.allSubCatagoryOptions3.push({ label: 'Please Select Main Catagory', value: null });
  }

  ClearSubSubCatagory3() {

    this.allFilteredSubSubCatagories3 = [];

    console.log("this.allFilteredSubCatagories" + this.allFilteredSubCatagories3);


    this.allSubSubCatagoryOptions3 = [];
    this.allSubSubCatagoryOptions3.push({ label: 'Please Select Sub Catagory', value: null });

    for (let var1 of this.allFilteredSubSubCatagories3) {

      this.allSubSubCatagoryOptions3.push({ label: var1.subSubCatagoryName, value: var1.id });
    }


  }





  getAllCatagoryWiseFreeIssue() {
    let webServResponce: WebServResponce;
    this.catagoryWiseFreeIssueservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata2 = <CatagoryWiseFreeIssue[]>webServResponce.result;
          this.myForm2.patchValue({ id: 0 });
          this.myForm2.patchValue({ manuchange3: 1 });

          for (let var1 of this.alldata2) {

            if (var1.mainCatagory != null) {
              var1.selectedCatagoryId = var1.mainCatagory.id;
            } else {
              var1.selectedCatagoryId = 0;
            }
            if (var1.itemMaster2 != null) {
              var1.freeIssueItemId = var1.itemMaster2.id;
            } else {
              var1.freeIssueItemId = 0;
            }
          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }

  getMaxCatagoryWise() {
    let webServResponce: WebServResponce;
    this.catagoryWiseFreeIssueservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData2 = <CatagoryWiseFreeIssue[]>webServResponce.result;
          //console.log(this.maxData[0].genaratedId);

          if (this.maxData2[0] == undefined) {

            this.genaratedId2 = null;

          } else {
            this.genaratedId2 = this.maxData2[0].genaratedId;
          }
          console.log('genarated id is ' + this.genaratedId2);
          this.genarateIdNormal2(this.genaratedId2);
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }

      ,
      error => this.errorMessage = <any>error
      );


  }


  addNew2() {
    this.AllItems();
    this.getAllCatagoryWiseFreeIssue();
    this.getMaxCatagoryWise();
    this.selected2 = new CatagoryWiseFreeIssue(0, '', null, null, '', null, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm2.reset();
    this.myForm2.patchValue({ id: 0 });
    this.getMaxCatagoryWise();
  }



  saveOrEdit2(data: CatagoryWiseFreeIssue) {
    console.log('enterd to the save option');


    let webServResponce: WebServResponce;
    this.saveEdit2 = new CatagoryWiseFreeIssue(

      data.id,
      data.genaratedId,
      data.itemQuantity,
      data.freeIssueQuantity,
      data.packSize,
      this.createdDate,
      this.createdby,
      data.selectedCatagoryId,
      data.freeIssueItemId
    );



    if (data.id == 0) {

      let b: boolean = this.AllreadyExistSave2(this.saveEdit2);
      if (b) {



        this.selected2 = data;
        console.log('curent date' + this.createdDate);

        this.catagoryWiseFreeIssueservice.savedata(this.saveEdit2)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              console.log('checkthis' + webServResponce.errDetail);
              this.addNew2();
              console.log('saved');
              this.openSnackBar('Success', 'Data Saved');
              this.getAllCatagoryWiseFreeIssue();
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );
      }
      else {

        this.openSnackBar('Worning', 'Data Already exist');
        this.addNew();
      }

    }
    else {

      let b: boolean = this.AllreadyExistUpdate2(this.saveEdit2);
      if (b) {

        console.log('got to update part');
        console.log('curent date' + this.createdDate);

        this.catagoryWiseFreeIssueservice.editdata(this.saveEdit2)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              console.log('checkthis' + webServResponce.errDetail);
              this.addNew2();
              console.log('updated');
              this.openSnackBar('Success', 'Data Edited');
              this.getAllCatagoryWiseFreeIssue();
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );

      }

      else {

        this.openSnackBar('Worning', 'Data Already exist');
        this.addNew2();
      }

    }



  }

  deleteById2(id: number) {
    let webServResponce: WebServResponce;
    this.catagoryWiseFreeIssueservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllCatagoryWiseFreeIssue();
          this.addNew2();
          this.openSnackBar('Success', 'Data Deleted');

          this.selected2 = new CatagoryWiseFreeIssue(0, '', null, null, '', null, '', null, null);
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }
  genarateIdNormal2(oldId: string) {
    //let year = (new Date()).getFullYear();
    let type = 'CFI'
    let id;
    let newId;
    // let genaratedId;

    if (oldId == null) {
      id = '000001';
      this.genaratedId2 = type + '-' + id;

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
      this.genaratedId2 = type + '-' + newId;
    }


    // this.newGenaratedId = genaratedId;
    console.log('next Id =' + this.genaratedId2);
    this.myForm2.patchValue({ genaratedId: this.genaratedId2 });

  }

  AllreadyExistSave2(data: CatagoryWiseFreeIssue): boolean {
    let obj: CatagoryWiseFreeIssue = this.alldata2
      .filter(CatagoryWiseFreeIssue => (CatagoryWiseFreeIssue.mainCatagory.id === this.mycat1))
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate2(data: CatagoryWiseFreeIssue): boolean {
    let obj: CatagoryWiseFreeIssue = this.alldata2
      .filter(CatagoryWiseFreeIssue => (CatagoryWiseFreeIssue.mainCatagory.id === this.mycat1) && (CatagoryWiseFreeIssue.id != data.id))
      .pop();
    if (obj === undefined) {
      return true;
    } else {
      return false;
    }

  }








  MainCatagoryChange4(jv1) {
    let jv = parseInt(jv1);


    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedMainCatagory4 = jv;
      console.log("select catagory id  " + this.SelectedMainCatagory4);
      this.ChangedMainSelection4();
    }
    else {
      this.allItemsOptions4 = [];
      this.AllItems();
      this.ClearSubCatagory4();
      this.ClearSubSubCatagory4();

    }
  }

  SubCatagoryChange4(jv1) {
    let jv = parseInt(jv1);

    if (jv != null) {
      console.log("select sub catagory id" + jv);
      this.SelectedSubCatagory4 = jv;
      console.log("select subcatagory id  " + this.SelectedSubCatagory4);
      this.ChangedSubSelection4();
    }
    else {
      console.log("not selected sub");
      this.ClearSubSubCatagory4();
      this.allItemsOptions4 = [];
      this.AllItems();
    }
  }

  SubSubCatagoryChange4(jv1) {
    let jv = parseInt(jv1);

    if (jv != null) {
      console.log("selected  sub sub catagory id" + jv);
      this.SelectedSubsubCatagory4 = jv;
      console.log("select subcatagory id  " + this.SelectedSubsubCatagory4);
      this.ChangedSubSubSelection4();
    }
    else {
      this.allItemsOptions4 = [];
      console.log("not selected");
      this.AllItems();
    }
  }
  ChangedMainSelection4() {
    let obj: SubCatagory[] = this.allSubCatagories
      .filter(SubCatagory => SubCatagory.mainCatagory.id === this.SelectedMainCatagory4)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubCatagories4 = obj;
      //  console.log('filtered branchers' +JSON.stringify(this.allFilteredSubCatagories));
      this.SetSubCatagories4();

    }

  }
  ChangedSubSelection4() {
    let obj: SubSubCatagory[] = this.allSubSubCatagories
      .filter(SubSubCatagory => SubSubCatagory.subCatagory.id === this.SelectedSubCatagory4)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' +JSON.stringify(obj));
      this.allFilteredSubSubCatagories4 = obj;
      // console.log('filtered branchers' +JSON.stringify(this.allFilteredSubSubCatagories));
      this.SetSubSubCatagories4();

    }

  }
  ChangedSubSubSelection4() {

    console.log('ok done');
    let obj: ItemMaster[] = this.allitems
      .filter(ItemMaster => ItemMaster.subSubCatagory.id === this.SelectedSubsubCatagory4)

    if (obj === undefined) {
      console.log('obj if ' + JSON.stringify(obj));
      this.AllItems();
    } else {

      console.log('obj  else ' + JSON.stringify(obj));
      this.allFilterdItems4 = obj;
      this.allItemsOptions4 = [];
      this.allItemsOptions4.push({ label: 'Please Select', value: null });
      for (let var1 of this.allFilterdItems4) {
        this.allItemsOptions4.push({ label: var1.itemCode, value: var1.id });
      }
    }

  }
  SetSubCatagories4() {

    this.allSubCatagoryOptions4 = [];
    this.allSubCatagoryOptions4.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubCatagories4) {

      this.allSubCatagoryOptions4.push({ label: var1.subCatagoryName, value: var1.id });
    }
  }
  SetSubSubCatagories4() {

    this.allSubSubCatagoryOptions4 = [];
    this.allSubSubCatagoryOptions4.push({ label: 'Please Select', value: null });

    for (let var1 of this.allFilteredSubSubCatagories4) {

      this.allSubSubCatagoryOptions4.push({ label: var1.subSubCatagoryName, value: var1.id });
    }
  }

  ClearSubCatagory4() {
    this.allFilteredSubCatagories4 = [];
    this.allSubCatagoryOptions4 = [];
    this.allSubCatagoryOptions4.push({ label: 'Please Select Main Catagory', value: null });
  }

  ClearSubSubCatagory4() {

    this.allFilteredSubSubCatagories4 = [];

    console.log("this.allFilteredSubCatagories" + this.allFilteredSubCatagories3);


    this.allSubSubCatagoryOptions4 = [];
    this.allSubSubCatagoryOptions4.push({ label: 'Please Select Sub Catagory', value: null });

    for (let var1 of this.allFilteredSubSubCatagories4) {

      this.allSubSubCatagoryOptions4.push({ label: var1.subSubCatagoryName, value: var1.id });
    }


  }


  getAllVolumeWiseFreeIssue() {
    let webServResponce: WebServResponce;
    this.volumeWiseFreeIssueservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata3 = <VolumeWiseFreeIssue[]>webServResponce.result;
          this.myForm3.patchValue({ id: 0 });
          this.myForm3.patchValue({ manuchange4: 1 });

          for (let var1 of this.alldata3) {

            if (var1.mainCatagory != null) {
              var1.selectedCatagoryId = var1.mainCatagory.id;
            } else {
              var1.selectedCatagoryId = 0;
            }
            if (var1.itemMaster2 != null) {
              var1.freeIssueItemId = var1.itemMaster2.id;
            } else {
              var1.freeIssueItemId = 0;
            }
          }

        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }

  getMaxVolumeWise() {
    let webServResponce: WebServResponce;
    this.volumeWiseFreeIssueservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData3 = <VolumeWiseFreeIssue[]>webServResponce.result;
          //console.log(this.maxData[0].genaratedId);

          if (this.maxData3[0] == undefined) {

            this.genaratedId3 = null;

          } else {
            this.genaratedId2 = this.maxData3[0].genaratedId;
          }
          console.log('genarated id is ' + this.genaratedId3);
          this.genarateIdNormal3(this.genaratedId3);
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }

      ,
      error => this.errorMessage = <any>error
      );


  }


  addNew3() {

    this.getAllVolumeWiseFreeIssue();
    this.getMaxVolumeWise();
    this.AllItems();
    this.selected3 = new VolumeWiseFreeIssue(0, '', null, null, '', null, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm3.reset();
    this.myForm3.patchValue({ id: 0 });
    this.getMaxVolumeWise();
  }



  saveOrEdit3(data: VolumeWiseFreeIssue) {
    console.log('enterd to the save option');


    let webServResponce: WebServResponce;
    this.saveEdit3 = new VolumeWiseFreeIssue(

      data.id,
      data.genaratedId,
      data.volume,
      data.freeIssueQuantity,
      data.volumeType,
      this.createdDate,
      this.createdby,
      data.selectedCatagoryId,
      data.freeIssueItemId
    );



    if (data.id == 0) {

      let b: boolean = this.AllreadyExistSave3(this.saveEdit3);
      if (b) {



        this.selected3 = data;
        console.log('curent date' + this.createdDate);

        this.volumeWiseFreeIssueservice.savedata(this.saveEdit3)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              console.log('checkthis' + webServResponce.errDetail);
              this.addNew3();
              console.log('saved');
              this.openSnackBar('Success', 'Data Saved');
              this.getAllVolumeWiseFreeIssue();
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );
      }
      else {

        this.openSnackBar('Worning', 'Data Already exist');
        this.addNew();
      }

    }
    else {

      let b: boolean = this.AllreadyExistUpdate3(this.saveEdit3);
      if (b) {

        console.log('got to update part');
        console.log('curent date' + this.createdDate);

        this.volumeWiseFreeIssueservice.editdata(this.saveEdit3)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {
              console.log('checkthis' + webServResponce.errDetail);
              this.addNew2();
              console.log('updated');
              this.openSnackBar('Success', 'Data Edited');
              this.getAllVolumeWiseFreeIssue();
            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error

          );

      }

      else {

        this.openSnackBar('Worning', 'Data Already exist');
        this.addNew3();
      }

    }



  }

  deleteById3(id: number) {
    let webServResponce: WebServResponce;
    this.volumeWiseFreeIssueservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAllVolumeWiseFreeIssue();
          this.addNew3();
          this.openSnackBar('Success', 'Data Deleted');

          this.selected3 = new VolumeWiseFreeIssue(0, '', null, null, '', null, '', null, null);
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }
  genarateIdNormal3(oldId: string) {
    //let year = (new Date()).getFullYear();
    let type = 'VFI'
    let id;
    let newId;
    // let genaratedId;

    if (oldId == null) {
      id = '000001';
      this.genaratedId3 = type + '-' + id;

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
      this.genaratedId3 = type + '-' + newId;
    }


    // this.newGenaratedId = genaratedId;
    console.log('next Id =' + this.genaratedId3);
    this.myForm3.patchValue({ genaratedId: this.genaratedId3 });
    this.myForm3.patchValue({ manuchange4: 1 });



  }

  AllreadyExistSave3(data: VolumeWiseFreeIssue): boolean {
    let obj: VolumeWiseFreeIssue = this.alldata3
      .filter(VolumeWiseFreeIssue => (VolumeWiseFreeIssue.mainCatagory.id === this.mycat2))
      .pop();
    if (obj === undefined) {
      return true;
    } else {


      return false;
    }

  }
  AllreadyExistUpdate3(data: VolumeWiseFreeIssue): boolean {
    let obj: VolumeWiseFreeIssue = this.alldata3
      .filter(VolumeWiseFreeIssue => (VolumeWiseFreeIssue.mainCatagory.id ===this.mycat2) && (VolumeWiseFreeIssue.id != data.id))
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

  OptionChange1(x) {
    console.log('hariii ' + x);

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
    var col = ["Free Issue Id ID", "Choosed Item", "Choosed Qty", "Free Issue Item", "Free Issue Qty"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].itemMaster.itemCode, this.alldata[j].itemQuantity, this.alldata[j].itemMaster2.itemCode, this.alldata[j].freeIssueQuantity];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'Item Wise Free Issues');

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
    doc.save('ItemWiseFreeIssue.pdf');

    this.openSnackBar('Success', 'Print Created');



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
    var col = ["Free Issue Id ID", "Choosed Catagory", "Choosed Qty", "Free Issue Item", "Free Issue Qty"];
    var rows = [];
    for (let j = 0; j < this.alldata2.length; j++) {

      var temp = [this.alldata2[j].genaratedId, this.alldata2[j].itemMaster2.mainCatagory.mainCatagoryName, this.alldata2[j].itemQuantity, this.alldata2[j].itemMaster2.itemCode, this.alldata2[j].freeIssueQuantity];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(145, 20, 'Catagory Wise Free Issues');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);


    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(11);
    doc.text(145, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(145, 45, 'Created By   :  ' + this.createdby);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('CatagoryWiseFreeIssue.pdf');

    this.openSnackBar('Success', 'Print Created');



  }

  convert3() {

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
    var col = ["Free Issue Id ID", "Choosed Catagory", "Volume", "Free Issue Item", "Free Issue Qty"];
    var rows = [];
    for (let j = 0; j < this.alldata3.length; j++) {

      var temp = [this.alldata3[j].genaratedId, this.alldata3[j].itemMaster2.mainCatagory.mainCatagoryName, this.alldata3[j].volume, this.alldata3[j].itemMaster2.itemCode, this.alldata3[j].freeIssueQuantity];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(145, 20, 'Volume Wise Free Issues');

    doc.setFontType("normal");
    doc.setFontSize(11);
    doc.text(16, 35, addressLine1 + addressLine2 + addressLine3 + addressLine4);
    doc.text(16, 42, 'Tel:' + telephone);
    doc.text(16, 49, 'Fax:' + fax + ',' + 'Email:' + email);


    doc.setFontType("normal");
    doc.setFontType("bold");

    doc.setFontSize(11);
    doc.text(145, 35, 'Created Date :  ' + this.createdDate2);
    doc.text(145, 45, 'Created By   :  ' + this.createdby);

    doc.autoTable(col, rows,
      {
        startY: 70
      }
    );
    doc.save('VolumeWiseFreeIssue.pdf');

    this.openSnackBar('Success', 'Print Created');



  }

  SetCombo(x, y, z) {
    this.selectedItemy = parseInt(y);
    var num = new Number(y);
    let ystring = num.toString();
    this.selectedItemId1 = ystring;

    var num2 = new Number(z);
    let zstring = num2.toString();
    this.freeIssueItemId1 = zstring;

  }
  SetCombo2(x, y, z) {


    var num = new Number(y);
    let ystring = num.toString();
    this.selectedCatagoryId1 = ystring;

    var num2 = new Number(z);
    let zstring = num2.toString();
    this.freeIssueItemId2 = zstring;

  }

  SetCombo3(x, y, z) {


    var num = new Number(y);
    let ystring = num.toString();
    this.selectedCatagoryId3 = ystring;

    var num2 = new Number(z);
    let zstring = num2.toString();
    this.freeIssueItemId3 = zstring;

  }


  getItem(y) {
    console.log(' citemm1111111 ');
    this.myItem1 = parseInt(y);
    console.log(' customertrtr ' + this.myItem1);

  }

  getCatagory1(y) {

    console.log(' cat111 ');
    this.mycat1 = parseInt(y);
    console.log(' customertrtr ' + this.mycat1);

  }
  getCatagory2(y) {

    console.log(' cat111 ');
    this.mycat2 = parseInt(y);
    console.log(' customertrtr ' + this.mycat2);

  }
}
