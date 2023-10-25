import {HotelStayDto} from "../model/HotelStayDto.js";

export class DashboardController {


    constructor() {
        this.tripStartDateEl = $("#tripStartDate");
        $(document).ready(this.documentOnReady.bind(this));

        this.packageDetailsMap = {
            REGULAR: `<h5>Regular Package</h5>
                <h6>Hotel Category: 3 Star and 2 Star</h6>
                <h6>Vehicle Category: Economy</h6>`,
            MID_LEVEL: `<h5>Mid-Level Package</h5>
                <h6>Hotel Category: 3 Star and 4 Star</h6>
                <h6>Vehicle Category: Mid-Range</h6>`,
            LUXURY: `<h5>Luxury Package</h5>
                <h6>Hotel Category: 4 Star and 5 Star</h6>
                <h6>Vehicle Category: Luxury</h6>`,
            SUPER_LUXURY: `<h5 style="color: #98c1d9">Super Luxury Package</h5>
                <h6>Hotel Category: 5 Star</h6>
                <h6>Vehicle Category: Super Luxury</h6>`,
        };
        this.tripNoDays = 0;
        this.tripNoDaysRemaining = 0;
        this.tripStartDate = null;
        this.tripEndDate = null;
        this.tripEndDateEl = $("#tripEndDate");
        this.noOfDaysRemainingEl = $("#noOfDaysRemaining");
        this.resultEl = $("#result");
        this.tripStartDateEl.on("change", this.updateNumberOfDays.bind(this));
        this.tripEndDateEl.on("change", this.updateNumberOfDays.bind(this));
        this.packageSelectEl = $("#package-select");
        this.packageSelectEl.on('change', this.PackageSelect.bind(this));
        this.packageDetailsEl = $("#package-details");
        this.addHotelStayBtnEl = $("#addHotelStay");
        this.addHotelStayBtnEl.on("click", this.addHotelStay.bind(this));
        this.addHotelStayBtnEl.prop("disabled", true);
        this.hotelStayIndex = 0;
        this.hotelStayStartDateMainEl = $(`#hotelStayStartDateMain`);
        this.hotelStayEndDateMainEl = $(`#hotelStayEndDateMain`);
        this.hotelStayDtos = [];

    }

    PackageSelect() {
        console.log('works')
        const selectedPackage = this.packageSelectEl.val();
        this.packageDetailsEl.html(this.packageDetailsMap[selectedPackage] || "");
    }

    updateNumberOfDays() {
        const startDate = new Date(this.tripStartDateEl.val());

        if (isNaN(startDate.getDate())) {
            alert('pick start date first');
            this.tripEndDateEl.val('');
            return;
        }

        const formattedStartDate = startDate.toISOString().split('T')[0];
        this.tripEndDateEl.attr("min", formattedStartDate);
        const endDate = new Date(this.tripEndDateEl.val());

        this.tripStartDate = startDate;
        this.tripEndDate = endDate;
        if (startDate && endDate && startDate <= endDate) {
            const timeDiff = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
            this.tripNoDays = diffDays;
            this.tripNoDaysRemaining = diffDays;
            if (isNaN(timeDiff)) {
                return;
            }
            this.hotelStayStartDateMainEl.attr("min", startDate.toISOString().split('T')[0]);
            this.hotelStayStartDateMainEl.attr("max", endDate.toISOString().split('T')[0]);
            this.hotelStayEndDateMainEl.attr("min", startDate.toISOString().split('T')[0]);
            this.hotelStayEndDateMainEl.attr("max", endDate.toISOString().split('T')[0]);
            this.resultEl.text(`Trip Number of days: ${diffDays}`);
            this.noOfDaysRemainingEl.html(this.tripNoDaysRemaining);
            this.addHotelStayBtnEl.prop("disabled", false);
            this.hotelStayStartDateMainEl.prop('disabled', true);
            const currentEndDate = this.hotelStayEndDateMainEl.val();
            this.hotelStayStartDateMainEl.val(currentEndDate);

        } else {
            this.resultEl.text(`Trip Number of days: ${0}`);
            this.addHotelStayBtnEl.prop("disabled", true);
            this.resultEl.text("Invalid date selection. End date should be later than or equal to the start date.");
        }
    }


    addHotelStay() {
        this.hotelStayStartDateMainEl.prop('disabled', true);
        const currentEndDate = this.hotelStayEndDateMainEl.val();
        const startDate = this.hotelStayStartDateMainEl.val(currentEndDate);
        const endDate = this.hotelStayEndDateMainEl.val();
        const timeDiff = Math.abs(endDate - startDate);
        if (isNaN(timeDiff)) {
            return;
        }
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        this.tripNoDays = diffDays;
        this.tripNoDaysRemaining -= diffDays;

        const hotelStayDto = new HotelStayDto(startDate, endDate);
        this.hotelStayDtos.push(hotelStayDto);
        this.resultEl.text(`Trip Number of days: ${this.tripNoDaysRemaining}`);
        this.loadHotelPackages();

    }

    documentOnReady() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedTomorrow = tomorrow.toISOString().split('T')[0];
        this.tripStartDateEl.attr("min", formattedTomorrow);
    }

    loadHotelPackages() {
        const packageInfoElement = $(`#hotelStays`);
        packageInfoElement.html('');
        this.hotelStayDtos.forEach(hotelStayDto => {
            const hotelStay = `
                    <div class="package-info col-12" >
                      <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                      <div class="form-group">
                        <label for="hotelPackageType">Hotel Stay Start</label>
                        <input type="text" class="form-control mt-1" value="${hotelStayDto.hotelStayStartDate}" readonly>
                      </div>
                    </div>
                        <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                          <div class="form-group">
                            <label for="hotelRoomType">Hotel Room type</label>
                            <input type="text" class="form-control mt-1" id="hotelRoomType" value="${hotelStayDto.hotelStayEndDate}">
                          </div>
                        </div>
                    </div>
                `;
            packageInfoElement.html(hotelStay);
        });
    }
}





