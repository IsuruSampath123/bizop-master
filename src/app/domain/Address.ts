export class Address {
    public line1: string;
    public line2: string;
    public line3: string;
    public line4: string;
    public lan: number;
    public lat: number;

    constructor(line1: string, line2: string, line3: string, line4: string, lan: number, lat: number) {
        this.line1 = line1;
        this.line2 = line2;
        this.line3 = line3;
        this.line4 = line4;
        this.lan = lan;
        this.lat = lat;
    }

}