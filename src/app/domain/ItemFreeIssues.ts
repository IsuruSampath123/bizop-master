export class ItemFreeIssues {
    public id : number;
	public itemId: string;
	public fromValue : number;
	public toValue : number;
	public graterThan : number;
	public freeIssueCount : number;

    constructor(id : number, itemId : string, fromValue : number, toValue : number, graterThan : number,
			freeIssueCount : number) {
		this.id = id;
		this.itemId = itemId;
		this.fromValue = fromValue;
		this.toValue = toValue;
		this.graterThan = graterThan;
		this.freeIssueCount = freeIssueCount;
	}
}