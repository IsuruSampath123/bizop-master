import { Component, OnInit } from '@angular/core';
import { AssignCustomer } from "../../../domain/AssignCustomers";
import { SalesRepItem } from "../../../domain/SalesRepItems";
import { WebServResponce } from "../../../domain/WebServResponce";
import { Observable } from "rxjs/Rx";
import { TemporySalesRepData } from "../../../domain/TemparySalesrep";
import { CustomerSpecificPrice } from "../../../domain/CustomerSpecificPrice";
import { ItemMaster } from "../../../domain/ItemMaster";
import { ManageSaleRep } from "../../../domain/ManageSalesRep";
import { SubSubCatagory } from "../../../domain/SubSubCatagory";
import { SubCatagory } from "../../../domain/SubCatagory";
import { MainCatagory } from "../../../domain/mainCatagory";
import { RegisterRep } from "../../../domain/RepRegister";
import { SelectItem } from "primeng/primeng";
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ManageSaleRepservice } from "../../../service/ManageSalesRep.service";
import { RegisterRepservice } from "../../../service/RepRegister.service";
import { ItemMasterservice } from "../../../service/ItemMaster.service";
import { MainCatagoryservice } from "../../../service/maincatagory.service";
import { SubCatagoryservice } from "../../../service/SubCatagory.service";
import { SubSubCatagoryservice } from "../../../service/subSubCatagory.service";
import { SalesRepItemservice } from "../../../service/SalesRepItems.service";
import { AssignCustomerservice } from "../../../service/assignCustomer.service";
import { CustomerSpecificPriceService } from "../../../service/customerSpecificPrice.service";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Customer } from "../../../domain/Customer";
import { CustomerService } from "../../../service/customer.service";
import { Companyservice } from "../../../service/Company.service";
import { Company } from "../../../domain/Company";
declare let jsPDF;



