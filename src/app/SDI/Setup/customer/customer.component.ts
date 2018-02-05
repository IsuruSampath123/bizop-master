import { CustomerPromisessService } from '../../../service/customerPromisess.service';
import { LanguageService } from '../../../service/language.service';
import { CustomerTransactionService } from '../../../service/customerTranaction.service';
import { CustomerRequestDebitService } from '../../../service/customerRequestDebit.service';
import { CustomerDebitService } from '../../../service/customerDebit.service';
import { BankService } from '../../../service/bank.service';
import { CustomerAccountsService } from '../../../service/customerAccounts.service';
import { CustomerDirectorsService } from '../../../service/customerDirectors.service';
import { CustomerCompanyService } from '../../../service/customerCompany.service';
import { Bank } from '../../../domain/Bank';
import { CustomerDebit } from '../../../domain/CustomerDebit';
import { WebServResponce } from '../../../domain/WebServResponce';
import { Customer } from '../../../domain/Customer';
import { CustomerCompany } from '../../../domain/CustomerCompany';
import { CustomerAccounts } from '../../../domain/CustomerAccounts';
import { CustomerRequestDebit } from '../../../domain/CustomerRequestDebit';
import { CustomerTransaction } from '../../../domain/CustomerTransaction';
import { CustomerPromisess } from '../../../domain/CustomerPromisess';
import { CustomerDirectors } from '../../../domain/CustomerDirectors';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../../service/customer.service';
import { SelectItem } from 'primeng/primeng';
import { Message } from 'primeng/components/common/api';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
declare let jsPDF;
@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    selectedCompanyIdForDirectors: string;
    selectedCustomerIdForDirectors: string;
    selectedCompanyIdForPromisess: string;
    selectedCustomerIdForPromisess: string;
    selectedCompanyIdForTransaction: string;
    selectedCustomerIdForTransaction: string;
    selectedCompanyIdForRequestDebit: string;
    selectedCustomerIdForRequestDebit: string;
    selectedCompanyIdForDebit: string;

    selectedCustomerIdForDebit: string;
    selectedBankIdForAccount: string;
    selectedCompanyIdForAccount: string;
    selectedCustomerIdForAccount: string;
    selectedCustomerId1;

    selectedCustomerId;

    languages: SelectItem[];
    allCustomerOptions: SelectItem[];
    allCompanyOptions: SelectItem[];
    allCompanyOptionsForAccounts: SelectItem[];
    allCompanyOptionsForDebit: SelectItem[];
    allCompanyOptionsForRequestDebit: SelectItem[];
    allCompanyOptionsForTransaction: SelectItem[];
    allCompanyOptionsForPromisess: SelectItem[];
    allCompanyOptionsForDirectors: SelectItem[];
    allbankOptions: SelectItem[];
    directorsList: CustomerDirectors[] = [];


    public directorsListId = 0;
    directorsObj: CustomerDirectors;

    personalDetailsForm: FormGroup;
    public companDetailsForm: FormGroup;
    public directorsDetailsForm: FormGroup;
    public accountsDetailsForm: FormGroup;
    public debitDetailsForm: FormGroup;
    public requestDebitDetailsForm: FormGroup;
    public transactionAuthorizedForm: FormGroup;
    public promisessForm: FormGroup;


    msgs: Message[] = [];
    errorMessage: string;
    successMessage: string;

    saveEditPersonalData: Customer;
    saveEditCompanyData: CustomerCompany;
    saveEditAccountData: CustomerAccounts;
    saveEditDebitData: CustomerDebit;
    saveEditRequestDebitData: CustomerRequestDebit;
    saveEditTransactionData: CustomerTransaction;
    saveEditPromisessData: CustomerPromisess;

    allPersonalData: Customer[];
    allPersonalData1: Customer[];
    allCompanyData: CustomerCompany[];
    allDirectorsData: CustomerDirectors[];
    allAccountsData: CustomerAccounts[];
    allBanksData: Bank[];
    allDebitData: CustomerDebit[];
    allRequestDebitData: CustomerRequestDebit[];
    allTransactionData: CustomerTransaction[];
    allPromisessData: CustomerPromisess[];

    maxPersonalData: Customer[];
    maxCompanyData: CustomerCompany[];
    genaratedIdPersonal: string;
    genaratedIdCompany: string;
    newGenaratedIdPersonal: string;
    newGenaratedIdCompany: string;
    createdDate: Date = new Date();
    createdDate2 = new Date().toDateString();
    createdBy = 'Admin';
    selectedCustomer2: number = 0;


    selectedCustomer: Customer = new Customer(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', null, '', '');
    // tslint:disable-next-line:max-line-length
    selectedCompany: CustomerCompany = new CustomerCompany(0, '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, '', '');
    selectedDirector: CustomerDirectors = new CustomerDirectors(0, null, null, '', '', null, '', '');
    selectedAccount: CustomerAccounts = new CustomerAccounts(0, null, null, null, '', '', '', null, '', '');
    selectedDebit: CustomerDebit = new CustomerDebit(0, null, null, 0, 0, null, '', '');
    selectedRequestDebit: CustomerRequestDebit = new CustomerRequestDebit(0, null, null, 0, 0, 0, 0, null, '', '');
    selectedTransaction: CustomerTransaction = new CustomerTransaction(0, null, null, '', '', '', null, '', '');
    selectedPromisess: CustomerPromisess = new CustomerPromisess(0, null, null, 0, 0, '', null, '', '');
    mode = 'Observable';
    public events: any[] = [];

    constructor(
        private customerService: CustomerService,
        private customerCompanyService: CustomerCompanyService,
        private customerDirectorsService: CustomerDirectorsService,
        private customerAccountsService: CustomerAccountsService,
        private bankService: BankService,
        private customerDebitService: CustomerDebitService,
        private customerRequestDebitService: CustomerRequestDebitService,
        private customerTransactionService: CustomerTransactionService,
        private customerPromisessService: CustomerPromisessService,
        private _fb: FormBuilder,
        private langService: LanguageService,
        public snackBar: MatSnackBar
    ) {
    }


    printPersonalDetails() {
        var doc = new jsPDF();
        var col = ['Customer Id', 'Customer Name', 'Contact'];
        var rows = [];
        for (let j = 0; j < this.allPersonalData.length; j++) {

            var temp =
                [
                    this.allPersonalData[j].genaratedId,
                    this.allPersonalData[j].customerName,
                    this.allPersonalData[j].mainContact,
                    this.allPersonalData[j].addressLine1,
                    this.allPersonalData[j].addressLine2
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Customers');

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
        doc.save('CustomerPersonalDetails.pdf');
    }


    printCompanyDetails() {
        var doc = new jsPDF();
        var col = ['Company ID', 'Customer Name', 'Company Name', 'Commpany Reg No', 'Contact No'];
        var rows = [];
        for (let j = 0; j < this.allCompanyData.length; j++) {

            var temp =
                [
                    this.allCompanyData[j].genaratedId,
                    this.allCompanyData[j].customer.customerName,
                    this.allCompanyData[j].companyName,
                    this.allCompanyData[j].companyRegNo,
                    this.allCompanyData[j].mainContact
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Company');

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
        doc.save('CustomerCompanyDetails.pdf');
    }


    printAccountDetails() {
        var doc = new jsPDF();
        var col = ['Customer Name', 'Company Name', 'Bank', 'Account No'];
        var rows = [];
        for (let j = 0; j < this.allAccountsData.length; j++) {

            var temp =
                [

                    this.allAccountsData[j].customer.customerName,
                    this.allAccountsData[j].company.companyName,
                    this.allAccountsData[j].bank.bankName,
                    this.allAccountsData[j].accountNumber
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Accounts');

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
        doc.save('CustomerAccountDetails.pdf');
    }


    printDebitDetails() {
        var doc = new jsPDF();
        var col = ['Customer Name', 'Company Name', 'Debit Limit', 'Debit Period'];
        var rows = [];
        for (let j = 0; j < this.allDebitData.length; j++) {

            var temp =
                [

                    this.allDebitData[j].customer.customerName,
                    this.allDebitData[j].company.companyName,
                    this.allDebitData[j].debitLimit,
                    this.allDebitData[j].debitPeriod
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Debits');

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
        doc.save('CustomerDebitDetails.pdf');
    }




    printRequestDebitDetails() {
        var doc = new jsPDF();
        var col =
            [
                'Customer Name',
                'Company Name',
                'Request Debit' + "\n" + 'Limit',
                'Aproved Debit ' + "\n" + ' Limit',
                'Request Debit ' + "\n" + ' Period',
                'Aproved Debit ' + "\n" + ' Period'
            ];
        var rows = [];
        for (let j = 0; j < this.allDebitData.length; j++) {

            var temp =
                [

                    this.allRequestDebitData[j].customer.customerName,
                    this.allRequestDebitData[j].company.companyName,
                    this.allRequestDebitData[j].requestDebitLimit,
                    this.allRequestDebitData[j].aprovedDebitLimit,
                    this.allRequestDebitData[j].requestDebitPeriod,
                    this.allRequestDebitData[j].aprovedDebitPeriod
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Requedt Debit');

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
        doc.save('CustomerRequestDebitDetails.pdf');
    }


    printTransactionDetails() {
        var doc = new jsPDF();
        var col = ['Customer Name', 'Company Name', 'Person name', 'post', 'Contact'];
        var rows = [];
        for (let j = 0; j < this.allDebitData.length; j++) {

            var temp =
                [

                    this.allTransactionData[j].customer.customerName,
                    this.allTransactionData[j].company.companyName,
                    this.allTransactionData[j].personName,
                    this.allTransactionData[j].post,
                    this.allTransactionData[j].contact
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Transactions');

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
        doc.save('CustomerTransactionDetails.pdf');
    }


    printPromisessDetails() {
        var doc = new jsPDF();
        var col = ['Customer Name', 'Company Name', 'Diposit Price', 'Bank Promisess', 'Bank Promisess Number'];
        var rows = [];
        for (let j = 0; j < this.allDebitData.length; j++) {

            var temp =
                [

                    this.allPromisessData[j].customer.customerName,
                    this.allPromisessData[j].company.companyName,
                    this.allPromisessData[j].dipositPrice,
                    this.allPromisessData[j].bankPromisess,
                    this.allPromisessData[j].bankPromisessNumber
                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Promisess');

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
        doc.save('CustomerPromisessDetails.pdf');
    }


    printDirectorsDetails() {
        var doc = new jsPDF();
        var col = ['Customer Name', 'Company Name', 'Director Name', 'NIC NO'];
        var rows = [];
        for (let j = 0; j < this.allDebitData.length; j++) {

            var temp =
                [

                    this.allDirectorsData[j].customer.customerName,
                    this.allDirectorsData[j].company.companyName,
                    this.allDirectorsData[j].directorName,
                    this.allDirectorsData[j].directorNic,

                ];
            rows.push(temp);
        }


        doc.setFontType('Arial');
        doc.setFontType('bold');
        doc.text(16, 20, 'Uniro Paints (PVT) Ltd.');
        doc.text(155, 20, 'All Directors');

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
        doc.save('CustomerDirectorsDetails.pdf');
    }





    SetCustomerIdCombo() {
        this.selectedCustomerId = this.selectedCompany.customerId.toString();
    }



    SetComboValuesForAccount() {
       
        this.selectedCustomerIdForAccount = this.selectedAccount.customerId.toString();
        this.selectedBankIdForAccount = this.selectedAccount.bankId.toString();
        this.selectedCompanyIdForAccount = this.selectedAccount.companyId.toString();

    }

    SetComboValuesForDebit() {
        this.selectedCustomerIdForDebit = this.selectedDebit.customerId.toString();
        this.selectedCompanyIdForDebit = this.selectedDebit.companyId.toString();

    }

    SetComboValuesForRequestDebit() {
        this.selectedCustomerIdForRequestDebit = this.selectedRequestDebit.customerId.toString();
        this.selectedCompanyIdForRequestDebit = this.selectedRequestDebit.companyId.toString();

    }

    SetComboValuesForTransaction() {
        this.selectedCustomerIdForTransaction = this.selectedTransaction.customerId.toString();
        this.selectedCompanyIdForTransaction = this.selectedTransaction.companyId.toString();

    }

    SetComboValuesForPromisess() {
        this.selectedCustomerIdForPromisess = this.selectedPromisess.customerId.toString();
        this.selectedCompanyIdForPromisess = this.selectedPromisess.companyId.toString();

    }

    SetComboValuesForDirectors() {
        this.selectedCustomerIdForDirectors = this.selectedDirector.customerId.toString();
        this.selectedCompanyIdForDirectors = this.selectedDirector.companyId.toString();

    }






    SetCustomerIdCombo1() {
        console.log('ffff awoooooooooooo');
        this.selectedCustomerId1 = '2';
    }


    /*    getAllCompanyData() {
    
            let webServResponce: WebServResponce;
            this.customerCompanyService.getAllData()
                .subscribe(
                resObj => {
                    webServResponce = resObj;
                    if (webServResponce.statusId == 200) {
                        this.allCompanyData = <CustomerCompany[]>webServResponce.result;
                       
                        for (let accounts of this.allCompanyData)
                         {
                            accounts.customerId = accounts.customer.id;
    
                        }
                    } else {
                        this.errorMessage = webServResponce.errMessage;
                    }
                }
                ,
                error => this.errorMessage = <any>error
                );
    
        }
    */


    getAllCompanyData() {
        let webServResponce: WebServResponce;
        this.customerCompanyService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allCompanyData = <CustomerCompany[]>webServResponce.result;
                    for (let company of this.allCompanyData) {
                        company.customerId = company.customer.id;
                    }

                    this.allCompanyOptions = [];
                    this.allCompanyOptions.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptions.push({ label: company.companyName, value: company.id });
                    }


                    this.allCompanyOptionsForAccounts = [];
                    this.allCompanyOptionsForAccounts.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptionsForAccounts.push({ label: company.companyName, value: company.id });
                    }

                    this.allCompanyOptionsForDebit = [];
                    this.allCompanyOptionsForDebit.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptionsForDebit.push({ label: company.companyName, value: company.id });
                    }

                    this.allCompanyOptionsForRequestDebit = [];
                    this.allCompanyOptionsForRequestDebit.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptionsForRequestDebit.push({ label: company.companyName, value: company.id });
                    }

                    this.allCompanyOptionsForTransaction = [];
                    this.allCompanyOptionsForTransaction.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptionsForTransaction.push({ label: company.companyName, value: company.id });
                    }

                    this.allCompanyOptionsForPromisess = [];
                    this.allCompanyOptionsForPromisess.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptionsForPromisess.push({ label: company.companyName, value: company.id });
                    }

                    this.allCompanyOptionsForDirectors = [];
                    this.allCompanyOptionsForDirectors.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptionsForDirectors.push({ label: company.companyName, value: company.id });
                    }



                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );

        /*    let catWebServResponce2: WebServResponce;
            this.customerService.getAllData()
                .subscribe(
                resObj => {
                    catWebServResponce2 = resObj;
                    if (catWebServResponce2.statusId == 200) {
                        this.allPersonalData = <Customer[]>catWebServResponce2.result;
                        this.allCustomerOptions = [];
                        this.allCustomerOptions.push({ label: 'Please Select', value: null });
                        for (let customer of this.allPersonalData) {
                            this.allCustomerOptions.push({ label: customer.customerName, value: customer.id });
                        }
                    } else {
                        this.errorMessage = catWebServResponce2.errMessage;
                    }
                }
                ,
                error => this.errorMessage = <any>error
                );
                */
    }


    getAllDirectorDetails() {
        let webServResponce: WebServResponce;
        this.customerDirectorsService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allDirectorsData = <CustomerDirectors[]>webServResponce.result;
                    for (let customer of this.allDirectorsData) {
                        customer.customerId = customer.customer.id;
                    }
                    for (let company of this.allDirectorsData) {
                        company.companyId = company.company.id;
                    }
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );
    }

    getAllAccountData() {
        let webServResponce: WebServResponce;
        this.customerAccountsService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allAccountsData = <CustomerAccounts[]>webServResponce.result;
                    for (let accounts of this.allAccountsData) {
                        accounts.customerId = accounts.customer.id;
                        accounts.companyId = accounts.company.id;
                        accounts.bankId = accounts.bank.id;
                    }

                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );
    }

    getAllDebitData() {
        let webServResponce: WebServResponce;
        this.customerDebitService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allDebitData = <CustomerDebit[]>webServResponce.result;
                    for (let debit of this.allDebitData) {
                        debit.customerId = debit.customer.id;
                        debit.companyId = debit.company.id;
                    }

                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );
    }




    getAllRequestDebitData() {
        let webServResponce: WebServResponce;
        this.customerRequestDebitService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allRequestDebitData = <CustomerRequestDebit[]>webServResponce.result;
                    for (let accounts of this.allRequestDebitData) {
                        accounts.customerId = accounts.customer.id;
                        accounts.companyId = accounts.company.id;

                    }

                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );
    }


    getAllTransactionData() {
        let webServResponce: WebServResponce;
        this.customerTransactionService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allTransactionData = <CustomerTransaction[]>webServResponce.result;
                    for (let transaction of this.allTransactionData) {
                        transaction.customerId = transaction.customer.id;
                        transaction.companyId = transaction.company.id;

                    }

                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );
    }

    getAllPromisessData() {
        let webServResponce: WebServResponce;
        this.customerPromisessService.getAllData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allPromisessData = <CustomerPromisess[]>webServResponce.result;
                    for (let promisess of this.allPromisessData) {
                        promisess.customerId = promisess.customer.id;
                        promisess.companyId = promisess.company.id;

                    }

                } else {
                    this.errorMessage = webServResponce.errMessage;
                }


            }
            ,
            error => this.errorMessage = <any>error
            );
    }



    getAllCustomerOptions() {
        let catWebServResponce2: WebServResponce;
        this.customerService.getAllData()
            .subscribe(
            resObj => {
                catWebServResponce2 = resObj;
                if (catWebServResponce2.statusId == 200) {
                    this.companDetailsForm.patchValue({ id: 0 });
                    this.allPersonalData = <Customer[]>catWebServResponce2.result;

                    let obj: Customer[] = this.allPersonalData
                        .filter(Customer => ((Customer.blackListed.toLowerCase() === 'no')));


                    if (obj != undefined) {
                        this.allPersonalData = obj;
                    }




                    this.allCustomerOptions = [];
                    this.allCustomerOptions.push({ label: 'Please Select', value: null });
                    for (let customer of this.allPersonalData) {
                        this.allCustomerOptions.push({ label: customer.customerName, value: customer.id });
                    }
                } else {
                    this.errorMessage = catWebServResponce2.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }

    getAllCompanyOptions() {
        let catWebServResponce: WebServResponce;
        this.customerCompanyService.getAllData()
            .subscribe(
            resObj => {
                catWebServResponce = resObj;
                if (catWebServResponce.statusId == 200) {
                    this.allCompanyData = <CustomerCompany[]>catWebServResponce.result;
                    this.allCompanyOptions = [];
                    this.allCompanyOptions.push({ label: 'Please Select', value: null });
                    for (let company of this.allCompanyData) {
                        this.allCompanyOptions.push({ label: company.companyName, value: company.id });
                    }
                } else {
                    this.errorMessage = catWebServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }





    getAllBankOptions() {
        let catWebServResponce: WebServResponce;
        this.bankService.getAllData()
            .subscribe(
            resObj => {
                catWebServResponce = resObj;
                if (catWebServResponce.statusId == 200) {
                    this.allBanksData = <Bank[]>catWebServResponce.result;
                    this.allbankOptions = [];
                    this.allbankOptions.push({ label: 'Please Select', value: null });
                    for (let bank of this.allBanksData) {
                        this.allbankOptions.push({ label: bank.bankName, value: bank.id });
                    }
                } else {
                    this.errorMessage = catWebServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }






    getMaxPersonalData() {
        let webServResponce: WebServResponce;
        this.customerService.getMaxData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.maxPersonalData = <Customer[]>webServResponce.result;

                    if (this.maxPersonalData[0] == undefined) {
                        this.genaratedIdPersonal = null;
                    } else {
                        this.genaratedIdPersonal = this.maxPersonalData[0].genaratedId;
                    }
                    console.log('Maxxxxxx' + this.genaratedIdPersonal);
                    this.genarateIdNormalPersonalData(this.genaratedIdPersonal);
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }


    getMaxCompanyData() {
        let webServResponce: WebServResponce;
        this.customerCompanyService.getMaxData()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.maxCompanyData = <CustomerCompany[]>webServResponce.result;

                    if (this.maxCompanyData[0] == undefined) {
                        this.genaratedIdCompany = null;
                    } else {
                        this.genaratedIdCompany = this.maxCompanyData[0].genaratedId;
                    }
                    console.log('Maxxxxxx' + this.genaratedIdCompany);
                    this.genarateIdNormalCompanyData(this.genaratedIdCompany);
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }






    addNewPersonalData() {

        this.selectedCustomer = new Customer(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.personalDetailsForm.reset();
        this.personalDetailsForm.patchValue({ id: 0 });
        this.getMaxPersonalData();
    }


    addNewCompanyData() {

        this.selectedCompany = new CustomerCompany(0, '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, '', '');

        //this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.companDetailsForm.reset();
        this.companDetailsForm.patchValue({ id: 0 });
        this.getMaxCompanyData();
        this.selectedCustomerId = null;
    }

    addNewDirectorData() {
        this.selectedDirector = new CustomerDirectors(0, null, null, '', '', null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.directorsDetailsForm.reset();
        this.directorsDetailsForm.patchValue({ id: 0 });
        this.getAllCompanyData();
        this.selectedCustomerIdForDirectors = null;
        this.selectedCompanyIdForDirectors = null;
    }

    addNewAccountData() {
        this.selectedAccount = new CustomerAccounts(0, null, null, null, '', '', '', null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        //    this.accountsDetailsForm.reset();
        this.accountsDetailsForm.patchValue({ id: 0 });
        this.accountsDetailsForm.reset();
        this.getAllCompanyData();
        this.selectedCustomerIdForAccount = null;
        this.selectedCompanyIdForAccount = null;
        this.selectedBankIdForAccount = null;

        // this.getMaxPersonalData();
    }

    addNewDebitData() {

        this.selectedDebit = new CustomerDebit(0, null, null, 0, 0, null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.debitDetailsForm.reset();
        this.debitDetailsForm.patchValue({ id: 0 });
        this.getAllCompanyData();
        // this.getMaxPersonalData();
        this.selectedCustomerIdForDebit = null;
        this.selectedCompanyIdForDebit = null;
    }


    addNewRequestDebitData() {

        this.selectedRequestDebit = new CustomerRequestDebit(0, null, null, 0, 0, 0, 0, null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.requestDebitDetailsForm.reset();
        this.requestDebitDetailsForm.patchValue({ id: 0 });
        this.getAllCompanyData();
        // this.getMaxPersonalData();
        this.selectedCustomerIdForRequestDebit = null;
        this.selectedCompanyIdForRequestDebit = null;
    }

    addNewTransactionData() {

        this.selectedTransaction = new CustomerTransaction(0, null, null, '', '', '', null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.transactionAuthorizedForm.reset();
        this.transactionAuthorizedForm.patchValue({ id: 0 });
        this.getAllCompanyData();
        // this.getMaxPersonalData();
        this.selectedCustomerIdForTransaction = null;
        this.selectedCompanyIdForTransaction = null;
    }

    addNewPromisessData() {

        this.selectedPromisess = new CustomerPromisess(0, null, null, 0, 0, '', null, '', '');
        // this.myForm.setValue({ id: '', genaratedId: this.newGenaratedId,taxType: '' });
        this.promisessForm.reset();
        this.promisessForm.patchValue({ id: 0 });
        this.getAllCompanyData();
        // this.getMaxPersonalData();
        this.selectedCustomerIdForPromisess = null;
        this.selectedCompanyIdForPromisess = null;
    }



    saveOrEditPersonalData(data: Customer) {
        let webServResponce: WebServResponce;
        this.saveEditPersonalData = new Customer(data.id, data.genaratedId, data.customerName, '', data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.mainContact, data.otherContact, data.email, data.fax, data.language, data.salesOfficer, data.salesOfficerContact, data.productionManager, data.productionManagerContact, data.ownerImage, '', '', '', '', data.gpslocation, 'no', '', this.createdDate, this.createdBy, '');

        if (data.id == 0) {
            let b: boolean = this.isAllReadyExitsPersonalDataSave(this.saveEditPersonalData);
            if (b) {
                this.selectedCustomer = data;
                this.saveEditPersonalData = new Customer(data.id, data.genaratedId, data.customerName, '', data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.mainContact, data.otherContact, data.email, data.fax, data.language, data.salesOfficer, data.salesOfficerContact, data.productionManager, data.productionManagerContact, data.ownerImage, '', '', '', '', data.gpslocation, 'no', '', this.createdDate, this.createdBy, '');
                this.customerService.saveData(this.saveEditPersonalData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            // this.getAllPersonalDetails();
                            this.getMaxPersonalData();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewPersonalData();
                            this.getAllCustomerOptions();
                            this.openSnackBar('Success', 'Data Saved');
                            console.log('Save');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );

            } else {
                this.addNewPersonalData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }
        }
        else {

            this.saveEditPersonalData = new Customer(data.id, data.genaratedId, data.customerName, '', data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.mainContact, data.otherContact, data.email, data.fax, data.language, data.salesOfficer, data.salesOfficerContact, data.productionManager, data.productionManagerContact, data.ownerImage, '', '', '', '', data.gpslocation, 'no', '', this.createdDate, this.createdBy, '');
            let b: boolean = this.isAllReadyExitsPersonalDataUpdate(this.saveEditPersonalData);
            if (b) {
                this.customerService.editData(this.saveEditPersonalData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            // this.getAllPersonalDetails();
                            this.getMaxPersonalData();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewPersonalData();
                            this.getAllCustomerOptions();
                            this.openSnackBar('Success', 'Data Updated');
                            console.log('Update');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewPersonalData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        }



    }



    saveOrEditCompanyData(data: CustomerCompany) {
        let webServResponce: WebServResponce;
        this.saveEditCompanyData = new CustomerCompany(data.id, data.genaratedId, data.customerId, data.companyName, data.companyRegNo, data.mainContact, data.otherContact, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.email, data.fax, data.ownerName, data.ownerNic, data.ownerContact, data.ownerAddressLine1, data.ownerAddressLine2, data.ownerAddressLine3, data.ownerAddressLine4, data.vat, data.nbt, this.createdDate, this.createdBy, '');
        if (data.id == 0) {
            let b: boolean = this.isAllReadyExitsCompanyDataSave(this.saveEditCompanyData);
            if (b) {
                this.selectedCompany = data;
                this.saveEditCompanyData = new CustomerCompany(data.id, data.genaratedId, data.customerId, data.companyName, data.companyRegNo, data.mainContact, data.otherContact, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.email, data.fax, data.ownerName, data.ownerNic, data.ownerContact, data.ownerAddressLine1, data.ownerAddressLine2, data.ownerAddressLine3, data.ownerAddressLine4, data.vat, data.nbt, this.createdDate, this.createdBy, '');
                this.customerCompanyService.saveData(this.saveEditCompanyData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllCompanyData();
                            this.getMaxCompanyData();
                            //        this.getAllCompanyOptions();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewCompanyData();
                            this.openSnackBar('Success', 'Data Saved');
                            console.log('Save');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewCompanyData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        }
        else {
            let b: boolean = this.isAllReadyExitsCompanyDataUpdate(this.saveEditCompanyData);

            if (b) {
                this.saveEditCompanyData = new CustomerCompany(data.id, data.genaratedId, data.customerId, data.companyName, data.companyRegNo, data.mainContact, data.otherContact, data.addressLine1, data.addressLine2, data.addressLine3, data.addressLine4, data.email, data.fax, data.ownerName, data.ownerNic, data.ownerContact, data.ownerAddressLine1, data.ownerAddressLine2, data.ownerAddressLine3, data.ownerAddressLine4, data.vat, data.nbt, this.createdDate, this.createdBy, '');
                this.customerCompanyService.editData(this.saveEditCompanyData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllCompanyData();
                            this.getMaxCompanyData();
                            //     this.getAllCompanyOptions();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewCompanyData();
                            this.openSnackBar('Success', 'Data Updated');
                            console.log('Update');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewCompanyData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits Update');
            }

        }



    }


    saveOrEditDirectorData(directors: CustomerDirectors) {
        // tslint:disable-next-line:max-line-length
        this.directorsObj = new CustomerDirectors(directors.id, directors.customerId, directors.companyId, directors.directorName, directors.directorNic, null, '', '');
        this.directorsList.push(this.directorsObj);
        let webServResponce: WebServResponce;

        let b: boolean = this.isAllReadyExitsDirectorDataSave(this.directorsObj);

        if (directors.id == 0) {
            if (b) {
                if (this.directorsList.length > 0) {
                    this.customerDirectorsService.saveData(this.directorsList)
                        .subscribe(
                        resObj => {
                            webServResponce = resObj;
                            if (webServResponce.statusId == 200) {
                                this.openSnackBar('Success', 'Data Saved');
                                this.directorsList = [];
                                this.getAllDirectorDetails();
                                console.log('Save');
                                this.addNewDirectorData();
                            } else {
                                this.errorMessage = webServResponce.errMessage;
                            }
                        }
                        ,
                        error => this.errorMessage = <any>error
                        );
                } else {
                    this.openSnackBar('Warning', 'Please add Director/Partners Details');
                }
            } else {
                this.addNewDirectorData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        } else {

            let b: boolean = this.isAllReadyExitsDirectorDataUpdate(this.directorsObj);

            if (b) {

                this.customerDirectorsService.editData(this.directorsObj)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.openSnackBar('Success', 'Data Updated');
                            this.directorsList = [];
                            this.getAllDirectorDetails();
                            console.log('Update');
                            this.addNewDirectorData();
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewDirectorData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }
            this.customerDirectorsService.editData(this.directorsObj)

        }
    }


    saveOrEditAccountData(data: CustomerAccounts) {
        let webServResponce: WebServResponce;
        this.saveEditAccountData = new CustomerAccounts(data.id, data.customerId, data.companyId, data.bankId, data.bankAccount, data.accountNumber, data.branch, this.createdDate, this.createdBy, '');

        if (data.id == 0) {
            let b: boolean = this.isAllReadyExitsAccountDataSave(this.saveEditAccountData);
            if (b) {
                this.selectedAccount = data;
                this.saveEditAccountData = new CustomerAccounts(data.id, data.customerId, data.companyId, data.bankId, data.bankAccount, data.accountNumber, data.branch, this.createdDate, this.createdBy, '');
                this.customerAccountsService.saveData(this.saveEditAccountData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllAccountData();

                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewAccountData();
                            this.openSnackBar('Success', 'Data Saved');
                            console.log('Save');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.getAllAccountData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        }
        else {
            let b: boolean = this.isAllReadyExitsAccountDataUpdate(this.saveEditAccountData);

            if (b) {
                this.saveEditAccountData = new CustomerAccounts(data.id, data.customerId, data.companyId, data.bankId, data.bankAccount, data.accountNumber, data.branch, this.createdDate, this.createdBy, '');
                this.customerAccountsService.editData(this.saveEditAccountData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllAccountData();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewAccountData();
                            this.openSnackBar('Success', 'Data Updated');
                            console.log('Update');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewAccountData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits Update');
            }

        }
    }


    saveOrEditDebitData(data: CustomerDebit) {
        let webServResponce: WebServResponce;
        this.saveEditDebitData = new CustomerDebit(data.id, data.customerId, data.companyId, data.debitLimit, data.debitPeriod, this.createdDate, this.createdBy, '');

        if (data.id == 0) {
            this.selectedDebit = data;
            this.saveEditDebitData = new CustomerDebit(data.id, data.customerId, data.companyId, data.debitLimit, data.debitPeriod, this.createdDate, this.createdBy, '');
            this.customerDebitService.saveData(this.saveEditDebitData)
                .subscribe(
                resObj => {
                    webServResponce = resObj;
                    if (webServResponce.statusId == 200) {
                        this.getAllDebitData();

                        // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        this.addNewDebitData();
                        this.openSnackBar('Success', 'Data Saved');
                        console.log('Save');
                        // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                    } else {
                        this.errorMessage = webServResponce.errMessage;
                    }
                }
                ,
                error => this.errorMessage = <any>error
                );
        }


        else {



            this.saveEditDebitData = new CustomerDebit(data.id, data.customerId, data.companyId, data.debitLimit, data.debitPeriod, this.createdDate, this.createdBy, '');
            this.customerDebitService.editData(this.saveEditDebitData)
                .subscribe(
                resObj => {
                    webServResponce = resObj;
                    if (webServResponce.statusId == 200) {
                        this.getAllDebitData();

                        // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        this.addNewDebitData();
                        this.openSnackBar('Success', 'Data Updated');
                        console.log('Update');
                        // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                    } else {
                        this.errorMessage = webServResponce.errMessage;
                    }
                }
                ,
                error => this.errorMessage = <any>error
                );

        }
    }


    saveOrEditRequestDebitData(data: CustomerRequestDebit) {
        let webServResponce: WebServResponce;
        this.saveEditRequestDebitData = new CustomerRequestDebit(data.id, data.customerId, data.companyId, data.requestDebitLimit, data.requestDebitPeriod, data.aprovedDebitLimit, data.aprovedDebitPeriod, this.createdDate, this.createdBy, '');

        if (data.id == 0) {
            let b: boolean = this.isAllReadyExitsRequestDebitDataSave(this.saveEditRequestDebitData);
            if (b) {
                this.saveEditRequestDebitData = data;
                this.saveEditRequestDebitData = new CustomerRequestDebit(data.id, data.customerId, data.companyId, data.requestDebitLimit, data.requestDebitPeriod, data.aprovedDebitLimit, data.aprovedDebitPeriod, this.createdDate, this.createdBy, '');
                this.customerRequestDebitService.saveData(this.saveEditRequestDebitData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllRequestDebitData();

                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewRequestDebitData();
                            this.openSnackBar('Success', 'Data Saved');
                            console.log('Save');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewRequestDebitData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        } else {
            let b: boolean = this.isAllReadyExitsRequestDebitDataUpdate(this.saveEditRequestDebitData);

            if (b) {
                this.saveEditRequestDebitData = new CustomerRequestDebit(data.id, data.customerId, data.companyId, data.requestDebitLimit, data.requestDebitPeriod, data.aprovedDebitLimit, data.aprovedDebitPeriod, this.createdDate, this.createdBy, '');
                this.customerRequestDebitService.editData(this.saveEditRequestDebitData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllRequestDebitData();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewRequestDebitData();
                            this.openSnackBar('Success', 'Data Updated');
                            console.log('Update');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewRequestDebitData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits Update');
            }

        }
    }


    saveOrEditTransactionData(data: CustomerTransaction) {
        let webServResponce: WebServResponce;
        this.saveEditTransactionData = new CustomerTransaction(data.id, data.customerId, data.companyId, data.personName, data.contact, data.post, this.createdDate, this.createdBy, '');
        //    console.log(Json.stringify(this.saveEditTransactionData));

        if (data.id == 0) {
            let b: boolean = this.isAllReadyExitsTransactionDataSave(this.saveEditTransactionData);
            if (b) {
                this.saveEditTransactionData = data;
                this.saveEditTransactionData = new CustomerTransaction(data.id, data.customerId, data.companyId, data.personName, data.contact, data.post, this.createdDate, this.createdBy, '');
                this.customerTransactionService.saveData(this.saveEditTransactionData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllTransactionData();

                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewTransactionData();
                            this.openSnackBar('Success', 'Data Saved');
                            console.log('Save');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewTransactionData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        } else {
            let b: boolean = this.isAllReadyExitsTransactionDataUpdate(this.saveEditTransactionData);

            if (b) {
                this.saveEditTransactionData = new CustomerTransaction(data.id, data.customerId, data.companyId, data.personName, data.contact, data.post, this.createdDate, this.createdBy, '');
                this.customerTransactionService.editData(this.saveEditTransactionData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllTransactionData();
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewTransactionData();
                            this.openSnackBar('Success', 'Data Updated');
                            console.log('Update');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewTransactionData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits Update');
            }

        }
    }



    saveOrEditPromisessData(data: CustomerPromisess) {
        let webServResponce: WebServResponce;
        this.saveEditPromisessData = new CustomerPromisess(data.id, data.customerId, data.companyId, data.dipositPrice, data.bankPromisess, data.bankPromisessNumber, this.createdDate, this.createdBy, '');

        if (data.id == 0) {
            let b: boolean = this.isAllReadyExitsPromisessDataSave(this.saveEditPromisessData);
            if (b) {
                this.saveEditPromisessData = data;
                this.saveEditPromisessData = new CustomerPromisess(data.id, data.customerId, data.companyId, data.dipositPrice, data.bankPromisess, data.bankPromisessNumber, this.createdDate, this.createdBy, '');
                this.customerPromisessService.saveData(this.saveEditPromisessData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllPromisessData();

                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewPromisessData();
                            this.openSnackBar('Success', 'Data Saved');
                            console.log('Save');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewPromisessData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits');
            }

        } else {
            let b: boolean = this.isAllReadyExitsPromisessDataUpdate(this.saveEditPromisessData);

            if (b) {
                this.saveEditPromisessData = new CustomerPromisess(data.id, data.customerId, data.companyId, data.dipositPrice, data.bankPromisess, data.bankPromisessNumber, this.createdDate, this.createdBy, '');
                this.customerPromisessService.editData(this.saveEditPromisessData)
                    .subscribe(
                    resObj => {
                        webServResponce = resObj;
                        if (webServResponce.statusId == 200) {
                            this.getAllPromisessData();

                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                            this.addNewPromisessData();
                            this.openSnackBar('Success', 'Data Updated');
                            console.log('Update');
                            // console.log('catagoryId : '+this.selectedCatagory.id+' , catagory Name : '+this.selectedCatagory.itemCategory);
                        } else {
                            this.errorMessage = webServResponce.errMessage;
                        }
                    }
                    ,
                    error => this.errorMessage = <any>error
                    );
            } else {
                this.addNewPromisessData();
                this.openSnackBar('Warning', 'Data AllReadyExits');
                console.log('allReadyExits Update');
            }

        }
    }









    deleteById(id: number) {
        let webServResponce: WebServResponce;
        this.customerService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    // this.getAllPersonalDetails();
                    this.addNewPersonalData();
                    this.getAllCustomerOptions();
                    this.selectedCustomer = new Customer(0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
                        '', '', '', '', null, '', '');
                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }

    deleteCompanyById(id: number) {
        let webServResponce: WebServResponce;
        this.customerCompanyService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllCompanyData();
                    this.addNewCompanyData();
                    this.selectedCompany = new CustomerCompany(0, '', null, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', null, '', '');

                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }


    deleteDirectorById(id: number) {
        let webServResponce: WebServResponce;
        this.customerDirectorsService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllDirectorDetails();
                    this.selectedDirector = new CustomerDirectors(0, null, null, '', '', null, '', '');
                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }

    deleteAccountById(id: number) {
        let webServResponce: WebServResponce;
        this.customerAccountsService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllAccountData();
                    this.selectedAccount = new CustomerAccounts(0, null, null, null, '', '', '', null, '', '');
                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }


    deleteDebitById(id: number) {
        let webServResponce: WebServResponce;
        this.customerDebitService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllDebitData();
                    this.selectedDebit = new CustomerDebit(0, null, null, 0, 0, null, '', '');
                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }

    deleteRequestDebitById(id: number) {
        let webServResponce: WebServResponce;
        this.customerRequestDebitService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllRequestDebitData();
                    this.selectedRequestDebit = new CustomerRequestDebit(0, null, null, 0, 0, 0, 0, null, '', '');
                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }

    deleteTransactionById(id: number) {
        let webServResponce: WebServResponce;
        this.customerTransactionService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllTransactionData();
                    this.selectedTransaction = new CustomerTransaction(0, null, null, '', '', '', null, '', '');
                    this.openSnackBar('Success', 'Data Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }


    deletePromisessById(id: number) {
        let webServResponce: WebServResponce;
        this.customerPromisessService.deleteData(id).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getAllPromisessData();
                    this.selectedPromisess = new CustomerPromisess(0, null, null, 0, 0, '', null, '', '');
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
        this.allPersonalData
            .filter(TaxType => TaxType.id === id)
            .pop();
    }


    genarateIdNormalPersonalData(oldId: string) {
        let year = (new Date()).getFullYear();
        let type = 'CUS';
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


        this.newGenaratedIdPersonal = genaratedId;
        console.log('next Id =' + genaratedId);

        this.personalDetailsForm.patchValue({ genaratedId: genaratedId });
    }


    genarateIdNormalCompanyData(oldId: string) {
        let year = (new Date()).getFullYear();
        let type = 'CCO';
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


        this.newGenaratedIdCompany = genaratedId;
        console.log('next Id =' + genaratedId);

        this.companDetailsForm.patchValue({ genaratedId: genaratedId });
    }







    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 3000,
        });
    }




    isAllReadyExitsPersonalDataSave(data: Customer): boolean {
        let obj: Customer = this.allPersonalData
            .filter(Customer => Customer.customerName.toLowerCase() === data.customerName.toLowerCase())
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsPersonalDataUpdate(data: Customer): boolean {
        let obj: Customer = this.allPersonalData
            .filter(Customer => (Customer.customerName.toLowerCase() === data.customerName.toLowerCase()) && Customer.id != data.id)
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }



    isAllReadyExitsCompanyDataSave(data: CustomerCompany): boolean {
        let obj: CustomerCompany = this.allCompanyData
            .filter(CustomerCompany => (CustomerCompany.companyName.toLowerCase() === data.companyName.toLowerCase()) || (CustomerCompany.companyRegNo.toLowerCase() === data.companyRegNo.toLowerCase()))
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsCompanyDataUpdate(data: CustomerCompany): boolean {
        let obj: CustomerCompany = this.allCompanyData
            .filter(CustomerCompany => ((CustomerCompany.companyName.toLowerCase() === data.companyName.toLowerCase()) || (CustomerCompany.companyRegNo.toLowerCase() === data.companyRegNo.toLowerCase())) && CustomerCompany.id != data.id)
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }


    isAllReadyExitsAccountDataSave(data: CustomerAccounts): boolean {
        let obj: CustomerAccounts = this.allAccountsData
            .filter(CustomerAccounts => CustomerAccounts.accountNumber.toLowerCase() === data.accountNumber.toLowerCase())
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsAccountDataUpdate(data: CustomerAccounts): boolean {
        let obj: CustomerAccounts = this.allAccountsData
            .filter(CustomerAccounts => (CustomerAccounts.accountNumber.toLowerCase() === data.accountNumber.toLowerCase()) && CustomerAccounts.id != data.id)
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsRequestDebitDataSave(data: CustomerRequestDebit): boolean {
        let obj: CustomerRequestDebit = this.allRequestDebitData
            .filter(CustomerRequestDebit => (CustomerRequestDebit.customerId === data.customerId) || (CustomerRequestDebit.companyId == data.companyId))
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsRequestDebitDataUpdate(data: CustomerRequestDebit): boolean {
        let obj: CustomerRequestDebit = this.allRequestDebitData
            .filter(CustomerRequestDebit => ((CustomerRequestDebit.customerId === data.customerId) || (CustomerRequestDebit.companyId == data.companyId)) && CustomerRequestDebit.id != data.id)
            .pop();

        // console.log(Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }



    isAllReadyExitsTransactionDataSave(data: CustomerTransaction): boolean {
        let obj: CustomerTransaction = this.allTransactionData
            .filter(CustomerTransaction => (CustomerTransaction.personName === data.personName) && (CustomerTransaction.customer.id === CustomerTransaction.customerId) && (CustomerTransaction.company.id === data.companyId))
            .pop();

        //  console.log('saveeeeeee' + Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsTransactionDataUpdate(data: CustomerTransaction): boolean {
        let obj: CustomerTransaction = this.allTransactionData
            .filter(CustomerTransaction => ((CustomerTransaction.personName === data.personName) && (CustomerTransaction.customer.id === CustomerTransaction.customerId) && (CustomerTransaction.company.id === data.companyId)) && CustomerTransaction.id != data.id)
            .pop();



        if (obj === undefined) {
            return true;
        } else {

            return false;
        }

    }



    isAllReadyExitsPromisessDataSave(data: CustomerPromisess): boolean {
        let obj: CustomerPromisess = this.allPromisessData
            .filter(CustomerPromisess => (CustomerPromisess.customer.id === CustomerPromisess.customerId) && (CustomerPromisess.company.id === data.companyId))
            .pop();

        //     console.log('saveeeeeee' + Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsPromisessDataUpdate(data: CustomerPromisess): boolean {
        let obj: CustomerPromisess = this.allPromisessData
            .filter(CustomerPromisess => ((CustomerPromisess.customer.id === CustomerPromisess.customerId) && (CustomerPromisess.company.id === data.companyId)) && CustomerPromisess.id != data.id)
            .pop();



        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }


    isAllReadyExitsDirectorDataSave(data: CustomerDirectors): boolean {
        console.log('saveeeeeee' + data.companyId);

        let obj: CustomerDirectors = this.allDirectorsData
            // tslint:disable-next-line:max-line-length
            .filter(CustomerDirectors => ((CustomerDirectors.directorNic === data.directorNic) && (CustomerDirectors.customer.id === CustomerDirectors.customerId) && (CustomerDirectors.company.id == data.companyId)))
            .pop();

        //     console.log('saveeeeeee' + Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }

    isAllReadyExitsDirectorDataUpdate(data: CustomerDirectors): boolean {
        let obj: CustomerDirectors = this.allDirectorsData
            // tslint:disable-next-line:max-line-length
            .filter(CustomerDirectors => ((CustomerDirectors.customer.id === CustomerDirectors.customerId) && (CustomerDirectors.company.id === data.companyId) && (CustomerDirectors.directorNic === data.directorNic)) && CustomerDirectors.id != data.id)
            .pop();

        //     console.log('saveeeeeee' + Json.stringify(obj));

        if (obj === undefined) {

            return true;
        } else {
            return false;
        }

    }


    addDirectorsToList(directors: CustomerDirectors) {

        this.directorsListId = this.directorsListId + 1;
        this.directorsObj = new CustomerDirectors(this.directorsListId, directors.customerId, directors.companyId, directors.directorName, directors.directorNic, null, '', '');
        this.directorsList.push(this.directorsObj);
        this.directorsDetailsForm.reset();
    }


    deleteDirectorFromList(data: CustomerDirectors) {
        let index = this.directorsList.indexOf(data);
        if (index > -1) {
            this.directorsList.splice(index, 1);
        }
        console.log();


    }


    ngOnInit() {
        this.languages = this.langService.getLanguageOptions();
        // this.getAllPersonalDetails();
        this.getMaxPersonalData();
        this.getAllCompanyData();
        this.getAllDirectorDetails();
        this.getAllAccountData();
        this.getAllDebitData();
        this.getAllRequestDebitData();
        this.getAllTransactionData();
        this.getAllPromisessData();
        this.getMaxCompanyData();
        this.getAllCustomerOptions();
        // this.getAllCompanyOptions();
        this.getAllBankOptions();


        this.personalDetailsForm = this._fb.group({
            id: new FormControl(''),
            genaratedId: new FormControl(''),
            customerName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            mainContact: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            otherContact: new FormControl('', Validators.compose([Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            email: new FormControl('', Validators.compose([Validators.pattern('([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))'), Validators.maxLength(50)])),
            fax: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9- ]*[0-9])?$'), Validators.maxLength(10), Validators.minLength(9)])),
            language: new FormControl(''),
            salesOfficer: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            salesOfficerContact: new FormControl('', Validators.compose([Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            productionManager: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            productionManagerContact: new FormControl('', Validators.compose([Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            ownerImage: new FormControl(''),
            productionManagerImage: new FormControl(''),
            shopImage1: new FormControl(''),
            shopImage2: new FormControl(''),
            shopImage3: new FormControl(''),
            gpslocation: new FormControl('')
        });



        this.companDetailsForm = this._fb.group({
            id: new FormControl(''),
            genaratedId: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z-._/ ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            companyRegNo: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z0-9-._ ]*[a-zA-Z0-9])?$'), Validators.maxLength(50)])),
            mainContact: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            otherContact: new FormControl('', Validators.compose([Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            addressLine1: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            addressLine2: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            addressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            addressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            email: new FormControl('', Validators.compose([Validators.pattern('([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))'), Validators.maxLength(50)])),
            fax: new FormControl('', Validators.compose([Validators.pattern('^[0-9](?:[0-9- ]*[0-9])?$'), Validators.maxLength(10), Validators.minLength(9)])),
            ownerName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            ownerNic: new FormControl(''),
            ownerContact: new FormControl('', Validators.compose([Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            ownerAddressLine1: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            ownerAddressLine2: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            ownerAddressLine3: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            ownerAddressLine4: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            vat: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)])),
            nbt: new FormControl('', Validators.compose([Validators.pattern('^[a-zA-Z0-9#](?:[a-zA-Z0-9/:.,# ]*[a-zA-Z0-9,])?$'), Validators.maxLength(30)]))
        });


        this.directorsDetailsForm = this._fb.group({
            id: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyId: new FormControl('', Validators.required),
            directorName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            directorNic: new FormControl('', Validators.required)
        });


        this.accountsDetailsForm = this._fb.group({
            id: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyId: new FormControl('', Validators.required),
            bankId: new FormControl('', Validators.required),
            bankAccount: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            accountNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(25)])),
            branch: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)]))
        });

        this.debitDetailsForm = this._fb.group({
            id: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyId: new FormControl('', Validators.required),
            debitLimit: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
            debitPeriod: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')]))
        });




        this.requestDebitDetailsForm = this._fb.group({
            id: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyId: new FormControl('', Validators.required),
            requestDebitLimit: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
            requestDebitPeriod: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])),
            aprovedDebitLimit: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
            aprovedDebitPeriod: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[0-9]*')]))
        });

        this.transactionAuthorizedForm = this._fb.group({
            id: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyId: new FormControl('', Validators.required),
            personName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z. ]*[a-zA-Z])?$'), Validators.maxLength(50)])),
            contact: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9+](?:[0-9]*[0-9])?$'), Validators.maxLength(15), Validators.minLength(10)])),
            post: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z](?:[a-zA-Z ]*[a-zA-Z])?$'), Validators.maxLength(50)]))

        });

        this.promisessForm = this._fb.group({
            id: new FormControl(''),
            customerId: new FormControl('', Validators.required),
            companyId: new FormControl('', Validators.required),
            dipositPrice: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
            bankPromisess: new FormControl('', Validators.compose([Validators.required, Validators.pattern('-?\\d+(\\.\\d*)?')])),
            bankPromisessNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9](?:[a-zA-Z0-9-_ ]*[a-zA-Z0-9])?$'), Validators.maxLength(20)]))
        });



        /*   this.customerForm = this._fb.group({
               customerID: new FormControl(''),
               'name': ['', Validators.required],
               'ownername': ['', Validators.required],
               line1: new FormControl(''),
               line2: new FormControl(''),
               line3: new FormControl(''),
               line4: new FormControl(''),
               sameAddForDelivery: new FormControl(''),
               'mainContact': ['', Validators.pattern('([0-9+]{1})([0-9 ]{8,14})')],
               'otherContact': ['', Validators.pattern('([0-9+]{1})([0-9 ]{8,14})')],
               'email': ['', Validators.pattern('([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))')],
               'companyemail': ['', Validators.pattern('([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))')],
               'fax': ['', Validators.pattern('([0-9+]{1})([0-9 ]{2,14})')],
               'companyfax': ['', Validators.pattern('([0-9+]{1})([0-9 ]{2,14})')],
               language: new FormControl(''),
               creditCustomer: new FormControl(''),
               creditPeriod: new FormControl(''),
               creditLimit: new FormControl(''),
               creditTotal: new FormControl(''),
               blackListed: new FormControl(''),
               image1: new FormControl(''),
               salesoficercon: new FormControl(''),
               salesofficer: new FormControl(''),
               companyadd1: new FormControl(''),
               companyadd2: new FormControl(''),
               companyadd3: new FormControl(''),
               companyadd4: new FormControl(''),
               comowneraddress1: new FormControl(''),
               comowneraddress2: new FormControl(''),
               comowneraddress3: new FormControl(''),
               comowneraddress4: new FormControl(''),
               companyname: new FormControl(''),
               companyid: new FormControl(''),
               customernumber: new FormControl(''),
               othercustomernumber: new FormControl(''),
               image2: new FormControl(''),
               ownercontact: new FormControl(''),
               ownernic: new FormControl(''),
               formid: new FormControl(''),
               otherpartnersname: new FormControl(''),
               otherpatnersnic: new FormControl(''),
               blackListedReason: new FormControl(''),
               bankaccountname: new FormControl(''),
               bankaccountnumber: new FormControl(''),
               cutomerbank: new FormControl(''),
               bankbranch: new FormControl(''),
               debitcompany: new FormControl(''),
               debitlimit: new FormControl(''),
               debitperiod: new FormControl(''),
               customer: new FormControl(''),
               authperson: new FormControl(''),
               authperpost: new FormControl(''),
               dipositprice: new FormControl(''),
               authcontact: new FormControl('')
     
     
           });
           */
    }


    fiuiltercompanies(id: number) {

        let obj: CustomerCompany[] = this.allCompanyData
            .filter(CustomerCompany => CustomerCompany.customer.id === id);



        if (obj === undefined) {
        } else {
            //   console.log('here is filtered option ' + Json.stringify(obj));
            this.allCompanyOptionsForAccounts = [];
            this.allCompanyOptionsForAccounts.push({ label: 'Please Select', value: null });
            for (let company of obj) {
                this.allCompanyOptionsForAccounts.push({ label: company.companyName, value: company.id });
            }

        }

        console.log('here is the changed value mmm ' + this.selectedCustomer2);


    }

    changeDataAccounts(id) {
        console.log('here is the changed value acc ' + id);
   
        if (this.selectedAccount.id == 0) {
            if (id != null) {
                // this.fiuiltercompanies(x);
                let obj: CustomerCompany[] = this.allCompanyData
                    .filter(CustomerCompany => CustomerCompany.customer.id === parseInt(id));
                if (obj != undefined) {
                    //      console.log('here is filtered option ' + Json.stringify(obj));
                    this.allCompanyOptionsForAccounts = [];
                    this.allCompanyOptionsForAccounts.push({ label: 'Please Select', value: null });
                    for (let company of obj) {
                        this.allCompanyOptionsForAccounts.push({ label: company.companyName, value: company.id });
                    }
                }
            }
        }




    }

    changeDataDebit(id) {


        if (this.selectedDebit.id == 0) {
            if (id != null) {
                console.log('here is the changed value ' + id);
                // this.fiuiltercompanies(x);
             
                let obj: CustomerCompany[] = this.allCompanyData
                    .filter(CustomerCompany => CustomerCompany.customer.id === parseInt(id));
                if (obj != undefined) {
                    //        console.log('here is filtered option ' + Json.stringify(obj));
                    this.allCompanyOptionsForDebit = [];
                    this.allCompanyOptionsForDebit.push({ label: 'Please Select', value: null });
                    for (let company of obj) {
                        this.allCompanyOptionsForDebit.push({ label: company.companyName, value: company.id });
                    }
                }

            }
        }
    }

    changeDataRequestDebit(id) {

        if (this.selectedRequestDebit.id == 0) {
            if (id != null) {
                console.log('here is the changed value ' + id);
                // this.fiuiltercompanies(x);
                let obj: CustomerCompany[] = this.allCompanyData
                    .filter(CustomerCompany => CustomerCompany.customer.id === parseInt(id));
                if (obj != undefined) {
                    //     console.log('here is filtered option ' + Json.stringify(obj));
                    this.allCompanyOptionsForRequestDebit = [];
                    this.allCompanyOptionsForRequestDebit.push({ label: 'Please Select', value: null });
                    for (let company of obj) {
                        this.allCompanyOptionsForRequestDebit.push({ label: company.companyName, value: company.id });
                    }
                }

            }
        }



    }

    changeDataTransaction(id) {

        if (this.selectedTransaction.id == 0) {
            if (id != null) {
                console.log('here is the changed value ' + id);
                // this.fiuiltercompanies(x);
                let obj: CustomerCompany[] = this.allCompanyData
                    .filter(CustomerCompany => CustomerCompany.customer.id === parseInt(id));
                if (obj != undefined) {
                    //     console.log('here is filtered option ' + Json.stringify(obj));
                    this.allCompanyOptionsForTransaction = [];
                    this.allCompanyOptionsForTransaction.push({ label: 'Please Select', value: null });
                    for (let company of obj) {
                        this.allCompanyOptionsForTransaction.push({ label: company.companyName, value: company.id });
                    }
                }
            }
        }
    }


    changeDataPromisess(id) {


        if (this.selectedPromisess.id == 0) {
            if (id != null) {
                console.log('here is the changed value ' + id);
                // this.fiuiltercompanies(x);
                let obj: CustomerCompany[] = this.allCompanyData
                    .filter(CustomerCompany => CustomerCompany.customer.id === parseInt(id));
                if (obj != undefined) {
                    //   console.log('here is filtered option ' + Json.stringify(obj));
                    this.allCompanyOptionsForPromisess = [];
                    this.allCompanyOptionsForPromisess.push({ label: 'Please Select', value: null });
                    for (let company of obj) {
                        this.allCompanyOptionsForPromisess.push({ label: company.companyName, value: company.id });
                    }
                }
            }
        }

    }


    changeDataDirectors(id) {
        if (this.selectedDirector.id == 0) {

            if (id != null) {
                console.log('here is the changed value ' + id);
                // this.fiuiltercompanies(x);
                let obj: CustomerCompany[] = this.allCompanyData
                    .filter(CustomerCompany => CustomerCompany.customer.id === parseInt(id));
                if (obj != undefined) {
                    //    console.log('here is filtered option ' + Json.stringify(obj));
                    this.allCompanyOptionsForDirectors = [];
                    this.allCompanyOptionsForDirectors.push({ label: 'Please Select', value: null });
                    for (let company of obj) {
                        this.allCompanyOptionsForDirectors.push({ label: company.companyName, value: company.id });
                    }
                }

            }
        }


    }





    changeDataAccountsTable() {
        this.getAllCompanyData();
    }


    changeData(id) {
        if (id != null) {
            console.log('here is the changed value ' + id);

        }
    }

}
