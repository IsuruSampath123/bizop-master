import { HttpModule } from '@angular/http';
import { ButtonModule, DataTableModule } from 'primeng/primeng';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { Routes, RouterModule } from '@angular/router';
import './rxjs-operators';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import 'hammerjs';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { MainwrapperComponent } from './mainwrapper/mainwrapper.component';
import { WidgetHeaderButtonCompComponent } from './widget-header-button-comp/widget-header-button-comp.component';
import { ButtonFooterComponent } from './button-footer/button-footer.component';
import { JacktestComponent } from "./SDI/Setup/jacktest/jacktest.component";
import { MenuService } from "./service/menu.service";
import { AreaService } from "./service/area.service";
import { CommonService } from "./service/common.service";
import { GrowlModule } from "../assets/primeng/primeng";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storetypeservice } from "./service/StoreType.service";
import { StoreTypesComponent } from "./SDI/Setup/StoreType/StoreType.component";
import { CompanyComponent } from "./SDI/Setup/company/company.component";
import { Companyservice } from "./service/Company.service";
import { StoreComponent } from "./SDI/Setup/Store/Store.component";
import { Storeservice } from "./service/Store.service";
import { RegisterRepComponent } from "./SDI/Setup/RegisterRep/RegisterRep.component";
import { RegisterRepservice } from "./service/RepRegister.service";
import { RegisterCollectionRepComponent } from "./SDI/Setup/RegisterCollectionRep/RegisterCollectionRep.component";
import { RegisterCollectionRepservice } from "./service/CollectionRepRegister.service";
import { SalesRepComponent } from "./SDI/Setup/SalesRep/SalesRep.component";
import { ManageSaleRepservice } from "./service/ManageSalesRep.service";
import { ItemMasterservice } from "./service/ItemMaster.service";
import { SubCatagoryservice } from './service/SubCatagory.service';
import { SubSubCatagoryservice } from "./service/subSubCatagory.service";
import { SalesRepItemservice } from "./service/SalesRepItems.service";
import { AssignCustomerservice } from "./service/assignCustomer.service";
import { CustomerSpecificPriceService } from "./service/customerSpecificPrice.service";
import { MainCatagoryservice } from "./service/maincatagory.service";
import { CustomerService } from "./service/customer.service";
import { SalesManagerComponent } from "./SDI/Setup/SalesManager/SalesManager.component";
import { SalesManagerservice } from "./service/SalesManagerservice";
import { AsistanceSalesManagerComponent } from "./SDI/Setup/AsistanceSalesManager/AsistanceSalesManager.component";
import { AsistanceSalesManagerservice } from "./service/AsistanceSalesManger.service";
import { BranchComponent } from "./SDI/Setup/Branch/Branch.component";
import { Branchservice } from "./service/Branch.service";
import { ShowRoomComponent } from "./SDI/Setup/ShowRoom/ShowRoom.component";
import { ShowRoomservice } from "./service/ShowRoom.service";
import { DistributionPointComponent } from "./SDI/Setup/DistributionPoint/DistributionPoint.component";
import { DistributionPointservice } from "./service/DistributionPoint.service";
import { FreeIssueComponent } from "./SDI/Setup/FreeIssue/FreeIssue.component";
import { CatagoryWiseFreeIssueservice } from "./service/CatagoryWiseFreeIssue.service";
import { VolumeWiseFreeIssueservice } from "./service/VolumeWiseFreeIssue.service";
import { ItemWiseFreeIssueservice } from "./service/ItemWiseFreeIssue.service";
import { MainCatagoryComponent } from "./SDI/Setup/MainCatagory/MainCatagory.component";
import { ItemTypeservice } from "./service/itemtype.service";
import { ItemTypeComponent } from "./SDI/Setup/ItemType/ItemType.component";
import { SubCatagoryComponent } from "./SDI/Setup/SubCatagory/SubCatagory.component";
import { SubSubCatagoryComponent } from "./SDI/Setup/SubSubCatagory/SubSubCatagory.component";
import { ItemMasterComponent } from "./SDI/Setup/ItemMaster/ItemMaster.component";
import { ItemsQualityParameterservice } from "./service/ItemsQualityParameter.service";
import { QualityParameterservice } from "./service/QualityParameter.service";
import { QulityParameterComponent } from "./SDI/Setup/qulityParameter/qulityParameter.component";
import { FinishGoodGRNComponent } from "./SDI/Transactions/Sales&Debtors/FinishGoodGRN/FinishGoodGRN.component";
import { FinishGoodGRNservice } from "./service/FinishGoodGRN.service";
import { SupplierService } from "./service/supplier.service";
import { OrderComponent } from "./SDI/Transactions/Sales&Debtors/Order/Order.component";
import { Ordersservice } from "./service/orders.service";
import { OrderVolumeWiseservice } from "./service/OrderVOlumeWise.service";
import { OrderTypeService } from "./service/orderType.service";
import { WholesalePriceService } from "./service/wholesalePrice.service";
import { WholesaleItemService } from "./service/wholesaleItem.service";
import { OrderFreeIssueItemservice } from "./service/OrderFreeIssueItems.service";
import { CustomerCompanyService } from "./service/customerCompany.service";
import { OrdersPricesService } from "./service/OrdersPrices.service";
import { InvoiceComponent } from "./SDI/Transactions/Sales&Debtors/Invoice/Invoice.component";
import { InvoicePricesService } from "./service/InvoicePrices.service";
import { InvoiceItemsSaveservice } from "./service/InvoiceFreeisuuItemsSave.service";
import { InvoiceService } from "./service/invoice.service";
import { TemporyVolumeservice } from "./service/TemporyVolume.service";
import { ReasonCatagoryService } from "./service/reasonCatagory.service";
import { ReasonService } from "./service/reason.service";
import { CustomerSpecificPriceComponent } from "./SDI/Setup/CustomerSpecificPrice/CustomerSpecificPrice.component";
import { AreaComponent } from "./SDI/Setup/areas/areas.component";
import { TaxTypeComponent } from "./SDI/Setup/taxType/taxType.component";
import { CityComponent } from "./SDI/Setup/city/city.component";
import { ReasonCategoryComponent } from "./SDI/Setup/reasonCategory/reasonCategory.component";
import { DepartmentComponent } from "./SDI/Setup/department/department.component";
import { OrderTypeComponent } from "./SDI/Setup/orderType/orderType.component";
import { RouteComponent } from "./SDI/Setup/route/route.component";
import { SupplierGroupComponent } from "./SDI/Setup/supplierGroup/supplierGroup.component";
import { VehicleTypeComponent } from "./SDI/Setup/vehicleType/vehicleType.component";
import { MachineTypeComponent } from "./SDI/Setup/machineType/machineType.component";
import { BankComponent } from "./SDI/Setup/bank/bank.component";
import { ReasonComponent } from "./SDI/Setup/reason/reason.component";
import { CustomerComponent } from "./SDI/Setup/customer/customer.component";
import { SupplierComponent } from "./SDI/Setup/supplier/supplier.component";
import { CustomerLocationsComponent } from "./SDI/Setup/customerLocations/customerLocations.component";
import { CustomerBlackListComponent } from "./SDI/Setup/customerBlackList/customerBlackList.component";
import { WholesalePriceComponent } from "./SDI/Setup/wholesalePrice/wholesalePrice.component";
import { ReceiptComponent } from "./SDI/Transactions/Sales&Debtors/receipt/receipt.component";
import { DebitNoteComponent } from "./SDI/Transactions/Sales&Debtors/debitNote/debitNote.component";
import { CreditNoteComponent } from "./SDI/Transactions/Sales&Debtors/creditNote/creditNote.component";
import { ChequeReturnsComponent } from "./SDI/Transactions/Sales&Debtors/chequeReturns/chequeReturns.component";
import { SalesReturnComponent } from "./SDI/Transactions/Sales&Debtors/salesReturn/salesReturn.component";
import { TaxTypeService } from "./service/taxType.service";
import { MachineTypeService } from "./service/machineType.service";
import { MachineService } from "./service/machine.service";
import { MachineMaintanceService } from "./service/machineMaintance.service";
import { RouteService } from "./service/route.service";
import { DepartmentService } from "./service/department.service";
import { BankService } from "./service/bank.service";
import { CityService } from "./service/city.service";
import { CustomerDirectorsService } from "./service/customerDirectors.service";
import { CustomerAccountsService } from "./service/customerAccounts.service";
import { CustomerDebitService } from "./service/customerDebit.service";
import { CustomerRequestDebitService } from "./service/customerRequestDebit.service";
import { CustomerTransactionService } from "./service/customerTranaction.service";
import { CustomerPromisessService } from "./service/customerPromisess.service";
import { CustomerLocationService } from "./service/customerLocation.service";
import { CustomerContactService } from "./service/customerContact.service";
import { VehicleTypeService } from "./service/vehicleType.service";
import { VehicleService } from "./service/vehicle.service";
import { SupplierGroupService } from "./service/supplierGroup.service";
import { InvoiceFreeIsuuessService } from "./service/InvoiceFreeIssuees.service";
import { SupplierContactPersonService } from "./service/supplierContactPerson.service";
import { SupplierAccountService } from "./service/supplierAccount.service";
import { SupplierTaxService } from "./service/supplierTax.service";
import { ChequeReturnService } from "./service/chequeReturn.service";
import { ReceiptService } from "./service/receipt.service";
import { DebitNoteService } from "./service/debitNote.service";
import { CreditNoteService } from "./service/creditNote.service";
import { SalesReturnService } from "./service/salesReturn.service";
import { ReturnItemsService } from "./service/returnItems.service";
import { LanguageService } from "./service/language.service";




