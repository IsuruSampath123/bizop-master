import { FinishGoodGRN } from './../domain/FinshGoodGRN';
import { WebServResponce } from './../domain/WebServResponce';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';


@Injectable()
export class FinishGoodGRNservice {

    StoreList: FinishGoodGRN[];

    private commonService: CommonService = new CommonService();
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });

    /*private getAllUrl = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/getAll';
    private getmax = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/getMax';
    private saveUrl = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/save';
    private updateUrl = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/update';
    private deleteUrl = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/changeStatus';
    private updateQtyUrl = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/updateQty';
    private updateGRNQtyUrl = 'http://localhost:8080/erp.ws/salesAndDebtors/finshGoodGRN/UpdateRetrnQTY';*/



     private getAllUrl = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/getAll';
     private getmax = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/getMax';
     private saveUrl = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/save';
     private updateUrl = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/update';
     private deleteUrl = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/changeStatus';
     private updateQtyUrl = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/updateQty';
     private updateGRNQtyUrl = 'http://52.187.40.143:8080/erp.ws/salesAndDebtors/finshGoodGRN/UpdateRetrnQTY';




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

    savedata(data: FinishGoodGRN): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log("metana tama stringfy" + JSON.stringify(data));


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    editdata(data: FinishGoodGRN): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateQty(data: FinishGoodGRN): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log(JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateQtyUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateGRNQTY(data: FinishGoodGRN): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log(JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateGRNQtyUrl, body, options)
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