@Component({
  selector: 'app-SalesRep',
  templateUrl: './SalesRep.component.html',
  styleUrls: ['./SalesRep.component.css']
})
export class SalesRepComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  constructor(private formBuilder: FormBuilder, private manageSaleRepservice: ManageSaleRepservice
    , private registerRepservice: RegisterRepservice, private itemMasterservice: ItemMasterservice,
    private mainCatagoryservice: MainCatagoryservice, private subCatagoryservice: SubCatagoryservice,
    private subSubCatagoryservice: SubSubCatagoryservice,
    private salesRepItemservice: SalesRepItemservice, private assignCustomerservice: AssignCustomerservice, private customerSpecificPriceService: CustomerSpecificPriceService
    , public snackBar: MatSnackBar,
     private customerService: CustomerService, private companyservice: Companyservice
  ) { }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm2 = this.formBuilder.group({
      id: new FormControl(''),
      itemMasterId: new FormControl(''),
      itemQuantity: ['', Validators.pattern('[0-9.]{1,12}')],
      salesRepCode: new FormControl(''),
      price: new FormControl(''),
    });

    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      month: new FormControl('', Validators.required),
      budget: new FormControl('', Validators.required),
      repId: new FormControl('', Validators.required),
      itemMasterId: new FormControl(''),
      customerId: new FormControl(''),
      quantity: ['', Validators.pattern('[0-9.]{1,12}')],
      totalPrice: new FormControl(''),
      mainCatagoryId: new FormControl(''),
      subCatagoryId: new FormControl(''),
      subSubCatagoryId: new FormControl(''),
      'manuchange': ['', Validators.required]
    });
  }
  allRep: RegisterRep[];
  allAssignCustomer: AssignCustomer[];
  allCUstomerSpecificPrice: CustomerSpecificPrice[];
  allitems: ItemMaster[];
  allsalesrepitems: SalesRepItem[];
  // allsalesrep: sales
  allFilteredRepItems: SalesRepItem[];
  allmaincatagories: MainCatagory[];
  allitems2: ItemMaster[];
  allcompany: Company[];

  allSubCatagories: SubCatagory[];
  allSubSubCatagories: SubSubCatagory[];
  allFilteredSubCatagories: SubCatagory[];
  allFilteredSubSubCatagories: SubSubCatagory[];
  allFilterdItems: ItemMaster[];
  allfilterdCustomers: Customer[];


  clearSubCatagory: SubSubCatagory[];
  tepmorySalesRepData: TemporySalesRepData[] = [];
  errorMessage: string;
  successMessage: string;
  saveEdit: ManageSaleRep;
  saveEdit2: SalesRepItem;
  alldata: ManageSaleRep[];
  allfilterddata: ManageSaleRep[];
  maxData: ManageSaleRep[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdby = "Adnin";
  genaratedId: string;
  selected: ManageSaleRep = new ManageSaleRep(0, '', '', null, null, '', null);
  selected2: SalesRepItem = new SalesRepItem(0, '', null, null, null, null, '');
  allImonthsOptions: SelectItem[] = [];
  allRepOptions: SelectItem[] = [];
  allItemsOptions: SelectItem[] = [];
  allItemsOptions2: SelectItem[] = [];

  allMainCatagoryOptions: SelectItem[] = [];
  allSubCatagoryOptions: SelectItem[] = [];
  allSubSubCatagoryOptions: SelectItem[] = [];
  allSalesRepCodes: SelectItem[] = [];
  SelectedMainCatagory: number;
  SelectedSubCatagory: number;
  SelectedSubsubCatagory: number;
  autoIncrement = 0;

  addData: TemporySalesRepData;
  total = 0;
  selectedSalesRep;
  salesRepitemsChange = false;
  salesRepCodes;
  CatagoryChange = true;
  selectedCustomerid;
  repRelatedCustomers: SelectItem[] = [];

  getRelatedItems() {
    let catWebServResponce6: WebServResponce;
    this.salesRepItemservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce6 = resObj;
        if (catWebServResponce6.statusId == 200) {
          this.allsalesrepitems = <SalesRepItem[]>catWebServResponce6.result;
          console.log('data loaded');

          for (let var1 of this.allsalesrepitems) {
            if (var1.itemMaster != null) {
              var1.itemMasterId = var1.itemMaster.id;
            } else {
              var1.itemMasterId = 0;
            }

          }
        }
        else {
          this.errorMessage = catWebServResponce6.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce2: WebServResponce;
    this.itemMasterservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce2 = resObj;
        if (catWebServResponce2.statusId == 200) {

          this.allitems2 = <ItemMaster[]>catWebServResponce2.result;
          this.allItemsOptions2 = [];
          this.allItemsOptions2.push({ label: 'Please Select', value: null });
          for (let var1 of this.allitems2) {
            this.allItemsOptions2.push({ label: var1.itemCode, value: var1.id });
          }
        }
        else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


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
    this.manageSaleRepservice.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <ManageSaleRep[]>webServResponce.result;
          this.allImonthsOptions.push({ label: 'Select Month', value: null });
          this.allImonthsOptions.push({ label: 'January', value: 'January' });
          this.allImonthsOptions.push({ label: 'February', value: 'February' });
          this.allImonthsOptions.push({ label: 'March', value: 'March' });
          this.allImonthsOptions.push({ label: 'April', value: 'April' });
          this.allImonthsOptions.push({ label: 'May', value: 'May' });
          this.allImonthsOptions.push({ label: 'June', value: 'June' });
          this.allImonthsOptions.push({ label: 'July', value: 'July' });
          this.allImonthsOptions.push({ label: 'August', value: 'August' });
          this.allImonthsOptions.push({ label: 'September', value: 'September' });
          this.allImonthsOptions.push({ label: 'Octomber', value: 'Octomber' });
          this.allImonthsOptions.push({ label: 'November', value: 'November' });
          this.allImonthsOptions.push({ label: 'December', value: 'December' });
          this.myForm.patchValue({ id: 0 });

          for (let var1 of this.alldata) {
            if (var1.registerRep != null) {
              var1.repId = var1.registerRep.id;
            } else {
              var1.repId = 0;
            }
          }
          this.myForm.patchValue({ manuchange: 1 });
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    let catWebServResponce: WebServResponce;
    this.registerRepservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {

          this.allRep = <RegisterRep[]>catWebServResponce.result;
          this.allRepOptions = [];
          this.allRepOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allRep) {
            this.allRepOptions.push({ label: var1.repName, value: var1.id });
          }
        }
        else {
          this.errorMessage = catWebServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );

    this.AllItems();
    this.getRelatedItems();

    let catWebServResponce3: WebServResponce;
    this.assignCustomerservice.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce3 = resObj;
        if (catWebServResponce3.statusId == 200) {

          this.allAssignCustomer = <AssignCustomer[]>catWebServResponce3.result;
        }
        else {
          this.errorMessage = catWebServResponce3.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );


 let catWebServResponce31: WebServResponce;
    this.customerService.getAllData()

      .subscribe(
      resObj => {
        catWebServResponce31 = resObj;
        if (catWebServResponce31.statusId == 200) {

          this.allfilterdCustomers = <Customer[]>catWebServResponce31.result;
        }
        else {
          this.errorMessage = catWebServResponce31.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );




    let catWebServResponce9: WebServResponce;
    this.customerSpecificPriceService.getAlldata()

      .subscribe(
      resObj => {
        catWebServResponce9 = resObj;
        if (catWebServResponce9.statusId == 200) {

          this.allCUstomerSpecificPrice = <CustomerSpecificPrice[]>catWebServResponce9.result;
        }
        else {
          this.errorMessage = catWebServResponce9.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );




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
          for (let var1 of this.allitems) {
            this.allItemsOptions.push({ label: var1.itemCode, value: var1.id });
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

  MainCatagoryChange(jv) {

    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedMainCatagory = jv;
      console.log("select catagory id 2 " + this.SelectedMainCatagory);
      this.ChangedMainSelection();
    }
    else {
      console.log("not selected");
      this.ClearSubCatagory();
      this.ClearSubSubCatagory();
    }
  }
  SubCatagoryChange(jv) {

    if (jv != null) {
      console.log("select catagory id" + jv);
      this.SelectedSubCatagory = jv;
      console.log("select subcatagory id 2 " + this.SelectedSubCatagory);
      this.ChangedSubSelection();
    }
    else {
      console.log("not selected");
      this.ClearSubSubCatagory();
    }
  }

  SubSubCatagoryChange(jv) {

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
      // console.log('obj' + Json.stringify(obj));
      this.allFilteredSubCatagories = obj;
      // console.log('filtered branchers' + Json.stringify(this.allFilteredSubCatagories));
      this.SetSubCatagories();

    }

  }
  ChangedSubSelection() {
    let obj: SubSubCatagory[] = this.allSubSubCatagories
      .filter(SubSubCatagory => SubSubCatagory.subCatagory.id === this.SelectedSubCatagory)
    //.pop();
    if (obj === undefined) {
    } else {
      // console.log('obj' + Json.stringify(obj));
      this.allFilteredSubSubCatagories = obj;
      // console.log('filtered branchers' + Json.stringify(this.allFilteredSubSubCatagories));
      this.SetSubSubCatagories();

    }

  }
  ChangedSubSubSelection() {
    let obj: ItemMaster[] = this.allitems
      .filter(ItemMaster => ItemMaster.subSubCatagory.id === this.SelectedSubsubCatagory)

    if (obj === undefined) {

      this.AllItems();
    } else {


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

  getMax() {
    let webServResponce: WebServResponce;
    this.manageSaleRepservice.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <ManageSaleRep[]>webServResponce.result;
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

    this.selected = new ManageSaleRep(0, '', '', null, null, '', null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.salesRepitemsChange = true;
    this.getMax();
    this.myForm.patchValue({ manuchange: 1 });

  }

  addNew3() {

    this.selected2 = new SalesRepItem(0, '', null, null, null, null, '');
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm2.reset();
    this.myForm2.patchValue({ id: 0 });
    this.salesRepitemsChange = false;
  }
  saveOrEdit(data: ManageSaleRep) {

    let webServResponce: WebServResponce;
    this.saveEdit = new ManageSaleRep(

      data.id,
      data.genaratedId,
      data.month,
      data.budget,
      this.createdDate,
      this.createdby,
      data.repId
    );

    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.manageSaleRepservice.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {

              console.log('checkthis' + webServResponce.errDetail);
              this.getAll();
              this.addNew();
              console.log('saved');
              this.openSnackBar('Success', 'Data Saved1');
              this.SaveSalesRepItems();
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

      let b: boolean = this.AllreadyExistUpdate(this.saveEdit);
      if (b) {


        console.log("update");
        this.manageSaleRepservice.editdata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {


              console.log('updated');
              this.getAll();
              this.addNew();
              this.SaveSalesRepItems();
              this.openSnackBar('Success', 'Data Updated2');

            } else {
              this.errorMessage = webServResponce.errMessage;
            }
          }
          ,
          error => this.errorMessage = <any>error
          );


      }
      else {
        this.openSnackBar('Worning', 'You Enterd Data Already exist');
        this.addNew();

      }
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.manageSaleRepservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new ManageSaleRep(0, '', '', null, null, '', null);
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
    let type = 'MSR'
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

  AllreadyExistSave(data: ManageSaleRep): boolean {
    let obj: ManageSaleRep = this.alldata
      .filter(ManageSaleRep => ManageSaleRep.month.toLowerCase() === data.month.toLowerCase() && ManageSaleRep.repId === data.repId)
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: ManageSaleRep): boolean {

    let obj: ManageSaleRep = this.alldata
      .filter(ManageSaleRep => ManageSaleRep.month.toLowerCase() === data.month.toLowerCase() && ManageSaleRep.id != data.id)
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }


  PushToArray(x, y) {
    let discount;
    let selectedItemPrice1;
    let selectedItemPrice;
    let itemName;
    let obj: ItemMaster[] = this.allitems
      .filter(ItemMaster => ItemMaster.id === x)
    if (obj === undefined) {
    } else {

      if (this.selectedCustomerid == null) {
        //  console.log(Json.stringify(obj));
        selectedItemPrice1 = obj[0].creditPrice;
        itemName = obj[0].itemCode;
        discount = obj[0].discount;
        if (discount != 0 || discount != null || discount != '') {
          selectedItemPrice = selectedItemPrice1 - (selectedItemPrice1 * (discount / 100));
        }
        else {
          selectedItemPrice = selectedItemPrice1;
        }
      }
      else {

        let obj1: CustomerSpecificPrice[] = this.allCUstomerSpecificPrice
          .filter(CustomerSpecificPrice => (CustomerSpecificPrice.customer.id === this.selectedCustomerid) && (CustomerSpecificPrice.itemMaster.id === x))
        if (obj1 === undefined) {
        } else {

          if (obj1.length == 0) {

            console.log('empty data');

            selectedItemPrice1 = obj[0].creditPrice;
            itemName = obj[0].itemCode;
            discount = obj[0].discount;
            if (discount != 0 || discount == null || discount === '') {
              selectedItemPrice = selectedItemPrice1 - (selectedItemPrice1 * (discount / 100));
            }
            else {
              selectedItemPrice = selectedItemPrice1;
            }


          }
          else {
            console.log('data available');

            let specialp;
            let spedis;

            if (obj1[0].specialDiscount == 0) {
              specialp = obj1[0].specialPrice;

              selectedItemPrice = specialp;

            }
            else {
              spedis = obj1[0].specialDiscount;

              console.log('special discount not 0 ' + spedis);
              selectedItemPrice = obj[0].creditPrice - (obj[0].creditPrice * (spedis / 100));
            }

          }


        }



      }

    }
    let customerId;
    let customerName;
    let obj3: CustomerSpecificPrice[] = this.allCUstomerSpecificPrice
      .filter(CustomerSpecificPrice => (CustomerSpecificPrice.customer.id === this.selectedCustomerid))
    if (obj3 === undefined) {
    } else {

      if (obj3.length == 0) {
        customerId = 0;
        customerName = 'none';
      }
      else {

        customerId = obj3[0].customer.id;
        customerName = obj3[0].customer.customerName;
      }

    }



    let price = selectedItemPrice * y;
    this.autoIncrement = this.autoIncrement + 1;
    this.addData = new TemporySalesRepData(this.autoIncrement, obj[0].itemCode, x, y, price, customerId, customerName)
    this.tepmorySalesRepData.push(this.addData);

    for (let i = 0; i < this.tepmorySalesRepData.length; i++) {
      this.total = this.total + this.tepmorySalesRepData[i].price;
    }

    console.log('total budget' + this.total);
    this.myForm.patchValue({ budget: this.total });
    this.total = 0;
  }

  deleteDataFromList(data: TemporySalesRepData) {

    let index = this.tepmorySalesRepData.indexOf(data);
    if (index > -1) {
      this.tepmorySalesRepData.splice(index, 1);
      for (let i = 0; i < this.tepmorySalesRepData.length; i++) {
        this.total = this.total + this.tepmorySalesRepData[i].price;
      }

      console.log('total budget' + this.total);
      this.myForm.patchValue({ budget: this.total });
      this.total = 0;

    }
  }
  AstimateBudgetChange(x) {
    this.myForm.patchValue({ budget: x });
  }

  SaveSalesRepItems() {
    console.log('saved array first');

    for (let i = 0; i < this.tepmorySalesRepData.length; i++) {

      let webServResponce: WebServResponce;
      this.saveEdit2 = new SalesRepItem(0, this.genaratedId, this.tepmorySalesRepData[i].quantity, this.tepmorySalesRepData[i].price, this.tepmorySalesRepData[i].itemid, this.tepmorySalesRepData[i].customerId, this.tepmorySalesRepData[i].customerName);
      console.log('save ');
      // this.selectedItemsQualityParameter = data;
      this.salesRepItemservice.savedata(this.saveEdit2)
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

    let combinemessage = this.total + ' Items Saved !!';
    this.openSnackBar('Success', combinemessage);
    console.log('total is ' + combinemessage);
    this.tepmorySalesRepData = [];
    this.getAll();
  }

  GenIdChange(x) {

    this.selectedSalesRep = x;
    Observable.interval(500).subscribe(x => {
      this.SetValueToRepItem();
      //this.salesRepCodes = x;
      //console.log('id is '+x);
    })

  }
  SetValueToRepItem() {
    let obj: SalesRepItem[] = this.allsalesrepitems
      .filter(SalesRepItem => SalesRepItem.salesRepCode === this.selectedSalesRep)
    if (obj === undefined) {

    } else {
      //console.log('data is '+Json.stringify(obj))
      this.allFilteredRepItems = obj;
    }


  }

  IdChange(x) {
    console.log('hellow ' + x);
    let y = 0;
    y = x + y;
    console.log('value is  ' + y);
    if (y == 0) {
      console.log('not selected');
      this.salesRepitemsChange = true;
    }
    else {
      console.log(' selected');
      this.salesRepitemsChange = false;
    }

  }

  deleteSalerepItems(id: number) {
    let webServResponce: WebServResponce;
    this.salesRepItemservice.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getRelatedItems();
          this.addNew3();
          this.openSnackBar('Success', 'Data Deleted2');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }

  SaveOrEdit2(data: SalesRepItem) {
    console.log('saved array first');
    let webServResponce: WebServResponce;
    this.saveEdit2 = new SalesRepItem(data.id, this.selectedSalesRep, data.itemQuantity, data.price, data.itemMasterId, data.customerId, '');
    console.log('save ');
    // this.selectedItemsQualityParameter = data;
    this.salesRepItemservice.editdata(this.saveEdit2)
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {

          console.log('checkthis' + webServResponce.errDetail);
          this.getRelatedItems();
          console.log('saved');
          this.openSnackBar('Success', 'Data Updated333');
          this.addNew3();
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error

      );

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

  selectedRepsCustomers(jv) {

    //console.log('here is the selected rep customer'+jv);
   /* if (jv == null) {
      //console.log('null'+jv);
      this.repRelatedCustomers = [];
      this.repRelatedCustomers.push({ label: 'none', value: null });

    }
    else {
      //console.log('not null'+jv);
      let obj: Customer[] = this.allfilterdCustomers
        .filter(Customer => Customer. === jv)
      if (obj === undefined) {

      } else {
        this.repRelatedCustomers = [];
        //console.log('data is '+Json.stringify(obj))
        this.repRelatedCustomers.push({ label: 'none', value: null });
        for (let var1 of this.allAssignCustomer) {
          this.repRelatedCustomers.push({ label: var1.customer.customerName, value: var1.customer.id });
        }
      }
    }
*/


  }
  selectedCustomer(jv) {
    this.selectedCustomerid = jv;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
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
    var col = ["Rep ID", "Rep Name", "Month", "Budget"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].registerRep.repName,
        this.alldata[j].month, this.alldata[j].budget
    
       ];
      rows.push(temp);
    }


   doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'All Sales Rep Budgets');

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







