import { Reason } from '../../../../domain/Reason';
import { ReasonService } from '../../../../service/reason.service';
import { ReasonCatagoryService } from '../../../../service/reasonCatagory.service';
import { ReceiptService } from '../../../../service/receipt.service';
import { ChequeReturnService } from '../../../../service/chequeReturn.service';
import { Receipt } from '../../../../domain/Receipt';
import { SelectItem } from 'primeng/primeng';
import { ReasonCatagory } from '../../../../domain/ReasonCatagory';
import { WebServResponce } from '../../../../domain/WebServResponce';
import { ChequeReturn } from '../../../../domain/ChequeReturn';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { Message } from 'primeng/components/common/api';
declare let jsPDF;
@Component({
  selector: 'app-chequeReturns',
  templateUrl: './chequeReturns.component.html',
  styleUrls: ['./chequeReturns.component.css']
})
export class ChequeReturnsComponent implements OnInit {
  myForm: FormGroup;
  msgs: Message[] = [];
  errorMessage: string;
  allReceiptOptions: SelectItem[];
  allResonCategoryOptions: SelectItem[];
  allResonOptions: SelectItem[];
  successMessage: string;
  saveEdit: ChequeReturn;
  allData: ChequeReturn[];
  allReceiptData: Receipt[];
  allResonCategoryData: ReasonCatagory[];
  allResonData: Reason[];
  maxData: ChequeReturn[];
  genaratedId: string;
  newGenaratedId: string;
  createdDate: Date = new Date();
  createdDate2 = new Date().toDateString();
  createdBy = 'Admin';
  selected: ChequeReturn = new ChequeReturn(0, '', null, null, null, null, '', null, '', '');
  mode = 'Observable';
  public events: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private chequeReturnService: ChequeReturnService,
    private receiptService: ReceiptService,
    private reasonCatagoryService: ReasonCatagoryService,
    private reasonService: ReasonService,
    public snackBar: MatSnackBar

  ) { }


  print() {
    var doc = new jsPDF();
    var col = ['Cheque Returns No', 'Recept No', 'Cheque No', 'Ammount'];
    var rows = [];
    for (let j = 0; j < this.allData.length; j++) {

      var temp =
        [

          this.allData[j].genaratedId,
          this.allData[j].receipt.genaratedId,
          this.allData[j].receipt.chequeNo,
          this.allData[j].receipt.ammount


        ];
      rows.push(temp);
    }


    doc.setFontType('Arial');
    doc.setFontType('bold');
    doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
    doc.text(155, 20, 'Cheque Returns Details');

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
    doc.save('ChequeReturnsDetails.pdf');
  }



  getAll() {
    let webServResponce: WebServResponce;
    this.chequeReturnService.getAllData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.allData = <ChequeReturn[]>webServResponce.result;
        } else {
          this.errorMessage = webServResponce.errMessage;
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
    this.chequeReturnService.getMaxData()
      .subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.maxData = <ChequeReturn[]>webServResponce.result;

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




  getAllReceiptOptions() {
    let catWebServResponce: WebServResponce;
    this.receiptService.getAllData()
      .subscribe(
      resObj => {
        catWebServResponce = resObj;
        if (catWebServResponce.statusId == 200) {
          this.allReceiptData = <Receipt[]>catWebServResponce.result;
          this.allReceiptOptions = [];
          this.allReceiptOptions.push({ label: 'Please Select', value: null });
          for (let receipt of this.allReceiptData) {
            this.allReceiptOptions.push({ label: receipt.genaratedId, value: receipt.id });
          }
        } else {
          this.errorMessage = catWebServResponce.errMessage;
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







  changeRecept(id) {
    if (id != null) {
      console.log('here is the changed value ' + id);
      //this.fiuiltercompanies(x);
      let obj: Receipt = this.allReceiptData
        .filter(Receipt => Receipt.id === parseInt(id)).pop();


      if (obj != null) {
        //   console.log('here is filtered option ' + Json.stringify(obj));
        this.myForm.patchValue({ receiptDate: obj.date });
        this.myForm.patchValue({ customer: obj.customer.customerName });
        this.myForm.patchValue({ bank: obj.bank.bankName });
        this.myForm.patchValue({ branch: obj.branch });
        this.myForm.patchValue({ chequeNo: obj.chequeNo });
        this.myForm.patchValue({ amount: obj.ammount });


      }

    } if (id === '') {
      this.myForm.patchValue({ receiptDate: null });
      this.myForm.patchValue({ customer: null });
      this.myForm.patchValue({ bank: null });
      this.myForm.patchValue({ branch: null });
      this.myForm.patchValue({ chequeNo: null });
      this.myForm.patchValue({ amount: null });
    }

  }


  changeReasonCategory(id) {
    if (id != null) {
      console.log('here is the changed value ' + id);
      //this.fiuiltercompanies(x);
      let obj: Reason[] = this.allResonData
        .filter(Reason => Reason.reasonCatagory.id === parseInt(id));
      if (obj != undefined) {
        //  console.log('here is filtered option ' + Json.stringify(obj));


        this.allResonOptions = [];
        this.allResonOptions.push({ label: 'Please Select', value: null });
        for (let reason of obj) {
          this.allResonOptions.push({ label: reason.reason, value: reason.id });
        }
      }

    } else {
      console.log('not selected');
      this.allResonOptions = [];
      this.allResonOptions.push({ label: 'Please Select', value: null });
    }


  }




  addNew() {

    this.selected = new ChequeReturn(0, '', null, null, null, null, '', null, '', '');
    //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
    this.myForm.reset();
    this.myForm.patchValue({ id: 0 });
    this.getMax();
  }


  saveOrEdit(data: ChequeReturn) {
    let webServResponce: WebServResponce;

    this.saveEdit = new ChequeReturn(data.id, data.genaratedId, data.date, data.receiptId, data.reasoncategoryId, data.reasonId, data.remarks, this.createdDate, this.createdBy, '');
    let b: boolean = this.isAllReadyExits(this.saveEdit);



    if (data.id == 0) {
      if (b) {
        this.selected = data;
        this.saveEdit = new ChequeReturn(data.id, data.genaratedId, data.date, data.receiptId, data.reasoncategoryId, data.reasonId, data.remarks, this.createdDate, this.createdBy, '');

        this.chequeReturnService.saveData(this.saveEdit)
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

      this.saveEdit = new ChequeReturn(data.id, data.genaratedId, data.date, data.receiptId, data.reasoncategoryId, data.reasonId, data.remarks, this.createdDate, this.createdBy, '');



      this.chequeReturnService.editData(this.saveEdit)
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



    }

  }

  deleteById(id: number) {
    let webServResponce: WebServResponce;
    this.chequeReturnService.deleteData(id).subscribe(
      resObj => {
        webServResponce = resObj;
        if (webServResponce.statusId == 200) {
          this.getAll();
          this.addNew();
          this.selected = new ChequeReturn(0, '', null, null, null, null, '', null, '', '');
          this.openSnackBar('Success', 'Data Deleted');
        } else {
          this.errorMessage = webServResponce.errMessage;
        }
      }
      ,
      error => this.errorMessage = <any>error
    );
  }


  isAllReadyExits(data: ChequeReturn): boolean {
    let obj: ChequeReturn = this.allData
      .filter(ChequeReturn => ChequeReturn.receipt.id === data.receiptId)
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
    let type = 'CHR';
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
    this.myForm.patchValue({ date: this.createdDate });

  }





  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


  ngOnInit() {
    this.getAll();
    this.getMax();
    this.getAllReceiptOptions();
    this.getAllReasonCategoryOptions();
    this.getReasonDataAll();
    this.myForm = this.formBuilder.group({
      //  this.form = new ControlGroup({

      id: new FormControl(''),
      genaratedId: new FormControl(''),
      receiptId: new FormControl('', Validators.required),
      reasonId: new FormControl('', Validators.required),
      reasoncategoryId: new FormControl('', Validators.required),
      date: new FormControl(''),
      receiptDate: new FormControl(''),
      customer: new FormControl(''),
      bank: new FormControl(''),
      branch: new FormControl(''),
      chequeNo: new FormControl(''),
      amount: new FormControl('', Validators.required),
      remarks: new FormControl(''),


    });
  }

}
