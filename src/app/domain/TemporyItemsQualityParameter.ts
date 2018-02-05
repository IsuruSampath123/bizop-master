import { QualityParameter } from './QualityParameter';

export class TemporyItemsQualityParameter {
    public id: number;
    public active: string;
    public discription: string;
    public qpname:string;
    public qualityParameterId:number;
    public qualityParameter:QualityParameter;

    public itemMasterId:string;
    constructor(
        id: number,
        discription: string,
        qpname:string,
        qualityParameterId:number,
        itemMasterId:string

        )



        {
            this.id=id;
            this.discription=discription;
            this.qpname=qpname;
            this.qualityParameterId=qualityParameterId;
            this.itemMasterId=itemMasterId;


    }

}