const routes: Routes = [
  {
    path: '',
    component: MainwrapperComponent

  },

  {
    path: 'jack',
    component: JacktestComponent
  },
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: 'content/:id',
    component: ContentComponent
  },
  {
    path: 'storeType',
    component: StoreTypesComponent
  }
  ,
  {
    path: 'company',
    component: CompanyComponent
  }
  ,
  {
    path: 'store',
    component: StoreComponent
  }
  ,
  {
    path: 'RepRegister',
    component: RegisterRepComponent
  }
  ,
  {
    path: 'CollectionRepRegister',
    component: RegisterCollectionRepComponent
  }
  ,
  {
    path: 'SalesRep',
    component: SalesRepComponent
  }
  ,
  {
    path: 'SalesManager',
    component: SalesManagerComponent
  }
  ,
  {
    path: 'AsistanceSalesManager',
    component: AsistanceSalesManagerComponent
  }
  ,
  {
    path: 'Branch',
    component: BranchComponent
  }
  ,
  {
    path: 'Showroom',
    component: ShowRoomComponent
  }
  ,
  {
    path: 'DistributionPoint',
    component: DistributionPointComponent
  },
  {
    path: 'FreeIssueComponent',
    component: FreeIssueComponent
  }
  ,
  {
    path: 'MainCatagoryComponent',
    component: MainCatagoryComponent
  },
  {
    path: 'ItemType',
    component: ItemTypeComponent
  },
  {
    path: 'SubCatagory',
    component: SubCatagoryComponent
  },
  {
    path: 'SubSubCatagory',
    component: SubSubCatagoryComponent
  },
  {
    path: 'ItemMaster',
    component: ItemMasterComponent
  },
  {
    path: 'QulityParameter',
    component: QulityParameterComponent
  },
  {
    path: 'FinishGoodGRN',
    component: FinishGoodGRNComponent
  },
  {
    path: 'Order',
    component: OrderComponent
  }
  ,
  {
    path: 'Invoice',
    component: InvoiceComponent
  }
  ,
  {
    path: 'CustomerSpecificPrice',
    component: CustomerSpecificPriceComponent
  }
  ,
  {
    path: 'taxType',
    component: TaxTypeComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
  {
    path: 'reasonCategory',
    component: ReasonCategoryComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },
  {
    path: 'orderType',
    component: OrderTypeComponent
  },
  {
    path: 'route',
    component: RouteComponent
  },
  {
    path: 'supplierGroup',
    component: SupplierGroupComponent
  },
  {
    path: 'vehicleType',
    component: VehicleTypeComponent
  },
  {
    path: 'machineType',
    component: MachineTypeComponent
  },
  {
    path: 'qulityParameter',
    component: QulityParameterComponent
  },
  {
    path: 'bank',
    component: BankComponent
  },
  {
    path: 'reason',
    component: ReasonComponent
  },

  {
    path: 'customer',
    component: CustomerComponent
  }, {
    path: 'sealsRep',
    component: SalesRepComponent
  },
  {
    path: 'supplier',
    component: SupplierComponent
  },
  {
    path: 'customerLocation',
    component: CustomerLocationsComponent
  },
  {
    path: 'wholesalePrice',
    component: WholesalePriceComponent
  },
  {
    path: 'customerBlackList',
    component: CustomerBlackListComponent
  },
  {
    path: 'receipt',
    component: ReceiptComponent
  },
  {
    path: 'debitNote',
    component: DebitNoteComponent
  },
  {
    path: 'creditNote',
    component: CreditNoteComponent
  },
  {
    path: 'chequeReturns',
    component: ChequeReturnsComponent
  },
  {
    path: 'salesReturn',
    component: SalesReturnComponent
  }


];



