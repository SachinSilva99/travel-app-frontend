import {UserDTO} from "../model/UserDTO.js";
import {StandardResponse} from "../model/StandardResponse.js";

export class UserController {
    constructor() {
        // this.guideApiUrl = "http://localhost:8097/guideservice/api/v1/guides";
        this.adminRegisterApi = "http://localhost:8090/api/v1/admin/register/admin";
        $('#addBtn').click(this.createUser.bind(this));
        $('#deleteYes').click(this.deleteUser.bind(this));
        $('#updateBtn').click(this.updateUser.bind(this));
        this.userIdEl = $('#userId');
        this.usernameEl = $('#username');
        this.passwordEl = $('#password');
        this.dobEl = $('#dob');
        this.userGenderEl = $('#userGender');
        this.addressEl = $('#address');
        this.emailEl = $('#email');
        this.userTypeEl = $('#userType');
        this.phoneNumberEl = $('#phoneNumber');
        this.nicPassportNumberEl = $('#nicPassportNumber');
        this.profilePictureEl = $('#profilePicture');
        this.nicPassportBackEl = $('#nicPassportBack');
        this.nicPassportFrontEl = $('#nicPassportFront');
        this.userRemarksEl = $('#userRemarks');

        function getToken() {
            return undefined;
        }

        this.token = getToken();
        $('#clearFieldBtn').click(this.clearInputFields.bind(this));
        this.guideNameElement = $('#guideName');

        this.getAllGuides();
        $('#guidesContainer').on('click', '.card', this.clickOnCard.bind(this));
        $('#searchGuide').on('keyup', this.searchUser.bind(this));
        this.searchFieldElement = $('#searchGuide');
        this.selectedGuide = null;

    }

    deleteUser() {
    /*    const guideId = this.selectedGuide.guideId;
        $.ajax({
            url: this.guideApiUrl + "/" + guideId,
            type: "DELETE",
            success: () => {
                alert("Guide deleted successfully");
                this.getAllGuides();
            },
            error: function () {
                alert("Failed to delete guide");
            }
        });*/
    }

    searchUser() {
    /*    const searchResults = this.guides.filter(guide => {
            return guide.guideName.includes(this.searchFieldElement.val()) || guide.contact.includes(this.searchFieldElement.val());
        });
        this.loadData(searchResults);*/

    }

    createUser(e) {
        if (this.isAnyFieldNull()) {
            alert('check fields');
        }
        if (this.imagesEmpty()) {
            alert('check images');
        }
        e.preventDefault();
        const userId = this.userIdEl.val();
        const username = this.usernameEl.val();
        const password = this.passwordEl.val();
        const dob = this.dobEl.val();
        const userGender = this.userGenderEl.val();
        const address = this.addressEl.val();
        const email = this.emailEl.val();
        const userType = this.userTypeEl.val();
        const phoneNumber = this.phoneNumberEl.val();
        const nicPassportNumber = this.nicPassportNumberEl.val();
        const profilePicture = this.profilePictureEl[0].files[0];
        const nicPassportBack = this.nicPassportBackEl[0].files[0];
        const nicPassportFront = this.nicPassportFrontEl[0].files[0];
        const remarks = this.userRemarksEl.val();

        const dto = new UserDTO(username, password, email, nicPassportNumber, address, phoneNumber, userType, userGender, remarks, dob);
        const formData = new FormData();
        const jsonDTO = JSON.stringify(dto);
        const blob = new Blob([jsonDTO], {type: 'application/json'});


        formData.set("userDTO", blob);
        formData.set("profilePicture", profilePicture);
        formData.set("nicPassportFrontImg", nicPassportFront);
        formData.set("nicPassportBackImg", nicPassportBack);

        $.ajax({
            type: "POST",
            url: this.adminRegisterApi,
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "Authorization": "Bearer "+ this.token
            },
            success: (response) => {
                console.log("Guide saved successfully. User ID: " + response.data);
                this.clearInputFields();
                this.getAllGuides();
                $("#imageIdFrontSection, #imageIdBackSection, #guideImageSection").hide();
            },
            error: (error) => {
                console.error("Error saving guide: " + error.responseText);
            }
        });
    }

    updateUser(e) {
       /* const guideId = this.guideIdElement.val();
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

    getAllGuides() {
       /* $.ajax({
            url: this.guideApiUrl,
            type: "GET",
            dataType: "json",
            success: (res) => {
                const standardResponse = new StandardResponse(res.code, res.msg, res.data);
                this.guides = standardResponse.data;
                this.loadData(standardResponse.data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error: " + errorThrown);
            }
        });*/
    }


    loadData(data) {
       /* const guidesContainer = document.getElementById("guidesContainer");
        guidesContainer.innerHTML = "";

        console.log(data);
        data.forEach((guide) => {
            const guideCard = document.createElement("div");
            guideCard.className = "card col-lg-3 col-md-6 col-sm-12 m-4";
            guideCard.id = guide.guideId;
            guideCard.innerHTML = `
                            <div class="card-body">
                                <h6 class="mb-2">Guide Id: <span class="guideId" style="color: #0a53be">${guide.guideId}</span></h6>
                                <h5 class="card-title">${guide.guideName}</h5>
                                <img class="card-img-top" src="data:image/!**;base64,${guide.guideProfileImage}" alt="Card image cap">
                                <h5 class="contact mt-3">${guide.contact}</h5>
                                <button id="delete" class="btn btn-danger" data-bs-toggle = "modal" data-bs-target="#modal">Delete</button>
                            </div>`;
            guidesContainer.appendChild(guideCard);
        });*/
    }

    clearInputFields() {
       /* this.guideNameElement.val('');
        this.guideIdElement.val('');
        this.guideDobElement.val('');
        this.contactElement.val('');
        this.guideExperienceElement.val('');
        this.guideRemarksElement.val('');
        $('#guideIdImgFront').val('');
        $('#guideIdImgBack').val('');
        $('#guideProfileImg').val('');
        this.imageIdFrontSectionElement.css('display', 'none');
        this.imageIdBackSectionElement.css('display', 'none');
        this.profileImageSectionElement.css('display', 'none');*/
    }

    clickOnCard(e) {
        /*const target = $(e.target);

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
       /* const guideName = this.guideNameElement.val();
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
  /*      const guideIdImgFront = $('#guideIdImgFront')[0].files[0];
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
        return false;*/
    }
}