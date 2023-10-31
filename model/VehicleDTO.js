export class VehicleDTO {
    constructor(
        vehicleBrand, vehicleName, vehicleCategory, vehicleFuelType, vehicleFuelConsumption, vehicleIsHybrid,
        vehicleNoOfSeats, vehicleType, vehicleTransmission, vehicleRemarks, vehicleDriverName, vehicleDriverContact,
        feeForOneDay100km,
        feeForExtra1km,
    ) {
        this.vehicleId = null;
        this.vehicleName = vehicleName;
        this.vehicleBrand = vehicleBrand;
        this.vehicleCategory = vehicleCategory;
        this.vehicleFuelType = vehicleFuelType;
        this.vehicleFuelConsumption = vehicleFuelConsumption;
        this.vehicleIsHybrid = vehicleIsHybrid;
        this.vehicleNoOfSeats = vehicleNoOfSeats;
        this.vehicleType = vehicleType;
        this.vehicleTransmission = vehicleTransmission;
        this.vehicleRemarks = vehicleRemarks;
        this.vehicleDriverName = vehicleDriverName;
        this.vehicleDriverContact = vehicleDriverContact;
        this.vehicleMainImage = null;
        this.vehicleImgFront = null;
        this.vehicleImgBack = null;
        this.vehicleImgFrontInterior = null;
        this.vehicleImgBackInterior = null;
        this.feeForOneDay100km = feeForOneDay100km;
        this.feeForExtra1km = feeForExtra1km;
        this.driverDrivingLicenseFront = null;
        this.driverDrivingLicenseBack = null;
    }
}
