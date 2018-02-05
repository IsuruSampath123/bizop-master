export class StoreType {
        public id: number;
        public genaratedId:string;
        public active: String;
        public storeType: string;
        public createdDate:Date;
        public createdBy:string;
        constructor(id: number,genaratedId: string, storeType: string,createdDate :Date,createdBy:string) {
            this.id = id;
            this.genaratedId=genaratedId;
            this.storeType = storeType;
            this.createdDate=createdDate;
            this.createdBy=createdBy;
        }

    }