import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../domain/Customer';
import { CommonService } from './common.service';
import { WebServResponce } from '../domain/WebServResponce';

@Injectable()
export class CustomerBlacklistService {

    customerList: Customer[];
    private commonService : CommonService  = new CommonService();CommonService ;
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });
    
    /**private getAllCustomerUrl = 'http://localhost:8080/erp.ws/Customer/Main/getAll';
    private updateCustomerBlacklistrUrl = 'http://localhost:8080/erp.ws/Customer/Main/blackList';*/

    private getAllCustomerUrl = 'http://myapp.jvmhost.net/erp.ws/Customer/Main/getAll';
    private updateCustomerBlacklistrUrl = 'http://myapp.jvmhost.net/erp.ws/Customer/Main/blackList';
    

    constructor(private http: Http) { 
        
    }

    getAllCustomers(): Observable<WebServResponce> {
        return this.http.get(this.getAllCustomerUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateBlackListDetails(customer: Customer): Observable<WebServResponce>  {
        console.log(customer);
        let body = JSON.stringify(customer);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateCustomerBlacklistrUrl, body, options)
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