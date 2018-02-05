import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Injectable()
export class MesurementUnitService {
    mesurementUnits: SelectItem[];

    getMesurementUnitOptions(){
        this.mesurementUnits = [];
        this.mesurementUnits.push({label:'Please select', value:null});
        this.mesurementUnits.push({label:'Milliliters (mL)', value:'1'});
        this.mesurementUnits.push({label:'Gram (g)', value:'2'});
        this.mesurementUnits.push({label:'Meter (m)', value:'3'});
        this.mesurementUnits.push({label:'Cubic meter', value:'4'});
        return this.mesurementUnits;

    }

}