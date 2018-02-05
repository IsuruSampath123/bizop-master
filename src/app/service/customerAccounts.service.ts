
import { CustomerAccounts } from '../domain/CustomerAccounts';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CommonService } from './common.service';
import { WebServResponce } from '../domain/WebServResponce';


@Injectable()
export class CustomerAccountsService {
   customerAccountList: CustomerAccounts[];
    private commonService: CommonService = new CommonService();
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });

    private getAllUrl = 'http://52.187.40.143:8080/erp.ws/setup/customer/accountDetail//getAll';
    private saveUrl = 'http://52.187.40.143:8080/erp.ws/setup/customer/accountDetail//save';
    private updateUrl = 'http://52.187.40.143:8080/erp.ws/setup/customer/accountDetail//update';
    private deleteUrl = 'http://52.187.40.143:8080/erp.ws/setup/customer/accountDetail//changeStatus';
    private getMaxUrl = 'http://52.187.40.143:8080/erp.ws/setup/customer/accountDetail//getMax';

    constructor(private http: Http) { }

    getAllData(): Observable<WebServResponce> {
        return this.http.get(this.getAllUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMaxData(): Observable<WebServResponce> {
        return this.http.get(this.getMaxUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    saveData(data: CustomerAccounts): Observable<WebServResponce> {
        let body = JSON.stringify(data);
console.log(JSON.stringify(data));


        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editData(data: CustomerAccounts): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteData(id: number): Observable<WebServResponce> {
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