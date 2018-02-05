import { VehicleType } from './VehicleType';

export class Vehicle {
    public id: number;
    public genaratedId: string;
    public regNo: string;
    public vehicleTypeId: number;
    public brand: string;
    public model: string;
    public fuelType: string;
    public avarageFuel: number;
    public licenseRenewalDate: Date;
    public vehicleType: VehicleType;
    public insuaranceDate: Date;
    public createdDate: Date;
    public createdBy: string;
    public active: string;

    constructor(
        id: number,
        genaratedId: string,
        regNo: string,
        vehicleTypeId: number,
        brand: string,
        model: string,
        fuelType: string,
        avarageFuel: number,
        licenseRenewalDate: Date,
        insuaranceDate: Date,
        createdDate: Date,
        createdBy: string,
        active: string
    ) {
        this.id = id;
        this.genaratedId = genaratedId;
        this.regNo = regNo;
        this.vehicleTypeId = vehicleTypeId;
        this.brand = brand;
        this.model = model;
        this.fuelType = fuelType;
        this.avarageFuel = avarageFuel;
        this.licenseRenewalDate = licenseRenewalDate;
        this.insuaranceDate = insuaranceDate;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.active = active;
    }
}