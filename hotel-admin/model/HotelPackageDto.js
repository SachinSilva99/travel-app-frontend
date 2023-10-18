export class HotelPackageDTO {
    constructor(hotelPackageId, hotelPackageType, hotelPackageRoomType, hotelPackagePrice) {
        this.hotelPackageId = hotelPackageId;
        this.hotelPackageType = hotelPackageType;
        this.hotelPackageRoomType = hotelPackageRoomType;
        this.hotelPackagePrice = hotelPackagePrice;
        this.hotelId = null;
    }
}