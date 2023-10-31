export class HotelStayDtoCard {
    constructor(
        hotelStayOrderNumber,
        hotelStayStartDate,
        hotelStayEndDate,
        hotelStayTotalCost,
        hotelStayHotelId,
        hotelStayHotelPackageId,
        location,
        lat,
        lng,
        hotelStayHotelPackageType,
        hotelStayHotelPackageRoomType
    ) {
        this.hotelStayOrderNumber = hotelStayOrderNumber;
        this.hotelStayStartDate = hotelStayStartDate;
        this.hotelStayEndDate = hotelStayEndDate;
        this.hotelStayTotalCost = hotelStayTotalCost;
        this.hotelStayHotelId = hotelStayHotelId;
        this.hotelStayHotelPackageId = hotelStayHotelPackageId;
        this.location = location;
        this.lat = lat;
        this.lng = lng;
        this.hotelStayHotelPackageType = hotelStayHotelPackageType;
        this.hotelStayHotelPackageRoomType = hotelStayHotelPackageRoomType;
    }
}
