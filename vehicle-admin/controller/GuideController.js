import {StandardResponse} from "../model/StandardResponse.js";
import {VehicleDTO} from "../model/VehicleDTO.js";

export class VehicleController {
    constructor() {
        this.vehicleApiUrl = "http://localhost:8095/vehicleservice/api/v1/vehicles";
        this.getAllVehicles();
        this.vehicles = [];
        $('#addBtn').click(this.createVehicle.bind(this));
        $('#deleteYes').click(this.deleteVehicle.bind(this));
        $('#updateBtn').click(this.updateVehicle.bind(this));
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
        this.vehicleRemarksEl = $('#vehicleRemarks');
        this.vehicleDriverNameEl = $('#vehicleDriverName');
        this.vehicleDriverContactEl = $('#vehicleDriverContact');
        this.vehicleMainImageEl = $('#vehicleMainImage');
        this.vehicleImgFrontEl = $('#vehicleImgFront');
        this.vehicleImgBackEl = $('#vehicleImgBack');
        this.vehicleImgFrontInteriorEl = $('#vehicleImgFrontInterior');
        this.vehicleImgBackInteriorEl = $('#vehicleImgBackInterior');
        this.vehicleMainPicSectionEl = $('#vehicleMainPicSection');
        this.vehicleFrontPicSectionEl = $('#vehicleFrontPicSection');
        this.vehicleBackPicSectionEl = $('#vehicleBackPicSection');
        this.vehicleBackInteriorPicSectionEl = $('#vehicleBackInteriorPicSection');
        this.vehicleFrontInteriorPicSectionEl = $('#vehicleFrontInteriorPicSection');
        $('#clearFieldBtn').click(this.clearInputFields.bind(this));
        this.getAllVehicles();
        $('#guidesContainer').on('click', '.card', this.clickOnCard.bind(this));
        $('#searchVehicle').on('keyup', this.searchGuides.bind(this));
    }

    deleteVehicle() {
        const guideId = this.selectedGuide.guideId;
        $.ajax({
            url: this.guideApiUrl + "/" + guideId,
            type: "DELETE",
            success: () => {
                alert("Guide deleted successfully");
                this.getAllVehicles();
            },
            error: function () {
                alert("Failed to delete guide");
            }
        });
    }

