import {StandardResponse} from "../hotel-admin/model/StandardResponse.js";
import {HotelStayDtoCard} from "../model/HotelStayDtoCard.js";
import {HotelStayDto} from "../model/HotelStayDto.js";
import {TravelDto} from "../model/TravelDto.js";

export class DashboardController {


    constructor() {
        this.lastLat = null;
        this.lastLng = null;
        this.nextTravelLat = 6.584034509543009;
        this.nextTravelLng = 79.96996595913906;
        this.travelKms = 0;
        this.userSelectedGuide = null;
        this.userSelectedVehicle = null;
        this.hotelStayOrderNumber = 0;
        this.hotelStaySelectedHotel = null;
        this.setUpMap();
        this.hotelStayDtoCards = [];
        this.hotels = [];
        this.travelIdUrl = 'http://localhost:8000/travelservice/api/v1/travels';
        this.vehicleApiUrl = "http://localhost:8095/vehicleservice/api/v1/vehicles";
        this.getAllVehicles();
        this.vehicles = [];
        this.normalHotelApiUrl = "http://localhost:8092/hotelservice/api/v1/getAll";
        this.guideApiUrl = "http://localhost:8097/guideservice/api/v1/guides";
        this.guides = [];
        this.getAllHotels();
        this.currentEndDate = null;
        this.tripStartDateEl = $("#tripStartDate");
        this.placeOrderSectionEl = $("#placeOrderSection");
        this.totalCostEl = $("#totalCost");
        $('#placeTravelBtn').on('click', this.placeOrder.bind(this));
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
        this.hotelStayLocationEl = $(`#hotelStayLocation`);
        this.resetHotelStaysBtnEl = $(`#resetHotelStaysBtn`);
        this.isWithGuideEl = $(`#isWithGuide`);
        this.guideSectionEls = $(`.guideSection`);
        this.guideIdEl = $(`#guideId`);
        this.guideIdEl.on('change', this.guideIdOnChange.bind(this));
        this.isWithGuideEl.on('change', this.isWithGuideOnChange.bind(this));
        this.resetHotelStaysBtnEl.on('click', this.resetHotels.bind(this));
        this.hotelStayHotelPackageEl.on('change', this.hotelStayHotelPackageElOnChange.bind(this));
        this.guideManDayValueEl = $(`#guideManDayValue`);
        this.vehicleIdEl = $(`#vehicleId`);
        this.feeForExtra1kmEl = $(`#feeForExtra1km`);
        this.feeForOneDay100kmEl = $(`#feeForOneDay100km`);
        this.noOfSeatsEl = $(`#noOfSeats`);
        this.noOfAdultsEl = $(`#noOfAdults`);
        this.noOfChildrenEl = $(`#noOfChildren`);
        this.isWithPetsEl = $(`#isWithPets`);
        this.bankSlipEl = $(`#bankSlip`);
        this.vehicleIdEl.on('change', this.vehicleIdOnChange.bind(this));
        this.loadGuides();
        this.getAllVehicles();

    }

