import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Injectable()
export class LanguageService {
    languages: SelectItem[];

    getLanguageOptions(){
        this.languages = [];
        this.languages.push({label:'Please select', value:null});
        this.languages.push({label:'English', value:'1'});
        this.languages.push({label:'Sinhala', value:'2'});
        this.languages.push({label:'Tamil', value:'3'});
        return this.languages;

    }

}