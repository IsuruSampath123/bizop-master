import { Invoice } from './../domain/invoice';
import { WebServResponce } from './../domain/WebServResponce';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';


@Injectable()
export class InvoiceService {

    StoreList: Invoice[];

    private commonService: CommonService = new CommonService();
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });

    private getAllUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/invoice/getAll';
    private getmax = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/invoice/getMax';
    private saveUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/invoice/save';
    private updateUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/invoice/update';
    private deleteUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/invoice/changeStatus';
    private updateQtyUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/invoice/updateQty';


    /**private getAllCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/getAll';
    private saveCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/save';
    private updateCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/update';
    private deleteCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/changeStatus';*/

    constructor(private http: Http) {
    }

    getAlldata(): Observable<WebServResponce> {
        return this.http.get(this.getAllUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getMax(): Observable<WebServResponce> {
        return this.http.get(this.getmax)
            .map(this.extractData)
            .catch(this.handleError);
    }

    savedata(data: Invoice): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log("metana tama stringfy" + JSON.stringify(data));


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    editdata(data: Invoice): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateQty(data: Invoice): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log(JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateQtyUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    deletedata(id: number): Observable<WebServResponce> {
        let body = JSON.stringify({ "id": id, "status": 0 });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.deleteUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

}