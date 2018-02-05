import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ItemType } from '../domain/ItemType';

@Injectable()
export class CommonService {
    
    constructor() { }
    
    public handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(errMsg);
    }

    public extractData(res: Response) {
        let body = res.json();
        alert(body);
        return body;
    }
}