    searchGuides() {
        const searchResults = this.guides.filter(guide => {
            return guide.guideName.includes(this.searchFieldElement.val()) || guide.contact.includes(this.searchFieldElement.val());
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
            vehicleDriverContact);

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

    updateVehicle(e) {/*
        const guideId = this.guideIdElement.val();
        if (guideId === null || guideId === undefined || guideId === "") {
            alert('no id you should save');
        }
        e.preventDefault();
        if (this.isAnyFieldNull()) {
            alert("fields are null");
            return;
        }
        const guideName = this.guideNameElement.val();
        const dob = this.guideDobElement.val();
        let gender;
        if (document.getElementById("male").checked) {
            gender = "MALE";
        } else if (document.getElementById("female").checked) {
            gender = "FEMALE";
        }


        const contact = this.contactElement.val();
        const guideExperience = this.guideExperienceElement.val();
        const guideRemarks = this.guideRemarksElement.val();
        const guideIdImgFront = $('#guideIdImgFront')[0].files[0];
        const guideIdImgBack = $('#guideIdImgBack')[0].files[0];
        const guideProfileImg = $('#guideProfileImg')[0].files[0];


        const dto = new GuideDTO(guideName, dob, gender, contact, guideExperience, guideRemarks);
        const formData = new FormData();
        const jsonDTO = JSON.stringify(dto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});

        formData.set("guideDTO", blob);
        if (guideIdImgFront !== null) {
            formData.set("guideIdImgFront", guideIdImgFront);
        }
        if (guideIdImgBack !== null) {
            formData.set("guideIdImgBack", guideIdImgBack);
        }
        if (guideProfileImg !== null) {
            formData.set("guideProfileImage", guideProfileImg);
        }
        $.ajax({
            type: "PUT",
            url: this.guideApiUrl + "/" + this.guideIdElement.val(),
            data: formData,
            processData: false,
            contentType: false,
            success: () => {
                console.log("Guide updated successfully");
                this.clearInputFields();
                this.getAllGuides();
                $("#imageIdFrontSection, #imageIdBackSection, #guideImageSection").hide();
            },
            error: (error) => {
                console.error("Error saving guide: " + error.responseText);
            }
        });*/
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
                                <h6 class="mb-2">Vehicle Id : <span class="guideId" style="color: #0a53be">${vehicle.vehicleId}</span></h6>
                                <h5 class="card-title">${vehicle.vehicleName}</h5>
                                <img class="card-img-top" src="data:image/**;base64,${vehicle.vehicleMainImage}" alt="Card image cap">
                                <h5 class="contact mt-3">${vehicle.vehicleBrand}</h5>
                                <button id="delete" class="btn btn-danger" data-bs-toggle = "modal" data-bs-target="#modal">Delete</button>
                            </div>`;
            vehiclesContainer.appendChild(vehicleCard);
        });
    }

    clearInputFields() {
        this.vehicleBrandEl.val('');
        this.vehicleNameEl.val('');
        this.vehicleCategoryEl.val('');
        this.vehicleFuelTypeEl.val('');
        this.vehicleFuelConsumptionEl.val('');
        this.vehicleTypeEl.val('');
        this.vehicleNoOfSeatsEl.val('');
        this.vehicleIsHybridEl.val('');
        this.vehicleTransmissionEl.val('');
        this.vehicleRemarksEl.val('');
        this.vehicleDriverNameEl.val('');
        this.vehicleDriverContactEl.val('');
        this.vehicleMainPicSectionEl.css('display', 'none');
        this.vehicleFrontPicSectionEl.css('display', 'none');
        this.vehicleBackPicSectionEl.css('display', 'none');
        this.vehicleBackInteriorPicSectionEl.css('display', 'none');
        this.vehicleFrontInteriorPicSectionEl.css('display', 'none');
    }

    clickOnCard(e) {
        /*    const target = $(e.target);

            const guideId = e.currentTarget.id;
            const guide = this.guides.find(value => value.guideId === guideId);
            this.selectedGuide = guide;
            if (target.is('#delete')) {
                return;
            }
            this.guideNameElement.val(guide.guideName);
            this.guideDobElement.val(guide.dob);
            this.contactElement.val(guide.contact);
            this.guideExperienceElement.val(guide.guideExperience);
            this.guideRemarksElement.val(guide.guide_remarks);


            this.imageIdFrontElement.attr('src', `data:image/!**;base64,${guide.guideIdImgFront}`);
            this.imageIdFrontSectionElement.css('display', 'block');
            this.imageIdBackElement.attr('src', `data:image/!**;base64,${guide.guideIdImgBack}`);
            this.imageIdBackSectionElement.css('display', 'block');
            this.profileImageElement.attr('src', `data:image/!**;base64,${guide.guideProfileImage}`);
            this.profileImageSectionElement.css('display', 'block');

            this.guideIdElement.val(guideId);
            $('#guideIdImgFront').val('');
            $('#guideIdImgBack').val('');
            $('#guideProfileImg').val('');
            this.selectedGuide = null;*/
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
        const guideIdImgFront = $('#guideIdImgFront')[0].files[0];
        const guideIdImgBack = $('#guideIdImgBack')[0].files[0];
        const guideProfileImg = $('#guideProfileImg')[0].files[0];
        if (guideIdImgFront === null || guideIdImgFront === undefined || guideIdImgFront === "") {
            return true;
        }
        if (guideIdImgBack === null || guideIdImgBack === undefined || guideIdImgBack === "") {
            return true;
        }
        if (guideProfileImg === null || guideProfileImg === undefined || guideProfileImg === "") {
            return true;
        }
        return false;
    }
}