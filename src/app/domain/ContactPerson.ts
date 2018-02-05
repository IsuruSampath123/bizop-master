export class ContactPerson {
    public id : number;
	public contactDescription : string;
	public number : string;
	public email : string;
	public fax : string;
	public emailNotify : number;
	public smsNotify: number;
	public language : string;

    constructor(id : number,contactDescription : string, number : string,email : string, fax : string,  emailNotify : number,
			smsNotify : number, language : string) {
		this.id = id;
		this.contactDescription = contactDescription;
		this.number = number;
		this.email = email;
		this.fax = fax;
		this.emailNotify = emailNotify;
		this.smsNotify = smsNotify;
		this.language = language;
	}
}