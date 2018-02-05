import { ItemMaster } from './ItemMaster';
import { QualityParameter } from './QualityParameter';

export class ItemsQualityParameter {
    public id: number;
    public active: string;
    public discription: string;

    public qualityParameterId: number;
    public qualityParameter: QualityParameter;

    public itemMasterId: string;

    constructor(
        id: number,
        discription: string,
        qualityParameterId: number,
        itemMasterId: string

    ) {
        this.id = id;
        this.discription = discription;
        this.qualityParameterId = qualityParameterId;
        this.itemMasterId = itemMasterId;


    }

}
