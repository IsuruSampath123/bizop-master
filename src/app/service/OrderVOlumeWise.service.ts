import { WebServResponce } from './../domain/WebServResponce';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { OrderVolumeWise } from "../domain/OrderVolumeWise";



@Injectable()
export class OrderVolumeWiseservice {

    itemtypeList: OrderVolumeWise[];

    private commonService : CommonService  = new CommonService();
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });

    private getAllUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/order_volume/getAll';
    private getmax='http://52.187.40.143:8080/erp.ws/ssales_and_debtors/order_volume/getMax';
    private saveUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/order_volume/save';
    private updateUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/order_volume/update';
    private deleteUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/order_volume/changeStatus';
    private allreadyExistUrl = 'http://52.187.40.143:8080/erp.ws/sales_and_debtors/order_volume/allreadyExist';
    
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

    savedata(data: OrderVolumeWise): Observable<WebServResponce>  {
        let body = JSON.stringify(data);   
        console.log("metana tama stringfy"+JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    allreadyexist(data: OrderVolumeWise): Observable<WebServResponce>  {
        let body = JSON.stringify(data);
        console.log("metana tama stringfy"+JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.allreadyExistUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    editdata(data: OrderVolumeWise): Observable<WebServResponce>  {
        let body = JSON.stringify(data);   
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deletedata(id: number): Observable<WebServResponce>  {
        let body = JSON.stringify({"id":id,"status":0});
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