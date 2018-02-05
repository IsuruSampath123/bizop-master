export class WebServResponce {
	public statusId: number;
	public errMessage: string;
	public errDetail: string;
    public result : Array<Object>; 

	constructor(statusId: number, errMessage: string,errDetail: string,result: Array<Object> ) {
		this.statusId = statusId;
		this.errMessage = errMessage;
        this.result = result;
	}

}