@NgModule({
  declarations: [
    AppComponent,
    LeftMenuComponent,
    HeaderComponent,
    ContentComponent,
    MainwrapperComponent,
    WidgetHeaderButtonCompComponent,
    ButtonFooterComponent,
    JacktestComponent,
    StoreTypesComponent,
    CompanyComponent,
    StoreComponent,
    RegisterRepComponent,
    RegisterCollectionRepComponent,
    SalesRepComponent,
    SalesManagerComponent,
    AsistanceSalesManagerComponent,
    BranchComponent,
    ShowRoomComponent,
    DistributionPointComponent,
    FreeIssueComponent,
    MainCatagoryComponent,
    ItemTypeComponent,
    SubCatagoryComponent,
    SubSubCatagoryComponent,
    ItemMasterComponent,
    QulityParameterComponent,
    FinishGoodGRNComponent,
    OrderComponent,
    InvoiceComponent,
    CustomerSpecificPriceComponent,
    AreaComponent,
    TaxTypeComponent,
    CityComponent,
    ReasonCategoryComponent,
    DepartmentComponent,
    OrderTypeComponent,
    RouteComponent,
    SupplierGroupComponent,
    VehicleTypeComponent,
    MachineTypeComponent,
    QulityParameterComponent,
    BankComponent,
    ReasonComponent,
    CustomerComponent,
    SalesRepComponent,
    SupplierComponent,
    CustomerLocationsComponent,
    CustomerBlackListComponent,
    WholesalePriceComponent,
    ReceiptComponent,
    DebitNoteComponent,
    CreditNoteComponent,
    ChequeReturnsComponent,
    SalesReturnComponent

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,

    DataTableModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    GrowlModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    FlexLayoutModule,

  ],
  providers: [
    MenuService,
    AreaService,
    CommonService,
    Storetypeservice,
    Companyservice,
    Storeservice,
    RegisterRepservice,
    RegisterCollectionRepservice,
    ManageSaleRepservice,
    ItemMasterservice,
    SubCatagoryservice,
    SubSubCatagoryservice,
    SalesRepItemservice,
    AssignCustomerservice,
    CustomerSpecificPriceService,
    MainCatagoryservice,
    CustomerService,
    SalesManagerservice,
    AsistanceSalesManagerservice,
    Branchservice,
    ShowRoomservice,
    DistributionPointservice,
    CatagoryWiseFreeIssueservice,
    VolumeWiseFreeIssueservice,
    ItemWiseFreeIssueservice,
    ItemTypeservice,
    ItemsQualityParameterservice,
    QualityParameterservice,
    FinishGoodGRNservice,
    SupplierService,
    OrderTypeService,
    Ordersservice,
    OrderVolumeWiseservice,
    WholesalePriceService,
    WholesaleItemService,
    OrderFreeIssueItemservice,
    CustomerCompanyService,
    OrdersPricesService,
    InvoicePricesService,
    InvoiceItemsSaveservice,
    InvoiceService,
    TemporyVolumeservice,
    ReasonCatagoryService,
    ReasonService,


    TaxTypeService,
    MachineTypeService,
    MachineService,
    MachineMaintanceService,

    RouteService,

    DepartmentService,
    BankService,
    CityService,

    CustomerDirectorsService,
    CustomerAccountsService,
    CustomerDebitService,
    CustomerRequestDebitService,
    CustomerTransactionService,
    CustomerPromisessService,
    CustomerLocationService,
    CustomerContactService,
    VehicleTypeService,
  
    VehicleService,
    OrderTypeService,
    Ordersservice,
    SupplierGroupService,
    SupplierService,
    BankService,

    InvoiceFreeIsuuessService,

    SupplierContactPersonService,
    SupplierAccountService,
    SupplierTaxService,
    ChequeReturnService,
    ReceiptService,
    DebitNoteService,
    CreditNoteService,
    SalesReturnService,
    ReturnItemsService,
    AssignCustomerservice,
    LanguageService






  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


