
import { WebServResponce } from './../domain/WebServResponce';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';
import { OrderFreeIssueItem } from '../domain/OrderFreeIssueItems';


@Injectable()
export class OrderFreeIssueItemservice {

    StoreList: OrderFreeIssueItem[];

    private commonService : CommonService  = new CommonService();
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });

    private getAllUrl = 'http://52.187.40.143:8080/erp.ws/sales/orderFreeIssue/getAll';
    private getmax='http://52.187.40.143:8080/erp.ws/sales/orderFreeIssue/getMax';
    private saveUrl = 'http://52.187.40.143:8080/erp.ws/sales/orderFreeIssue/save';
    private updateUrl = 'http://52.187.40.143:8080/erp.ws/sales/orderFreeIssue/update';
    private deleteUrl = 'http://52.187.40.143:8080/erp.ws/sales/orderFreeIssue/changeStatus';

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

    savedata(data: OrderFreeIssueItem): Observable<WebServResponce>  {
        let body = JSON.stringify(data);   
        console.log("item free isuueee  "+JSON.stringify(data));

        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
            
    }

    editdata(data: OrderFreeIssueItem): Observable<WebServResponce>  {
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