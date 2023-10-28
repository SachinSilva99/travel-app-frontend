import {HotelStayDto} from "../model/HotelStayDto.js";
import {StandardResponse} from "../hotel-admin/model/StandardResponse.js";

export class DashboardController {


    constructor() {
        this.hotelStaySelectedHotel = null;
        this.setUpMap();
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
        this.latEl = $('#lat');
        this.lngEl = $('#lng');

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
        this.hotelStayHotelEl.on('change', this.hotelStayHotelElOnChange.bind(this));
        this.packageSelectEl = $("#package-select");
        this.packageSelectEl.on('change', this.PackageSelect.bind(this));
        this.packageDetailsEl = $("#package-details");
        this.addHotelStayBtnEl = $("#addHotelStay");
        this.addHotelStayBtnEl.on("click", this.addHotelStay.bind(this));
        this.addHotelStayBtnEl.prop("disabled", true);
        this.hotelStayStartDateMainEl = $(`#hotelStayStartDateMain`);
        this.hotelStayEndDateMainEl = $(`#hotelStayEndDateMain`);
        this.hotelStayHotelIdEl = $(`#hotelStayHotelId`);
        this.hotelStayHotelPackageEl = $(`#hotelStayHotelPackage`);
        this.hotelStayHotelPackageTypeEl = $(`#hotelStayHotelPackageType`);
        this.hotelStayHotelPackageRoomTypeEl = $(`#hotelStayHotelPackageRoomType`);
        this.hotelStayHotelPackageIdEl = $(`#hotelStayHotelPackageId`);
        this.hotelStayHotelPackagePriceEl = $(`#hotelStayHotelPackagePrice`);
        this.hotelStayCostMainEl = $(`#hotelStayCostMain`);
        this.hotelStayHotelPackageEl.on('change', this.hotelStayHotelPackageElOnChange.bind(this));


    }

    hotelStayHotelPackageElOnChange(e) {
        const packageDto = this.hotelStaySelectedHotel
            .hotelPackageDTOS
            .find(pkgDto => pkgDto.hotelPackageId === this.hotelStayHotelPackageEl.val());
        console.log(packageDto);
        if (packageDto === undefined || packageDto === null) {
            this.hotelStayHotelPackageIdEl.val('');
            this.hotelStayHotelPackageTypeEl.val('');
            this.hotelStayHotelPackageRoomTypeEl.val('');
            this.hotelStayHotelPackagePriceEl.val('');
            this.hotelStayCostMainEl.val('');
            return;
        }
        this.hotelStayHotelPackageIdEl.val(packageDto.hotelPackageId);
        this.hotelStayHotelPackageTypeEl.val(packageDto.hotelPackageType);
        this.hotelStayHotelPackageRoomTypeEl.val(packageDto.hotelPackageRoomType);
        this.hotelStayHotelPackagePriceEl.val(packageDto.hotelPackagePrice);
        this.hotelStayCostMainEl.val(packageDto.hotelPackagePrice);
    }

    latElOnChange() {
        this.getAllHotels();
        this.hotels = this.hotels.filter(hotel => {
            const distance = this.calculateDistance(this.lat, this.lng, hotel.hotelLocationLat, hotel.hotelLocationLng);
            const selectedPackage = this.packageSelectEl.val();
            if (selectedPackage === 'REGULAR') {
                if (hotel.hotelCategory === 'TWO_STAR' || hotel.hotelCategory === 'THREE_STAR') {
                    return distance <= 30;
                }
            } else if (selectedPackage === 'SUPER_LUXURY') {
                if (hotel.hotelCategory === 'FIVE_STAR') {
                    return distance <= 30;
                }
            }
            return false;
        });

        console.log(this.hotels);
        this.hotels.forEach(hotel => {
            const option = $("<option></option>")
                .attr("value", hotel.hotelName)
                .attr("id", hotel.hotelId)
                .text(hotel.hotelName);
            this.hotelStayHotelEl.append(option);
        });
        if (this.hotels.length === 0) {
            this.hotelStayHotelEl.html('');
            const option = $("<option></option>")
                .attr("value", '')
                .attr("id", '')
                .text('select a hotel');
            this.hotelStayHotelEl.append(option);

        }

    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    setUpMap() {
        window.initMap = () => {
            const myLatlng = {lat: 6.5788759736, lng: 79.9665327316};
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 10,
                center: myLatlng,
            });
            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: myLatlng,

            });

            infoWindow.open(map);
            map.addListener("click", (mapsMouseEvent) => {
                infoWindow.close();
                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });
                const data = mapsMouseEvent.latLng.toJSON();
                this.lat = data.lat;
                this.lng = data.lng;
                this.latEl.val(this.lat);
                this.lngEl.val(this.lng);
                this.latElOnChange();
                console.log(data);
                console.log(this.lng);
                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );
                infoWindow.open(map);
            });

        };

    }

    hotelStayHotelElOnChange(e) {
        const selectedOption = this.hotelStayHotelEl.find('option:selected');

        const hotelId = selectedOption.attr('id');
        this.hotelStayHotelIdEl.val(hotelId);
        const hotel = this.hotels.find(hotel => hotel.hotelId === hotelId);
        this.hotelStaySelectedHotel = hotel;
        hotel.hotelPackageDTOS.forEach(pkgDto => {
            const option = $("<option></option>")
                .attr("value", pkgDto.hotelPackageId)
                .attr("id", pkgDto.hotelPackageId)
                .text(pkgDto.hotelPackageType + " " + pkgDto.hotelPackageRoomType);
            this.hotelStayHotelPackageEl.append(option);
        });
        if (hotel.hotelPackageDTOS.length === 0) {
            this.hotelStayHotelPackageEl.html('');
        }
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
        if (this.tripNoDaysRemaining <= 0) {
            alert('days are full')
            return;
        }
        const startDate = new Date(this.currentEndDate);
        const endDate = new Date(this.hotelStayEndDateMainEl.val());
        console.log('ss start date', startDate);
        console.log('ss end date', endDate);
        const timeDiff = endDate - startDate;

        let daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        this.tripNoDaysRemaining -= daysDifference;

        console.log(daysDifference);
        const hotelStayDto = new HotelStayDto(startDate, endDate);
        this.hotelStayDtos.push(hotelStayDto);
        this.loadHotelPackages();
        this.noOfDaysRemainingEl.html(this.tripNoDaysRemaining);
        //setting the starting date of new hotel stay with selected previous date
        const currentDate = this.settingStartDate(endDate);
        this.currentEndDate = currentDate;

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

    settingStartDate(endDate) {
        const currentDate = new Date(endDate);
        currentDate.setDate(currentDate.getDate() + 1);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = year + '-' + month + '-' + day;
        this.hotelStayStartDateMainEl.val(formattedDate);
        this.hotelStayStartDateMainEl.prop('disabled', true);
        return currentDate;
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





