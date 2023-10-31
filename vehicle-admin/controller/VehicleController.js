import {StandardResponse} from "../model/StandardResponse.js";
import {VehicleDTO} from "../model/VehicleDTO.js";

export class VehicleController {
    constructor() {
        this.vehicleApiUrl = "http://localhost:8095/vehicleservice/api/v1/vehicles";
        this.getAllVehicles();
        this.vehicles = [];
        $('#addBtn').click(this.createVehicle.bind(this));
        $('#updateBtn').click(this.updateVehicle.bind(this));
        $('#deleteYesBtn').click(this.deleteVehicle.bind(this));
        this.vehicleIdEl = $('#vehicleId');
        this.vehicleNameEl = $('#vehicleName');
        this.vehicleBrandEl = $('#vehicleBrand');
        this.vehicleCategoryEl = $('#vehicleCategory');
        this.vehicleFuelTypeEl = $('#vehicleFuelType');
        this.vehicleFuelConsumptionEl = $('#vehicleFuelConsumption');
        this.vehicleTypeEl = $('#vehicleType');
        this.vehicleNoOfSeatsEl = $('#vehicleNoOfSeats');
        this.vehicleIsHybridEl = $('#vehicleIsHybrid');
        this.vehicleTransmissionEl = $('#vehicleTransmission');
        this.vehicleFeeForOneDay100kmEl = $('#vehicleFeeForOneDay100km');//
        this.vehicleFeeForExtra1kmEl = $('#vehicleFeeForExtra1km');//
        this.vehicleRemarksEl = $('#vehicleRemarks');
        this.vehicleDriverNameEl = $('#vehicleDriverName');
        this.vehicleDriverContactEl = $('#vehicleDriverContact');
        this.vehicleMainImageEl = $('#vehicleMainImage');
        this.vehicleImgFrontEl = $('#vehicleImgFront');
        this.vehicleImgBackEl = $('#vehicleImgBack');
        this.vehicleMainPicEl = $('#vehicleMainPic');
        this.vehicleFrontPicEl = $('#vehicleFrontPic');
        this.vehicleBackPicEl = $('#vehicleBackPic');
        this.vehicleBackInteriorPicEl = $('#vehicleBackInteriorPic');
        this.vehicleFrontInteriorPicEl = $('#vehicleFrontInteriorPic');
        this.vehicleImgFrontInteriorEl = $('#vehicleImgFrontInterior');
        this.vehicleImgBackInteriorEl = $('#vehicleImgBackInterior');
        this.vehicleMainPicSectionEl = $('#vehicleMainPicSection');
        this.vehicleFrontPicSectionEl = $('#vehicleFrontPicSection');
        this.vehicleBackPicSectionEl = $('#vehicleBackPicSection');
        this.vehicleBackInteriorPicSectionEl = $('#vehicleBackInteriorPicSection');
        this.vehicleFrontInteriorPicSectionEl = $('#vehicleFrontInteriorPicSection');
        this.vehicleSearchEl = $('#searchVehicle');
        this.selectedVehicle = null;
        $('#clearFieldBtn').click(this.clearInputFields.bind(this));
        $('#vehiclesContainer').on('click', '.card', this.clickOnCard.bind(this));
        this.vehicleSearchEl.on('keyup', this.searchVehicles.bind(this));
    }

    deleteVehicle() {
        console.log(this.selectedVehicle.vehicleId);
        const vehicleId = this.selectedVehicle.vehicleId;

        this.getAllVehicles();
        $.ajax({
            url: this.vehicleApiUrl + '/' + vehicleId,
            type: "DELETE",
            success: () => {
                $(`#${vehicleId}`).remove();
                this.selectedImageId = null;
                console.log('deleted');
            },
            error: function () {
                alert("Failed to delete guide");
            }
        });
    }


    searchVehicles() {
        const searchResults = this.vehicles.filter(vehicle => {
            return vehicle.vehicleName.includes(this.vehicleSearchEl.val()) || vehicle.vehicleBrand.includes(this.vehicleSearchEl.val());
        });
        this.loadData(searchResults);
    }

