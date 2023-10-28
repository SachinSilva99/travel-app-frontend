import {HotelStayDto} from "../model/HotelStayDto.js";
import {StandardResponse} from "../hotel-admin/model/StandardResponse.js";

export class DashboardController {


    constructor() {
        this.hotelStayDtos = [];
        this.hotels = [];
        this.normalHotelApiUrl = "http://localhost:8092/hotelservice/api/v1/getAll";
        this.getAllHotels();
        this.currentEndDate = null;
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
        this.hotelStayHotelEl = $(`#hotelStayHotel`);
        this.hotelStayHotelEl.on('change', this.hotelStayHotelIdElOnChange.bind(this));
        this.packageSelectEl = $("#package-select");
        this.packageSelectEl.on('change', this.PackageSelect.bind(this));
        this.packageDetailsEl = $("#package-details");
        this.addHotelStayBtnEl = $("#addHotelStay");
        this.addHotelStayBtnEl.on("click", this.addHotelStay.bind(this));
        this.addHotelStayBtnEl.prop("disabled", true);
        this.hotelStayStartDateMainEl = $(`#hotelStayStartDateMain`);
        this.hotelStayEndDateMainEl = $(`#hotelStayEndDateMain`);
        this.hotelStayHotelIdEl = $(`#hotelStayHotelId`);

    }

    hotelStayHotelIdElOnChange(e) {
        const selectedOption = this.hotelStayHotelEl.find('option:selected');
        const selectedOptionId = selectedOption.attr('id');
        console.log('Selected Option ID: ' + selectedOptionId);
        this.hotelStayHotelIdEl.val(selectedOptionId)
    }

    PackageSelect() {
        const selectedPackage = this.packageSelectEl.val();
        this.getAllHotels();
        this.packageDetailsEl.html(this.packageDetailsMap[selectedPackage] || "");
        if (selectedPackage === 'REGULAR') {
            console.log('regular')
            this.hotels = this.hotels.filter(hotel => hotel.hotelCategory === 'TWO_STAR' || hotel.hotelCategory === "THREE_STAR");

        }
        if (selectedPackage === 'SUPER_LUXURY') {
            this.hotels = this.hotels.filter(hotel => hotel.hotelCategory === 'FIVE_STAR');
        }
        this.hotels.forEach(hotel => {
            const option = $("<option></option>")
                .attr("value", hotel.hotelName)
                .attr("id", hotel.hotelId)
                .text(hotel.hotelName);
            console.log(hotel.hotelId)
            this.hotelStayHotelEl.append(option);
            return hotel;
        });

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

            console.log('dif', diffDays)

            if (isNaN(timeDiff)) {
                return;
            }
            this.tripNoDays = diffDays;
            this.tripNoDaysRemaining = diffDays;

            this.hotelStayEndDateMainEl.attr("min", startDate.toISOString().split('T')[0]);
            this.hotelStayEndDateMainEl.attr("max", endDate.toISOString().split('T')[0]);
            this.resultEl.text(`Trip Number of days: ${diffDays}`);
            console.log('days ' + this.tripNoDaysRemaining);
            this.noOfDaysRemainingEl.html(this.tripNoDaysRemaining);
            this.addHotelStayBtnEl.prop("disabled", false);
            this.hotelStayStartDateMainEl.val(this.tripStartDateEl.val());
            this.hotelStayStartDateMainEl.prop('disabled', true);
            this.currentEndDate = this.tripStartDate;
            console.log(this.currentEndDate)

        } else {
            this.resultEl.text(`Trip Number of days: ${0}`);
            this.addHotelStayBtnEl.prop("disabled", true);
            this.resultEl.text("Invalid date selection. End date should be later than or equal to the start date.");
        }
    }


    addHotelStay() {
        console.log('remaining days', this.tripNoDaysRemaining)
        if (this.tripNoDaysRemaining === 0) {
            alert('days are full')
            return;
        }
        const startDate = new Date(this.currentEndDate);
        const endDate = new Date(this.hotelStayEndDateMainEl.val());
        console.log('ss start date', startDate);
        console.log('ss end date', endDate);
        const timeDiff = endDate - startDate; // Swap the order here

        let daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if (daysDifference === 0) {
            daysDifference = 1;
            this.tripNoDaysRemaining -= 1;
        } else {
            this.tripNoDaysRemaining -= daysDifference;
        }
        console.log(daysDifference);
        const hotelStayDto = new HotelStayDto(startDate, endDate);
        this.hotelStayDtos.push(hotelStayDto);
        this.loadHotelPackages();
        this.noOfDaysRemainingEl.html(this.tripNoDaysRemaining);
        this.currentEndDate = endDate;
        //setting the starting date of new hotel stay with selected previous date
        const currentDate = new Date(endDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = year + '-' + month + '-' + day;
        this.hotelStayStartDateMainEl.val(formattedDate);
        this.hotelStayStartDateMainEl.prop('disabled', true);


        //setting hotel end date
        this.hotelStayEndDateMainEl.attr("min", currentDate.toISOString().split('T')[0]);
        this.hotelStayEndDateMainEl.attr("max", new Date(this.tripEndDateEl.val()).toISOString().split('T')[0]);
        if (this.tripNoDaysRemaining === 0) {
            this.addHotelStayBtnEl.prop('disabled', true);
            alert('days are full')
        } else {
            this.addHotelStayBtnEl.prop('disabled', false);
        }
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

    getAllHotels() {
        $.ajax({
            url: this.normalHotelApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.hotels = standardResponse.data;
                console.log(this.hotels)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }
}