    placeOrder() {
        // :TODO complete
        const today = new Date();
        const hotelStayDtos = [];
        this.hotelStayDtoCards.forEach(dtoCard => {
            const hotelStayDto = new HotelStayDto(
                dtoCard.hotelStayOrderNumber,
                dtoCard.hotelStayStartDate,
                dtoCard.hotelStayEndDate,
                dtoCard.hotelStayTotalCost,
                dtoCard.hotelStayHotelId,
                dtoCard.hotelStayHotelPackageId,
                dtoCard.lat,
                dtoCard.lng
            );
            hotelStayDtos.push(hotelStayDto);
        });
        const travelDto = new TravelDto(
            this.tripStartDate,
            this.tripEndDate,
            this.noOfAdultsEl.val(),
            this.noOfChildrenEl.val(),
            this.noOfAdultsEl.val() + this.noOfChildrenEl.val(),
            this.isWithPetsEl.val(),
            null, //bank slip
            this.totalCostEl.text(),
            today,
            hotelStayDtos,
            this.vehicleIdEl.val(),
            this.packageSelectEl.val(),
            'eiwufhwufhuh'
        );
        const bankSlipImg = this.bankSlipEl[0].files[0];
        console.log(travelDto);
        const formData = new FormData();
        const jsonDTO = JSON.stringify(travelDto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});
        formData.set("travelDTO", blob);
        formData.set("bankSlipImg", bankSlipImg);
        $.ajax({
            type: "POST",
            url: this.travelIdUrl,
            data: formData,
            processData: false,
            contentType: false,
            success: (response) => {
                console.log("Travel saved successfully. Travel ID: " + response.data);
            },
            error: (error) => {
                console.error("Error saving guide: " + error.responseText);
            }
        });

    }

    vehicleIdOnChange() {
        const vehicleId = this.vehicleIdEl.val();
        this.userSelectedVehicle = null;
        this.feeForExtra1kmEl.val(0);
        this.feeForOneDay100kmEl.val(0);
        const vehicle = this.vehicles.find(vehicle => vehicle.vehicleId === vehicleId);
        if (vehicle === undefined) return;
        this.feeForExtra1kmEl.val(vehicle.feeForExtra1km);
        this.feeForOneDay100kmEl.val(vehicle.feeForOneDay100km);
        this.noOfSeatsEl.val(vehicle.vehicleNoOfSeats);
    }

    getAllVehicles() {
        $.ajax({
            url: this.vehicleApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.vehicles = standardResponse.data;
                // this.loadVehicleIds();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }

    loadVehicleIds() {
        $("#vehicleId option:not(:first-child)").remove();
        this.vehicles.forEach(vehicle => {
            const option = $("<option></option>")
                .attr("value", vehicle.vehicleId)
                .attr("id", vehicle.vehicleId)
                .text(`Brand : ${vehicle.vehicleBrand}  Name : ${vehicle.vehicleName}`);
            this.vehicleIdEl.append(option);
        });
    }

    guideIdOnChange() {
        const guideId = this.guideIdEl.val();
        this.userSelectedGuide = null;
        const guide = this.guides.find(guideDto => guideDto.guideId === guideId);
        this.guideManDayValueEl.val(0);
        if (guide === undefined) return;
        this.guideManDayValueEl.val(guide.guideManDayValue);
        this.userSelectedGuide = guide;
    }

    loadGuides() {
        $.ajax({
            url: this.guideApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.guides = standardResponse.data;
                this.loadGuideIds();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }

    loadGuideIds() {
        $("#guideId option:not(:first-child)").remove();
        this.guides.forEach(guideDto => {
            const option = $("<option></option>")
                .attr("value", guideDto.guideId)
                .attr("id", guideDto.guideId)
                .text(guideDto.guideName + ' ' + guideDto.guideId + ' Exp : ' + guideDto.guideExperience);
            this.guideIdEl.append(option);
        });
    }

    isWithGuideOnChange() {
        const isWithGuide = this.isWithGuideEl.val();
        if (isWithGuide === 'true') {
            this.guideSectionEls.show();
            return;
        }
        this.guideSectionEls.hide();

    }

    resetHotels() {
        this.clearFields();
        this.hotelStayDtoCards = [];
    }

//
    hotelStayHotelPackageElOnChange(e) {
        const packageDto = this.hotelStaySelectedHotel
            .hotelPackageDTOS
            .find(pkgDto => pkgDto.hotelPackageId === this.hotelStayHotelPackageEl.val());
        if (packageDto === undefined || packageDto === null) {
            this.hotelStayHotelPackageIdEl.val('');
            this.hotelStayHotelPackageTypeEl.val('');
            this.hotelStayHotelPackageRoomTypeEl.val('');
            this.hotelStayHotelPackagePriceEl.val('');
            this.hotelStayCostMainEl.val('');
            return;
        }
        const startDate = new Date(this.currentEndDate);
        const endDate = new Date(this.hotelStayEndDateMainEl.val());

        const timeDiff = endDate - startDate;

        let daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        this.hotelStayHotelPackageIdEl.val(packageDto.hotelPackageId);
        this.hotelStayHotelPackageTypeEl.val(packageDto.hotelPackageType);
        this.hotelStayHotelPackageRoomTypeEl.val(packageDto.hotelPackageRoomType);
        this.hotelStayHotelPackagePriceEl.val(packageDto.hotelPackagePrice);
        const total = packageDto.hotelPackagePrice * daysDifference;
        this.hotelStayCostMainEl.val(total);
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
        this.getAllVehicles();
        this.packageDetailsEl.html(this.packageDetailsMap[selectedPackage] || "");
        if (selectedPackage === 'REGULAR') {
            this.hotels = this.hotels.filter(hotel => hotel.hotelCategory === 'TWO_STAR' || hotel.hotelCategory === "THREE_STAR");
            this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicleCategory === 'ECONOMY');
        }
        if (selectedPackage === 'MID_LEVEL') {
            this.hotels = this.hotels.filter(hotel => hotel.hotelCategory === 'FOUR_STAR' || hotel.hotelCategory === "THREE_STAR");
            this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicleCategory === 'MID_RANGE');
        }
        if (selectedPackage === 'LUXURY') {
            this.hotels = this.hotels.filter(hotel => hotel.hotelCategory === 'FOUR_STAR' || hotel.hotelCategory === "FIVE_STAR");
            this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicleCategory === 'LUXURY');
        }
        if (selectedPackage === 'SUPER_LUXURY') {
            this.hotels = this.hotels.filter(hotel => hotel.hotelCategory === 'FIVE_STAR');
            this.vehicles = this.vehicles.filter(vehicle => vehicle.vehicleCategory === 'SUPER_LUXURY');
        }
        this.loadVehicleIds();
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
            if (isNaN(timeDiff)) {
                return;
            }
            this.tripNoDays = diffDays;
            this.tripNoDaysRemaining = diffDays;
            this.hotelStayEndDateMainEl.attr("min", startDate.toISOString().split('T')[0]);
            this.hotelStayEndDateMainEl.attr("max", endDate.toISOString().split('T')[0]);
            this.resultEl.text(`Trip Number of days: ${diffDays}`);
            this.noOfDaysRemainingEl.html(this.tripNoDaysRemaining);
            this.addHotelStayBtnEl.prop("disabled", false);
            $('#hotelStayMain').show();
            this.hotelStayStartDateMainEl.val(this.tripStartDateEl.val());
            this.hotelStayStartDateMainEl.prop('disabled', true);
            this.currentEndDate = this.tripStartDate;

        } else {
            this.resultEl.text(`Trip Number of days: ${0}`);
            this.addHotelStayBtnEl.prop("disabled", true);
            this.resultEl.text("Invalid date selection. End date should be later than or equal to the start date.");
        }
    }


    addHotelStay() {
        if (this.hotelStayOrderNumber === 0) {
            this.lastLat = this.nextTravelLat;
            this.lastLng = this.nextTravelLng;
        }
        if (this.tripNoDaysRemaining <= 0) {
            alert('days are full')
            return;
        }
        const endDateSelected = this.hotelStayEndDateMainEl.val();
        if (endDateSelected === '') {
            alert('pick end first');
            return;
        }
        const startDate = new Date(this.currentEndDate);
        const endDate = new Date(this.hotelStayEndDateMainEl.val());

        const timeDiff = endDate - startDate;

        let daysDifference = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        this.tripNoDaysRemaining -= daysDifference;

        // this.loadHotelPackages();
        this.noOfDaysRemainingEl.html(this.tripNoDaysRemaining);


        const hotelStayEndDate = this.hotelStayEndDateMainEl.val();
        const hotelStayStartDate = this.hotelStayStartDateMainEl.val();
        const lat = this.latEl.val();
        const lng = this.lngEl.val();
        const hotelStayHotelId = this.hotelStayHotelIdEl.val();
        const hotelStayTotalCost = parseFloat(this.hotelStayCostMainEl.val());
        const hotelStayHotelPackageId = this.hotelStayHotelPackageIdEl.val();
        const hotelStayHotelPackageType = this.hotelStayHotelPackageTypeEl.val();
        const hotelStayHotelPackageRoomType = this.hotelStayHotelPackageRoomTypeEl.val();
        const location = this.hotelStayLocationEl.val();

        const hotelStayDtoCard = new HotelStayDtoCard(
            this.hotelStayOrderNumber++,
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
        );
        this.hotelStayDtoCards.push(hotelStayDtoCard);
        //setting the starting date of new hotel stay with selected previous date
        const currentDate = this.settingStartDate(endDate);
        this.currentEndDate = currentDate;

        //setting hotel end date
        this.hotelStayEndDateMainEl.attr("min", currentDate.toISOString().split('T')[0]);
        this.hotelStayEndDateMainEl.attr("max", new Date(this.tripEndDateEl.val()).toISOString().split('T')[0]);
        const hotel = this.hotels.find(hotel => hotel.hotelId === hotelStayHotelId);
        const totalKms = this.calculateDistance(hotel.hotelLocationLat, hotel.hotelLocationLng, this.lastLat, this.lastLng);
        this.travelKms += totalKms;
        $('#totalKms').text(this.travelKms);
        this.loadHotelStays();
        this.clearFields();
        this.lastLat = hotel.hotelLocationLat;
        this.lastLng = hotel.hotelLocationLng;
        if (this.tripNoDaysRemaining === 0) {
            this.addHotelStayBtnEl.prop('disabled', true);
            console.log(this.hotelStayDtoCards);
            alert('days are full');
            this.loadTotal();
        } else {
            this.addHotelStayBtnEl.prop('disabled', false);
        }
    }

    loadTotal() {
        this.placeOrderSectionEl.show();
        let netTotal = 0;
        const kmsFreeForTrip = this.tripNoDays * 100;
        let totalCostForVehicle = this.tripNoDays * parseFloat(this.feeForOneDay100kmEl.val());

        if (this.travelKms > kmsFreeForTrip) {
            const extraKms = this.travelKms - kmsFreeForTrip;
            const extraCost = parseFloat(this.feeForExtra1kmEl.val()) * extraKms;
            totalCostForVehicle += extraCost;
        }
        netTotal += totalCostForVehicle;
        if (this.userSelectedGuide !== null) {
            netTotal += parseFloat(this.guideManDayValueEl.val());
        }
        this.hotelStayDtoCards.forEach(dtoCard => {
            netTotal += parseFloat(dtoCard.hotelStayTotalCost);
        });
        this.totalCostEl.text(netTotal);
    }


    clearFields() {
        this.latEl.val('');
        this.lngEl.val('');
        this.hotelStayHotelIdEl.val('');
        $("#hotelStayHotel option:not(:first-child)").remove();
        $("#hotelStayHotelPackage option:not(:first-child)").remove();
        this.hotelStayHotelPackageIdEl.val('');
        this.hotelStayHotelPackageTypeEl.val('');
        this.hotelStayCostMainEl.val(0);
        this.hotelStayHotelPackagePriceEl.val(0);
        this.hotelStayHotelPackageRoomTypeEl.val('');
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


    getAllHotels() {
        $.ajax({
            url: this.normalHotelApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.hotels = standardResponse.data;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }

    loadHotelStays() {
        const hotelStaysEl = $(`#hotelStays`);
        hotelStaysEl.html('');
        this.hotelStayDtoCards.forEach(hotelStayDto => {
            const hotelStay = `
              <div class="hotelStay bg-light m-3" id="${hotelStayDto.hotelStayOrderNumber}">
                <h4>Hotel Stay Order : ${hotelStayDto.hotelStayOrderNumber}</h4>
                <div class="row">
                      <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                          <div class="form-group">
                            <label for="hotelPackageType">Hotel Stay Start</label>
                            <input type="text" class="form-control mt-1" value="${hotelStayDto.hotelStayStartDate}" readonly>
                          </div>
                      </div>
                      <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                          <div class="form-group">
                            <label for="hotelRoomType">Hotel Room type</label>
                            <input type="text" class="form-control mt-1" id="hotelRoomType" value="${hotelStayDto.hotelStayEndDate}" readonly>
                          </div>
                      </div>
                      <div class="col-lg-3 col-md-6 col-sm-12 mt-4">
                          <div class="form-group">
                            <label for="hotelPrice">Hotel Stay Cost</label>
                            <input type="text" class="form-control mt-1" id="hotelPrice" value="${hotelStayDto.hotelStayTotalCost}" readonly>
                          </div>
                      </div>
                </div>
            </div>`;
            hotelStaysEl.append(hotelStay);
        });
        console.log(this.hotelStayDtoCards);
    }
}





