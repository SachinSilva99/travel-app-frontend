export class TravelDto {
    constructor(
        startDate,
        endDate,
        noOfAdults,
        noOfChildren,
        totalHeadCount,
        isWithPets,
        bankSlipImg,
        travelTotalPrice,
        travelPlacedDate,
        hotelStayDtos,
        vehicleId,
        packageCategory,
        userId,
    ) {
        this.travelId = null;
        this.startDate = startDate;
        this.endDate = endDate;
        this.noOfAdults = noOfAdults;
        this.noOfChildren = noOfChildren;
        this.totalHeadCount = totalHeadCount;
        this.isWithPets = isWithPets;
        this.isWithGuide = false;
        this.bankSlipImg = bankSlipImg;
        this.guideId = null;
        this.travelTotalPrice = travelTotalPrice;
        this.travelPlacedDate = travelPlacedDate;
        this.hotelStayDtos = hotelStayDtos;
        this.vehicleId = vehicleId;
        this.packageCategory = packageCategory;
        this.userId = userId;
    }
}