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
        lan,
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
        this.lan = lan;
        this.hotelStayHotelPackageType = hotelStayHotelPackageType;
        this.hotelStayHotelPackageRoomType = hotelStayHotelPackageRoomType;
    }
}
