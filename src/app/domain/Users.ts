import { AccountType } from './AccountType';

export class Users {
	public id: number;
	public genaratedId: string;
	public active: String;
    public userName: string;
    public password: string;
    public status: string;
    public accountTypeId: number;
	public accountType: AccountType;
	public createdDate: Date;
	public createdBy: string;

	constructor(id: number, genaratedId: string, userName: string, password: string,status: string, createdDate: Date, createdBy: string,accountTypeId: number) {

		this.id = id;
		this.genaratedId = genaratedId;
		this.userName = userName;
        this.password = password;
        this.status=status;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.accountTypeId = accountTypeId;

	}

}
