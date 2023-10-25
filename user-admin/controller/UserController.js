import {UserDTO} from "../model/UserDTO.js";

export class UserController {

    constructor() {
        this.userApiUrl = "http://localhost:8090/userservice/api/v1/users";
        this.adminRegisterApi = "http://localhost:8090/userservice/api/v1/admin/register/admin";
        this.storedAccessToken = null;
        this.users = [];
        this.getAllUsers();

        $('#addBtn').click(this.createUser.bind(this));
        $('#deleteUserYes').click(this.deleteUser.bind(this));
        $('#updateBtn').click(this.updateUser.bind(this));
        $('#logout').click(this.logout.bind(this));
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
        this.profilePicturePicEl = $('#profilePicturePic');
        this.profilePicturePicSection = $('#profilePicturePicSection');
        this.nicPassportBackPicEl = $('#nicPassportBackImg');
        this.nicPassportBackImgSection = $('#nicPassportBackImgSection');
        this.nicPassportFrontPicEl = $('#nicPassportFrontImg');
        this.nicPassportFrontImgSection = $('#nicPassportFrontImgSection');

        $('#clearFieldBtn').click(this.clearInputFields.bind(this));
        this.guideNameElement = $('#guideName');

        this.getAllUsers();
        $('#usersContainer').on('click', '.card', this.clickOnCard.bind(this));
        $('#searchGuide').on('keyup', this.searchUser.bind(this));
        this.searchFieldElement = $('#searchGuide');
        this.selectedUser = null;

    }


    deleteUser() {
        const userId = this.selectedUser.userId;
        console.log(userId);
        if (this.selectedUser.username === localStorage.getItem('currentUser')) {
            alert("you cannot delete the logged user");
            return;
        }
        $.ajax({
            url: this.userApiUrl + "/" + userId,
            type: "DELETE",
            headers: {
                'Authorization': `Bearer ${(this.storedAccessToken)}`
            },
            success: () => {
                alert("User deleted successfully");
                this.getAllUsers();
            },
            error: function () {
                alert("Failed to delete guide");
            }
        });
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
        // const userId = this.userIdEl.val();
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
                "Authorization": "Bearer " + this.storedAccessToken
            },
            success: (response) => {
                console.log("User saved successfully. User ID: " + response.data);
                this.clearInputFields();
                this.getAllUsers();
                $("#imageIdFrontSection, #imageIdBackSection, #guideImageSection").hide();
            },
            error: (error) => {
                console.error("Error saving guide: " + error.responseText);
            }
        });
    }

    updateUser(e) {
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
        if (profilePicture !== null) {
            formData.set("profilePicture", profilePicture);
        }
        if (nicPassportFront !== null) {
            formData.set("nicPassportFrontImg", nicPassportFront);
        }
        if (nicPassportBack !== null) {
            formData.set("nicPassportBackImg", nicPassportBack);
        }
        console.log(userId)
        console.log(dto);
        $.ajax({
            type: "PUT",
            url: this.userApiUrl + '/' + userId,
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                "Authorization": "Bearer " + this.storedAccessToken
            },
            success: () => {
                console.log("User updated successfully. User ID: ");
                this.clearInputFields();
                this.getAllUsers();
                $("#imageIdFrontSection, #imageIdBackSection, #guideImageSection").hide();
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    getAllUsers() {
        this.storedAccessToken = localStorage.getItem('accessToken');

        $.ajax({
            type: "GET",
            url: this.userApiUrl,
            headers: {
                'Authorization': `Bearer ${(this.storedAccessToken)}`
            },
            dataType: "json",
            success: (res) => {
                const users = res.data;
                this.users = users;
                this.loadData(users);
            },
            error: (error) => {
            },
            statusCode: {
                403: function () {
                    alert("you need to login");
                    window.location.href = '../Login/index.html';
                }
            }
        });
    }


    loadData(data) {
        const usersContainer = document.getElementById("usersContainer");
        usersContainer.innerHTML = "";

        console.log(data);
        data.forEach((user) => {
            const userCard = document.createElement("div");
            userCard.className = "card col-lg-3 col-md-5 col-sm-12 p-4 m-1";
            userCard.id = user.userId;
            userCard.innerHTML = `
                             <div class="card-body">
                                 <h6 class="mb-2">User Id: <span class="guideId" style="color: #0a53be">${user.userId}</span></h6>
                                 <h5 class="card-title">Username : ${user.username}</h5>
                                 <h6 class="card-title">Admin type : ${user.userType}</h6>
                                 <img class="card-img-top" src="data:image/**;base64,${user.profilePicture}" alt="Card image cap">
                                 <h5 class="contact mt-3">${user.phoneNumber}</h5>
                                 <button id="delete" class="btn btn-danger" data-bs-toggle = "modal" data-bs-target="#modal">Delete</button>
                             </div>`;
            usersContainer.appendChild(userCard);
        });
    }

    clearInputFields() {
        this.userIdEl.val('');
        this.usernameEl.val('');
        this.passwordEl.val('');
        this.dobEl.val('');
        this.userGenderEl.val('');
        this.addressEl.val('');
        this.emailEl.val('');
        this.userTypeEl.val('USER_ADMIN');
        this.phoneNumberEl.val('');
        this.nicPassportNumberEl.val('');
        this.userRemarksEl.val('');
        this.profilePictureEl.val('');
        this.nicPassportBackEl.val('');
        this.nicPassportFrontEl.val('');
        this.profilePicturePicSection.css('display', 'none');
        this.nicPassportBackImgSection.css('display', 'none');
        this.nicPassportFrontImgSection.css('display', 'none');
    }

    clickOnCard(e) {
        const target = $(e.target);
        console.log('hello')
        const userId = e.currentTarget.id;
        const user = this.users.find(value => value.userId === userId);
        this.selectedUser = user;
        if (target.is('#delete')) {
            return;
        }
        this.userIdEl.val(user.userId);
        this.usernameEl.val(user.username);
        this.passwordEl.val(user.password);
        this.dobEl.val(user.dob);
        this.userGenderEl.val(user.gender);
        this.addressEl.val(user.address);
        this.emailEl.val(user.email);
        this.userTypeEl.val(user.userType);
        this.phoneNumberEl.val(user.phoneNumber);
        this.nicPassportNumberEl.val(user.nicPassportNumber);
        this.userRemarksEl.val(user.remarks);


        this.profilePicturePicEl.attr('src', `data:image/**;base64,${user.profilePicture}`);
        this.profilePicturePicSection.css('display', 'block');

        this.nicPassportBackPicEl.attr('src', `data:image/**;base64,${user.nicPassportBackImg}`);
        this.nicPassportBackImgSection.css('display', 'block');

        this.nicPassportFrontPicEl.attr('src', `data:image/**;base64,${user.nicPassportFrontImg}`);
        this.nicPassportFrontImgSection.css('display', 'block');


        this.profilePictureEl.val('')
        this.nicPassportBackEl.val('')
        this.nicPassportFrontEl.val('')
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

    logout() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8090/userservice/api/v1/auth/logout",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            success: (res) => {
                window.location.href = '../Login/index.html';
            },
            error: (error) => {
            }
        });
    }
}