export class HotelStayDto {
    constructor(
        hotelStayStartDate,
        hotelStayEndDate,
        hotelStayTotalCost,
        hotelStayHotelId,
        hotelStayHotelPackageId
    ) {
        this.hotelStayId = null;
        this.travelId = null;
        this.hotelStayStartDate = hotelStayStartDate;
        this.hotelStayEndDate = hotelStayEndDate;
        this.hotelStayTotalCost = hotelStayTotalCost;
        this.hotelStayHotelId = hotelStayHotelId;
        this.hotelStayHotelPackageId = hotelStayHotelPackageId;
    }
}
