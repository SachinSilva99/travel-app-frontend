export class TravelFullDetailDto {
    constructor(
        travelId,
        startDate,
        endDate,
        noOfAdults,
        noOfChildren,
        totalHeadCount,
        isWithPets,
        isWithGuide,
        isCancelled,
        guideDTO,
        travelTotalPrice,
        travelPlacedDate,
        bankSlipImg,
        hotelStayDtos,
        vehicleDTO,
        packageCategory,
        userDto
    ) {
        this.travelId = travelId || "";
        this.startDate = startDate || null;
        this.endDate = endDate || null;
        this.noOfAdults = noOfAdults || 0;
        this.noOfChildren = noOfChildren || 0;
        this.totalHeadCount = totalHeadCount || 0;
        this.isWithPets = isWithPets || null;
        this.isWithGuide = isWithGuide || null;
        this.isCancelled = isCancelled || null;
        this.guideDTO = guideDTO || null;
        this.travelTotalPrice = travelTotalPrice || 0.0;
        this.travelPlacedDate = travelPlacedDate || null;
        this.bankSlipImg = bankSlipImg || "";
        this.hotelStayDtos = hotelStayDtos || [];
        this.vehicleDTO = vehicleDTO || null;
        this.packageCategory = packageCategory || "";
        this.userDto = userDto || null;
    }
}