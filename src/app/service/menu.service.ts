import { MenuItem } from './../domain/MenuItem';

import { Injectable } from '@angular/core';
@Injectable()
export class MenuService {
    menuItemsList = [
        new MenuItem(1, 'company', 'fa-pencil-square-o', '/company', true, false,
            [
            ]
        ),
        new MenuItem(1, 'storeType', 'fa-pencil-square-o', '/storeType', true, false,
            [
            ]
        ),
        new MenuItem(1, 'store', 'fa-pencil-square-o', '/store', true, false,
            [
            ]
        ),
        new MenuItem(1, 'RepRegister', 'fa-pencil-square-o', '/RepRegister', true, false,
            [
            ]
        ),
        new MenuItem(1, 'CollectionRepRegister', 'fa-pencil-square-o', '/CollectionRepRegister', true, false,
            [
            ]
        ), new MenuItem(1, 'SalesRep', 'fa-pencil-square-o', '/SalesRep', true, false,
            [
            ]
        ), new MenuItem(1, 'SalesManager', 'fa-pencil-square-o', '/SalesManager', true, false,
            [
            ]
        ),
        new MenuItem(1, 'AsistanceSalesManager', 'fa-pencil-square-o', '/AsistanceSalesManager', true, false,
            [
            ]
        ),
        new MenuItem(1, 'Branch', 'fa-pencil-square-o', '/Branch', true, false,
            [
            ]
        ),

        new MenuItem(1, 'Show room', 'fa-pencil-square-o', '/Showroom', true, false,
            [
            ]
        ),
        new MenuItem(1, 'Distribution Point', 'fa-pencil-square-o', '/DistributionPoint', true, false,
            [
            ]
        ),

        new MenuItem(1, 'ItemType', 'fa-pencil-square-o', '/ItemType', true, false,
            [
            ]
        ),


        new MenuItem(1, 'Main Catagory', 'fa-pencil-square-o', '/MainCatagoryComponent', true, false,
            [
            ]
        ),

        new MenuItem(1, 'Sub Catagory', 'fa-pencil-square-o', '/SubCatagory', true, false,
            [
            ]
        ),

        new MenuItem(1, 'Sub Sub Catagory', 'fa-pencil-square-o', '/SubSubCatagory', true, false,
            [
            ]
        ),

        new MenuItem(1, 'FreeIssue Component', 'fa-pencil-square-o', '/FreeIssueComponent', true, false,
            [
            ]
        ),


        new MenuItem(1, 'Qulity Parameter', 'fa-pencil-square-o', '/QulityParameter', true, false,
            [
            ]
        ),
        new MenuItem(1, 'Item Master', 'fa-pencil-square-o', '/ItemMaster', true, false,
            [
            ]
        ),
        new MenuItem(1, 'Customer Specific Price', 'fa-pencil-square-o', '/CustomerSpecificPrice', true, false,
            [
            ]
        )
        ,


        new MenuItem(1, 'Area', 'fa-pencil-square-o', '/jack', true, false,
            []
        ),
        new MenuItem(1, 'Tax Type', 'fa-pencil-square-o', '/taxType', true, false,
            []
        ), new MenuItem(1, 'City', 'fa-pencil-square-o', '/city', true, false,
            []
        ), new MenuItem(1, 'Reason Category', 'fa-pencil-square-o', '/reasonCategory', true, false,
            []
        ),
        new MenuItem(1, 'Department', 'fa-pencil-square-o', '/department', true, false,
            []
        ),
        new MenuItem(1, 'Order Type', 'fa-pencil-square-o', '/orderType', true, false,
            []
        ), new MenuItem(1, 'Route', 'fa-pencil-square-o', '/route', true, false,
            []
        ),
        new MenuItem(1, 'Supplier Group', 'fa-pencil-square-o', '/supplierGroup', true, false,
            []
        ),
        new MenuItem(1, 'Vehicle Type', 'fa-pencil-square-o', '/vehicleType', true, false,
            []
        ), new MenuItem(1, 'Machine Type', 'fa-pencil-square-o', '/machineType', true, false,
            []
        ), new MenuItem(1, 'Qulity Parameter', 'fa-pencil-square-o', '/qulityParameter', true, false,
            []
        ), new MenuItem(1, 'Bank', 'fa-pencil-square-o', '/bank', true, false,
            []
        ),
        new MenuItem(1, 'Reason', 'fa-pencil-square-o', '/reason', true, false,
            []
        ),
        new MenuItem(1, 'Customer', 'fa-pencil-square-o', '/customer', true, false,
            []
        ),
        new MenuItem(1, 'sealsRep', 'fa-pencil-square-o', '/sealsRep', true, false,
            []
        ),
        new MenuItem(1, 'Supplier', 'fa-pencil-square-o', '/supplier', true, false,
            []
        ),
        new MenuItem(1, 'Customer Location', 'fa-pencil-square-o', '/customerLocation', true, false,
            []
        ), new MenuItem(1, 'Customer BlackList', 'fa-pencil-square-o', '/customerBlackList', true, false,
            []
        ), new MenuItem(1, 'Wholesale Price', 'fa-pencil-square-o', '/wholesalePrice', true, false,
            []
        )



    ];



    SalesandDebtors = [
        new MenuItem(1, 'FinishGoodGRN', 'fa-pencil-square-o', '/FinishGoodGRN', true, false,
            [
            ]
        ),
        new MenuItem(1, 'Order', 'fa-pencil-square-o', '/Order', true, false,
            [
            ]
        )
        ,
        new MenuItem(1, 'Invoice', 'fa-pencil-square-o', '/Invoice', true, false,
            [
            ]
        )

        ,
        new MenuItem(1, 'Receipt', 'fa-pencil-square-o', '/receipt', true, false,
            []
        ),
        new MenuItem(1, 'Debit Note', 'fa-pencil-square-o', '/debitNote', true, false,
            []
        ), new MenuItem(1, 'Credit Note', 'fa-pencil-square-o', '/creditNote', true, false,
            []
        ),
        new MenuItem(1, 'Cheque Returns', 'fa-pencil-square-o', '/chequeReturns', true, false,
            []
        ),
        new MenuItem(1, 'Sales Return', 'fa-pencil-square-o', '/salesReturn', true, false,
            []
        )


    ]


}
