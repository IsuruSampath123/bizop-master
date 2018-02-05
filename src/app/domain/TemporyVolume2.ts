
export class TemporyVolume2 {
    
        public id: number;
        public orderId: string;
        public catagory: number;
        public volume: number;
    
    
        constructor(
            id: number,
            orderId:string,
            catagory: number,
            volume: number,
    
        ) {
            this.id = id;
            this.orderId=orderId;
            this.catagory = catagory;
            this.volume = volume;
        }
    
    }
    