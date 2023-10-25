export class HotelDTO {
    constructor(
        hotelName,
        hotelCategory,
        hotelLocation,
        hotelEmail,
        hotelContactNumber,
        isHotelPetsAllowed,
        hotelCancellationCost,
        isHotelCancellationCriteriaFree,
        hotelPackageDTOS,
        hotelRemarks
    ) {
        this.hotelId = null;
        this.hotelName = hotelName;
        this.hotelCategory = hotelCategory;
        this.hotelLocation = hotelLocation;
        this.hotelEmail = hotelEmail;
        this.hotelContactNumber = hotelContactNumber;
        this.isHotelPetsAllowed = isHotelPetsAllowed;
        this.isHotelCancellationCriteriaFree = isHotelCancellationCriteriaFree;
        this.hotelCancellationCost = hotelCancellationCost;
        this.hotelRemarks = hotelRemarks;
        this.hotelImageDTOS = [];
        this.hotelPackageDTOS = hotelPackageDTOS;
    }
}