    createVehicle(e) {
        e.preventDefault();
        const vehicleBrand = this.vehicleBrandEl.val();
        const vehicleName = this.vehicleNameEl.val();
        const vehicleCategory = this.vehicleCategoryEl.val();
        const vehicleFuelType = this.vehicleFuelTypeEl.val();
        const vehicleFuelConsumption = this.vehicleFuelConsumptionEl.val();
        const vehicleType = this.vehicleTypeEl.val();
        const vehicleNoOfSeats = this.vehicleNoOfSeatsEl.val();
        const vehicleIsHybrid = this.vehicleIsHybridEl.val();
        const vehicleTransmission = this.vehicleTransmissionEl.val();
        const vehicleRemarks = this.vehicleRemarksEl.val();
        const vehicleDriverName = this.vehicleDriverNameEl.val();
        const vehicleDriverContact = this.vehicleDriverContactEl.val();
        const vehicleFeeForOneDay100km = this.vehicleFeeForOneDay100kmEl.val();
        const vehicleFeeForExtra1km = this.vehicleFeeForExtra1kmEl.val();
        const vehicleMainImage = this.vehicleMainImageEl[0].files[0];
        const vehicleImgFront = this.vehicleImgFrontEl[0].files[0];
        const vehicleImgBack = this.vehicleImgBackEl[0].files[0];
        const vehicleImgFrontInterior = this.vehicleImgFrontInteriorEl[0].files[0];
        const vehicleImgBackInterior = this.vehicleImgBackInteriorEl[0].files[0];

        const dto = new VehicleDTO(vehicleBrand,
            vehicleName,
            vehicleCategory,
            vehicleFuelType,
            vehicleFuelConsumption,
            vehicleIsHybrid,
            vehicleNoOfSeats,
            vehicleType,
            vehicleTransmission,
            vehicleRemarks,
            vehicleDriverName,
            vehicleDriverContact,
            vehicleFeeForOneDay100km,
            vehicleFeeForExtra1km
        );

        const formData = new FormData();
        const jsonDTO = JSON.stringify(dto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});


