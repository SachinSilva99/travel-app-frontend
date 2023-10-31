export class HotelStayDto {
    constructor(
        hotelStayOrderNumber,
        hotelStayStartDate,
        hotelStayEndDate,
        hotelStayTotalCost,
        hotelStayHotelId,
        hotelStayHotelPackageId,
        lat,
        lng
    ) {
        this.hotelStayOrderNumber = hotelStayOrderNumber;
        this.hotelStayId = null;
        this.travelId = null;
        this.hotelStayStartDate = hotelStayStartDate;
        this.hotelStayEndDate = hotelStayEndDate;
        this.hotelStayTotalCost = hotelStayTotalCost;
        this.hotelStayHotelId = hotelStayHotelId;
        this.hotelStayHotelPackageId = hotelStayHotelPackageId;
        this.location = null;
        this.lat = lat;
        this.lng = lng;
    }
}
