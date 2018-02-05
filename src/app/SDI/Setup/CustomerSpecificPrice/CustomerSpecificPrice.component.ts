import { Component, OnInit } from '@angular/core';
import { CustomerSpecificPrice } from "../../../domain/CustomerSpecificPrice";
import { WebServResponce } from "../../../domain/WebServResponce";
import { ItemMaster } from "../../../domain/ItemMaster";
import { Customer } from "../../../domain/Customer";
import { SelectItem } from "primeng/primeng";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { DataTableModule } from 'primeng/datatable';
import { FormGroup, FormControl, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from "../../../service/customer.service";
import { ItemMasterservice } from "../../../service/ItemMaster.service";
import { CustomerSpecificPriceService } from "../../../service/customerSpecificPrice.service";
import { Companyservice } from "../../../service/Company.service";
import { Company } from "../../../domain/Company";
declare let jsPDF;


@Component({
  selector: 'app-CustomerSpecificPrice',
  templateUrl: './CustomerSpecificPrice.component.html',
  styleUrls: ['./CustomerSpecificPrice.component.css']
})
export class CustomerSpecificPriceComponent implements OnInit {


  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService,
    private itemMasterservice: ItemMasterservice, private customerSpecificPriceService: CustomerSpecificPriceService, public snackBar: MatSnackBar, private companyservice: Companyservice

  ) {
  }

  ngOnInit() {
    this.getAll();
    this.getMax();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({
      id: new FormControl(''),
      genaratedId: new FormControl(''),
      specialPrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      specialDiscount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9.]{1,12}'), Validators.maxLength(50)])),
      creditDays: new FormControl('', Validators.pattern('[0-9.]{1,12}')),
      cash: new FormControl('', Validators.pattern('[0-9.]{1,12}')),
      customerId: new FormControl('', Validators.required),
      itemMasterId: new FormControl('', Validators.required),
      manuchange: new FormControl('')
    });
  }
  allCustomers: Customer[];

  allItems: ItemMaster[];
  mycustomer: number = 0;
  myItem: number = 0;
  customerId1;
  itemMasterId1;
  errorMessage: string;
  successMessage: string;

  saveEdit: CustomerSpecificPrice;
  alldata: CustomerSpecificPrice[];
  maxData: CustomerSpecificPrice[];
  mode = 'Observable';
  public events: any[] = [];
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  allcompany: Company[];
  createdby = "Admin";
  genaratedId: string;
  selected: CustomerSpecificPrice = new CustomerSpecificPrice(0, '', null, null, null, null, null, '', null, null);
  allCustomerOptions: SelectItem[] = [];
  allItemsOptions: SelectItem[] = [];
  price: boolean = true;
  discount: boolean = true;
  SelectedspecificPrice;

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
    this.CompanyData();
    let webServResponce: WebServResponce;
    this.customerSpecificPriceService.getAlldata()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.alldata = <CustomerSpecificPrice[]>webServResponce.result;
          this.myForm.patchValue({ manuchange: 1 });
          // this.myForm.patchValue({ specialDiscount: 0 });   
          for (let var1 of this.alldata) {
            if (var1.customer != null) {
              var1.customerId = var1.customer.id;
            }
            else {
              var1.customerId = 0;
            }
            if (var1.itemMaster != null) {
              var1.itemMasterId = var1.itemMaster.id;
            }
            else {
              var1.itemMasterId = 0;
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
    this.customerService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allCustomers = <Customer[]>catWebServResponce.result;
          this.allCustomerOptions = [];

          this.allCustomerOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allCustomers) {
            this.allCustomerOptions.push({ label: var1.customerName, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
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
          this.allItems = <ItemMaster[]>catWebServResponce2.result;
          this.allItemsOptions = [];

          this.allItemsOptions.push({ label: 'Please Select', value: null });
          for (let var1 of this.allItems) {
            this.allItemsOptions.push({ label: var1.itemCode, value: var1.id });
          }
        } else {
          this.errorMessage = catWebServResponce2.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
      );
  }
  getMax() {
    let webServResponce: WebServResponce;
    this.customerSpecificPriceService.getMax()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <CustomerSpecificPrice[]>webServResponce.result;
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

    this.selected = new CustomerSpecificPrice(0, '', null, null, null, null, null, '', null, null);
    //this.myForm.setValue({id:0,genaratedId:"",itemType:""});
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.myForm.patchValue({ manuchange: 1 });

    //  this.myForm.patchValue({ specialPrice: 0 });
    // this.myForm.patchValue({ specialDiscount: 0 });        
    this.getMax();
  }

  saveOrEdit(data: CustomerSpecificPrice) {

    let webServResponce: WebServResponce;
    this.saveEdit = new CustomerSpecificPrice(

      data.id,
      data.genaratedId,
      data.specialPrice,
      data.specialDiscount,
      data.creditDays,
      data.cash,
      this.createdDate,
      this.createdby,
      data.customerId,
      data.itemMasterId
    );



    let b: boolean = this.AllreadyExistSave(this.saveEdit);


    if (data.id == 0) {
      if (b) {
        console.log('save ');
        this.selected = data;
        console.log('curent date' + this.createdDate);

        this.customerSpecificPriceService.savedata(this.saveEdit)

          .subscribe(
          resObj => {
            webServResponce = resObj;
            if (webServResponce.statusId == 200) {

              console.log('checkthis' + webServResponce.errDetail);
              this.getAll();
              this.addNew();
              console.log('saved');
              this.openSnackBar('Success', 'Data Saved');

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
        this.customerSpecificPriceService.editdata(this.saveEdit)

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
        this.openSnackBar('Worning', 'Data Already exist');
        this.addNew();

      }
    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.customerSpecificPriceService.deletedata(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.openSnackBar('Success', 'Data Deleted');
          this.selected = new CustomerSpecificPrice(0, '', null, null, null, null, null, '', null, null);
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
    let type = 'CSP'
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

  AllreadyExistSave(data: CustomerSpecificPrice): boolean {
    let obj: CustomerSpecificPrice[] = this.alldata
      .filter(CustomerSpecificPrice => (CustomerSpecificPrice.customer.id === this.mycustomer)&& (CustomerSpecificPrice.itemMaster.id ==this.myItem))
    // .pop();
    console.log(' alreadyyyyyyyyy ' + obj.length);

    if (obj.length === 0) {

      return true;
    } else {
      return false;
    }

  }
  AllreadyExistUpdate(data: CustomerSpecificPrice): boolean {

    let obj: CustomerSpecificPrice = this.alldata
      .filter(CustomerSpecificPrice => (CustomerSpecificPrice.customer.id === this.mycustomer) && (CustomerSpecificPrice.itemMaster.id ===this.myItem) && (CustomerSpecificPrice.id != data.id))
      .pop();
    if (obj === undefined) {

      return true;
    } else {
      return false;
    }

  }







  OptionChange(jv) {

    if (jv == 1) {
      //  console.log('select1');
      this.price = false;
      this.discount = true;

      this.myForm.patchValue({ specialDiscount: 0 });
    }

    else {
      //  console.log('select2');
      this.price = true;
      this.discount = false;
      this.myForm.patchValue({ specialPrice: 0 });
    }

  }


  IdChange(jv) {

    this.SelectedspecificPrice = jv;
    if (jv == 0 || jv == null) {
      console.log('id not selected ' + jv);

    }
    else {
      console.log('id  selected ' + jv);

      let obj: CustomerSpecificPrice[] = this.alldata
        .filter(CustomerSpecificPrice => CustomerSpecificPrice.id === this.SelectedspecificPrice)
      if (obj === undefined) {
        console.log('undifined');
      }
      else {
        console.log('badu have');

        //   console.log('badu havee' + Json.stringify(obj));
        let lp = obj[0].specialPrice;
        if (lp == 0) {
          console.log('s p is 0');

          this.myForm.patchValue({ manuchange: 0 });


        }
        else {
          console.log('s p is not 0');

          this.myForm.patchValue({ manuchange: 1 });

        }

      }

    }


  }

  getCustomer(y) {
    console.log(' customertrtr ');

    this.mycustomer = parseInt(y);
    console.log(' customertrtr ' + this.mycustomer);

  }
  getItem(y) {
    console.log(' citemm ');
    this.myItem = parseInt(y);
    console.log(' customertrtr ' + this.myItem);

  }

  SetCombo(x, y, z) {



    var num = new Number(y);
    let ystring = num.toString();
    this.customerId1 = ystring;

    var num2 = new Number(z);
    let zstring = num2.toString();
    this.itemMasterId1 = zstring;


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
    var col = ["Specific Price ID", "customer", "Item ", "Special Price", "Special Discount"];
    var rows = [];
    for (let j = 0; j < this.alldata.length; j++) {

      var temp = [this.alldata[j].genaratedId, this.alldata[j].customer.customerName,
      this.alldata[j].itemMaster.itemCode, this.alldata[j].specialPrice,
      this.alldata[j].specialDiscount

      ];
      rows.push(temp);
    }


    doc.setFontType("Arial");
    doc.setFontType("bold");
    doc.text(16, 20, companyName);
    doc.text(155, 20, 'Specific Prices');

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
    doc.save('CustomerSpecicPrice.pdf');

    this.openSnackBar('Success', 'Print Created');

  }



}







