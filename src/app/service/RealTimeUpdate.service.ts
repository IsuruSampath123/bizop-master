import { RealTimeUpdate } from '../domain/RealTimeUpdate';
import { WebServResponce } from './../domain/WebServResponce';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';



@Injectable()
export class RealTimeUpdateservice {

    QualityParameterList: RealTimeUpdate[];

    private commonService: CommonService = new CommonService();
    private headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Request-Headers': 'x-requested-width', 'Access-Control-Allow-Headers': 'x-requested-width' });
    private getAllUrl = 'http://52.187.40.143:8080/erp.ws/setup/realTimeUpdate/getAll';
    private getmax = 'http://52.187.40.143:8080/erp.ws/setup/realTimeUpdate/getMax';
    private saveUrl = 'http://52.187.40.143:8080/erp.ws/setup/realTimeUpdate/save';
    private updateUrl = 'http://52.187.40.143:8080/erp.ws/setup/realTimeUpdate/update';
    private deleteUrl = 'http://52.187.40.143:8080/erp.ws/setup/realTimeUpdate/changeStatus';
    private allreadyExistUrl = 'http://52.187.40.143:8080/erp.ws/setup/realTimeUpdate/allreadyExist';

    /**private getAllCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/getAll';
    private saveCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/save';
    private updateCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/update';
    private deleteCatagoryUrl = 'http://myapp.jvmhost.net/erp.ws/Item/Category/changeStatus';*/

    allRealTimeData: RealTimeUpdate[];
    setValues: RealTimeUpdate;
    total = 0;
    errorMessage: string;
    successMessage: string;


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

    savedata(data: RealTimeUpdate): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log("metana tama stringfy" + JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.saveUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    allreadyexist(data: RealTimeUpdate): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        console.log("metana tama stringfy" + JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.allreadyExistUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }



    editdata(data: RealTimeUpdate): Observable<WebServResponce> {
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.updateUrl, body, options)
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


    getRealTimeUpdate() {
        let webServResponce: WebServResponce;
        this.getAlldata()
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.allRealTimeData = <RealTimeUpdate[]>webServResponce.result;
                  //  console.log('get all called');
                    // this.Chekavailability();
                    let total2 = 0;
                    for (let i = 0; i < this.allRealTimeData.length; i++) {
                        total2 = total2 + 1;
                    }
                    this.total = total2;
                    //console.log('total ' + this.total);


                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }

    setValeToRealTimeUpdate(x:string) {
        let webServResponce: WebServResponce;
        this.setValues = new RealTimeUpdate(null, 1, x);
        console.log('save ');
        this.savedata(this.setValues)
            .subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {

                    console.log('saved');

                    //this.Notification('info', 'Success', 'Data Saved to realtime update');
                }
                if (webServResponce.statusId == 500) {
                    console.log('status id after save ' + webServResponce.statusId);
                }
                else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
            );
    }

    deleteRealTimeUpdate() {
        let webServResponce: WebServResponce;
        this.deletedata(1).subscribe(
            resObj => {
                webServResponce = resObj;
                if (webServResponce.statusId == 200) {
                    this.getRealTimeUpdate();
                    //  this.Notification('error', 'Success', 'rel time update Deleted');
                } else {
                    this.errorMessage = webServResponce.errMessage;
                }
            }
            ,
            error => this.errorMessage = <any>error
        );
    }









}