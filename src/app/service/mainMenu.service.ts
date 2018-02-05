import { Injectable } from '@angular/core';
import { MenuLevel1 } from '../domain/MenuLevel1';
import { MenuLevel2 } from '../domain/MenuLevel2';

@Injectable()
export class MainMenuService {

    menuLevel1List: MenuLevel1[];

    constructor() {
        this.menuLevel1List = [
            new MenuLevel1(1, 'Setup', 'fa-circle-o', '#', 1),
            new MenuLevel1(2, 'Transaction', 'fa-circle-o', '#', 2),
            new MenuLevel1(3, 'Reports Purchase and Creditors', 'fa-circle-o', '#', 3),
            new MenuLevel1(4, 'Maintenance', 'fa-circle-o', '#', 4),
            new MenuLevel1(5, 'Inventory entries', 'fa-circle-o', '#', 5),
            new MenuLevel1(6, 'Reports Productions', 'fa-circle-o', '#', 6),
            new MenuLevel1(7, 'Transactions Gl', 'fa-circle-o', '#', 7),
            new MenuLevel1(8, 'Transactions Juornals', 'fa-circle-o', '#', 8),
            new MenuLevel1(9, 'Transactions Reconsillation', 'fa-circle-o', '#', 9),
            new MenuLevel1(10, 'Reports Gl', 'fa-circle-o', '#', 10),
        ];
        this.menuLevel1List[0].setMenuLevel2List([
            new MenuLevel2(1, 'Item Catagory', 'fa-circle-o', '/catagory', 1, 1),
            new MenuLevel2(2, 'Item Sub Catagory', 'fa-circle-o', '/subCatagory', 2, 1),
            new MenuLevel2(3, 'Item Sub Sub Catagory', 'fa-circle-o', '/subSubCatagory', 3, 1),
            new MenuLevel2(4, 'Item Master', 'fa-circle-o', '/item', 4, 1),
            new MenuLevel2(5, 'Customer', 'fa-circle-o', '/customer', 5, 1),
            new MenuLevel2(6, 'Route', 'fa-circle-o', '/route', 6, 1),
            new MenuLevel2(7, 'City', 'fa-circle-o', '/city', 7, 1),
            new MenuLevel2(8, 'Reason', 'fa-circle-o', '/reason', 8, 1),
        ]);
        this.menuLevel1List[1].setMenuLevel2List([
            new MenuLevel2(1, 'Customer Specific Prices', 'fa-circle-o', '/customerSpecificPrice', 1, 1),
            new MenuLevel2(2, 'Blacklist Customer', 'fa-circle-o', '/customerBlacklist', 2, 1),
            new MenuLevel2(3, 'Customer Locations', 'fa-circle-o', '/customerLocations', 3, 1),
            new MenuLevel2(4, 'Order', 'fa-circle-o', '/order', 3, 1),
            new MenuLevel2(5, 'Cheque Returns', 'fa-circle-o', '/chequeReturns', 5, 1),
            new MenuLevel2(7, 'Refunds', 'fa-circle-o', '/refunds', 7, 1),
            new MenuLevel2(7, 'Service Invoice', 'fa-circle-o', '/serviceInvoice', 7, 1)
        ]);
        this.menuLevel1List[2].setMenuLevel2List([
            new MenuLevel2(1, 'Purchases Analysis', 'fa-circle-o', '/purchasesAnalysis', 1, 1),
            new MenuLevel2(2, 'Age Analysis', 'fa-circle-o', '/ageAnalysis', 2, 1),
            new MenuLevel2(3, 'Supplier History', 'fa-circle-o', '/supplierHistory', 3, 1),
            new MenuLevel2(4, 'Payments', 'fa-circle-o', '/payments', 4, 1),
            new MenuLevel2(5, 'Debit Notes', 'fa-circle-o', '/debitNotes', 5, 1),
            new MenuLevel2(6, 'Credit Notes', 'fa-circle-o', '/creditNotes', 6, 1),
            new MenuLevel2(7, 'Cheque Returns Report', 'fa-circle-o', '/chequeReturnsReport', 7, 1),
            new MenuLevel2(8, 'Payment Refunds', 'fa-circle-o', '/paymentRefunds', 8, 1)
        ]);

        this.menuLevel1List[3].setMenuLevel2List([
            new MenuLevel2(1, 'Users', 'fa-circle-o', '/users', 1, 1),
        ]);

        this.menuLevel1List[4].setMenuLevel2List([
            new MenuLevel2(1, 'Raw Goods Receipts', 'fa-circle-o', '/rawGoodsReceipts', 1, 1),
            new MenuLevel2(2, 'Producton', 'fa-circle-o', '/production', 2, 1),
            new MenuLevel2(3, 'Rejection', 'fa-circle-o', '/rejection', 3, 1),
            new MenuLevel2(4, 'Stock Transfer', 'fa-circle-o', '/stockTransfer', 4, 1),
            new MenuLevel2(5, 'Goods Returns Issue', 'fa-circle-o', '/goodsReturnsIssue', 5, 1),
            new MenuLevel2(6, 'Stock Adjustment', 'fa-circle-o', '/stockAdjustment', 6, 1),
            new MenuLevel2(7, 'Good Return MonthEnd ', 'fa-circle-o', '/goodReturnMonthEnd', 7, 1),
            new MenuLevel2(8, 'Inventory', 'fa-circle-o', '/inventory', 8, 1),
            new MenuLevel2(9, 'Inventory Distribution', 'fa-circle-o', '/inventoryDistribution', 9, 1),
            new MenuLevel2(10, 'PD ReceiptPrint', 'fa-circle-o', '/pdReceiptPrint', 10, 1)
        ]);

        this.menuLevel1List[5].setMenuLevel2List([
            new MenuLevel2(1, 'Production Reports', 'fa-circle-o', '/productionReports', 1, 1),
            new MenuLevel2(2, 'Log', 'fa-circle-o', '/log', 2, 1),
        ]);

        this.menuLevel1List[6].setMenuLevel2List([
            new MenuLevel2(1, 'Payments', 'fa-circle-o', '/paymentsGl', 1, 1),
            new MenuLevel2(2, 'Receipts', 'fa-circle-o', '/receiptsGl', 2, 1),
            new MenuLevel2(3, 'JournalTemplate', 'fa-circle-o', '/journalTemplate', 2, 1)
        ]);

        this.menuLevel1List[7].setMenuLevel2List([
            new MenuLevel2(1, 'Monthly Journals', 'fa-circle-o', '/monthlyJournals', 1, 1),
            new MenuLevel2(1, 'System Journals', 'fa-circle-o', '/systemJournals', 1, 1)
        ]);

        this.menuLevel1List[8].setMenuLevel2List([
            new MenuLevel2(1, 'Receipt', 'fa-circle-o', '/bankReconsillationReceipts', 1, 1),
            new MenuLevel2(1, 'Payments', 'fa-circle-o', '/bankReconsillationPayments', 2, 1),

        ]);

        this.menuLevel1List[9].setMenuLevel2List([
            new MenuLevel2(1, 'Payment Register', 'fa-circle-o', '/paymentRegister', 1, 1),
            new MenuLevel2(2, ' Un Posted Entries', 'fa-circle-o', '/unPostedEntries', 2, 1),
            new MenuLevel2(3, 'Unbalance Audit Trials', 'fa-circle-o', '/unbalanceAuditTrials', 3, 1),
            new MenuLevel2(4, 'Bank Reconsillation', 'fa-circle-o', '/bankReconsillation', 4, 1)


        ]);
    }

    getMenuLevel1List() {
        return this.menuLevel1List;
    }

}