        formData.set("vehicleDTO", blob);
        formData.set("vehicleMainImage", vehicleMainImage);
        formData.set("vehicleImgFront", vehicleImgFront);
        formData.set("vehicleImgBack", vehicleImgBack);
        formData.set("vehicleImgFrontInterior", vehicleImgFrontInterior);
        formData.set("vehicleImgBackInterior", vehicleImgBackInterior);
        console.log(dto);
        $.ajax({
            type: "POST",
            url: this.vehicleApiUrl,
            data: formData,
            processData: false,
            contentType: false,
            success: (response) => {
                console.log("Vehicle saved successfully. Vehicle ID: " + response.data);
                this.clearInputFields();
                this.getAllVehicles();
                $("#vehicleMainPicSection, #vehicleFrontPicSection,#vehicleBackPicSection,#vehicleBackInteriorPicSection, #vehicleFrontInteriorPicSection").hide();
            },
            error: (error) => {
                console.error("Error saving vehicle: " + error.responseText);
            }
        });
    }

    updateVehicle(e) {

        e.preventDefault();
        const vehicleId = this.vehicleIdEl.val();
        const vehicleBrand = this.vehicleBrandEl.val();
        const vehicleName = this.vehicleNameEl.val();
        const vehicleCategory = this.vehicleCategoryEl.val();
        const vehicleFuelType = this.vehicleFuelTypeEl.val();
        const vehicleFuelConsumption = this.vehicleFuelConsumptionEl.val();
        const vehicleType = this.vehicleTypeEl.val();
        const vehicleNoOfSeats = this.vehicleNoOfSeatsEl.val();
        const vehicleIsHybrid = this.vehicleIsHybridEl.val();
        const vehicleTransmission = this.vehicleTransmissionEl.val();
        const vehicleRemarks = this.vehicleRemarksEl.val();
        const vehicleDriverName = this.vehicleDriverNameEl.val();
        const vehicleDriverContact = this.vehicleDriverContactEl.val();
        const vehicleFeeForOneDay100km = this.vehicleFeeForOneDay100kmEl.val();
        const vehicleFeeForExtra1km = this.vehicleFeeForExtra1kmEl.val();
        const vehicleMainImage = this.vehicleMainImageEl[0].files[0];
        const vehicleImgFront = this.vehicleImgFrontEl[0].files[0];
        const vehicleImgBack = this.vehicleImgBackEl[0].files[0];
        const vehicleImgFrontInterior = this.vehicleImgFrontInteriorEl[0].files[0];
        const vehicleImgBackInterior = this.vehicleImgBackInteriorEl[0].files[0];


        const dto = new VehicleDTO(vehicleBrand,
            vehicleName,
            vehicleCategory,
            vehicleFuelType,
            vehicleFuelConsumption,
            vehicleIsHybrid,
            vehicleNoOfSeats,
            vehicleType,
            vehicleTransmission,
            vehicleRemarks,
            vehicleDriverName,
            vehicleDriverContact,
            vehicleFeeForOneDay100km,
            vehicleFeeForExtra1km);

        const formData = new FormData();
        const jsonDTO = JSON.stringify(dto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});


        formData.set("vehicleDTO", blob);
        if (vehicleMainImage !== null) {
            formData.set("vehicleMainImage", vehicleMainImage);
        }
        if (vehicleImgFront !== null) {
            formData.set("vehicleImgFront", vehicleImgFront);
        }
        if (vehicleImgBack !== null) {
            formData.set("vehicleImgBack", vehicleImgBack);
        }
        if (vehicleImgFrontInterior !== null) {
            formData.set("vehicleImgFrontInterior", vehicleImgFrontInterior);

        }
        if (vehicleImgBackInterior !== null) {
            formData.set("vehicleImgBackInterior", vehicleImgBackInterior);
        }
        console.log(dto);
        $.ajax({
            type: "PUT",
            url: this.vehicleApiUrl + "/" + vehicleId,
            data: formData,
            processData: false,
            contentType: false,
            success: () => {
                console.log("Vehicle updated successfully");
                this.clearInputFields();
                this.getAllVehicles();
                $("#vehicleMainPicSection, #vehicleFrontPicSection,#vehicleBackPicSection,#vehicleBackInteriorPicSection, #vehicleFrontInteriorPicSection").hide();
            },
            error: (error) => {
                console.error("Error saving vehicle: " + error.responseText);
            }
        });
    }

    getAllVehicles() {
        $.ajax({
            url: this.vehicleApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.vehicles = standardResponse.data;
                console.log('res', this.vehicles);
                this.loadData(standardResponse.data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });
    }


    loadData(data) {
        const vehiclesContainer = document.getElementById("vehiclesContainer");
        vehiclesContainer.innerHTML = "";

        console.log(data);
        data.forEach((vehicle) => {
            const vehicleCard = document.createElement("div");
            vehicleCard.className = "card col-lg-3 col-md-6 col-sm-12 m-4";
            vehicleCard.id = vehicle.vehicleId;
            vehicleCard.innerHTML = `
                            <div class="card-body">
                                <h6 class="mb-2">Vehicle Id : <span class="guideId" style="color: #96C2DB">${vehicle.vehicleId}</span></h6>
                                <h6 class="card-title text-small">Vehicle Name : ${vehicle.vehicleName}</h6>
                                <img class="card-img-top" src="data:image/**;base64,${vehicle.vehicleMainImage}" alt="Card image cap">
                                <h6 class="contact mt-3">Vehicle Brand : ${vehicle.vehicleBrand}</h6>
                                <button id="delete" class="btn btn-danger" data-bs-toggle = "modal" data-bs-target="#modal">Delete</button>
                            </div>`;
            vehiclesContainer.appendChild(vehicleCard);
        });
    }

    clearInputFields() {

        this.vehicleIdEl.val('');
        this.vehicleBrandEl.val('');
        this.vehicleNameEl.val('');
        this.vehicleCategoryEl.val('');
        this.vehicleFuelTypeEl.val('');
        this.vehicleFuelConsumptionEl.val('');
        this.vehicleTypeEl.val('');
        this.vehicleNoOfSeatsEl.val('');
        this.vehicleIsHybridEl.val('false');
        this.vehicleTransmissionEl.val('');
        this.vehicleRemarksEl.val('');
        this.vehicleDriverNameEl.val('');
        this.vehicleDriverContactEl.val('');
        this.vehicleMainImageEl.val('');
        this.vehicleImgBackEl.val('');
        this.vehicleImgFrontEl.val('');
        this.vehicleImgFrontInteriorEl.val('');
        this.vehicleImgBackInteriorEl.val('');
        this.vehicleFeeForOneDay100kmEl.val(0);
        this.vehicleFeeForExtra1kmEl.val(0);
        this.vehicleMainPicSectionEl.css('display', 'none');
        this.vehicleFrontPicSectionEl.css('display', 'none');
        this.vehicleBackPicSectionEl.css('display', 'none');
        this.vehicleBackInteriorPicSectionEl.css('display', 'none');
        this.vehicleFrontInteriorPicSectionEl.css('display', 'none');
    }

    clickOnCard(e) {
        const target = $(e.target);

        const vehicleId = e.currentTarget.id;
        const vehicle = this.vehicles.find(value => value.vehicleId === vehicleId);
        this.selectedVehicle = vehicle;
        console.log(vehicle)
        if (target.is('#delete')) {
            return;
        }
        this.vehicleIdEl.val(vehicle.vehicleId);
        this.vehicleBrandEl.val(vehicle.vehicleBrand);
        this.vehicleNameEl.val(vehicle.vehicleName);
        this.vehicleCategoryEl.val(vehicle.vehicleCategory);
        this.vehicleFuelTypeEl.val(vehicle.vehicleFuelType);
        this.vehicleFuelConsumptionEl.val(vehicle.vehicleFuelConsumption);
        this.vehicleTypeEl.val(vehicle.vehicleType);
        this.vehicleNoOfSeatsEl.val(vehicle.vehicleNoOfSeats);
        this.vehicleIsHybridEl.val(vehicle.vehicleIsHybrid.toString());
        this.vehicleTransmissionEl.val(vehicle.vehicleTransmission);
        this.vehicleRemarksEl.val(vehicle.vehicleRemarks);
        this.vehicleDriverNameEl.val(vehicle.vehicleDriverName);
        this.vehicleDriverContactEl.val(vehicle.vehicleDriverContact);
        this.vehicleFeeForOneDay100kmEl.val(vehicle.feeForOneDay100km);
        this.vehicleFeeForExtra1kmEl.val(vehicle.feeForExtra1km);

        this.vehicleMainPicEl.attr('src', `data:image/**;base64,${vehicle.vehicleMainImage}`);

        this.vehicleFrontPicEl.attr('src', `data:image/**;base64,${vehicle.vehicleImgFront}`);
        this.vehicleBackPicEl.attr('src', `data:image/**;base64,${vehicle.vehicleImgBack}`);
        this.vehicleFrontInteriorPicEl.attr('src', `data:image/**;base64,${vehicle.vehicleImgFrontInterior}`);
        this.vehicleBackInteriorPicEl.attr('src', `data:image/**;base64,${vehicle.vehicleImgBackInterior}`);

        this.vehicleMainPicSectionEl.css('display', 'block');
        this.vehicleFrontPicSectionEl.css('display', 'block');
        this.vehicleBackPicSectionEl.css('display', 'block');
        this.vehicleBackInteriorPicSectionEl.css('display', 'block');
        this.vehicleFrontInteriorPicSectionEl.css('display', 'block');
        console.log(vehicle);
    }

    isAnyFieldNull() {
        /*     const guideName = this.guideNameElement.val();
             const guideDob = this.guideDobElement.val();
             const contact = this.contactElement.val();
             const experience = this.guideExperienceElement.val();
             const remarks = this.guideRemarksElement.val();

             if (guideName === null || guideName === undefined || guideName === "") {
                 return true;
             }

             if (guideDob === null || guideDob === undefined || guideDob === "") {
                 return true;
             }
             if (contact === null || contact === undefined || contact === "") {
                 return true;
             }
             if (experience === null || experience === undefined || experience === "") {
                 return true;
             }
             return remarks === null || remarks === undefined || remarks === "";*/
    }


    imagesEmpty() {
        const vehicleMainImage = this.vehicleMainImageEl[0].files[0];
        const vehicleImgBack = this.vehicleImgBackEl[0].files[0];
        const vehicleImgFront = this.vehicleImgFrontEl[0].files[0];
        const vehicleImgFrontInterior = this.vehicleImgFrontInteriorEl[0].files[0];
        const vehicleImgBackInterior = this.vehicleImgBackInteriorEl[0].files[0];
        if (vehicleMainImage === null || vehicleMainImage === undefined || vehicleMainImage === "") {
            return true;
        }
        if (vehicleImgBack === null || vehicleImgBack === undefined || vehicleImgBack === "") {
            return true;
        }
        if (vehicleImgFront === null || vehicleImgFront === undefined || vehicleImgFront === "") {
            return true;
        }
        if (vehicleImgFrontInterior === null || vehicleImgFrontInterior === undefined || vehicleImgFrontInterior === "") {
            return true;
        }
        if (vehicleImgBackInterior === null || vehicleImgBackInterior === undefined || vehicleImgBackInterior === "") {
            return true;
        }
        return false;
    }
}